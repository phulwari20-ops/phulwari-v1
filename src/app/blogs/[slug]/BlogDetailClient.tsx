'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar, User, ArrowLeft, Clock, Home, ChevronRight,
  Mail, GraduationCap, Users, Scissors, Brain, Heart, ArrowRight
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// Inline SVG icons for social sharing
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Education': <GraduationCap size={15} />,
  'Parenting': <Users size={15} />,
  'Activities': <Scissors size={15} />,
  'Child Development': <Brain size={15} />,
  'Health': <Heart size={15} />,
};
const ALL_CATEGORIES = ['Education', 'Parenting', 'Activities', 'Child Development', 'Health'];

interface BlogDetailClientProps {
  blog: any;
  allBlogs?: any[];
}

export default function BlogDetailClient({ blog, allBlogs = [] }: BlogDetailClientProps) {
  useEffect(() => {
    if (blog?.id) {
      const supabase = createClient();
      supabase.rpc('increment_blog_views', { blog_id: blog.id }).catch(() => {});
    }
  }, [blog]);

  const relatedBlogs = allBlogs.filter(b => b.id !== blog.id && b.slug !== blog.slug).slice(0, 4);
  const readTime = blog.content ? Math.max(1, Math.ceil(blog.content.split(' ').length / 200)) : 5;
  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://phulwari.co.in/blogs/${blog.slug}`;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(blog.title || '');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Quicksand:wght@500;600;700&display=swap');
        * { box-sizing: border-box; }
        .bd-root { background: #FFF7EC; font-family: 'Quicksand', sans-serif; min-height: 100vh; padding: 40px 16px 60px; }
        .bd-inner { max-width: 1200px; margin: 0 auto; }
        .bd-baloo { font-family: 'Baloo 2', sans-serif; }

        /* Breadcrumb */
        .bd-bread { display: flex; align-items: center; flex-wrap: wrap; gap: 4px; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 28px; }
        .bd-bread a { color: inherit; text-decoration: none; display: flex; align-items: center; gap: 4px; transition: color 0.2s; }
        .bd-bread a:hover { color: #e91e8c; }
        .bd-bread-current { color: #475569; max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* Layout */
        .bd-layout { display: flex; flex-direction: column; gap: 28px; align-items: flex-start; }
        @media (min-width: 960px) { .bd-layout { flex-direction: row; gap: 36px; } }

        /* Article */
        .bd-article { flex: 1; min-width: 0; background: white; border-radius: 24px; overflow: hidden; border: 1px solid #f1f5f9; box-shadow: 0 4px 24px rgba(0,0,0,0.07); }
        .bd-hero { width: 100%; aspect-ratio: 16/9; overflow: hidden; background: #f1f5f9; }
        .bd-hero img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .bd-art-body { padding: 28px 28px 32px; }
        @media (min-width: 640px) { .bd-art-body { padding: 36px 40px 40px; } }
        .bd-cat-tag { display: inline-block; padding: 5px 14px; background: #fce7f3; color: #db2777; font-size: 11px; font-weight: 800; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 14px; }
        .bd-title { font-family: 'Baloo 2', sans-serif; font-size: clamp(22px, 4vw, 32px); font-weight: 900; color: #1e293b; line-height: 1.25; margin: 0 0 16px; }
        .bd-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; padding: 12px 0; margin-bottom: 24px; }
        .bd-meta-item { display: flex; align-items: center; gap: 5px; }
        .bd-meta-icon { color: #f472b6; }
        .bd-content { font-size: 14.5px; color: #4a5568; line-height: 1.85; white-space: pre-line; }
        .bd-content h2 { font-family: 'Baloo 2', sans-serif; font-size: 20px; font-weight: 800; color: #1e293b; margin: 28px 0 10px; }
        .bd-content h3 { font-family: 'Baloo 2', sans-serif; font-size: 17px; font-weight: 700; color: #1e293b; margin: 20px 0 8px; }
        .back-link { display: inline-flex; align-items: center; gap: 6px; color: #e91e8c; font-size: 13px; font-weight: 800; text-decoration: none; margin-top: 28px; border-top: 1px solid #f1f5f9; padding-top: 20px; transition: color 0.2s; }
        .back-link:hover { color: #9d174d; }

        /* Sidebar */
        .bd-sidebar { width: 100%; background: transparent; }
        @media (min-width: 960px) { .bd-sidebar { width: 300px; flex-shrink: 0; position: sticky; top: 88px; } }
        .bd-sidebar-card { background: white; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 2px 16px rgba(0,0,0,0.05); padding: 22px; margin-bottom: 20px; }
        .bd-sidebar-title { font-family: 'Baloo 2', sans-serif; font-size: 15px; font-weight: 800; color: #1e293b; margin: 0 0 16px; }

        /* Share buttons */
        .share-btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .share-btn { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; text-decoration: none; color: white; transition: opacity 0.2s, transform 0.15s; }
        .share-btn:hover { opacity: 0.88; transform: translateY(-2px); }

        /* Categories */
        .cat-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-radius: 12px; background: #f8fafc; margin-bottom: 8px; text-decoration: none; color: #475569; font-size: 13px; font-weight: 700; transition: background 0.2s, color 0.2s; }
        .cat-row:hover { background: #fdf2f8; color: #e91e8c; }
        .cat-row-left { display: flex; align-items: center; gap: 10px; }
        .cat-row-icon { color: #f472b6; }

        /* Related */
        .related-item { display: flex; align-items: flex-start; gap: 12px; text-decoration: none; margin-bottom: 16px; }
        .related-thumb { width: 64px; height: 64px; border-radius: 12px; overflow: hidden; background: #f1f5f9; flex-shrink: 0; }
        .related-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .related-item:hover .related-thumb img { transform: scale(1.08); }
        .related-title { font-size: 12px; font-weight: 800; color: #1e293b; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 4px; transition: color 0.2s; }
        .related-item:hover .related-title { color: #e91e8c; }
        .related-date { font-size: 10px; font-weight: 700; color: #94a3b8; display: flex; align-items: center; gap: 4px; }
      `}</style>

      <div className="bd-root">
        <div className="bd-inner">

          {/* Breadcrumb */}
          <nav className="bd-bread">
            <Link href="/"><Home size={13} /> Home</Link>
            <ChevronRight size={13} />
            <Link href="/blogs">Blogs &amp; Articles</Link>
            <ChevronRight size={13} />
            <span className="bd-bread-current">{blog.title}</span>
          </nav>

          <div className="bd-layout">

            {/* ── ARTICLE ── */}
            <article className="bd-article">
              {blog.featured_image && (
                <div className="bd-hero">
                  <img
                    src={blog.featured_image}
                    alt={blog.title}
                    onError={(e: any) => { e.target.src = '/galary4.webp'; }}
                  />
                </div>
              )}
              <div className="bd-art-body">
                <span className="bd-cat-tag">{blog.category}</span>
                <h1 className="bd-title bd-baloo">{blog.title}</h1>
                <div className="bd-meta">
                  <span className="bd-meta-item"><User size={13} className="bd-meta-icon" /> By {blog.author_name || 'Phulwari Admin'}</span>
                  <span className="bd-meta-item"><Calendar size={13} className="bd-meta-icon" /> {new Date(blog.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="bd-meta-item"><Clock size={13} className="bd-meta-icon" /> {readTime} min read</span>
                </div>
                <div className="bd-content">
                  {blog.content || blog.short_description}
                </div>
                <Link href="/blogs" className="back-link">
                  <ArrowLeft size={15} /> Back to All Articles
                </Link>
              </div>
            </article>

            {/* ── SIDEBAR ── */}
            <aside className="bd-sidebar">

              {/* Share */}
              <div className="bd-sidebar-card">
                <p className="bd-sidebar-title bd-baloo">Share This Article</p>
                <div className="share-btns">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share-btn" style={{ background: '#1877f2' }} aria-label="Facebook"><FacebookIcon /></a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="share-btn" style={{ background: '#1da1f2' }} aria-label="Twitter"><TwitterIcon /></a>
                  <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share-btn" style={{ background: '#25d366' }} aria-label="WhatsApp"><WhatsAppIcon /></a>
                  <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} className="share-btn" style={{ background: '#64748b' }} aria-label="Email"><Mail size={16} /></a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share-btn" style={{ background: '#0a66c2' }} aria-label="LinkedIn"><LinkedinIcon /></a>
                </div>
              </div>

              {/* Categories */}
              <div className="bd-sidebar-card">
                <p className="bd-sidebar-title bd-baloo">Categories</p>
                {ALL_CATEGORIES.map(cat => (
                  <Link key={cat} href={`/blogs`} className="cat-row">
                    <span className="cat-row-left">
                      <span className="cat-row-icon">{CATEGORY_ICONS[cat]}</span>
                      {cat}
                    </span>
                    <ChevronRight size={15} style={{ color: '#cbd5e1' }} />
                  </Link>
                ))}
              </div>

              {/* Related Articles */}
              {relatedBlogs.length > 0 && (
                <div className="bd-sidebar-card">
                  <p className="bd-sidebar-title bd-baloo">Related Articles</p>
                  {relatedBlogs.map(r => (
                    <Link key={r.id || r.slug} href={`/blogs/${r.slug}`} className="related-item">
                      <div className="related-thumb">
                        <img
                          src={r.featured_image || '/galary4.webp'}
                          alt={r.title}
                          onError={(e: any) => { e.target.src = '/galary4.webp'; }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className="related-title">{r.title}</p>
                        <span className="related-date">
                          <Calendar size={10} />
                          {new Date(r.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
