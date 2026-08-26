import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Batch & Gallery', path: '/batch-galary/gallery' },
  { name: 'Gallery', path: '/batch-galary/gallery' },
];

export const metadata = buildMetadata({
  title: 'Photo Gallery',
  description:
    'Photos from classes, camps, celebrations and everyday play at Phulwari Mother & Child Activity Centre in Patna.',
  path: '/batch-galary/gallery',
  keywords: [
    'Phulwari gallery',
    'kids activity centre photos Patna',
    'Phulwari Patna images',
  ],
});

export default function BatchGalaryGalleryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="batch-galary-gallery-schema"
        nodes={[
    webPageSchema({
      path: '/batch-galary/gallery',
      name: 'Photo Gallery',
      description:
        'Photos from classes, camps, celebrations and everyday play at Phulwari Mother & Child Activity Centre in Patna.',
      type: 'CollectionPage',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/batch-galary/gallery', BREADCRUMB),
        ]}
      />
      {children}
    </>
  );
}
