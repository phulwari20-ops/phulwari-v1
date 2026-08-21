import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, courseSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Activities', path: '/activities' },
  { name: 'Music & Dance', path: '/activities/music-dance' },
];

export const metadata = buildMetadata({
  title: 'Kids Music & Dance Classes in Patna',
  description:
    'Music and dance classes for children at Phulwari Patna. Rhythm, movement, confidence and stage exposure in small, age-appropriate batches led by trained instructors.',
  path: '/activities/music-dance',
  keywords: [
    'kids dance classes Patna',
    'children music classes Patna',
    'dance academy for kids Patna',
  ],
});

export default function ActivitiesMusicDanceLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="activities-music-dance-schema"
        nodes={[
    webPageSchema({
      path: '/activities/music-dance',
      name: 'Kids Music & Dance Classes in Patna',
      description:
        'Music and dance classes for children at Phulwari Patna. Rhythm, movement, confidence and stage exposure in small, age-appropriate batches led by trained instructors.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/activities/music-dance', BREADCRUMB),
    courseSchema({
      name: 'Kids Music & Dance',
      description:
        'Music and dance classes for children in Patna, covering rhythm, movement, coordination and stage confidence.',
      path: '/activities/music-dance',
    }),
        ]}
      />
      {children}
    </>
  );
}
