import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import BlogDetailClient from './BlogDetailClient';
import { buildMetadata, truncateDescription } from '@/lib/seo/metadata';
import { JsonLd } from '@/lib/seo/JsonLd';
import { articleSchema, breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const supabase = await createClient();
    const { data: blog } = await supabase
      .from('blogs')
      .select('title, short_description, featured_image, created_at, updated_at, author_name, category, tags')
      .eq('slug', slug)
      .single();

    if (blog) {
      return buildMetadata({
        title: blog.title,
        description: truncateDescription(
          blog.short_description ||
            'Parenting guidance and child development insight from Phulwari Patna.'
        ),
        path: `/blogs/${slug}`,
        type: 'article',
        image: blog.featured_image ? { url: blog.featured_image, alt: blog.title } : undefined,
        publishedTime: blog.created_at ?? undefined,
        modifiedTime: blog.updated_at ?? blog.created_at ?? undefined,
        authors: blog.author_name ? [blog.author_name] : undefined,
        section: blog.category ?? undefined,
        tags: Array.isArray(blog.tags) ? blog.tags : undefined,
      });
    }
  } catch (err) {
    console.error('Failed to build blog metadata:', err);
  }

  // Unknown slug: keep it out of the index rather than serving a thin page.
  return buildMetadata({
    title: 'Article Not Found',
    description: 'The requested blog article was not found.',
    path: `/blogs/${slug}`,
    noIndex: true,
  });
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

  const path = `/blogs/${slug}`;
  const breadcrumb = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: blog.title, path },
  ];

  return (
    <>
      <JsonLd
        id="blog-post-schema"
        nodes={[
          webPageSchema({
            path,
            name: blog.title,
            description: blog.short_description || '',
            breadcrumb,
            primaryImage: blog.featured_image || undefined,
            datePublished: blog.created_at || undefined,
            dateModified: blog.updated_at || blog.created_at || undefined,
          }),
          breadcrumbSchema(path, breadcrumb),
          articleSchema({
            title: blog.title,
            description: blog.short_description || '',
            path,
            image: blog.featured_image || undefined,
            datePublished: blog.created_at || undefined,
            dateModified: blog.updated_at || blog.created_at || undefined,
            authorName: blog.author_name || undefined,
            section: blog.category || undefined,
            tags: Array.isArray(blog.tags) ? blog.tags : undefined,
          }),
        ]}
      />
      <BlogDetailClient blog={blog} allBlogs={allBlogs} />
    </>
  );
}
