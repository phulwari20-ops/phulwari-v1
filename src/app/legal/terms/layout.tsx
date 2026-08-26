import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Legal', path: '/legal/terms' },
  { name: 'Terms & Conditions', path: '/legal/terms' },
];

export const metadata = buildMetadata({
  title: 'Terms & Conditions',
  description:
    'The terms that apply to enrolment, bookings, payments and use of the Phulwari Mother & Child Activity Centre website and premises in Patna.',
  path: '/legal/terms',
  keywords: [
    'Phulwari terms and conditions',
  ],
});

export default function LegalTermsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="legal-terms-schema"
        nodes={[
    webPageSchema({
      path: '/legal/terms',
      name: 'Terms & Conditions',
      description:
        'The terms that apply to enrolment, bookings, payments and use of the Phulwari Mother & Child Activity Centre website and premises in Patna.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/legal/terms', BREADCRUMB),
        ]}
      />
      {children}
    </>
  );
}
