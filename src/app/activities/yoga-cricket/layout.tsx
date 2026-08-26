import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, courseSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Activities', path: '/activities' },
  { name: 'Yoga & Cricket', path: '/activities/yoga-cricket' },
];

export const metadata = buildMetadata({
  title: 'Kids Yoga & Cricket Coaching in Patna',
  description:
    'Yoga and cricket for children at Phulwari Patna — flexibility, calm and breathing practice alongside batting, bowling and fielding basics in supervised batches.',
  path: '/activities/yoga-cricket',
  keywords: [
    'kids yoga classes Patna',
    'cricket coaching for kids Patna',
    'children yoga Patna',
  ],
});

export default function ActivitiesYogaCricketLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="activities-yoga-cricket-schema"
        nodes={[
    webPageSchema({
      path: '/activities/yoga-cricket',
      name: 'Kids Yoga & Cricket Coaching in Patna',
      description:
        'Yoga and cricket for children at Phulwari Patna — flexibility, calm and breathing practice alongside batting, bowling and fielding basics in supervised batches.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/activities/yoga-cricket', BREADCRUMB),
    courseSchema({
      name: 'Kids Yoga & Cricket',
      description:
        'Yoga and cricket sessions for children in Patna, combining flexibility and breathing practice with cricket fundamentals.',
      path: '/activities/yoga-cricket',
    }),
        ]}
      />
      {children}
    </>
  );
}
