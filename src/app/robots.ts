import type { MetadataRoute } from 'next'
import { SITE_URL, absoluteUrl } from '@/lib/seo/site'

/**
 * `Host` and `Sitemap` must name the canonical apex domain. They previously
 * pointed at `www.`, which 307-redirects here, so every sitemap URL a crawler
 * fetched was a redirect.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ['/api/', '/portal/', '/supabase-test', '/footer', '/hero']

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      {
        // Answer engines and LLM crawlers are welcome on the public pages —
        // being cited by them is the point of the AEO/GEO work.
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'Google-Extended',
          'GoogleOther',
          'anthropic-ai',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'PerplexityBot',
          'Perplexity-User',
          'Applebot',
          'Applebot-Extended',
          'Amazonbot',
          'Bingbot',
          'DuckDuckBot',
          'CCBot',
          'meta-externalagent',
        ],
        allow: '/',
        disallow,
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  }
}
