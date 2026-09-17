import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Winter Events & Kids Carnival in Patna | Phulwari Mother & Child Activity Centre',
  description:
    'Looking for fun winter activities in Patna? Join Phulwari’s winter carnival, art workshops, storytelling, and family events designed to keep kids active and engaged. Register today!',
  path: '/events/winter',
  keywords: [
    'winter events in Patna',
    'kids carnival in Patna',
    'winter camp for kids in Patna',
    'winter activities Patna',
    'kids art and crafts workshops Patna',
    'Phulwari winter events',
  ],
});

export default function EventsWinterLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
