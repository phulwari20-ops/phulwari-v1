import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, courseSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Activities', path: '/activities' },
  { name: 'Art & Craft', path: '/activities/art-craft' },
];

export const metadata = buildMetadata({
  title: 'Kids Art & Craft Classes in Patna',
  description:
    'Art and craft classes for children at Phulwari Patna. Drawing, painting, clay and creative projects that build fine motor skills, focus and self-expression.',
  path: '/activities/art-craft',
  keywords: [
    'kids art classes Patna',
    'children craft classes Patna',
    'drawing classes for kids Patna',
  ],
});

export default function ActivitiesArtCraftLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="activities-art-craft-schema"
        nodes={[
    webPageSchema({
      path: '/activities/art-craft',
      name: 'Kids Art & Craft Classes in Patna',
      description:
        'Art and craft classes for children at Phulwari Patna. Drawing, painting, clay and creative projects that build fine motor skills, focus and self-expression.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/activities/art-craft', BREADCRUMB),
    courseSchema({
      name: 'Kids Art & Craft',
      description:
        'Art and craft classes for children in Patna covering drawing, painting, clay work and creative projects.',
      path: '/activities/art-craft',
    }),
        ]}
      />
      {children}
    </>
  );
}
