import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Our Mission', path: '/about/mission' },
];

export const metadata = buildMetadata({
  title: 'Our Mission & Vision',
  description:
    'Phulwari\'s mission: a joyful, active start for every child in Patna and a space where mothers stay healthy and connected. The values behind our programs.',
  path: '/about/mission',
  keywords: [
    'Phulwari mission',
    'child activity centre vision Patna',
    'child development philosophy',
  ],
});

export default function AboutMissionLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="about-mission-schema"
        nodes={[
    webPageSchema({
      path: '/about/mission',
      name: 'Our Mission & Vision',
      description:
        'Phulwari\'s mission: a joyful, active start for every child in Patna and a space where mothers stay healthy and connected. The values behind our programs.',
      type: 'AboutPage',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/about/mission', BREADCRUMB),
        ]}
      />
      {children}
    </>
  );
}
