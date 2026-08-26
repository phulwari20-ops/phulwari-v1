import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Facilities', path: '/about/facilities' },
];

export const metadata = buildMetadata({
  title: 'Our Facilities & Infrastructure',
  description:
    'Inside Phulwari, Patna: soft-play zones, a gymnastics and MMA floor, skating area, art & craft studio, and hygienic, CCTV-monitored spaces built for kids.',
  path: '/about/facilities',
  keywords: [
    'Phulwari facilities Patna',
    'indoor play area Patna',
    'kids gym Patna',
    'soft play zone Patna',
  ],
});

export default function AboutFacilitiesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="about-facilities-schema"
        nodes={[
    webPageSchema({
      path: '/about/facilities',
      name: 'Our Facilities & Infrastructure',
      description:
        'Inside Phulwari, Patna: soft-play zones, a gymnastics and MMA floor, skating area, art & craft studio, and hygienic, CCTV-monitored spaces built for kids.',
      type: 'AboutPage',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/about/facilities', BREADCRUMB),
        ]}
      />
      {children}
    </>
  );
}
