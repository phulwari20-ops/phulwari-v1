import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Legal', path: '/legal/privacy' },
  { name: 'Privacy Policy', path: '/legal/privacy' },
];

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How Phulwari Mother & Child Activity Centre collects, uses and protects the personal information you share with us through this website and our enquiry forms.',
  path: '/legal/privacy',
  keywords: [
    'Phulwari privacy policy',
  ],
});

export default function LegalPrivacyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="legal-privacy-schema"
        nodes={[
    webPageSchema({
      path: '/legal/privacy',
      name: 'Privacy Policy',
      description:
        'How Phulwari Mother & Child Activity Centre collects, uses and protects the personal information you share with us through this website and our enquiry forms.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/legal/privacy', BREADCRUMB),
        ]}
      />
      {children}
    </>
  );
}
