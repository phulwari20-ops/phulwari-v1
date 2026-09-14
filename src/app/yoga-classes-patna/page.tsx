import ActivityDynamicPage, {
  generateMetadata as generateDynamicMetadata,
} from '@/app/activities/[slug]/page';

export const revalidate = 60;

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: 'yoga-classes-patna' }),
  });
}

export default async function YogaClassesPatnaPage() {
  return <ActivityDynamicPage params={Promise.resolve({ slug: 'yoga-classes-patna' })} />;
}
