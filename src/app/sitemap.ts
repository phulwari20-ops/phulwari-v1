import type { MetadataRoute } from 'next'
import { SITE_URL, absoluteUrl } from '@/lib/seo/site'
import { createClient } from '@/utils/supabase/server'

export const revalidate = 3600

type Entry = MetadataRoute.Sitemap[number]

/**
 * Static routes, with the priority/frequency actually appropriate to each.
 *
 * Deliberately excluded, because listing a URL that does not return 200 wastes
 * crawl budget and contradicts the canonical tags:
 *  - `/birthdays` and `/faq` — permanently redirected in next.config.ts
 *  - `/footer` and `/hero` — layout fragments that Next exposes as routes
 *  - `/portal/*` and `/supabase-test` — noindex, not public content
 */
const STATIC_ROUTES: Array<{
  path: string
  priority: number
  changeFrequency: Entry['changeFrequency']
}> = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' },

  { path: '/kids-and-child-birthday-party', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/activities', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },

  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/mothers', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/blogs', priority: 0.8, changeFrequency: 'weekly' },

  { path: '/activities/art-craft', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/activities/gymnastics-mma', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/activities/karate', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/activities/music-dance', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/activities/play-zone', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/activities/roller-skating', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/activities/yoga-cricket', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/mothers/fitness', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/mothers/toddler-program', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/events/birthday', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/events/summer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/events/winter', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/batch-galary/batch', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/batch-galary/gallery', priority: 0.7, changeFrequency: 'weekly' },

  { path: '/about/mission', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/about/corevalues', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/about/whychooseus', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/about/facilities', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/testinomals', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/legal/faq', priority: 0.6, changeFrequency: 'monthly' },

  { path: '/legal/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/legal/terms', priority: 0.3, changeFrequency: 'yearly' },
]

/** Published blog posts, so new articles get discovered without a redeploy. */
async function blogEntries(): Promise<Entry[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('blogs')
      .select('slug, created_at, updated_at')
      .order('created_at', { ascending: false })

    if (!data) return []

    return data
      .filter((post) => typeof post.slug === 'string' && post.slug.trim() !== '')
      .map((post) => ({
        url: absoluteUrl(`/blogs/${post.slug}`),
        lastModified: new Date(post.updated_at ?? post.created_at ?? Date.now()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
  } catch {
    // A sitemap missing its blog rows is far better than a 500 sitemap.
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: Entry[] = STATIC_ROUTES.map((route) => ({
    url: route.path === '/' ? SITE_URL : absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  return [...staticEntries, ...(await blogEntries())]
}
