import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
];

export const metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Visit Phulwari at M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna 800001. Call +91 62073 68839 or message us on WhatsApp to book a visit.',
  path: '/contact',
  keywords: [
    'Phulwari contact',
    'kids activity centre Patna address',
    'Phulwari Patna phone number',
    'activity centre Kidwaipuri Patna',
  ],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="contact-schema"
        nodes={[
    webPageSchema({
      path: '/contact',
      name: 'Contact Us',
      description:
        'Visit Phulwari at M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna 800001. Call +91 62073 68839 or message us on WhatsApp to book a visit.',
      type: 'ContactPage',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/contact', BREADCRUMB),
        ]}
      />
      {children}
    </>
  );
}
