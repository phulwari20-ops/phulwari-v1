'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';
import {
  Music,
  PersonStanding,
  Dumbbell,
  Shield,
  Zap,
  Palette,
  Trophy,
  Leaf,
  Smile,
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Ribbon,
  Rainbow,
  PartyPopper,
  Flower2,
  Medal,
  Drama,
} from 'lucide-react';

const activities = [
  {
    icon: Music,
    title: 'Music Classes',
    tagline: 'Discover the Joy of Music',
    description: 'Music helps children express themselves, improve concentration and develop creativity.',
    benefits: ['Improves Memory & Focus', 'Enhances Creativity', 'Develops Listening Skills', 'Boosts Self-Confidence'],
    ageLabel: '3+ Years',
    category: 'Arts',
    href: '/activities/music-dance',
    color: '#FF4D8D',
    bg: '#FFE6EF',
  },
  {
    icon: PersonStanding,
    title: 'Dance Classes',
    tagline: 'Move, Learn & Shine',
    description: 'Our dance classes encourage self-expression, confidence and physical fitness through fun and energetic routines.',
    benefits: ['Improves Coordination', 'Builds Confidence', 'Enhances Flexibility', 'Encourages Creativity'],
    ageLabel: '3+ Years',
    category: 'Arts',
    href: '/activities/music-dance',
    color: '#8B5CF6',
    bg: '#EFE7FE',
  },
  {
    icon: Star,
    title: 'Gymnastics',
    tagline: 'Strength, Balance & Flexibility',
    description: 'Gymnastics helps children improve physical fitness while developing discipline and body control.',
    benefits: ['Better Balance', 'Improved Strength', 'Enhanced Flexibility', 'Increased Confidence'],
    ageLabel: '3+ Years',
    category: 'Sports',
    href: '/activities/gymnastics-mma',
    color: '#E8A621',
    bg: '#FFF3D9',
  },
  {
    icon: Shield,
    title: 'MMA Training',
    tagline: 'Learn Self-Defense & Discipline',
    description: 'MMA training teaches children discipline, focus and self-defense techniques in a safe environment.',
    benefits: ['Self-Defense Skills', 'Physical Fitness', 'Mental Discipline', 'Improved Concentration'],
    ageLabel: '5+ Years',
    category: 'Sports',
    href: '/activities/gymnastics-mma',
    color: '#FF8A3D',
    bg: '#FFEADB',
  },
  {
    icon: Zap,
    title: 'Roller Skating & Karate',
    tagline: 'Fun on Wheels & Martial Arts',
    description: 'Develop balance on wheels and physical strength, self-defence skills, and discipline with our dual skating and Karate programs.',
    benefits: ['Improves Balance', 'Enhances Coordination', 'Builds Confidence', 'Encourages Active Lifestyle'],
    ageLabel: '4+ Years',
    category: 'Sports',
    href: '/activities/roller-skating',
    color: '#3D8BFF',
    bg: '#E5EFFF',
  },
  {
    icon: Palette,
    title: 'Art & Craft',
    tagline: 'Unleash Creativity',
    description: 'Creative activities help children explore their imagination and express their ideas freely.',
    benefits: ['Boosts Creativity', 'Improves Fine Motor Skills', 'Enhances Focus', 'Encourages Self-Expression'],
    ageLabel: '3+ Years',
    category: 'Arts',
    href: '/activities/art-craft',
    color: '#FF4D8D',
    bg: '#FFE6EF',
  },
  {
    icon: Trophy,
    title: 'Cricket Training',
    tagline: 'Learn Teamwork Through Sports',
    description: 'Cricket helps children develop sportsmanship, discipline and teamwork while staying physically active.',
    benefits: ['Team Building Skills', 'Physical Fitness', 'Better Coordination', 'Improved Discipline'],
    ageLabel: '5+ Years',
    category: 'Sports',
    href: '/activities/yoga-cricket',
    color: '#34B36B',
    bg: '#E3F7EA',
  },
  {
    icon: Leaf,
    title: 'Yoga',
    tagline: 'Healthy Body, Calm Mind',
    description: 'Yoga helps children develop flexibility, concentration and emotional balance.',
    benefits: ['Better Focus', 'Improved Flexibility', 'Stress Management', 'Overall Wellness'],
    ageLabel: '4+ Years',
    category: 'Wellness',
    href: '/activities/yoga-cricket',
    color: '#8B5CF6',
    bg: '#EFE7FE',
  },
  {
    icon: Smile,
    title: 'Play Zone',
    tagline: 'Learn Through Play',
    description: 'A safe and exciting indoor play area where children can explore, socialize and have fun.',
    benefits: ['Social Development', 'Physical Activity', 'Creative Play', 'Confidence Building'],
    ageLabel: '9+ Months',
    category: 'Play',
    href: '/activities/play-zone',
    color: '#E8A621',
    bg: '#FFF3D9',
  },
  {
    icon: Heart,
    title: 'Mother Toddler Program',
    tagline: 'Bond, Learn & Grow Together',
    description: 'Specially designed activities for mothers and toddlers that promote learning, interaction and emotional bonding.',
    benefits: ['Parent-Child Bonding', 'Early Learning Development', 'Social Interaction', 'Fun Learning Experiences'],
    ageLabel: '1.5 – 4 Years',
    category: 'Play',
    href: '/activities/play-zone',
    color: '#FF4D8D',
    bg: '#FFE6EF',
  },
  {
    icon: Shield,
    title: 'Karate Training',
    tagline: 'Build Strength, Discipline & Confidence',
    description: 'Karate helps children develop self-defence skills, discipline, focus and confidence.',
    benefits: ['Self-Defence Skills', 'Strength & Fitness', 'Focus & Discipline', 'Confidence & Coordination', 'Respect & Teamwork'],
    ageLabel: 'All Ages',
    category: 'Sports',
    href: '/activities/karate',
    color: '#E8A621',
    bg: '#FFF3D9',
  },
  {
    icon: Dumbbell,
    title: 'Fitness for Mothers',
    tagline: 'Stay Active, Healthy & Energetic',
    description: 'A dedicated fitness program designed specifically for mothers to focus on their health and well-being.',
    benefits: ['Improved Fitness', 'Better Energy Levels', 'Stress Relief', 'Healthy Lifestyle', 'Community Engagement'],
    ageLabel: 'All Mothers',
    category: 'Wellness',
    href: '/activities/play-zone',
    color: '#34B36B',
    bg: '#E3F7EA',
  },
];

const filters = ['All', 'Arts', 'Sports', 'Wellness', 'Play'];

const filterIcons: Record<string, React.ElementType> = {
  All: Sparkles,
  Arts: Palette,
  Sports: Medal,
  Wellness: Leaf,
  Play: Smile,
};

const floatingIcons: { icon: React.ElementType; color: string; size: number }[] = [
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
  { num: '11+', label: 'Activities',      color: '#FF4D8D', icon: Sparkles },
  { num: '1.5+', label: 'Age Start (yrs)', color: '#3D8BFF', icon: Star },
  { num: '100%', label: 'Safe & Fun',      color: '#34B36B', icon: Shield },
  { num: '5★',   label: 'Expert Trainers', color: '#E8A621', icon: Trophy },
];

/**
 * These sections are used two ways: as their own route (where the section
 * heading is the page's single <h1>) and composed into the homepage (where the
 * hero already owns the <h1>, so they must step down to <h2>).
 * `headingLevel` lets the homepage demote them and keeps exactly one <h1> per
 * page, which is what both the accessibility tree and Google expect.
 */

const SEO_PATH = '/activities';
const SEO_BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'Activities', path: '/activities' },
];

export default function Activities({ headingLevel = 'h1' }: { headingLevel?: 'h1' | 'h2' } = {}) {
  const Heading = headingLevel;
  // Composed into the homepage as an <h2> section; only the standalone
  // route should emit this page's structured data.
  const isStandalone = headingLevel === 'h1';
  const [activeFilter, setActiveFilter] = useState('All');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = activeFilter === 'All'
    ? activities
    : activities.filter(a => a.category === activeFilter);

  return (
    <>
      {isStandalone && <JsonLd
        id="activities-schema"
        nodes={[
          webPageSchema({
            path: SEO_PATH,
            name: 'Kids Activities & Classes in Patna',
            description:
              'Every activity Phulwari runs in Patna — music, dance, gymnastics, MMA, roller skating, karate, art & craft, yoga, cricket and an indoor play zone.',
            type: 'CollectionPage',
            breadcrumb: SEO_BREADCRUMB,
          }),
          breadcrumbSchema(SEO_PATH, SEO_BREADCRUMB),
        ]}
      />}
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');

        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          50%       { transform: translateY(-18px) rotate(12deg); opacity: 0.9; }
        }
        @keyframes popIn {
          0%   { transform: scale(0.88) translateY(10px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .act-float, .act-card { animation: none !important; }
        }

        .act-page { width: 100%; background-color: #ffffff; }

        /* Hero */
        .act-hero {
          position: relative;
          background-color: #FFF7EC;
          padding: 4.5rem 1.25rem 5.5rem;
          text-align: center;
          overflow: hidden;
        }
        .act-hero::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: 0; height: 36px;
          background: radial-gradient(circle at 18px 0, transparent 19px, #ffffff 20px);
          background-size: 36px 36px;
          background-repeat: repeat-x;
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
          font-size: 0.72rem;
          font-weight: 700;
          color: #FF4D8D;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transform: rotate(-1.5deg);
        }
        .act-hero-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 2.5rem;
          color: #3F3A52;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .act-hero-title span { color: #FF4D8D; }
        .act-hero-sub {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 1.05rem;
          color: #6B6480;
          max-width: 40rem;
          margin: 0 auto 2rem;
          line-height: 1.7;
        }

        /* Stats */
        .act-stats { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
        .act-stat {
          background: #ffffff;
          border-radius: 16px;
          padding: 0.75rem 1.5rem;
          box-shadow: 0 4px 14px rgba(0,0,0,0.07);
          text-align: center;
          min-width: 90px;
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

        /* Filters */
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
        .act-filter-btn.active svg { stroke: #ffffff; }

        /* Body + Grid */
        .act-body { padding: 2rem 1.25rem 5rem; }
        .act-grid {
          max-width: 72rem;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        /* Card */
        .act-card {
          background-color: #FFF7EC;
          border-radius: 24px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          animation: popIn 0.35s ease both;
          border: 2px solid transparent;
        }
        .act-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.09);
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
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.2rem 0.65rem;
          border-radius: 6px;
          background: rgba(0,0,0,0.06);
          color: #6B6480;
        }
        .act-age-pill {
          font-family: 'Quicksand', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.3rem 0.85rem;
          border-radius: 9999px;
          white-space: nowrap;
        }

        .act-card-icon-large {
          width: 40px; height: 40px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 0.75rem;
        }

        .act-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #3F3A52;
          margin-bottom: 0.2rem;
        }
        .act-tagline {
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          margin-bottom: 0.6rem;
        }
        .act-desc {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          line-height: 1.55;
          color: #6B6480;
          margin-bottom: 0.75rem;
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
          padding: 0; margin: 0 0 1rem;
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
          padding: 0.6rem 1.15rem;
          border-radius: 9999px;
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          color: #ffffff;
          text-decoration: none;
          margin-top: auto;
          align-self: flex-start;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .act-cta:hover { transform: translateX(4px); box-shadow: 0 4px 14px rgba(0,0,0,0.15); }
        .act-cta svg { width: 14px; height: 14px; stroke: #fff; stroke-width: 2.5; }

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
            Activities & Programs
          </div>
          <Heading className="act-hero-title">
            Where Kids <span>Learn, Play</span><br />& Grow Every Day
          </Heading>
          <p className="act-hero-sub">
            11 carefully designed activities to support every child's physical, mental,
            emotional and social development — while mothers stay active and supported too.
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
          {filters.map(f => {
            const FIcon = filterIcons[f];
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
              const Icon = activity.icon;
              const isExpanded = expanded === index;
              return (
                <div
                  key={index}
                  className="act-card"
                  style={{
                    animationDelay: `${index * 0.06}s`,
                    borderColor: isExpanded ? activity.color + '55' : 'transparent',
                  }}
                >
                  <div className="act-card-top">
                    <div className="act-card-left">
                      <div className="act-icon-wrap" style={{ backgroundColor: activity.bg }}>
                        <Icon style={{ stroke: activity.color, width: 24, height: 24, strokeWidth: 2.25 }} />
                      </div>
                      <span className="act-category-tag">{activity.category}</span>
                    </div>
                    <div className="act-age-pill" style={{ backgroundColor: activity.bg, color: activity.color }}>
                      {activity.ageLabel}
                    </div>
                  </div>

              

                  <h3 className="act-title">{activity.title}</h3>
                  <p className="act-tagline" style={{ color: activity.color }}>{activity.tagline}</p>
                  <p className="act-desc">{activity.description}</p>

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
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={activity.href}
                    className="act-cta"
                    style={{ backgroundColor: activity.color }}
                  >
                    Learn More <ArrowRight />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </>
    </>
  );
}