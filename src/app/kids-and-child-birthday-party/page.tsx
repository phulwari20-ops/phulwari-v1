import { redirect } from 'next/navigation'

// SEO: Kids Birthday Party Venue in Patna - redirect to main birthdays landing
export const metadata = {
  title: 'Kids Birthday Party Venue in Patna | Phulwari Activity Centre',
  description: 'Host stress-free 1st to 5th birthday celebrations at Phulwari Activity Centre in Patna. Safe soft-play zone, custom themes, and full party planning. Book today!',
  alternates: {
    canonical: 'https://phulwari.co.in/kids-and-child-birthday-party',
  },
  openGraph: {
    title: 'Kids Birthday Party Venue in Patna | Phulwari Activity Centre',
    description: 'Host stress-free 1st to 5th birthday celebrations at Phulwari Activity Centre in Patna. Safe soft-play zone, custom themes, and full party planning. Book today!',
    url: 'https://phulwari.co.in/kids-and-child-birthday-party',
    siteName: 'Phulwari Activity Centre',
    images: [
      {
        url: 'https://phulwari.co.in/Logo-png.png',
        width: 800,
        height: 600,
        alt: 'Phulwari Kids Birthday Party Venue Patna',
      },
    ],
    type: 'website',
  },
}

// This is a clean SEO URL that serves the same content as /birthdays
// We export the same page component instead of redirecting to preserve the URL
export { default } from '../birthdays/page'
