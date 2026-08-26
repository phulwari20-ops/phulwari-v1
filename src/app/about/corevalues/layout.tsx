import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Core Values', path: '/about/corevalues' },
];

export const metadata = buildMetadata({
  title: 'Our Core Values',
  description:
    'Safety, joy, inclusion and steady growth — the core values behind every class, camp and celebration at Phulwari Mother & Child Activity Centre in Patna.',
  path: '/about/corevalues',
  keywords: [
    'Phulwari core values',
    'safe kids activity centre Patna',
    'child-first learning values',
  ],
});

export default function AboutCorevaluesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="about-corevalues-schema"
        nodes={[
    webPageSchema({
      path: '/about/corevalues',
      name: 'Our Core Values',
      description:
        'Safety, joy, inclusion and steady growth — the core values behind every class, camp and celebration at Phulwari Mother & Child Activity Centre in Patna.',
      type: 'AboutPage',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/about/corevalues', BREADCRUMB),
        ]}
      />
      {children}
    </>
  );
}
