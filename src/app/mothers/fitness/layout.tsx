import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, serviceSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'For Mothers', path: '/mothers' },
  { name: 'Fitness Program', path: '/mothers/fitness' },
];

export const metadata = buildMetadata({
  title: 'Mother Fitness & Zumba Program in Patna',
  description:
    'Fitness and zumba batches for mothers at Phulwari Patna. Morning and evening slots, a women-only space, and childcare close at hand while you train.',
  path: '/mothers/fitness',
  keywords: [
    'mother fitness program Patna',
    'zumba for women Patna',
    'womens fitness classes Patna',
  ],
});

export default function MothersFitnessLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="mothers-fitness-schema"
        nodes={[
    webPageSchema({
      path: '/mothers/fitness',
      name: 'Mother Fitness & Zumba Program in Patna',
      description:
        'Fitness and zumba batches for mothers at Phulwari Patna. Morning and evening slots, a women-only space, and childcare close at hand while you train.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/mothers/fitness', BREADCRUMB),
    serviceSchema({
      name: 'Mother Fitness & Zumba Program',
      description:
        'Fitness and zumba batches for mothers in Patna, run in a women-only space with morning and evening slots.',
      path: '/mothers/fitness',
    }),
        ]}
      />
      {children}
    </>
  );
}
