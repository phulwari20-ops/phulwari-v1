import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'About Our Activity Centre',
  description:
    'Phulwari is Patna\'s mother & child activity centre in Kidwaipuri. Our story, our approach to activity-based learning, and the space we built for families.',
  path: '/about',
  keywords: [
    'about Phulwari Patna',
    'mother and child activity centre Patna',
    'child development centre Patna',
    'Kidwaipuri activity centre',
  ],
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>{children}</>
  );
}
