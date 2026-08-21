import {
  BUSINESS,
  LOGO_PATH,
  OPENING_HOURS,
  SITE_ALTERNATE_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  absoluteUrl,
} from './site'

/**
 * Stable @ids. Every schema node references the organisation and website by id
 * rather than repeating them, which is what keeps the graph free of the
 * duplicate Organization/WebSite nodes that trip up Rich Results validation.
 */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const LOCALBUSINESS_ID = `${SITE_URL}/#localbusiness`

type Json = Record<string, unknown>

/** Emitted once, from the root layout only. */
export function organizationSchema(): Json {
  return {
    '@type': ['EducationalOrganization', 'ChildCare', 'LocalBusiness'],
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: [SITE_ALTERNATE_NAME, SITE_SHORT_NAME],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: absoluteUrl(LOGO_PATH),
      contentUrl: absoluteUrl(LOGO_PATH),
      caption: SITE_NAME,
    },
    image: { '@id': `${SITE_URL}/#logo` },
    description: SITE_DESCRIPTION,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    hasMap: BUSINESS.mapUrl,
    openingHoursSpecification: OPENING_HOURS.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...slot.dayOfWeek],
      opens: slot.opens,
      closes: slot.closes,
    })),
    priceRange: BUSINESS.priceRange,
    areaServed: {
      '@type': 'City',
      name: 'Patna',
      containedInPlace: { '@type': 'State', name: 'Bihar' },
    },
    sameAs: [...SOCIAL_PROFILES],
  }
}

/** Emitted once, from the root layout only. Carries the site search action. */
export function websiteSchema(): Json {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-IN',
  }
}

export interface WebPageInput {
  path: string
  name: string
  description: string
  /** 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'FAQPage' */
  type?: string
  breadcrumb?: BreadcrumbItem[]
  primaryImage?: string
  datePublished?: string
  dateModified?: string
}

/** One WebPage node per page, linked back to the site-wide organisation. */
export function webPageSchema(input: WebPageInput): Json {
  const url = absoluteUrl(input.path)
  const node: Json = {
    '@type': input.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-IN',
  }
  if (input.primaryImage) {
    node.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: absoluteUrl(input.primaryImage),
    }
  }
  if (input.breadcrumb && input.breadcrumb.length > 0) {
    node.breadcrumb = { '@id': `${url}#breadcrumb` }
  }
  if (input.datePublished) node.datePublished = input.datePublished
  if (input.dateModified) node.dateModified = input.dateModified
  return node
}

export interface BreadcrumbItem {
  name: string
  path: string
}

export function breadcrumbSchema(pagePath: string, items: BreadcrumbItem[]): Json {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(pagePath)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export interface FaqItem {
  question: string
  answer: string
}

/**
 * Only emit this from a page that visibly renders the same questions and
 * answers — Google treats FAQ markup without matching on-page content as spam.
 */
export function faqSchema(pagePath: string, faqs: FaqItem[]): Json {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(pagePath)}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export interface ServiceInput {
  name: string
  description: string
  path: string
  serviceType?: string
  audience?: string
}

export function serviceSchema(input: ServiceInput): Json {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(input.path)}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType ?? input.name,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'City', name: 'Patna' },
    ...(input.audience
      ? { audience: { '@type': 'Audience', audienceType: input.audience } }
      : {}),
  }
}

export interface OfferInput {
  name: string
  description?: string
  price: string
  path: string
}

/**
 * Party packages are priced offers. Prices arrive as display strings such as
 * "₹4,999" or "Custom Pricing"; only a parseable number becomes a real `price`,
 * because invalid price values fail Rich Results validation.
 */
export function offerSchema(input: OfferInput): Json {
  const numeric = input.price.replace(/[^\d.]/g, '')
  const hasPrice = numeric !== '' && Number.isFinite(Number(numeric))

  return {
    '@type': 'Offer',
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    ...(hasPrice
      ? { price: Number(numeric), priceCurrency: 'INR' }
      : { priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'INR' } }),
    availability: 'https://schema.org/InStock',
    url: absoluteUrl(input.path),
    seller: { '@id': ORGANIZATION_ID },
  }
}

export interface ArticleInput {
  title: string
  description: string
  path: string
  image?: string
  datePublished?: string
  dateModified?: string
  authorName?: string
  section?: string
  tags?: string[]
}

export function articleSchema(input: ArticleInput): Json {
  const url = absoluteUrl(input.path)
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: input.title,
    description: input.description,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      '@type': input.authorName ? 'Person' : 'Organization',
      name: input.authorName ?? SITE_NAME,
      ...(input.authorName ? {} : { '@id': ORGANIZATION_ID }),
    },
    publisher: { '@id': ORGANIZATION_ID },
    ...(input.section ? { articleSection: input.section } : {}),
    ...(input.tags && input.tags.length > 0 ? { keywords: input.tags.join(', ') } : {}),
    inLanguage: 'en-IN',
  }
}

export interface ReviewInput {
  author: string
  body: string
  rating: number
  datePublished?: string
}

export function aggregateRatingSchema(reviews: ReviewInput[]): Json | null {
  if (reviews.length === 0) return null
  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  return {
    '@type': 'AggregateRating',
    ratingValue: Number((total / reviews.length).toFixed(1)),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  }
}

export function reviewSchemas(reviews: ReviewInput[]): Json[] {
  return reviews.map((review) => ({
    '@type': 'Review',
    reviewBody: review.body,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: { '@type': 'Person', name: review.author },
    ...(review.datePublished ? { datePublished: review.datePublished } : {}),
    itemReviewed: { '@id': ORGANIZATION_ID },
  }))
}

export interface ImageObjectInput {
  url: string
  caption?: string
  width?: number
  height?: number
}

export function imageObjectSchema(input: ImageObjectInput): Json {
  return {
    '@type': 'ImageObject',
    url: absoluteUrl(input.url),
    contentUrl: absoluteUrl(input.url),
    ...(input.caption ? { caption: input.caption, name: input.caption } : {}),
    ...(input.width ? { width: input.width } : {}),
    ...(input.height ? { height: input.height } : {}),
  }
}

export interface CourseInput {
  name: string
  description: string
  path: string
}

/** Activity programmes are courses the centre runs. */
export function courseSchema(input: CourseInput): Json {
  return {
    '@type': 'Course',
    '@id': `${absoluteUrl(input.path)}#course`,
    name: input.name,
    description: input.description,
    provider: { '@id': ORGANIZATION_ID },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      location: {
        '@type': 'Place',
        name: SITE_NAME,
        address: {
          '@type': 'PostalAddress',
          streetAddress: BUSINESS.address.streetAddress,
          addressLocality: BUSINESS.address.addressLocality,
          addressRegion: BUSINESS.address.addressRegion,
          postalCode: BUSINESS.address.postalCode,
          addressCountry: BUSINESS.address.addressCountry,
        },
      },
    },
  }
}

/**
 * Wrap nodes into a single `@graph`. One script tag per page keeps the markup
 * conflict-free and is what the validators prefer.
 */
export function buildGraph(...nodes: Array<Json | null | undefined>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  })
}
