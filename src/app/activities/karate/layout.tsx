import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, courseSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Activities', path: '/activities' },
  { name: 'Karate', path: '/activities/karate' },
];

export const metadata = buildMetadata({
  title: 'Karate Classes for Kids in Patna',
  description:
    'Karate training for children at Phulwari Patna — discipline, focus, fitness and self-defence taught in structured, belt-progression batches by qualified instructors.',
  path: '/activities/karate',
  keywords: [
    'karate classes Patna',
    'kids karate training Patna',
    'martial arts for children Patna',
  ],
});

export default function ActivitiesKarateLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="activities-karate-schema"
        nodes={[
    webPageSchema({
      path: '/activities/karate',
      name: 'Karate Classes for Kids in Patna',
      description:
        'Karate training for children at Phulwari Patna — discipline, focus, fitness and self-defence taught in structured, belt-progression batches by qualified instructors.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/activities/karate', BREADCRUMB),
    courseSchema({
      name: 'Kids Karate',
      description:
        'Karate training for children in Patna covering discipline, focus, fitness and practical self-defence.',
      path: '/activities/karate',
    }),
        ]}
      />
      {children}
    </>
  );
}
