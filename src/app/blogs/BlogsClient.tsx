'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, User, ArrowRight, GraduationCap, Users, Scissors, Brain, Heart } from 'lucide-react';

interface BlogsClientProps {
  initialBlogs: any[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Education': <GraduationCap size={14} />,
  'Parenting': <Users size={14} />,
  'Activities': <Scissors size={14} />,
  'Child Development': <Brain size={14} />,
  'Health': <Heart size={14} />,
};

export default function BlogsClient({ initialBlogs }: BlogsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(initialBlogs.map(b => b.category).filter(Boolean)))];
  const filteredBlogs = selectedCategory === 'All'
    ? initialBlogs
    : initialBlogs.filter(b => b.category === selectedCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800;900&family=Quicksand:wght@500;600;700&display=swap');
        * { box-sizing: border-box; }
        .blog-page-root { background-color: #FFF7EC; font-family: 'Quicksand', sans-serif; min-height: 100vh; padding: 56px 16px; }
        .blog-inner { max-width: 1200px; margin: 0 auto; }
        .blog-heading { font-family: 'Baloo 2', sans-serif; }
        .blog-grid { display: grid; grid-template-columns: 1fr; gap: 28px; margin-top: 40px; }
        @media (min-width: 640px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 960px) { .blog-grid { grid-template-columns: repeat(3, 1fr); } }
        .blog-card { background: #fff; border-radius: 24px; overflow: hidden; border: 1px solid #f1f5f9; box-shadow: 0 4px 24px rgba(0,0,0,0.07); display: flex; flex-direction: column; transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .blog-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(236,72,153,0.12); }
        .blog-card-img-wrap { width: 100%; aspect-ratio: 4/3; overflow: hidden; position: relative; background: #f1f5f9; }
        .blog-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; display: block; }
        .blog-card:hover .blog-card-img { transform: scale(1.06); }
        .blog-card-badge { position: absolute; top: 14px; left: 14px; background: white; color: #e91e8c; font-size: 10px; font-weight: 800; padding: 5px 12px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.08em; box-shadow: 0 2px 8px rgba(0,0,0,0.12); }
        .blog-card-body { padding: 22px 22px 0; flex: 1; }
        .blog-card-meta { display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 10px; }
        .blog-card-meta-item { display: flex; align-items: center; gap: 5px; }
        .blog-card-meta-icon { color: #f472b6; }
        .blog-card-title { font-family: 'Baloo 2', sans-serif; font-size: 18px; font-weight: 800; color: #1e293b; line-height: 1.3; margin: 0 0 10px; transition: color 0.2s; }
        .blog-card:hover .blog-card-title { color: #e91e8c; }
        .blog-card-desc { font-size: 13px; color: #64748b; line-height: 1.7; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin: 0; }
        .blog-card-footer { padding: 14px 22px 18px; border-top: 1px solid #f1f5f9; margin-top: 16px; }
        .blog-card-link { display: flex; align-items: center; justify-content: center; gap: 6px; color: #e91e8c; font-size: 13px; font-weight: 800; text-decoration: none; transition: color 0.2s, gap 0.2s; width: 100%; }
        .blog-card-link:hover { color: #be185d; gap: 10px; }
        .cat-pill { display: inline-flex; align-items: center; gap: 6px; padding: 9px 20px; border-radius: 999px; font-size: 13px; font-weight: 700; border: 1.5px solid #e2e8f0; background: white; color: #475569; cursor: pointer; transition: all 0.2s ease; }
        .cat-pill:hover { background: #fdf2f8; color: #e91e8c; border-color: #fbcfe8; }
        .cat-pill.active { background: #e91e8c; color: white; border-color: #e91e8c; box-shadow: 0 4px 14px rgba(233,30,140,0.3); transform: scale(1.04); }
        .divider-line { height: 1px; width: 56px; background: #f9a8d4; display: inline-block; vertical-align: middle; }
        .divider-icon { display: inline-block; vertical-align: middle; color: #f472b6; margin: 0 8px; font-size: 18px; }
        .cats-wrap { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 4px; }
        .hub-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; background: #fce7f3; color: #db2777; border-radius: 999px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
        .blog-header { text-align: center; margin-bottom: 36px; }
        .blog-main-title { font-family: 'Baloo 2', sans-serif; font-size: clamp(32px, 6vw, 52px); font-weight: 900; color: #1e293b; margin: 0 0 12px; line-height: 1.1; }
        .blog-subtitle { font-size: 15px; color: #64748b; font-weight: 600; margin: 12px 0 0; line-height: 1.6; max-width: 520px; margin-left: auto; margin-right: auto; }
        .empty-state { text-align: center; padding: 80px 0; color: #94a3b8; }
      `}</style>

      <div className="blog-page-root">
        <div className="blog-inner">

          {/* Header */}
          <div className="blog-header">
            <div className="hub-badge">
              <BookOpen size={13} />
              Our Knowledge Hub
            </div>
            <h1 className="blog-main-title">Blogs &amp; Articles</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '8px 0' }}>
              <span className="divider-line" />
              <span className="divider-icon">✿</span>
              <span className="divider-line" />
            </div>
            <p className="blog-subtitle">
              Insightful articles, guides, and developmental tips compiled by experts at Phulwari.
            </p>
          </div>

          {/* Category Pills */}
          <div className="cats-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cat-pill${selectedCategory === cat ? ' active' : ''}`}
              >
                {CATEGORY_ICONS[cat] || null}
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="blog-grid">
            {filteredBlogs.map(blog => (
              <article key={blog.id || blog.slug} className="blog-card">
                {/* Image */}
                <div className="blog-card-img-wrap">
                  <img
                    src={blog.featured_image || '/galary4.webp'}
                    alt={blog.title}
                    className="blog-card-img"
                    onError={(e: any) => { e.target.src = '/galary4.webp'; }}
                  />
                  <span className="blog-card-badge">{blog.category}</span>
                </div>

                {/* Body */}
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span className="blog-card-meta-item">
                      <User size={12} className="blog-card-meta-icon" />
                      {blog.author_name || 'Phulwari Admin'}
                    </span>
                    <span className="blog-card-meta-item">
                      <Calendar size={12} className="blog-card-meta-icon" />
                      {new Date(blog.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="blog-card-title">{blog.title}</h2>
                  <p className="blog-card-desc">{blog.short_description}</p>
                </div>

                {/* Footer CTA */}
                <div className="blog-card-footer">
                  <Link href={`/blogs/${blog.slug}`} className="blog-card-link">
                    Read Full Article <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="empty-state">
              <BookOpen style={{ width: 48, height: 48, margin: '0 auto 12px', opacity: 0.3 }} />
              <p style={{ fontSize: 14, fontWeight: 700 }}>No articles found in this category.</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
