import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Batch & Gallery', path: '/batch-galary/batch' },
  { name: 'Batch Timings', path: '/batch-galary/batch' },
];

export const metadata = buildMetadata({
  title: 'Batch Timings & Class Schedule',
  description:
    'Current batch timings at Phulwari Patna — Mother & Toddler 10:30–11:30 AM, plus evening activity batches. Find the schedule and age group that fits your child.',
  path: '/batch-galary/batch',
  keywords: [
    'Phulwari batch timings',
    'kids class schedule Patna',
    'activity centre timings Patna',
  ],
});

export default function BatchGalaryBatchLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="batch-galary-batch-schema"
        nodes={[
    webPageSchema({
      path: '/batch-galary/batch',
      name: 'Batch Timings & Class Schedule',
      description:
        'Current batch timings at Phulwari Patna — Mother & Toddler 10:30–11:30 AM, plus evening activity batches. Find the schedule and age group that fits your child.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/batch-galary/batch', BREADCRUMB),
        ]}
      />
      {children}
    </>
  );
}
