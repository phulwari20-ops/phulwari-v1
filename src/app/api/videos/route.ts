import { NextResponse } from 'next/server';
import { getSupabaseUrl, getSupabaseKey } from '@/lib/supabase/env';

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  url: string;
  poster: string;
  duration?: string;
  description?: string;
  is_featured?: boolean;
}

// Core verified videos hosted on Cloudflare R2 bucket with HTTP Range byte streaming
const CORE_R2_VIDEOS: VideoItem[] = [
  {
    id: 'vid-birthday-celebration',
    title: 'Real Birthday Party Celebrations at Phulwari',
    category: 'Birthday',
    url: '/api/media/videos/birthday_party.mp4',
    poster: '/birthday_party/image.webp',
    duration: '1:15',
    description: 'Watch real footage of kids and families celebrating joyful birthdays at Phulwari Centre, Kidwaipuri, Patna.',
    is_featured: true,
  },
  {
    id: 'vid-gymnastics-kids',
    title: 'Kids Gymnastics & Flexibility Training',
    category: 'Gymnastics',
    url: '/api/media/videos/gymnastics.mp4',
    poster: '/Gymnastics/image.webp',
    duration: '0:45',
    description: 'Energetic gymnastics floor training, flexibility jumps, and balance beam work.',
    is_featured: true,
  },
  {
    id: 'vid-roller-skating',
    title: 'Roller Skating & Agility Sessions',
    category: 'Skating',
    url: '/api/media/videos/skating.mp4',
    poster: '/Roller_skating/image.webp',
    duration: '0:50',
    description: 'Safe indoor roller skating drills with protective gear and experienced trainers.',
    is_featured: true,
  },
  {
    id: 'vid-cricket-coaching',
    title: 'Junior Cricket Coaching & Batting Drills',
    category: 'Cricket',
    url: '/api/media/videos/cricket.mp4',
    poster: '/Cricket/image.webp',
    duration: '1:00',
    description: 'Batting stroke practice, fielding exercises, and sportsmanship training for children.',
    is_featured: true,
  },
  {
    id: 'vid-centre-playback',
    title: 'Phulwari Centre Walkthrough & Safe Play Zone',
    category: 'Centre Tour',
    url: '/api/media/videos/phulwariplayback.mp4',
    poster: '/Play_zone/image.webp',
    duration: '0:30',
    description: 'Take a virtual walk through the child-safe sensory play area and activity rooms.',
    is_featured: false,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(20, parseInt(searchParams.get('limit') || '4', 10)));
    const category = (searchParams.get('category') || 'all').trim().toLowerCase();

    // 1. Fetch dynamic videos stored in Supabase activity_pages
    const dbVideos: VideoItem[] = [];
    try {
      const supabaseUrl = getSupabaseUrl().replace(/\/+$/, '');
      const supabaseKey = getSupabaseKey();

      const res = await fetch(`${supabaseUrl}/rest/v1/activity_pages?select=slug,h1,videos`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const pages = await res.json();
        if (Array.isArray(pages)) {
          pages.forEach((p: any) => {
            if (Array.isArray(p.videos) && p.videos.length > 0) {
              p.videos.forEach((v: any, idx: number) => {
                if (v && (v.url || v.src)) {
                  const rawUrl = v.url || v.src;
                  const streamUrl = rawUrl.startsWith('/videos/')
                    ? `/api/media${rawUrl}`
                    : rawUrl;

                  dbVideos.push({
                    id: v.id || `${p.slug}-vid-${idx}`,
                    title: v.title || p.h1 || 'Activity Session Video',
                    category: p.slug.split('-')[0] || 'Activity',
                    url: streamUrl,
                    poster: v.poster || '/images/default_poster.webp',
                    duration: v.duration || '0:30',
                    description: v.description || `Real session video from ${p.h1}`,
                    is_featured: Boolean(v.is_featured),
                  });
                }
              });
            }
          });
        }
      }
    } catch (dbErr) {
      console.warn('Could not fetch dynamic activity_pages videos from Supabase:', dbErr);
    }

    // 2. Merge database videos with Core R2 videos (deduplicate by url)
    const combined: VideoItem[] = [...dbVideos];
    const existingUrls = new Set(dbVideos.map((v) => v.url.toLowerCase()));

    CORE_R2_VIDEOS.forEach((coreVid) => {
      if (!existingUrls.has(coreVid.url.toLowerCase())) {
        combined.push(coreVid);
        existingUrls.add(coreVid.url.toLowerCase());
      }
    });

    // 3. Filter by category if requested
    const filtered = category === 'all'
      ? combined
      : combined.filter((v) =>
          v.category.toLowerCase().includes(category) ||
          v.title.toLowerCase().includes(category)
        );

    // 4. Paginate
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const startIdx = (page - 1) * limit;
    const pagedVideos = filtered.slice(startIdx, startIdx + limit);

    return NextResponse.json(
      {
        success: true,
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
        data: pagedVideos,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=120, s-maxage=3600, stale-while-revalidate=86400',
          'CDN-Cache-Control': 'public, max-age=3600',
          'Vercel-CDN-Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err: any) {
    console.error('API /api/videos error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Failed to fetch videos',
        data: CORE_R2_VIDEOS.slice(0, 4),
      },
      { status: 500 }
    );
  }
}
