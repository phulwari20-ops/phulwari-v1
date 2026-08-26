import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import {
  GA_MEASUREMENT_ID,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  VERIFICATION,
} from '@/lib/seo/site';
import { JsonLd } from '@/lib/seo/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/seo/schema';
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} | Patna`,
    // Kept short on purpose: the full centre name is 45 characters, which pushed
    // almost every page title past the ~65 characters Google renders.
    template: '%s | Phulwari Patna',
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
  applicationName: SITE_NAME,
  category: 'Children Activity Centre',
  referrer: 'origin-when-cross-origin',

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
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },

  verification: {
    google: VERIFICATION.google,
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${poppins.variable} ${quicksand.variable} ${baloo2.variable} ${lora.variable} scroll-smooth`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ApiLogger />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {/* Site-wide graph, emitted once. Pages add their own nodes and link
            back to these by @id, so nothing is ever duplicated. */}
        <JsonLd id="site-schema" nodes={[organizationSchema(), websiteSchema()]} />
        <Navbar />
        {children}
        <Footer />
        <FloatingButton />
      </body>
    </html>
  );
}