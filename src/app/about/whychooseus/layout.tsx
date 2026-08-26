import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Why Choose Us', path: '/about/whychooseus' },
];

export const metadata = buildMetadata({
  title: 'Why Choose Phulwari',
  description:
    'Trained coaches, a padded and CCTV-monitored premises, small batch sizes and programs for both children and mothers — the reasons Patna families choose Phulwari.',
  path: '/about/whychooseus',
  keywords: [
    'why choose Phulwari',
    'best kids activity centre Patna',
    'safe children activity centre Patna',
  ],
});

export default function AboutWhychooseusLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="about-whychooseus-schema"
        nodes={[
    webPageSchema({
      path: '/about/whychooseus',
      name: 'Why Choose Phulwari',
      description:
        'Trained coaches, a padded and CCTV-monitored premises, small batch sizes and programs for both children and mothers — the reasons Patna families choose Phulwari.',
      type: 'AboutPage',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/about/whychooseus', BREADCRUMB),
        ]}
      />
      {children}
    </>
  );
}
