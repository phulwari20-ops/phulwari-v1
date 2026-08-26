import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, serviceSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Camps & Events', path: '/events/summer' },
  { name: 'Summer Camp', path: '/events/summer' },
];

export const metadata = buildMetadata({
  title: 'Kids Summer Camp in Patna',
  description:
    'Phulwari\'s summer camp in Patna keeps children active with skating, gymnastics, dance, art and sports, in supervised age-wise batches.',
  path: '/events/summer',
  keywords: [
    'summer camp Patna',
    'kids summer camp Patna',
    'holiday camp for children Patna',
    'summer classes Patna',
  ],
});

export default function EventsSummerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="events-summer-schema"
        nodes={[
    webPageSchema({
      path: '/events/summer',
      name: 'Kids Summer Camp in Patna',
      description:
        'Phulwari\'s summer camp in Patna keeps children active with skating, gymnastics, dance, art and sports, in supervised age-wise batches.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/events/summer', BREADCRUMB),
    serviceSchema({
      name: 'Kids Summer Camp',
      description:
        'A holiday summer camp for children in Patna with skating, gymnastics, dance, art and sports.',
      path: '/events/summer',
    }),
        ]}
      />
      {children}
    </>
  );
}
