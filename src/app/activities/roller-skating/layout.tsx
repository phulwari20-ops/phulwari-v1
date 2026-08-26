import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, courseSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Activities', path: '/activities' },
  { name: 'Roller Skating', path: '/activities/roller-skating' },
];

export const metadata = buildMetadata({
  title: 'Roller Skating Classes for Kids in Patna',
  description:
    'Roller skating coaching for children at Phulwari Patna. Beginner to advanced levels with full safety gear, trained coaches and a smooth, supervised skating area.',
  path: '/activities/roller-skating',
  keywords: [
    'roller skating classes Patna',
    'skating coaching for kids Patna',
    'kids skating academy Patna',
  ],
});

export default function ActivitiesRollerSkatingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="activities-roller-skating-schema"
        nodes={[
    webPageSchema({
      path: '/activities/roller-skating',
      name: 'Roller Skating Classes for Kids in Patna',
      description:
        'Roller skating coaching for children at Phulwari Patna. Beginner to advanced levels with full safety gear, trained coaches and a smooth, supervised skating area.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/activities/roller-skating', BREADCRUMB),
    courseSchema({
      name: 'Kids Roller Skating',
      description:
        'Roller skating coaching for children in Patna, from first steps on wheels through to advanced technique.',
      path: '/activities/roller-skating',
    }),
        ]}
      />
      {children}
    </>
  );
}
