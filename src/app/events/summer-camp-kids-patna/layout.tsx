import type { ReactNode } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, serviceSchema, webPageSchema } from '@/lib/seo/schema';

const BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Camps & Events', path: '/events/summer-camp-kids-patna' },
  { name: 'Summer Camp Patna 2026', path: '/events/summer-camp-kids-patna' },
];

export const metadata = buildMetadata({
  title: 'Best Summer Camp for Kids in Patna (2026) | Phulwari Activity Centre',
  description:
    'Join Patna\'s premier children\'s summer camp 2026 at Phulwari, Kidwaipuri. Fun & fitness: Roller Skating, Gymnastics, Dance, Art & Craft, Martial Arts & Chess for ages 3-14.',
  path: '/events/summer-camp-kids-patna',
  keywords: [
    'summer camp patna',
    'kids summer camp patna',
    'best summer camp in patna',
    'summer camp for children patna 2026',
    'skating classes patna',
    'gymnastics kids patna',
    'dance classes kidwaipuri patna',
    'activity centre boring road patna',
  ],
});

export default function SummerCampKidsPatnaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd
        id="summer-camp-patna-schema"
        nodes={[
          webPageSchema({
            path: '/events/summer-camp-kids-patna',
            name: 'Best Summer Camp for Kids in Patna (2026) | Phulwari',
            description:
              'Join Patna\'s premier children\'s summer camp 2026 at Phulwari, Kidwaipuri. Fun & fitness: Roller Skating, Gymnastics, Dance, Art & Craft, Martial Arts & Chess for ages 3-14.',
            breadcrumb: BREADCRUMB,
          }),
          breadcrumbSchema('/events/summer-camp-kids-patna', BREADCRUMB),
          serviceSchema({
            name: 'Phulwari Kids Summer Camp Patna 2026',
            description:
              'High-energy, creative and structured summer camp for children aged 3 to 14 years featuring skating, gymnastics, arts, music, dance, and mind games in Patna.',
            path: '/events/summer-camp-kids-patna',
          }),
          {
            '@type': 'Event',
            '@id': 'https://phulwari.co.in/events/summer-camp-kids-patna#event',
            name: 'Phulwari Kids Summer Camp Patna 2026',
            description:
              'Summer camp with 10+ activity modules including Roller Skating, Gymnastics, Dance, Art & Craft, Music and Chess for kids aged 3-14 in Kidwaipuri, Patna.',
            startDate: '2026-05-01T09:00:00+05:30',
            endDate: '2026-06-30T19:00:00+05:30',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: 'Phulwari Mother & Child Activity Centre',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road',
                addressLocality: 'Patna',
                addressRegion: 'Bihar',
                postalCode: '800001',
                addressCountry: 'IN',
              },
            },
            organizer: {
              '@type': 'Organization',
              name: 'Phulwari Mother & Child Activity Centre',
              url: 'https://phulwari.co.in',
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
              validFrom: '2026-03-01',
              url: 'https://phulwari.co.in/events/summer-camp-kids-patna',
            },
          },
        ]}
      />
      {children}
    </>
  );
}
