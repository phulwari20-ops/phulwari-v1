import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import BlogDetailClient from './BlogDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const supabase = await createClient();
    const { data: blog } = await supabase
      .from('blogs')
      .select('title, short_description, featured_image')
      .eq('slug', slug)
      .single();

    if (blog) {
      return {
        title: `${blog.title} | Parenting & Kids Development Blogs | Phulwari`,
        description: blog.short_description || 'Insightful parenting guides and child development articles from Phulwari Patna.',
        alternates: { canonical: `https://phulwari.co.in/blogs/${slug}` },
        openGraph: {
          title: blog.title,
          description: blog.short_description,
          url: `https://phulwari.co.in/blogs/${slug}`,
          type: 'article',
          images: blog.featured_image ? [{ url: blog.featured_image }] : []
        }
      };
    }
  } catch (err) {}

  return {
    title: 'Article Not Found | Phulwari Patna',
    description: 'The requested blog article was not found.'
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let blog: any = null;
  let allBlogs: any[] = [];

  try {
    const supabase = await createClient();

    // Fetch the specific blog and all published blogs in parallel
    const [blogRes, allRes] = await Promise.all([
      supabase.from('blogs').select('*').eq('slug', slug).single(),
      supabase
        .from('blogs')
        .select('id, title, slug, short_description, category, author_name, created_at, featured_image')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
    ]);

    if (blogRes.data) blog = blogRes.data;
    if (allRes.data) allBlogs = allRes.data;

  } catch (err) {
    console.error('Failed to load blog:', err);
  }

  // If blog not found in DB — show clear not-found page
  if (!blog) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '80vh', gap: '16px', background: '#FFF7EC', padding: '32px', textAlign: 'center',
        fontFamily: 'Quicksand, sans-serif'
      }}>
        <BookOpen style={{ width: 56, height: 56, color: '#f472b6', opacity: 0.5 }} />
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1e293b', margin: 0 }}>Article Not Found</h2>
        <p style={{ fontSize: 14, color: '#94a3b8', margin: 0 }}>
          This blog post doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/blogs"
          style={{
            padding: '10px 28px', background: '#e91e8c', color: 'white',
            borderRadius: '999px', fontSize: 13, fontWeight: 800, textDecoration: 'none',
            marginTop: 8
          }}
        >
          ← Back to All Blogs
        </Link>
      </div>
    );
  }

  return <BlogDetailClient blog={blog} allBlogs={allBlogs} />;
}
