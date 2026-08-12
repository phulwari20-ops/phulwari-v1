import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import BlogsClient from './BlogsClient';

export const metadata: Metadata = {
  title: 'Parenting Guide & Child Development Blogs',
  description: 'Expert parenting guides, baby developmental milestones, active learning advice, gymnastics benefits, and kids wellness articles from Phulwari Patna.',
  alternates: {
    canonical: 'https://phulwari.co.in/blogs',
  },
  openGraph: {
    title: 'Parenting Guide & Child Development Blogs | Phulwari Patna',
    description: 'Expert parenting guides, baby developmental milestones, active learning advice, gymnastics benefits, and kids wellness articles from Phulwari Patna.',
    url: 'https://phulwari.co.in/blogs',
    type: 'website'
  }
};

const defaultBlogs = [
  {
    id: '1',
    title: 'Why Activity-Based Learning is Essential for Toddlers',
    slug: 'essential-toddler-activity-learning',
    short_description: 'Discover the impact of active play and dynamic programs on child brain development.',
    category: 'Education',
    author_name: 'Phulwari Admin',
    created_at: new Date('2026-08-12').toISOString(),
    featured_image: '/galary1.webp'
  },
  {
    id: '2',
    title: 'Positive Parenting: Building Strong Emotional Bonds',
    slug: 'positive-parenting-emotional-bonds',
    short_description: 'Simple everyday strategies to nurture confidence, trust, and emotional well-being in children.',
    category: 'Parenting',
    author_name: 'Phulwari Admin',
    created_at: new Date('2026-08-08').toISOString(),
    featured_image: '/motherhappy.webp'
  },
  {
    id: '3',
    title: 'Creative Activities That Boost Child Development',
    slug: 'creative-activities-child-development',
    short_description: 'Explore fun and creative activities that improve imagination, focus, and fine motor skills.',
    category: 'Activities',
    author_name: 'Phulwari Admin',
    created_at: new Date('2026-08-05').toISOString(),
    featured_image: '/arts.webp'
  },
  {
    id: '4',
    title: 'Understanding Your Child\'s Developmental Milestones',
    slug: 'child-developmental-milestones',
    short_description: 'A guide to what\'s normal at every stage of your child\'s growth from 1 to 6 years.',
    category: 'Child Development',
    author_name: 'Phulwari Admin',
    created_at: new Date('2026-08-01').toISOString(),
    featured_image: '/galary3.webp'
  },
  {
    id: '5',
    title: 'Healthy Eating Habits for Growing Children',
    slug: 'healthy-eating-habits-children',
    short_description: 'Nutritional tips and easy meal ideas to keep your young one energized and focused.',
    category: 'Health',
    author_name: 'Phulwari Admin',
    created_at: new Date('2026-07-28').toISOString(),
    featured_image: '/mothertod.webp'
  },
  {
    id: '6',
    title: 'The Benefits of Yoga & Mindfulness for Kids',
    slug: 'yoga-mindfulness-benefits-kids',
    short_description: 'How introducing yoga early helps children build focus, flexibility, and emotional resilience.',
    category: 'Health',
    author_name: 'Phulwari Admin',
    created_at: new Date('2026-07-22').toISOString(),
    featured_image: '/yoga.webp'
  }
];

export default async function BlogsPage() {
  let blogs: any[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('blogs')
      .select('id, title, slug, short_description, category, author_name, created_at, featured_image, status, views, featured')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (data && data.length > 0) {
      // Merge DB blogs with defaults — show DB first, then fill gaps with defaults that don't overlap
      const dbSlugs = new Set(data.map((b: any) => b.slug));
      const fillDefaults = defaultBlogs.filter(d => !dbSlugs.has(d.slug));
      blogs = [...data, ...fillDefaults];
    } else {
      blogs = defaultBlogs;
    }
  } catch (err) {
    console.error('Failed to load blogs server-side:', err);
    blogs = defaultBlogs;
  }

  return <BlogsClient initialBlogs={blogs} />;
}
