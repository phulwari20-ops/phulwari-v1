'use client';

import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  Clock3,
  CalendarDays,
  Baby,
  Users2,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Dumbbell,
  Palette,
  Music4,
  Footprints,
  Brain,
  Heart,
  Sparkles,
  Star,
} from 'lucide-react';

const batches = [
  {
    id: 'toddler',
    badge: 'Mother & Toddler Program',
    emoji: '👩‍👧',
    timing: '10:30 AM – 11:30 AM',
    days: 'Monday to Saturday',
    age: '1 – 3 Years',
    color: '#FF4D8D',
    bg: '#FFE6EF',
    icon: Baby,
    tagline: 'Learn, Play & Grow Together',
    description: 'A specially designed morning program for toddlers and their mothers. While children enjoy safe and engaging Playzone activities, mothers participate in guided fitness sessions — strengthening parent-child bonding while supporting early childhood development.',
    includes: [
      { icon: Dumbbell, text: 'Fitness Programme for Mothers' },
      { icon: Sparkles, text: 'Playzone Access for Children' },
      { icon: Heart, text: 'Parent-Child Engagement Activities' },
      { icon: Star, text: 'Early Learning Environment' },
    ],
    childBenefits: ['Social Interaction', 'Motor Skill Development', 'Confidence Building', 'Learning Through Play', 'Safe & Friendly Environment'],
    motherBenefits: ['Better Fitness & Health', 'Stress Relief', 'Improved Energy Levels', 'Community Interaction', 'Quality Time with Child'],
    bestFor: 'Mothers who want to stay active while giving their toddlers a fun, safe and engaging learning environment.',
  },
  {
    id: 'premium',
    badge: 'Phulwari Premium Circle',
    emoji: '🌟',
    timing: '5:00 PM Onwards',
    days: 'Monday to Sunday',
    age: '3+ Years',
    color: '#8B5CF6',
    bg: '#EFE7FE',
    icon: Users2,
    tagline: 'The Ultimate Mother & Child Experience',
    description: 'Our flagship premium program designed for complete family engagement and development. Combines children\'s activities, Playzone access and fitness opportunities for mothers — creating a balanced and enriching experience for the entire family.',
    includes: [
      { icon: Dumbbell, text: 'Fitness Programme for Mothers (5 Days/Week)' },
      { icon: Sparkles, text: 'Playzone Access for Children' },
      { icon: Star, text: 'Customized Activity Options' },
      { icon: Heart, text: 'Family-Centered Learning Environment' },
    ],
    childBenefits: ['Complete Development Experience', 'Flexible Activity Selection', 'Active Learning Environment', 'Social & Emotional Development', 'Safe & Nurturing Atmosphere'],
    motherBenefits: ['Dedicated Fitness Sessions', 'Healthy Lifestyle Promotion', 'Parent-Child Engagement', 'Community & Social Interaction', 'Stress Relief & Wellness'],
    bestFor: 'Families seeking a comprehensive program that supports both child development and mother wellness.',
  },
  {
    id: 'core',
    badge: 'Phulwari Core',
    emoji: '🎨',
    timing: '6:30 PM Onwards',
    days: 'Wednesday to Sunday',
    age: '3+ Years',
    color: '#E8A621',
    bg: '#FFF3D9',
    icon: CalendarDays,
    tagline: 'Creativity, Confidence & Skill Development',
    description: 'A structured activity batch focused on developing creativity, self-expression, confidence and physical fitness through carefully selected activities including Dance, Art & Craft, Gymnastics and Yoga.',
    includes: [
      { icon: Music4, text: 'Dance' },
      { icon: Palette, text: 'Art & Craft' },
      { icon: Footprints, text: 'Gymnastics' },
      { icon: Brain, text: 'Yoga (3 Days a Week)' },
    ],
    childBenefits: ['Improves Creativity', 'Enhances Flexibility', 'Builds Confidence', 'Improves Physical Fitness', 'Develops Focus & Concentration', 'Encourages Self-Expression', 'Strengthens Social Skills'],
    motherBenefits: [],
    bestFor: 'Children who enjoy creative and physical activities in a structured learning environment.',
  },
];

const tableData = [
  { batch: 'Mother & Toddler Program', age: '1 – 3 Years', timing: '10:30 AM – 11:30 AM', days: 'Mon – Sat', color: '#FF4D8D', bg: '#FFE6EF' },
  { batch: 'Phulwari Premium Circle',  age: '3+ Years',   timing: '5:00 PM Onwards',     days: 'Mon – Sun', color: '#8B5CF6', bg: '#EFE7FE' },
  { batch: 'Phulwari Core',            age: '3+ Years',   timing: '6:30 PM Onwards',     days: 'Wed – Sun', color: '#E8A621', bg: '#FFF3D9' },
];

const faqs = [
  { q: 'What is the minimum age for joining?', a: 'Mother & Toddler Program: 1–3 Years. Premium Circle & Phulwari Core: 3+ Years.' },
  { q: 'Can mothers participate in activities?', a: 'Yes. Dedicated fitness sessions are available in the Mother & Toddler Program and Phulwari Premium Circle.' },
  { q: 'Are customized activities available?', a: 'Yes. Customized activity options are available under Phulwari Premium Circle.' },
];

/**
 * These sections are used two ways: as their own route (where the section
 * heading is the page's single <h1>) and composed into the homepage (where the
 * hero already owns the <h1>, so they must step down to <h2>).
 * `headingLevel` lets the homepage demote them and keeps exactly one <h1> per
 * page, which is what both the accessibility tree and Google expect.
 */
export default function BatchPage({ headingLevel = 'h1' }: { headingLevel?: 'h1' | 'h2' } = {}) {
  const Heading = headingLevel;
  const [expandedBatch, setExpandedBatch] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [dynamicBatches, setDynamicBatches] = useState<any[]>([]);
  const [batchesLoading, setBatchesLoading] = useState(true);

  useEffect(() => {
    const fetchBatchesFromDb = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data, error } = await supabase.from('batches').select('*').neq('is_visible', false);
        if (!error && data && data.length > 0) {
          console.log('✅ Dynamic Batches fetched from DB:', data);
          setDynamicBatches(data);
        }
      } catch (e) {
        console.error('❌ Batch fetch error:', e);
      } finally {
        setBatchesLoading(false);
      }
    };
    fetchBatchesFromDb();
  }, []);

  const colors = ['#FF4D8D', '#8B5CF6', '#E8A621', '#10B981', '#3B82F6', '#F97316'];
  const bgs    = ['#FFE6EF', '#EFE7FE', '#FFF3D9', '#ECFDF5', '#EFF6FF', '#FFF7ED'];

  const activeTableData = dynamicBatches.map((b, idx) => {
    const start = b.start_time || '';
    const end   = b.end_time   || '';
    const timing = start && end ? `${start} – ${end}` : start || end || '—';
    return {
      batch: b.batch_name,
      age: b.age_group || '—',
      timing,
      days: b.days || '—',
      color: colors[idx % colors.length],
      bg:    bgs[idx % bgs.length]
    };
  });

  const activeBatches = dynamicBatches.map((b, idx) => {
    const start = b.start_time || '';
    const end   = b.end_time   || '';
    const timing = start && end ? `${start} – ${end}` : start || end || '—';
    const color = colors[idx % colors.length];
    const bg = bgs[idx % bgs.length];

    // Determine icon based on name
    let Icon = Users2;
    if (b.batch_name.toLowerCase().includes('toddler')) Icon = Baby;
    else if (b.batch_name.toLowerCase().includes('core')) Icon = CalendarDays;

    return {
      id: b.id?.toString() || `batch-${idx}`,
      badge: b.batch_name,
      emoji: b.emoji || '⚡',
      timing,
      days: b.days || '—',
      age: b.age_group || '—',
      color,
      bg,
      icon: Icon,
      tagline: b.tagline || 'Flexible child activity & learning sessions',
      description: b.description || 'Specially designed schedule for kids activity engagement.',
      includes: b.includes || [
        { icon: Sparkles, text: 'Playzone & Physical Activity' },
        { icon: Star, text: 'Expert Guided Mentorship' }
      ],
      childBenefits: b.child_benefits || ['Confidence Building', 'Social Interaction', 'Active Learning'],
      motherBenefits: b.mother_benefits || [],
      bestFor: b.best_for || 'Children seeking a fun, safe, and engaging environment.'
    };
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Quicksand:wght@600;700&display=swap');

        @keyframes btFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes btFloat  { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

        .bt-page { background-color: #FFF7EC; font-family: 'Quicksand', sans-serif; color: #3F3A52; min-height: 100vh; padding-bottom: 3rem; }

        /* Hero */
        .bt-hero { max-width: 48rem; margin: 0 auto; padding: 3.5rem 1.25rem 2rem; text-align: center; animation: btFadeUp 0.5s ease both; }
        .bt-hero-badge { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1.2rem; background-color: #FFD166; border-radius: 9999px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #6B4500; animation: btFloat 4s ease-in-out infinite; }
        .bt-hero-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(1.8rem, 3vw + 1rem, 2.6rem); line-height: 1.18; margin: 1rem 0 0.75rem; }
        .bt-hero-title span { color: #FF4D8D; }
        .bt-hero-sub { font-size: 0.97rem; font-weight: 600; color: #6B6480; line-height: 1.7; }

        /* Batch cards */
        .bt-cards { max-width: 64rem; margin: 0 auto; padding: 0 1.25rem; display: grid; grid-template-columns: 1fr; gap: 1rem; }
        @media (min-width: 768px) { .bt-cards { grid-template-columns: repeat(3, 1fr); } }

        .bt-card { background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 6px 18px rgba(63,58,82,0.07); animation: btFadeUp 0.45s ease both; }
        .bt-card-header { padding: 1.5rem; cursor: pointer; display: flex; flex-direction: column; gap: 1rem; }
        .bt-card-top { display: flex; align-items: center; gap: 0.75rem; }
        .bt-card-icon { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .bt-card-icon svg { width: 22px; height: 22px; stroke: #ffffff; stroke-width: 2.25; }
        .bt-card-name { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1rem; line-height: 1.25; color: #3F3A52; flex: 1; }
        .bt-card-chevron { width: 20px; height: 20px; flex-shrink: 0; color: #9B93B0; transition: transform 0.2s ease; }
        .bt-card-divider { height: 1px; background-color: #F0EBE0; }
        .bt-card-meta { display: flex; flex-direction: column; gap: 0.55rem; }
        .bt-meta-row { display: flex; align-items: center; gap: 0.55rem; font-size: 0.87rem; font-weight: 700; color: #5B5570; }
        .bt-meta-row svg { width: 15px; height: 15px; stroke-width: 2.25; flex-shrink: 0; }

        /* Expanded detail */
        .bt-card-detail { padding: 0 1.5rem 1.5rem; display: flex; flex-direction: column; gap: 1.1rem; }
        .bt-card-tagline { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 0.92rem; color: #3F3A52; }
        .bt-card-desc { font-size: 0.85rem; font-weight: 600; color: #6B6480; line-height: 1.65; }
        .bt-detail-section-title { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.04em; color: #9B93B0; margin-bottom: 0.5rem; }
        .bt-includes-list { display: flex; flex-direction: column; gap: 0.4rem; }
        .bt-include-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.83rem; font-weight: 700; color: #3F3A52; }
        .bt-include-item svg { width: 14px; height: 14px; flex-shrink: 0; stroke-width: 2.5; }
        .bt-benefits-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
        .bt-benefit-item { display: flex; align-items: flex-start; gap: 0.4rem; font-size: 0.8rem; font-weight: 600; color: #5B5570; line-height: 1.4; }
        .bt-benefit-item svg { width: 13px; height: 13px; flex-shrink: 0; margin-top: 0.15rem; stroke-width: 2.5; }
        .bt-best-for { background-color: #F7F4FF; border-radius: 12px; padding: 0.75rem 0.9rem; font-size: 0.82rem; font-weight: 600; color: #5B5570; line-height: 1.55; }
        .bt-best-for strong { color: #3F3A52; font-weight: 700; display: block; margin-bottom: 0.2rem; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.03em; }
        .bt-join-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.45rem; padding: 0.7rem 1.2rem; border: none; border-radius: 9999px; color: #ffffff; font-weight: 700; font-size: 0.85rem; font-family: 'Quicksand', sans-serif; cursor: pointer; text-decoration: none; transition: transform 0.15s ease; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .bt-join-btn:hover { transform: translateY(-2px); }
        .bt-join-btn svg { width: 15px; height: 15px; }

        /* Overview table */
        .bt-overview { max-width: 64rem; margin: 2rem auto 0; padding: 0 1.25rem; }
        .bt-overview-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.3rem; color: #3F3A52; margin-bottom: 0.9rem; text-align: center; }
        .bt-table-wrap { background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 6px 18px rgba(63,58,82,0.07); overflow-x: auto; }
        .bt-table { width: 100%; border-collapse: collapse; font-size: 0.87rem; font-weight: 600; min-width: 480px; }
        .bt-table thead tr { background-color: #3F3A52; }
        .bt-table thead th { color: #ffffff; font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 0.76rem; letter-spacing: 0.04em; text-transform: uppercase; padding: 0.85rem 1.2rem; text-align: left; }
        .bt-table tbody tr { border-bottom: 1px solid #F0EBE0; }
        .bt-table tbody tr:last-child { border-bottom: none; }
        .bt-table tbody td { padding: 0.9rem 1.2rem; color: #5B5570; vertical-align: middle; }
        .bt-table tbody td:first-child { font-weight: 700; color: #3F3A52; }
        .bt-age-pill { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; }
        .bt-batch-name { display: flex; align-items: center; gap: 0.5rem; }
        .bt-dot { width: 9px; height: 9px; border-radius: 9999px; flex-shrink: 0; }

        /* FAQ */
        .bt-faq { max-width: 64rem; margin: 2rem auto 0; padding: 0 1.25rem; }
        .bt-faq-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.3rem; color: #3F3A52; margin-bottom: 0.9rem; text-align: center; }
        .bt-faq-item { background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-bottom: 0.6rem; box-shadow: 0 4px 12px rgba(63,58,82,0.05); }
        .bt-faq-q { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; cursor: pointer; font-weight: 700; font-size: 0.9rem; color: #3F3A52; gap: 0.75rem; }
        .bt-faq-q svg { width: 18px; height: 18px; flex-shrink: 0; color: #9B93B0; transition: transform 0.2s ease; }
        .bt-faq-a { padding: 0 1.25rem 1rem; font-size: 0.85rem; font-weight: 600; color: #6B6480; line-height: 1.65; }

        /* CTA */
        .bt-cta { max-width: 64rem; margin: 2rem auto 0; padding: 0 1.25rem; }
        .bt-cta-card { border-radius: 24px; padding: 2.25rem 1.75rem; background: linear-gradient(135deg, #FFE6EF 0%, #FFF3D9 45%, #EFE7FE 100%); text-align: center; }
        .bt-cta-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.4rem; color: #3F3A52; margin-bottom: 1rem; }
        .bt-cta-address { display: inline-flex; align-items: flex-start; gap: 0.5rem; background-color: #ffffff; border-radius: 14px; padding: 0.8rem 1.1rem; font-size: 0.84rem; font-weight: 700; color: #3F3A52; line-height: 1.5; margin-bottom: 1.25rem; max-width: 30rem; text-align: left; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .bt-cta-address svg { width: 16px; height: 16px; color: #FF4D8D; flex-shrink: 0; margin-top: 0.15rem; }
        .bt-cta-buttons { display: flex; flex-wrap: wrap; gap: 0.7rem; justify-content: center; }
        .bt-cta-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.8rem 1.5rem; border: none; border-radius: 9999px; color: #ffffff; font-weight: 700; font-size: 0.9rem; font-family: 'Quicksand', sans-serif; cursor: pointer; text-decoration: none; box-shadow: 0 6px 14px rgba(0,0,0,0.12); transition: transform 0.15s ease; }
        .bt-cta-btn:hover { transform: translateY(-2px); }
        .bt-cta-btn svg { width: 17px; height: 17px; }
        .bt-cta-btn--call { background-color: #FF4D8D; }
        .bt-cta-btn--whatsapp { background-color: #34B36B; }
      `}</style>

      <div className="bt-page">

        {/* Hero */}
        <header className="bt-hero">
          <span className="bt-hero-badge"><CalendarDays size={13} /> Batches & Timings</span>
          <Heading className="bt-hero-title">Find the <span>Perfect Schedule</span><br />for Your Child</Heading>
          <p className="bt-hero-sub">We offer flexible batches designed to suit different age groups and interests. Tap any program below to learn more.</p>
        </header>

        {/* Batch cards — tap to expand */}
        <div className="bt-cards">
          {activeBatches.map((batch, i) => {
            const Icon = batch.icon;
            const isOpen = expandedBatch === batch.id;
            return (
              <div key={batch.id} className="bt-card" style={{ animationDelay: `${i * 0.07}s` }}>
                {/* Always visible header */}
                <div className="bt-card-header" onClick={() => setExpandedBatch(isOpen ? null : batch.id)}>
                  <div className="bt-card-top">
                    <div className="bt-card-icon" style={{ backgroundColor: batch.color }}>
                      <Icon />
                    </div>
                    <span className="bt-card-name">{batch.badge}</span>
                    {isOpen ? <ChevronUp className="bt-card-chevron" /> : <ChevronDown className="bt-card-chevron" />}
                  </div>
                  <div className="bt-card-divider" />
                  <div className="bt-card-meta">
                    <div className="bt-meta-row"><Clock3 style={{ color: batch.color }} />{batch.timing}</div>
                    <div className="bt-meta-row"><CalendarDays style={{ color: batch.color }} />{batch.days}</div>
                    <div className="bt-meta-row"><Baby style={{ color: batch.color }} />{batch.age}</div>
                  </div>
                </div>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="bt-card-detail">
                    <div className="bt-card-divider" />
                    <p className="bt-card-tagline">{batch.emoji} {batch.tagline}</p>
                    <p className="bt-card-desc">{batch.description}</p>

                    <div>
                      <p className="bt-detail-section-title">What's Included</p>
                      <div className="bt-includes-list">
                        {batch.includes.map((inc, idx) => {
                          const IncIcon = inc.icon;
                          return (
                            <div className="bt-include-item" key={idx}>
                              <IncIcon style={{ color: batch.color }} />
                              <span>{inc.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="bt-detail-section-title">{batch.motherBenefits.length > 0 ? 'Benefits for Children' : 'Benefits'}</p>
                      <div className="bt-benefits-cols">
                        {batch.childBenefits.map((b, idx) => (
                          <div className="bt-benefit-item" key={idx}>
                            <CheckCircle2 style={{ color: batch.color }} />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {batch.motherBenefits.length > 0 && (
                      <div>
                        <p className="bt-detail-section-title">Benefits for Mothers</p>
                        <div className="bt-benefits-cols">
                          {batch.motherBenefits.map((b, idx) => (
                            <div className="bt-benefit-item" key={idx}>
                              <CheckCircle2 style={{ color: batch.color }} />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bt-best-for">
                      <strong>Best For</strong>
                      {batch.bestFor}
                    </div>

                    <a
                      href={`https://wa.me/916207368839?text=Hi%20Phulwari!%20I%27d%20like%20to%20know%20more%20about%20the%20*${encodeURIComponent(batch.badge)}*.%0A%0APlease%20share%20details%20about%20fees%2C%20enrollment%20and%20availability.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bt-join-btn"
                      style={{ backgroundColor: batch.color }}
                    >
                      <MessageCircle />
                      <span>{batch.emoji} Enquire about {batch.badge}</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Overview table */}
        <div className="bt-overview">
          <h2 className="bt-overview-title">Batch Overview</h2>
          <div className="bt-table-wrap">
            {batchesLoading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#9B93B0', fontSize: '0.9rem', fontWeight: 700 }}>
                ⏳ Loading latest batch schedule from database...
              </div>
            ) : activeTableData.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#9B93B0', fontSize: '0.9rem', fontWeight: 700 }}>
                No batches available at the moment.
              </div>
            ) : (
              <table className="bt-table">
                <thead>
                  <tr>
                    <th>Batch</th>
                    <th>Age Group</th>
                    <th>Timing</th>
                    <th>Days</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTableData.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <span className="bt-batch-name">
                          <span className="bt-dot" style={{ backgroundColor: row.color }} />
                          {row.batch}
                        </span>
                      </td>
                      <td><span className="bt-age-pill" style={{ backgroundColor: row.bg, color: row.color }}>{row.age}</span></td>
                      <td>{row.timing}</td>
                      <td>{row.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </>
  );
}