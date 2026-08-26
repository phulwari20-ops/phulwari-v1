import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Reviews', path: '/testinomals' },
];

export const metadata = buildMetadata({
  title: 'Parent Reviews & Testimonials',
  description:
    'What Patna parents say about Phulwari Mother & Child Activity Centre — reviews of our classes, coaches, safety standards and birthday celebrations.',
  path: '/testinomals',
  keywords: [
    'Phulwari reviews',
    'Phulwari Patna testimonials',
    'kids activity centre reviews Patna',
  ],
});

export default function TestinomalsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="testinomals-schema"
        nodes={[
    webPageSchema({
      path: '/testinomals',
      name: 'Parent Reviews & Testimonials',
      description:
        'What Patna parents say about Phulwari Mother & Child Activity Centre — reviews of our classes, coaches, safety standards and birthday celebrations.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/testinomals', BREADCRUMB),
        ]}
      />
      {children}
    </>
  );
}
