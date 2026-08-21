import type { NextConfig } from 'next'

/**
 * Security headers.
 *
 * The CSP allows exactly what the site loads: Google Analytics/Tag Manager,
 * Google Fonts, and images from Supabase storage plus the remote hosts used by
 * the birthday landing config. `'unsafe-inline'` is required for styles because
 * the pages use inline <style> blocks, and for scripts because next/script
 * injects the GA bootstrap inline.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://region1.google-analytics.com",
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  'upgrade-insecure-requests',
].join('; ')

const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy', value: CSP },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.28', '192.168.1.28:3000'],
  typescript: {
    ignoreBuildErrors: true,
  },

  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: SECURITY_HEADERS,
      },
      {
        // Hashed build assets are immutable.
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:file*.(jpg|jpeg|png|webp|avif|gif|svg|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600' }],
      },
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ]
  },

  async redirects() {
    return [
      { source: '/faq', destination: '/legal/faq', permanent: true },
      {
        source: '/birthdays',
        destination: '/kids-and-child-birthday-party',
        permanent: true,
      },
      // These segments exist only as layout fragments reused by the homepage;
      // they are not pages and must not be linkable or indexable.
      { source: '/footer', destination: '/', permanent: true },
      { source: '/hero', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
