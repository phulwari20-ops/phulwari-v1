/**
 * Single source of truth for every fact the SEO layer needs about Phulwari.
 *
 * IMPORTANT — canonical host:
 * `https://www.phulwari.co.in` issues a 307 to `https://phulwari.co.in`, so the
 * apex domain is the canonical one. Metadata, canonicals, sitemap, robots and
 * JSON-LD @ids must all agree on it; when they disagreed, every sitemap URL and
 * every canonical pointed at a redirect.
 */

export const SITE_URL = 'https://phulwari.co.in'

export const SITE_NAME = 'Phulwari Mother & Child Activity Centre'
export const SITE_SHORT_NAME = 'Phulwari'
export const SITE_ALTERNATE_NAME = 'Phulwari Patna'

export const SITE_DESCRIPTION =
  "Patna's unique mother & child activity centre where children learn, play, grow and explore " +
  'while mothers stay active, healthy and engaged. Music, dance, gymnastics, MMA, roller skating, ' +
  'art & craft, yoga, cricket and more — plus fitness programs for mothers, summer & winter camps, ' +
  'and birthday party celebrations.'

export const SITE_LOCALE = 'en_IN'
export const SITE_LANG = 'en-IN'

/** Name, Address, Phone — must stay identical everywhere for local SEO. */
export const BUSINESS = {
  legalName: SITE_NAME,
  telephone: '+916207368839',
  telephoneDisplay: '+91 62073 68839',
  whatsapp: '916207368839',
  email: 'phulwari02@gmail.com',
  address: {
    streetAddress: 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road',
    addressLocality: 'Patna',
    addressRegion: 'Bihar',
    postalCode: '800001',
    addressCountry: 'IN',
  },
  geo: { latitude: 25.612, longitude: 85.127 },
  mapUrl: 'https://maps.app.goo.gl/g7qiU1BqineG2RF56',
  priceRange: '₹₹',
  foundingLocation: 'Patna, Bihar, India',
} as const

export const SOCIAL_PROFILES = [
  'https://www.facebook.com/share/1DWjMMRAjT/',
  'https://www.instagram.com/phulwari.motherkids/',
  'https://youtube.com/@phulwari-s1d7o',
] as const

export const OPENING_HOURS = [
  {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:30',
    closes: '11:30',
    label: 'Mother & Toddler Program',
  },
  {
    dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '18:30',
    closes: '21:00',
    label: 'Evening activity batches',
  },
] as const

/** Default social share image. */
export const OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — Patna`,
} as const

export const LOGO_PATH = '/phulwari_logo.webp'

export const VERIFICATION = {
  google: 'EFluuGoXog-o6hgirGHBoC97OB1zKOcoaMuLeMXte_0',
} as const

export const GA_MEASUREMENT_ID = 'G-95W6V42HK2'

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path
  const suffix = path.startsWith('/') ? path : `/${path}`
  return suffix === '/' ? SITE_URL : `${SITE_URL}${suffix.replace(/\/$/, '')}`
}
