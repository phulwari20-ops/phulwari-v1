import ActivityDynamicPage, {
  generateMetadata as generateDynamicMetadata,
} from '@/app/activities/[slug]/page';

export const revalidate = 60;

export async function generateMetadata() {
  const dynamicMeta = await generateDynamicMetadata({
    params: Promise.resolve({ slug: 'yoga-classes-patna' }),
  });

  const canonicalUrl = 'https://www.phulwari.co.in/yoga-classes-patna';

  return {
    ...dynamicMeta,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      ...dynamicMeta.openGraph,
      url: canonicalUrl,
    },
  };
}

export default async function YogaClassesPatnaPage() {
  return <ActivityDynamicPage params={Promise.resolve({ slug: 'yoga-classes-patna' })} />;
}
