import Hero from '@/app/hero/page';
import Activities from '@/app/activities/page';
import AboutUs from '@/app/about/page';
import Gallery from '@/app/batch-galary/gallery/GalleryClientWrapper';
import Batch from '@/app/batch-galary/batch/page';
import Contact from '@/app/contact/page';
import Testinomals from '@/app/testinomals/page';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { webPageSchema } from '@/lib/seo/schema';
import { SITE_NAME } from '@/lib/seo/site';

export const metadata = buildMetadata({
  title: 'Mother & Child Activity Centre in Patna',
  description:
    'Patna’s mother & child activity centre in Kidwaipuri — gymnastics, skating, music, dance ' +
    'and art for kids, plus fitness and toddler programs for mothers.',
  path: '/',
  keywords: [
    'mother and child activity centre Patna',
    'kids activity centre Patna',
    'children activities Patna',
    'kids classes Kidwaipuri Patna',
    'Phulwari Patna',
  ],
});

/**
 * The homepage composes each section component. Those components are also
 * standalone routes where their heading is the page <h1>, so here they are
 * demoted to <h2> — the hero supplies the single <h1> for this page.
 */
import DynamicBanners from '@/components/DynamicBanners';

export default function Home() {
  return (
    <>
      <DynamicBanners position="Top Announcement Bar" />
      <DynamicBanners position="Popup Banner" />
      <JsonLd
        id="home-schema"
        nodes={[
          webPageSchema({
            path: '/',
            name: `${SITE_NAME} — Patna`,
            description:
              'Mother & child activity centre in Patna offering kids activity classes, ' +
              'mother fitness programs, camps and birthday party celebrations.',
          }),
        ]}
      />
      <main>
        <DynamicBanners position="Hero Section" className="max-w-6xl mx-auto px-4 pt-4" />
        <Hero />
        <Activities headingLevel="h2" />
        <AboutUs headingLevel="h2" />
        <Gallery headingLevel="h2" />
        <Batch headingLevel="h2" />
        <Testinomals headingLevel="h2" />
        <DynamicBanners position="Pre-Footer" className="max-w-6xl mx-auto px-4 py-6" />
        <Contact headingLevel="h2" />
      </main>
    </>
  );
}
