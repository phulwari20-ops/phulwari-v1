import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, serviceSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Activities', path: '/activities' },
  { name: 'Play Zone', path: '/activities/play-zone' },
];

export const metadata = buildMetadata({
  title: 'Indoor Play Zone for Kids in Patna',
  description:
    'Phulwari\'s indoor play zone in Patna — soft-play equipment, safe padded flooring and supervised free play for toddlers and young children, open through the week.',
  path: '/activities/play-zone',
  keywords: [
    'indoor play zone Patna',
    'soft play area Patna',
    'kids play area Kidwaipuri Patna',
    'toddler play zone Patna',
  ],
});

export default function ActivitiesPlayZoneLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="activities-play-zone-schema"
        nodes={[
    webPageSchema({
      path: '/activities/play-zone',
      name: 'Indoor Play Zone for Kids in Patna',
      description:
        'Phulwari\'s indoor play zone in Patna — soft-play equipment, safe padded flooring and supervised free play for toddlers and young children, open through the week.',
      breadcrumb: BREADCRUMB,
    }),
    breadcrumbSchema('/activities/play-zone', BREADCRUMB),
    serviceSchema({
      name: 'Indoor Play Zone',
      description:
        'A supervised indoor soft-play zone for toddlers and young children in Patna.',
      path: '/activities/play-zone',
    }),
        ]}
      />
      {children}
    </>
  );
}
