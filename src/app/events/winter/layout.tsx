import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, serviceSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Camps & Events', path: '/events/winter' },
  { name: 'Winter Camp', path: '/events/winter' },
];

export const metadata = buildMetadata({
  title: 'Kids Winter Camp in Patna',
  description:
    'Phulwari\'s winter camp in Patna fills the break with indoor activities — art, craft, music, dance, gymnastics and games in warm, supervised, age-appropriate batches.',
  path: '/events/winter',
  keywords: [
    'winter camp Patna',
    'kids winter camp Patna',
    'holiday activities for children Patna',
  ],
});

export default function EventsWinterLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="events-winter-schema"
        nodes={[
    webPageSchema({
      path: '/events/winter',
      name: 'Kids Winter Camp in Patna',
      description:
        'Phulwari\'s winter camp in Patna fills the break with indoor activities — art, craft, music, dance, gymnastics and games in warm, supervised, age-appropriate batches.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/events/winter', BREADCRUMB),
    serviceSchema({
      name: 'Kids Winter Camp',
      description:
        'A winter holiday camp for children in Patna with indoor art, music, dance, gymnastics and games.',
      path: '/events/winter',
    }),
        ]}
      />
      {children}
    </>
  );
}
