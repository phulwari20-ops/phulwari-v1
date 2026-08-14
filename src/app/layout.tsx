import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import Navbar from '@/app/Navbar';
import Footer from '@/app/footer/page';
import './globals.css';
import FloatingButton from './FloatingButtons';
import { ApiLogger } from '@/components/ApiLogger';
import { Poppins, Quicksand, Baloo_2, Lora } from 'next/font/google';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const baloo2 = Baloo_2({
  variable: '--font-baloo-2',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

/* --------------------------------------------------------------------- */
/*  Update these once — they're reused across all the metadata below     */
/* --------------------------------------------------------------------- */
const SITE_URL = 'https://www.phulwari.co.in';
const SITE_NAME = 'Phulwari Mother & Child Activity Centre';
const SITE_DESCRIPTION =
  "Patna's unique mother & child activity centre where children learn, play, grow and explore while mothers stay active, healthy and engaged. Music, dance, gymnastics, MMA, roller skating, art & craft, yoga, cricket and more — plus fitness programs for mothers, summer & winter camps, and birthday party celebrations.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,

  keywords: [
    'mother and child activity centre Patna',
    'kids activity centre Patna',
    'children activities Patna',
    'mother fitness program Patna',
    'mother and toddler program Patna',
    'summer camp Patna',
    'winter camp Patna',
    'birthday party venue Patna',
    'kids dance and music classes Patna',
    'kids gymnastics MMA Patna',
    'roller skating classes Patna',
    'kids yoga cricket Patna',
    'Phulwari Patna',
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  alternates: {
    canonical: '/',
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  verification: {
    google: 'EFluuGoXog-o6hgirGHBoC97OB1zKOcoaMuLeMXte_0',
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.webp',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF4D8D',
};

/* --------------------------------------------------------------------- */
/*  SEO + AEO + GEO Multi-Schema Structured Data (JSON-LD)              */
/* --------------------------------------------------------------------- */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['EducationalOrganization', 'ChildCare', 'Preschool', 'LocalBusiness'],
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: 'Phulwari Patna',
      url: SITE_URL,
      logo: `${SITE_URL}/phulwari_logo.webp`,
      image: `${SITE_URL}/phulwari_logo.webp`,
      description: SITE_DESCRIPTION,
      telephone: '+916207368839',
      email: 'phulwari02@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road',
        addressLocality: 'Patna',
        addressRegion: 'Bihar',
        postalCode: '800001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.612,
        longitude: 85.127,
      },
      hasMap: 'https://maps.app.goo.gl/g7qiU1BqineG2RF56',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:30',
          closes: '11:30',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '18:30',
          closes: '21:00',
        },
      ],
      priceRange: '₹₹',
      sameAs: [
        'https://www.facebook.com/share/1DWjMMRAjT/',
        'https://www.instagram.com/phulwari.motherkids/',
        'https://youtube.com/@phulwari-s1d7o',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What programs are offered at Phulwari Mother & Child Activity Centre Patna?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Phulwari offers Mother & Toddler programs, Phulwari Premium Circle, Phulwari Core activities, Kids Dance & Music, Gymnastics & MMA, Roller Skating, Art & Craft, Yoga & Cricket, Mother Fitness Programs, Birthday Party Celebrations, and Summer/Winter Camps in Patna.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the operating hours and timings at Phulwari Patna?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mother & Toddler Program runs Monday to Saturday from 10:30 AM to 11:30 AM. Phulwari Premium Circle runs Monday to Sunday 5:00 PM onwards, and Phulwari Core runs Wednesday to Sunday 6:30 PM onwards.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is Phulwari Activity Centre located in Patna?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Phulwari is located at M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar 800001.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can parents enroll their children or contact Phulwari?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Parents can call +91 6207368839, email phulwari02@gmail.com, or send a direct message via WhatsApp through the Phulwari website (phulwari.co.in).',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${quicksand.variable} ${baloo2.variable} ${lora.variable} scroll-smooth`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ApiLogger />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-95W6V42HK2" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-95W6V42HK2');
          `}
        </Script>
        <Script
          id="structured-data-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navbar />
        {children}
        <Footer />
        <FloatingButton />
      </body>
    </html>
  );
}