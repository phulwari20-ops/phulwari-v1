import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';
import BlogsClient from './BlogsClient';

export const metadata = buildMetadata({
  title: 'Parenting Guides & Child Development Blog',
  description:
    'Parenting guides, developmental milestones, active-learning advice and kids wellness ' +
    'articles from the team at Phulwari Mother & Child Activity Centre, Patna.',
  path: '/blogs',
  keywords: [
    'parenting blog Patna',
    'child development articles',
    'toddler milestones guide',
    'kids activity tips',
  ],
});

export default async function BlogsPage() {
  let blogs: any[] = [];
  
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, slug, short_description, category, author_name, created_at, featured_image, status, views, featured')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      blogs = data;
    }
  } catch (err) {
    console.error('Failed to load blogs:', err);
  }

  const breadcrumb = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
  ];

  return (
    <>
      <JsonLd
        id="blogs-schema"
        nodes={[
          webPageSchema({
            path: '/blogs',
            name: 'Parenting Guides & Child Development Blog',
            description:
              'Parenting guides, developmental milestones and kids wellness articles from Phulwari Patna.',
            type: 'CollectionPage',
            breadcrumb,
          }),
          breadcrumbSchema('/blogs', breadcrumb),
        ]}
      />
      <BlogsClient initialBlogs={blogs} />
    </>
  );
}
export const dynamic = 'force-dynamic';
