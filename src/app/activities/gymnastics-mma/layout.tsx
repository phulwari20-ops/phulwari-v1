import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, courseSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Activities', path: '/activities' },
  { name: 'Gymnastics & MMA', path: '/activities/gymnastics-mma' },
];

export const metadata = buildMetadata({
  title: 'Kids Gymnastics & MMA Classes in Patna',
  description:
    'Gymnastics and MMA training for children at Phulwari Patna — strength, flexibility, balance and self-defence taught safely on padded floors by trained coaches.',
  path: '/activities/gymnastics-mma',
  keywords: [
    'kids gymnastics Patna',
    'children MMA classes Patna',
    'self defence classes for kids Patna',
  ],
});

export default function ActivitiesGymnasticsMmaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="activities-gymnastics-mma-schema"
        nodes={[
    webPageSchema({
      path: '/activities/gymnastics-mma',
      name: 'Kids Gymnastics & MMA Classes in Patna',
      description:
        'Gymnastics and MMA training for children at Phulwari Patna — strength, flexibility, balance and self-defence taught safely on padded floors by trained coaches.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/activities/gymnastics-mma', BREADCRUMB),
    courseSchema({
      name: 'Kids Gymnastics & MMA',
      description:
        'Gymnastics and mixed martial arts training for children in Patna, building strength, flexibility, balance and self-defence skills.',
      path: '/activities/gymnastics-mma',
    }),
        ]}
      />
      {children}
    </>
  );
}
