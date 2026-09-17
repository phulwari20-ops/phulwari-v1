'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Ribbon,
  Star,
  PartyPopper,
  Flower2,
  Medal,
  Drama,
  Heart,
  Shield,
  Trophy,
  Palette,
  Leaf,
  Smile,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { ActivityPageData, DEFAULT_ACTIVITIES } from '@/lib/activitiesFallback';
import { resolveLucideIcon } from '@/lib/icons';
import DynamicBanners from '@/components/DynamicBanners';

const filterIcons: Record<string, React.ElementType> = {
  All: Sparkles,
  'Mother & Toddler': Heart,
  'Arts & Creative': Palette,
  'Sports & Martial Arts': Medal,
  'Wellness & Fitness': Leaf,
  'Early Play & Learning': Smile,
};

const floatingIcons = [
  { icon: Sparkles,   color: '#FF4D8D', size: 22 },
  { icon: Ribbon,     color: '#8B5CF6', size: 18 },
  { icon: Star,       color: '#E8A621', size: 20 },
  { icon: PartyPopper,color: '#3D8BFF', size: 22 },
  { icon: Flower2,    color: '#34B36B', size: 18 },
  { icon: Medal,      color: '#FF8A3D', size: 20 },
  { icon: Drama,      color: '#FF4D8D', size: 18 },
  { icon: Heart,      color: '#8B5CF6', size: 20 },
];

const stats = [
  { num: '13+', label: 'Dynamic Programs', color: '#FF4D8D', icon: Sparkles },
  { num: '1.5+', label: 'Age Start (yrs)', color: '#3D8BFF', icon: Star },
  { num: '100%', label: 'Safe & Verified',  color: '#34B36B', icon: Shield },
  { num: '5★',   label: 'Expert Trainers', color: '#E8A621', icon: Trophy },
];

const SEO_PATH = '/activities';
const SEO_BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Activities', path: '/activities' },
];

function getCategoryForActivity(slug: string, badge?: string): string {
  const s = `${slug || ''} ${badge || ''}`.toLowerCase();
  if (s.includes('mother') || s.includes('toddler')) return 'Mother & Toddler';
  if (s.includes('music') || s.includes('dance') || s.includes('art') || s.includes('craft')) return 'Arts & Creative';
  if (s.includes('gymnastics') || s.includes('mma') || s.includes('skating') || s.includes('karate') || s.includes('cricket') || s.includes('chess') || s.includes('sports')) return 'Sports & Martial Arts';
  if (s.includes('yoga') || s.includes('wellness') || s.includes('fitness')) return 'Wellness & Fitness';
  return 'Early Play & Learning';
}

export default function Activities({ headingLevel = 'h1' }: { headingLevel?: 'h1' | 'h2' } = {}) {
  const Heading = headingLevel;
  const isStandalone = headingLevel === 'h1';
  const [activeFilter, setActiveFilter] = useState('All');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activitiesList, setActivitiesList] = useState<ActivityPageData[]>(DEFAULT_ACTIVITIES);

  useEffect(() => {
    async function loadActivities() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('activity_pages')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (!error && data && data.length > 0) {
          setActivitiesList(data as ActivityPageData[]);
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
      }
    }
    loadActivities();
  }, []);

  const dynamicFilters = React.useMemo(() => {
    const cats = new Set<string>();
    activitiesList.forEach(a => {
      cats.add(getCategoryForActivity(a.slug, a.badge_text));
    });
    return ['All', ...Array.from(cats)];
  }, [activitiesList]);

  const filtered = activeFilter === 'All'
    ? activitiesList
    : activitiesList.filter(a => getCategoryForActivity(a.slug, a.badge_text) === activeFilter);

  return (
    <>
      {isStandalone && <DynamicBanners position="Sidebar" className="my-4 max-w-5xl mx-auto px-4" />}
      {isStandalone && (
        <JsonLd
          id="activities-schema"
          nodes={[
            webPageSchema({
              path: SEO_PATH,
              name: 'Kids Activities & Classes in Patna',
              description:
                'Every activity Phulwari runs in Patna — music, dance, gymnastics, MMA, roller skating, karate, art & craft, yoga, cricket, chess, play zone, and mother wellness.',
              type: 'CollectionPage',
              breadcrumb: SEO_BREADCRUMB,
            }),
            breadcrumbSchema(SEO_PATH, SEO_BREADCRUMB),
          ]}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');

        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          50%       { transform: translateY(-18px) rotate(12deg); opacity: 0.9; }
        }
        @keyframes popIn {
          0%   { transform: scale(0.92) translateY(10px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .act-float, .act-card { animation: none !important; }
        }

        .act-page { width: 100%; background-color: #ffffff; }

        .act-hero {
          position: relative;
          background-color: #FFF7EC;
          padding: 4rem 1.25rem 3.5rem;
          text-align: center;
          overflow: hidden;
        }
        .act-float {
          position: absolute;
          pointer-events: none;
          animation: floatUp 4s ease-in-out infinite;
          display: none;
        }
        .act-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0.5rem 1.4rem;
          margin-bottom: 1.1rem;
          background-color: #FFE6EF;
          border-radius: 9999px;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: #FF4D8D;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .act-hero-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 2.5rem;
          color: #3F3A52;
          line-height: 1.15;
          margin-bottom: 1rem;
        }
        .act-hero-title span { color: #FF4D8D; }
        .act-hero-sub {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 1.05rem;
          color: #6B6480;
          max-width: 42rem;
          margin: 0 auto 2rem;
          line-height: 1.7;
        }

        .act-stats { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
        .act-stat {
          background: #ffffff;
          border-radius: 16px;
          padding: 0.75rem 1.5rem;
          box-shadow: 0 4px 14px rgba(0,0,0,0.06);
          text-align: center;
          min-width: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .act-stat-icon {
          width: 32px; height: 32px;
          border-radius: 9999px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 2px;
        }
        .act-stat-num {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 1.4rem;
          line-height: 1;
        }
        .act-stat-label {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 0.72rem;
          color: #6B6480;
        }

        .act-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.6rem;
          padding: 2.5rem 1.25rem 0;
        }
        .act-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0.55rem 1.25rem;
          border-radius: 9999px;
          border: 2px solid transparent;
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.18s ease;
          background-color: #FFF7EC;
          color: #6B6480;
        }
        .act-filter-btn:hover { transform: translateY(-2px); background-color: #FFE6EF; color: #FF4D8D; }
        .act-filter-btn.active {
          background-color: #FF4D8D;
          color: #ffffff;
          border-color: #FF4D8D;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(255,77,141,0.3);
        }

        .act-body { padding: 2rem 1.25rem 5rem; }
        .act-grid {
          max-width: 76rem;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .act-card {
          background-color: #FFF7EC;
          border-radius: 24px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          animation: popIn 0.35s ease both;
          border: 2px solid transparent;
        }
        .act-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.08);
        }
        .act-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .act-card-left { display: flex; align-items: center; gap: 8px; }
        .act-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 9999px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .act-category-tag {
          font-family: 'Quicksand', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: 8px;
          background: rgba(0,0,0,0.06);
          color: #6B6480;
        }
        .act-age-pill {
          font-family: 'Quicksand', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.85rem;
          border-radius: 9999px;
          white-space: nowrap;
        }

        .act-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          color: #3F3A52;
          margin-bottom: 0.25rem;
        }
        .act-tagline {
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          margin-bottom: 0.6rem;
          line-height: 1.3;
        }
        .act-desc {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 0.92rem;
          line-height: 1.55;
          color: #6B6480;
          margin-bottom: 1rem;
          flex: 1;
        }
        .act-toggle {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          margin-bottom: 0.75rem;
        }
        .act-benefits {
          list-style: none;
          padding: 0; margin: 0 0 1.2rem;
          display: flex; flex-direction: column; gap: 0.4rem;
        }
        .act-benefit {
          display: flex; align-items: center; gap: 0.5rem;
          font-family: 'Quicksand', sans-serif;
          font-weight: 600; font-size: 0.85rem; color: #3F3A52;
        }
        .act-benefit-dot {
          width: 7px; height: 7px;
          border-radius: 9999px;
          flex-shrink: 0;
        }
        .act-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0.65rem 1.35rem;
          border-radius: 9999px;
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          color: #ffffff;
          text-decoration: none;
          margin-top: auto;
          align-self: flex-start;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .act-cta:hover { transform: translateX(4px); box-shadow: 0 4px 14px rgba(0,0,0,0.15); }

        @media (min-width: 640px) {
          .act-hero-title { font-size: 3rem; }
          .act-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .act-hero-title { font-size: 3.5rem; }
          .act-grid { grid-template-columns: repeat(3, 1fr); }
          .act-float { display: block; }
        }
      `}</style>

      <div className="act-page">
        {/* Hero */}
        <div className="act-hero">
          {floatingIcons.map((item, i) => {
            const FloatIcon = item.icon;
            return (
              <span
                key={i}
                className="act-float"
                style={{
                  top: `${8 + (i % 3) * 28}%`,
                  left: i < 4 ? `${2 + i * 7}%` : `${65 + (i - 4) * 9}%`,
                  animationDelay: `${i * 0.55}s`,
                  animationDuration: `${3.5 + i * 0.4}s`,
                }}
              >
                <FloatIcon
                  style={{ width: item.size, height: item.size, stroke: item.color, strokeWidth: 1.75 }}
                />
              </span>
            );
          })}

          <div className="act-hero-badge">
            <Sparkles style={{ width: 13, height: 13, stroke: '#FF4D8D', strokeWidth: 2.5 }} />
            Dynamic Activities & Programs
          </div>
          <Heading className="act-hero-title">
            Where Kids <span>Learn, Play</span><br />& Grow Every Day
          </Heading>
          <p className="act-hero-sub">
            {activitiesList.length} specialized programs to support every child&apos;s physical, mental,
            emotional and social development — plus dedicated mother wellness at Kidwaipuri, Patna.
          </p>

          <div className="act-stats">
            {stats.map((s, i) => {
              const SIcon = s.icon;
              return (
                <div className="act-stat" key={i}>
                  <div className="act-stat-icon" style={{ backgroundColor: s.color + '20' }}>
                    <SIcon style={{ width: 16, height: 16, stroke: s.color, strokeWidth: 2.25 }} />
                  </div>
                  <div className="act-stat-num" style={{ color: s.color }}>{s.num}</div>
                  <div className="act-stat-label">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="act-filters">
          {dynamicFilters.map(f => {
            const FIcon = filterIcons[f] || Sparkles;
            return (
              <button
                key={f}
                className={`act-filter-btn${activeFilter === f ? ' active' : ''}`}
                onClick={() => { setActiveFilter(f); setExpanded(null); }}
              >
                <FIcon style={{ width: 14, height: 14, strokeWidth: 2.5 }} />
                {f}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="act-body">
          <div className="act-grid">
            {filtered.map((activity, index) => {
              const Icon = resolveLucideIcon(activity.icon);
              const isExpanded = expanded === index;
              const category = getCategoryForActivity(activity.slug, activity.badge_text);
              const ageLabel = activity.programs?.[0]?.age_bracket || 'All Ages';
              const targetHref = activity.slug === 'yoga-classes-patna'
                ? '/yoga-classes-patna'
                : `/activities/${activity.slug}`;

              return (
                <div
                  key={activity.id || index}
                  className="act-card"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    borderColor: isExpanded ? activity.color + '55' : 'transparent',
                  }}
                >
                  <div className="act-card-top">
                    <div className="act-card-left">
                      <div className="act-icon-wrap" style={{ backgroundColor: activity.bg || '#FFF' }}>
                        <Icon style={{ stroke: activity.color, width: 24, height: 24 }} />
                      </div>
                      <span className="act-category-tag">{category}</span>
                    </div>
                    <div className="act-age-pill" style={{ backgroundColor: activity.bg || '#FFE6EF', color: activity.color }}>
                      {ageLabel}
                    </div>
                  </div>

                  <h3 className="act-title">{activity.badge_text || activity.h1}</h3>
                  <p className="act-tagline" style={{ color: activity.color }}>
                    {activity.h1.length > 60 ? activity.h1.slice(0, 57) + '...' : activity.h1}
                  </p>
                  <p className="act-desc">
                    {activity.intro_p1.length > 130
                      ? activity.intro_p1.slice(0, 127) + '...'
                      : activity.intro_p1}
                  </p>

                  {activity.benefits && activity.benefits.length > 0 && (
                    <>
                      <button
                        className="act-toggle"
                        onClick={() => setExpanded(isExpanded ? null : index)}
                        style={{ color: activity.color }}
                      >
                        {isExpanded ? 'Hide benefits' : 'See benefits'}
                        {isExpanded
                          ? <ChevronUp style={{ width: 14, height: 14, strokeWidth: 2.5 }} />
                          : <ChevronDown style={{ width: 14, height: 14, strokeWidth: 2.5 }} />}
                      </button>

                      {isExpanded && (
                        <ul className="act-benefits">
                          {activity.benefits.map((b, bi) => (
                            <li key={bi} className="act-benefit">
                              <span className="act-benefit-dot" style={{ backgroundColor: activity.color }} />
                              {b.title}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}

                  <Link
                    href={targetHref}
                    className="act-cta"
                    style={{ backgroundColor: activity.color }}
                  >
                    <span>Explore Program</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}