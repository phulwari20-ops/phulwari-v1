import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, courseSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Activities', path: '/activities' },
  { name: 'Chess', path: '/activities/chess' },
];

export const metadata = buildMetadata({
  title: 'Chess Classes for Kids in Patna',
  description:
    'Chess coaching for children at Phulwari Patna. From first moves to tournament strategy — building focus, patience and problem-solving with trained coaches.',
  path: '/activities/chess',
  keywords: [
    'chess classes Patna',
    'chess coaching for kids Patna',
    'kids chess academy Patna',
  ],
});

export default function ActivitiesChessLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="activities-chess-schema"
        nodes={[
          webPageSchema({
            path: '/activities/chess',
            name: 'Chess Classes for Kids in Patna',
            description:
              'Chess coaching for children at Phulwari Patna. From first moves to tournament strategy — building focus, patience and problem-solving with trained coaches.',
            breadcrumb: BREADCRUMB,
          }),
          breadcrumbSchema('/activities/chess', BREADCRUMB),
          courseSchema({
            name: 'Kids Chess Coaching',
            description:
              'Chess coaching for children in Patna, from the first move through to tournament-level strategy.',
            path: '/activities/chess',
          }),
        ]}
      />
      {children}
    </>
  );
}
