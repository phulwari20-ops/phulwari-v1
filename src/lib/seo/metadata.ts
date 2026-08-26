import type { Metadata } from 'next'
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from './site'

export interface PageSeoInput {
  /** Page title without the site-name suffix — the template adds it. */
  title: string
  description: string
  /** Site-relative path, e.g. `/activities/karate`. */
  path: string
  keywords?: string[]
  /** Defaults to the site OG image. */
  image?: { url: string; width?: number; height?: number; alt?: string }
  /** `article` for blog posts, otherwise `website`. */
  type?: 'website' | 'article'
  /** Keep the page out of the index (portal, internal tools, test routes). */
  noIndex?: boolean
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
}

/**
 * The one place page metadata is built.
 *
 * Guarantees, so no page can drift into an SEO conflict:
 *  - exactly one canonical, always absolute and on the canonical host
 *  - OpenGraph and Twitter cards kept in sync with the page title/description
 *  - noindex pages also get `nofollow` and are excluded from the sitemap
 */
export function buildMetadata(input: PageSeoInput): Metadata {
  const {
    title,
    description,
    path,
    keywords,
    image,
    type = 'website',
    noIndex = false,
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
  } = input

  const canonical = absoluteUrl(path)
  const ogImage = image ?? OG_IMAGE
  const ogImageUrl = absoluteUrl(ogImage.url)

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),

    alternates: { canonical },

    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },

    openGraph: {
      type,
      locale: SITE_LOCALE,
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: ogImage.width ?? OG_IMAGE.width,
          height: ogImage.height ?? OG_IMAGE.height,
          alt: ogImage.alt ?? title,
        },
      ],
      ...(type === 'article'
        ? {
            publishedTime,
            modifiedTime,
            authors: authors ?? [SITE_NAME],
            section,
            tags,
          }
        : {}),
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

/** Fallback description builder so no page ships an empty meta description. */
export function truncateDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean || SITE_DESCRIPTION
  return `${clean.slice(0, max - 1).replace(/[,;:\s]+\S*$/, '')}…`
}

export { SITE_URL }
