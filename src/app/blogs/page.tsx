import React from 'react';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import BlogsClient from './BlogsClient';

export const metadata: Metadata = {
  title: 'Parenting Guide & Child Development Blogs | Phulwari Patna',
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

  return <BlogsClient initialBlogs={blogs} />;
}
