import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Kids Activities & Classes in Patna',
  description:
    'Explore every activity at Phulwari Patna — music & dance, gymnastics & MMA, roller skating, karate, art & craft, yoga, cricket and an indoor play zone for children.',
  path: '/activities',
  keywords: [
    'kids activities Patna',
    'children classes Patna',
    'kids activity classes Kidwaipuri',
    'after school activities Patna',
  ],
});

export default function ActivitiesLayout({ children }: { children: ReactNode }) {
  return (
    <>{children}</>
  );
}
