import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getSupabaseUrl, getSupabaseKey } from './supabase/env';
import { ActivityPageData, DEFAULT_ACTIVITIES } from './activitiesFallback';

export function toOptimizedMediaUrl(url: string | undefined): string {
  if (!url || typeof url !== 'string') return '/phulwari_logo.webp';
  // Map local PNG/JPG images in public folders to their lightweight, optimized WebP siblings
  const match = url.match(/^(\/[^/]+\/.+)\.(png|jpg|jpeg)$/i);
  if (match) {
    return `${match[1]}.webp`;
  }
  return url;
}

// Public client for fetching activity pages
function getPublicClient() {
  return createSupabaseClient(getSupabaseUrl(), getSupabaseKey(), {
    auth: { persistSession: false },
  });
}

/**
 * Fetch a single activity page by its slug or alias from Supabase database.
 * Falls back to DEFAULT_ACTIVITIES only if database connection fails.
 */
export async function getActivityBySlug(slug: string): Promise<ActivityPageData | null> {
  const cleanSlug = slug.toLowerCase().trim();

  try {
    const supabase = getPublicClient();

    // 1. Direct slug match
    const { data: directMatch, error: directErr } = await supabase
      .from('activity_pages')
      .select('*')
      .eq('slug', cleanSlug)
      .maybeSingle();

    const formatActivity = (item: any): ActivityPageData => {
      const fallback = DEFAULT_ACTIVITIES.find(
        (a) =>
          a.slug.toLowerCase() === item.slug?.toLowerCase() ||
          (a.aliases && a.aliases.map((al) => al.toLowerCase()).includes(item.slug?.toLowerCase()))
      );

      const rawHero = item.hero_image || fallback?.hero_image || '/phulwari_logo.webp';
      const hero = toOptimizedMediaUrl(rawHero);

      const rawGallery = (Array.isArray(item.gallery_images) && item.gallery_images.length > 0)
        ? item.gallery_images
        : (fallback?.gallery_images || [hero]);
      const gallery = rawGallery.map((img: string) => toOptimizedMediaUrl(img));

      return {
        ...item,
        hero_image: hero,
        gallery_images: gallery,
        content_color: item.content_color || item.cta?.content_color || undefined,
        videos: (Array.isArray(item.videos) && item.videos.length > 0) ? item.videos : (fallback?.videos || []),
      };
    };

    if (!directErr && directMatch) {
      return formatActivity(directMatch);
    }

    // 2. Alias match (if slug changed or compound URL used)
    const { data: allRows, error: allErr } = await supabase
      .from('activity_pages')
      .select('*')
      .eq('is_active', true);

    if (!allErr && allRows && allRows.length > 0) {
      const aliasMatch = allRows.find((item: any) => {
        if (item.slug === cleanSlug) return true;
        if (Array.isArray(item.aliases)) {
          return item.aliases.map((a: string) => a.toLowerCase()).includes(cleanSlug);
        }
        return false;
      });
      if (aliasMatch) return formatActivity(aliasMatch);
    }
  } catch (err) {
    console.error('Error fetching activity from Supabase:', err);
  }

  // Fallback to offline seed data if DB query had an issue
  const fallback = DEFAULT_ACTIVITIES.find(
    (a) =>
      a.slug.toLowerCase() === cleanSlug ||
      (a.aliases && a.aliases.map((al) => al.toLowerCase()).includes(cleanSlug))
  );

  return fallback || null;
}

/**
 * Fetch all active activities ordered by order_index from Supabase database.
 */
export async function getAllActivities(): Promise<ActivityPageData[]> {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from('activity_pages')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((item: any) => {
        const fallback = DEFAULT_ACTIVITIES.find(
          (a) =>
            a.slug.toLowerCase() === item.slug?.toLowerCase() ||
            (a.aliases && a.aliases.map((al) => al.toLowerCase()).includes(item.slug?.toLowerCase()))
        );
        const rawHero = item.hero_image || fallback?.hero_image || '/phulwari_logo.webp';
        const hero = toOptimizedMediaUrl(rawHero);

        const rawGallery = (Array.isArray(item.gallery_images) && item.gallery_images.length > 0)
          ? item.gallery_images
          : (fallback?.gallery_images || [hero]);
        const gallery = rawGallery.map((img: string) => toOptimizedMediaUrl(img));

        return {
          ...item,
          hero_image: hero,
          gallery_images: gallery,
          content_color: item.content_color || item.cta?.content_color || undefined,
          videos: (Array.isArray(item.videos) && item.videos.length > 0) ? item.videos : (fallback?.videos || []),
        };
      }) as ActivityPageData[];
    }
  } catch (err) {
    console.error('Error fetching all activities from Supabase:', err);
  }

  // Fallback to default activities
  return DEFAULT_ACTIVITIES;
}
