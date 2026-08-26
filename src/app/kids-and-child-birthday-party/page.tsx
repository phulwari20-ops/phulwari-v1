import { buildMetadata } from '@/lib/seo/metadata'

/**
 * Canonical URL for the birthday landing page.
 * `/birthdays` permanently redirects here (see next.config.ts), so this route
 * owns the content and the canonical tag; the component is re-exported rather
 * than redirected so the SEO-friendly URL is the one that serves the page.
 */
export const metadata = buildMetadata({
  title: 'Kids Birthday Party Venue in Patna',
  description:
    'Host a stress-free 1st to 5th birthday at Phulwari Patna: safe soft-play zone, themed ' +
    'decoration, games and party planning. Check date availability.',
  path: '/kids-and-child-birthday-party',
  keywords: [
    'kids birthday party venue Patna',
    'first birthday celebration venue Patna',
    'child birthday celebration Patna',
    'birthday packages Patna',
    'soft play zone Patna',
    'kids party themes Patna',
    'birthday planner Patna',
    'indoor play area Patna',
  ],
})

export { default } from '../birthdays/page'
