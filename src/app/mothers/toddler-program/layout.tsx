import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, serviceSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'For Mothers', path: '/mothers' },
  { name: 'Mother & Toddler Program', path: '/mothers/toddler-program' },
];

export const metadata = buildMetadata({
  title: 'Mother & Toddler Program in Patna',
  description:
    'A guided mother & toddler program at Phulwari Patna, Monday to Saturday 10:30–11:30 AM. Play, movement and early learning that you and your child do together.',
  path: '/mothers/toddler-program',
  keywords: [
    'mother and toddler program Patna',
    'toddler classes Patna',
    'mommy and me classes Patna',
    'early years program Patna',
  ],
});

export default function MothersToddlerProgramLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="mothers-toddler-program-schema"
        nodes={[
    webPageSchema({
      path: '/mothers/toddler-program',
      name: 'Mother & Toddler Program in Patna',
      description:
        'A guided mother & toddler program at Phulwari Patna, Monday to Saturday 10:30–11:30 AM. Play, movement and early learning that you and your child do together.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/mothers/toddler-program', BREADCRUMB),
    serviceSchema({
      name: 'Mother & Toddler Program',
      description:
        'A guided program in Patna where mothers and toddlers take part together in play, movement and early learning.',
      path: '/mothers/toddler-program',
    }),
        ]}
      />
      {children}
    </>
  );
}
