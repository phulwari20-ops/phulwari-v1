import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Programs for Mothers in Patna',
  description:
    'Programs built around mothers as well as children: fitness and zumba batches, plus a mother & toddler program you and your child do together, in Patna.',
  path: '/mothers',
  keywords: [
    'mother fitness program Patna',
    'zumba classes for women Patna',
    'mother and toddler program Patna',
  ],
});

export default function MothersLayout({ children }: { children: ReactNode }) {
  return (
    <>{children}</>
  );
}
