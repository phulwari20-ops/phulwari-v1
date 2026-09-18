import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Camps & Events in Patna 2026 | Summer Camp, Winter Camp & Birthday Parties',
  description:
    'Discover exciting kids camps, holiday bootcamps, winter carnivals, and private birthday celebrations at Phulwari Mother & Child Activity Centre in Kidwaipuri, Patna. Safe, enriching, and joyful programs.',
  keywords: [
    'camps in patna',
    'summer camp 2026 patna',
    'winter camp patna',
    'kids birthday party patna',
    'children event centre patna',
    'kids workshops kidwaipuri',
    'phulwari camps'
  ],
  alternates: {
    canonical: 'https://phulwari.co.in/events',
  },
  openGraph: {
    title: 'Camps & Events in Patna 2026 | Phulwari Activity Centre',
    description:
      'Summer camps, winter carnivals, and kids birthday parties in Patna. Register today for unforgettable learning and fun.',
    url: 'https://phulwari.co.in/events',
    siteName: 'Phulwari Mother & Child Activity Centre',
    images: [
      {
        url: 'https://phulwari.co.in/summer.webp',
        width: 1200,
        height: 630,
        alt: 'Phulwari Camps & Events Patna',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
