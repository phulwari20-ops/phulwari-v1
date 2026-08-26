import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Camps & Events', path: '/events/birthday' },
  { name: 'Birthday Celebrations', path: '/events/birthday' },
];

export const metadata = buildMetadata({
  title: 'Birthday Party Celebrations for Kids in Patna',
  description:
    'Host your child\'s birthday at Phulwari Patna: themed decoration, a safe soft-play zone, games, and full party planning so you can enjoy the day.',
  path: '/events/birthday',
  keywords: [
    'kids birthday party Patna',
    'birthday venue for children Patna',
    'birthday party planner Patna',
  ],
});

export default function EventsBirthdayLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="events-birthday-schema"
        nodes={[
    webPageSchema({
      path: '/events/birthday',
      name: 'Birthday Party Celebrations for Kids in Patna',
      description:
        'Host your child\'s birthday at Phulwari Patna: themed decoration, a safe soft-play zone, games, and full party planning so you can enjoy the day.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/events/birthday', BREADCRUMB),
        ]}
      />
      {children}
    </>
  );
}
