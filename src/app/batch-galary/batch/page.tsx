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
  X,
  Info,
  Shield,
} from 'lucide-react';

const faqs = [
  { q: 'What is the minimum age for joining?', a: 'Mother & Toddler Program: 1–3 Years. Premium Circle & Phulwari Core: 3+ Years.' },
  { q: 'Can mothers participate in activities?', a: 'Yes. Dedicated fitness sessions are available in the Mother & Toddler Program and Phulwari Premium Circle.' },
  { q: 'Are customized activities available?', a: 'Yes. Customized activity options are available under Phulwari Premium Circle.' },
];

const DAY_ORDER: Record<string, number> = {
  monday: 1, mon: 1,
  tuesday: 2, tue: 2, tues: 2,
  wednesday: 3, wed: 3,
  thursday: 4, thu: 4, thur: 4, thurs: 4,
  friday: 5, fri: 5,
  saturday: 6, sat: 6,
  sunday: 7, sun: 7,
};

const parseTimeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  const match = timeStr.match(/(\d+)(?::(\d+)|(?:\.(\d+)))?\s*(am|pm)?/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2] || match[3] || '0', 10);
  const meridiem = (match[4] || '').toLowerCase();
  if (meridiem === 'pm' && hours < 12) hours += 12;
  if (meridiem === 'am' && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

/**
 * These sections are used two ways: as their own route (where the section
 * heading is the page's single <h1>) and composed into the homepage (where the
 * hero already owns the <h1>, so they must step down to <h2>).
 * `headingLevel` lets the homepage demote them and keeps exactly one <h1> per
 * page, which is what both the accessibility tree and Google expect.
 */
export default function BatchPage({ headingLevel = 'h1' }: { headingLevel?: 'h1' | 'h2' } = {}) {
  const Heading = headingLevel;
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [dynamicBatches, setDynamicBatches] = useState<any[]>([]);
  const [dynamicSchedules, setDynamicSchedules] = useState<any[]>([]);
  const [batchesLoading, setBatchesLoading] = useState(true);

  useEffect(() => {
    const fetchBatchesFromDb = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const [{ data, error }, { data: schData }] = await Promise.all([
          supabase.from('batches').select('*').neq('is_visible', false).order('created_at', { ascending: true }),
          supabase.from('batch_schedules').select('*'),
        ]);
        if (!error && data && data.length > 0) {
          console.log('✅ Dynamic Batches fetched from DB:', data);
          setDynamicBatches(data);
          // Set first batch as selected by default for immediate clear view
          setSelectedBatchId(data[0].id?.toString());
        }
        if (schData) setDynamicSchedules(schData);
      } catch (e) {
        console.error('❌ Batch fetch error:', e);
      } finally {
        setBatchesLoading(false);
      }
    };
    fetchBatchesFromDb();
  }, []);

  // Group a batch's schedules by day so the detail view reads in strictly ASCENDING order:
  // Monday -> Tuesday -> Wednesday -> Thursday -> Friday -> Saturday -> Sunday
  const schedulesFor = (batchId: any) =>
    dynamicSchedules
      .filter((s) => String(s.batch_id) === String(batchId))
      .sort((a, b) => {
        const dayA = DAY_ORDER[String(a.day_of_week || '').trim().toLowerCase()] ?? 99;
        const dayB = DAY_ORDER[String(b.day_of_week || '').trim().toLowerCase()] ?? 99;
        if (dayA !== dayB) return dayA - dayB;
        const timeA = parseTimeToMinutes(String(a.start_time || ''));
        const timeB = parseTimeToMinutes(String(b.start_time || ''));
        if (timeA !== timeB) return timeA - timeB;
        return String(a.class_name || '').localeCompare(String(b.class_name || ''));
      });

  const isBlankTime = (t: string) => !t || t === '00:00' || t === '00:00:00';

  const colors = ['#FF4D8D', '#8B5CF6', '#E8A621', '#10B981', '#3B82F6', '#F97316'];
  const bgs    = ['#FFE6EF', '#EFE7FE', '#FFF3D9', '#ECFDF5', '#EFF6FF', '#FFF7ED'];

  const computeTiming = (b: any) => {
    const start = b.start_time || '';
    const end   = b.end_time   || '';
    if (isBlankTime(start) && isBlankTime(end)) {
      return schedulesFor(b.id).length > 0 ? 'As per schedule' : '—';
    }
    return start && end ? `${start} – ${end}` : start || end || '—';
  };

  const activeTableData = dynamicBatches.map((b, idx) => {
    return {
      batch: b.batch_name,
      age: b.age_group || '—',
      timing: computeTiming(b),
      days: b.days || '—',
      color: colors[idx % colors.length],
      bg:    bgs[idx % bgs.length]
    };
  });

  const activeBatches = dynamicBatches.map((b, idx) => {
    const timing = computeTiming(b);
    const color = colors[idx % colors.length];
    const bg = bgs[idx % bgs.length];

    // Determine icon based on name
    let Icon = Users2;
    const lower = (b.batch_name || '').toLowerCase();
    if (lower.includes('toddler')) Icon = Baby;
    else if (lower.includes('core')) Icon = CalendarDays;
    else if (lower.includes('dance')) Icon = Music4;
    else if (lower.includes('yoga')) Icon = Brain;
    else if (lower.includes('zumba')) Icon = Dumbbell;

    // 100% Genuine database arrays without fake fallbacks
    const includes = Array.isArray(b.includes) ? b.includes.filter(Boolean) : [];
    const childBenefits = Array.isArray(b.child_benefits) ? b.child_benefits.filter(Boolean) : [];
    const motherBenefits = Array.isArray(b.mother_benefits) ? b.mother_benefits.filter(Boolean) : [];

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
      tagline: b.tagline || '',
      description: b.description || '',
      includes,
      childBenefits,
      motherBenefits,
      bestFor: b.best_for || '',
      schedules: schedulesFor(b.id)
    };
  });

  const selectedBatch = activeBatches.find(b => b.id === selectedBatchId) || null;

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

        /* Batch cards grid - uniform heights, no stretching distortion */
        .bt-cards {
          max-width: 68rem;
          margin: 0 auto;
          padding: 0 1.25rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.2rem;
          align-items: stretch;
        }
        @media (min-width: 640px) {
          .bt-cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .bt-cards { grid-template-columns: repeat(3, 1fr); }
        }

        .bt-card {
          background-color: #ffffff;
          border-radius: 20px;
          padding: 1.25rem;
          box-shadow: 0 4px 14px rgba(63,58,82,0.06);
          border: 2px solid transparent;
          transition: all 0.22s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .bt-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(63,58,82,0.11);
        }
        .bt-card.is-active {
          border-color: var(--card-color, #FF4D8D);
          box-shadow: 0 10px 26px rgba(63,58,82,0.13);
          background-color: #ffffff;
        }

        .bt-card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }
        .bt-card-title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .bt-card-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bt-card-icon-box svg {
          width: 22px;
          height: 22px;
          stroke: #ffffff;
          stroke-width: 2.25;
        }
        .bt-card-name-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          line-height: 1.2;
          color: #3F3A52;
        }

        .bt-card-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 0.85rem;
        }
        .bt-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .bt-card-tagline-preview {
          font-size: 0.84rem;
          font-weight: 600;
          color: #6B6480;
          line-height: 1.5;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .bt-card-action-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.55rem 0.9rem;
          border-radius: 12px;
          font-size: 0.82rem;
          font-weight: 700;
          transition: background-color 0.18s ease;
        }

        /* Detail Showcase - Smooth, dedicated full-width area */
        .bt-showcase {
          max-width: 68rem;
          margin: 2rem auto 0;
          padding: 0 1.25rem;
          animation: btFadeUp 0.35s ease both;
        }
        .bt-showcase-card {
          background-color: #ffffff;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(63,58,82,0.09);
          border: 2px solid var(--showcase-color, #FF4D8D);
          position: relative;
        }
        @media (max-width: 640px) {
          .bt-showcase-card { padding: 1.25rem; }
        }

        .bt-showcase-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #F0EBE0;
        }
        .bt-showcase-title-area {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }
        .bt-showcase-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bt-showcase-icon svg {
          width: 26px;
          height: 26px;
          stroke: #ffffff;
          stroke-width: 2.25;
        }
        .bt-showcase-heading {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 1.45rem;
          color: #3F3A52;
          line-height: 1.2;
        }
        .bt-showcase-subtag {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--showcase-color, #FF4D8D);
          margin-top: 0.15rem;
        }

        .bt-close-btn {
          width: 34px;
          height: 34px;
          border-radius: 9999px;
          border: none;
          background: #F4EFFE;
          color: #6B6480;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }
        .bt-close-btn:hover {
          background: #E8DEFA;
          color: #3F3A52;
          transform: scale(1.05);
        }

        .bt-showcase-desc {
          font-size: 0.92rem;
          font-weight: 600;
          color: #5B5570;
          line-height: 1.65;
          margin-bottom: 1.5rem;
          white-space: pre-line;
        }

        .bt-section-heading {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #3F3A52;
          margin: 1.5rem 0 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Schedule Grid - Ascending order */
        .bt-schedule-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.55rem;
        }
        @media (min-width: 640px) {
          .bt-schedule-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .bt-sch-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.9rem;
          border-radius: 12px;
          background: var(--sch-bg, #FFF3D9);
          font-size: 0.84rem;
          font-weight: 700;
          color: #3F3A52;
          gap: 0.75rem;
        }
        .bt-sch-day {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 800;
          min-width: 100px;
        }
        .bt-sch-time {
          font-family: 'Quicksand', monospace;
          color: var(--sch-color, #E8A621);
          font-weight: 800;
          font-size: 0.82rem;
        }
        .bt-sch-class {
          font-weight: 800;
          text-align: right;
        }

        /* Includes list */
        .bt-inc-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }
        @media (min-width: 640px) {
          .bt-inc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .bt-inc-item {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.86rem;
          font-weight: 700;
          color: #3F3A52;
          background: #FDFBF7;
          border: 1px solid #F0EBE0;
          padding: 0.5rem 0.8rem;
          border-radius: 10px;
        }

        /* Benefits columns */
        .bt-benefits-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }
        @media (min-width: 640px) {
          .bt-benefits-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .bt-ben-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.84rem;
          font-weight: 600;
          color: #5B5570;
          line-height: 1.45;
        }
        .bt-ben-item svg {
          width: 15px;
          height: 15px;
          margin-top: 0.15rem;
          flex-shrink: 0;
          stroke-width: 2.5;
        }

        .bt-best-for-box {
          background-color: #F8F5FF;
          border-left: 4px solid var(--showcase-color, #8B5CF6);
          border-radius: 0 14px 14px 0;
          padding: 0.85rem 1.1rem;
          font-size: 0.86rem;
          font-weight: 600;
          color: #5B5570;
          line-height: 1.55;
          margin: 1.5rem 0;
        }
        .bt-best-for-box strong {
          color: #3F3A52;
          font-weight: 800;
          display: block;
          margin-bottom: 0.2rem;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .bt-join-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 9999px;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.9rem;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }
        .bt-join-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.18);
        }
        .bt-join-btn svg { width: 17px; height: 17px; }

        /* Overview table */
        .bt-overview { max-width: 68rem; margin: 3rem auto 0; padding: 0 1.25rem; }
        .bt-overview-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.35rem; color: #3F3A52; margin-bottom: 1rem; text-align: center; }
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
      `}</style>

      <div className="bt-page">

        {/* Hero */}
        <header className="bt-hero">
          <span className="bt-hero-badge"><CalendarDays size={13} /> Batches & Timings</span>
          <Heading className="bt-hero-title">Find the <span>Perfect Schedule</span><br />for Your Child</Heading>
          <p className="bt-hero-sub">We offer flexible batches designed to suit different age groups and interests. Select any batch below to view its full schedule and details.</p>
        </header>

        {/* Batch Cards Grid - Crisp, uniform heights */}
        <div className="bt-cards">
          {batchesLoading ? (
            <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#9B93B0', fontWeight: 700 }}>
              ⏳ Loading batches from database...
            </div>
          ) : (
            activeBatches.map((batch, i) => {
              const Icon = batch.icon;
              const isActive = selectedBatchId === batch.id;
              return (
                <div
                  key={batch.id}
                  className={`bt-card ${isActive ? 'is-active' : ''}`}
                  style={{
                    ['--card-color' as any]: batch.color,
                    animationDelay: `${i * 0.06}s`
                  }}
                  onClick={() => setSelectedBatchId(isActive ? null : batch.id)}
                >
                  <div>
                    <div className="bt-card-top-bar">
                      <div className="bt-card-title-group">
                        <div className="bt-card-icon-box" style={{ backgroundColor: batch.color }}>
                          <Icon />
                        </div>
                        <span className="bt-card-name-title">{batch.badge}</span>
                      </div>
                      <span style={{ fontSize: '1.25rem' }}>{batch.emoji}</span>
                    </div>

                    <div className="bt-card-pills">
                      <span className="bt-pill" style={{ backgroundColor: batch.bg, color: batch.color }}>
                        👶 {batch.age}
                      </span>
                      <span className="bt-pill" style={{ backgroundColor: '#F3F4F6', color: '#4B5563' }}>
                        📅 {batch.days}
                      </span>
                      <span className="bt-pill" style={{ backgroundColor: '#F3F4F6', color: '#4B5563' }}>
                        ⏰ {batch.timing}
                      </span>
                    </div>

                    {batch.tagline && (
                      <p className="bt-card-tagline-preview">{batch.tagline}</p>
                    )}
                  </div>

                  <div
                    className="bt-card-action-bar"
                    style={{
                      backgroundColor: isActive ? batch.color : batch.bg,
                      color: isActive ? '#ffffff' : batch.color
                    }}
                  >
                    <span>{isActive ? 'Viewing Details' : 'View Schedule & Details'}</span>
                    {isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Batch Showcase - Full width, stable, zero layout distortion */}
        {selectedBatch && (
          <div className="bt-showcase" id="batch-showcase-anchor">
            <div
              className="bt-showcase-card"
              style={{
                ['--showcase-color' as any]: selectedBatch.color,
                ['--sch-bg' as any]: selectedBatch.bg,
                ['--sch-color' as any]: selectedBatch.color
              }}
            >
              <div className="bt-showcase-header">
                <div className="bt-showcase-title-area">
                  <div className="bt-showcase-icon" style={{ backgroundColor: selectedBatch.color }}>
                    <selectedBatch.icon />
                  </div>
                  <div>
                    <div className="bt-showcase-heading">
                      {selectedBatch.emoji} {selectedBatch.badge}
                    </div>
                    {selectedBatch.tagline && (
                      <div className="bt-showcase-subtag">{selectedBatch.tagline}</div>
                    )}
                  </div>
                </div>

                <button
                  className="bt-close-btn"
                  title="Close Details"
                  onClick={() => setSelectedBatchId(null)}
                >
                  <X size={18} />
                </button>
              </div>

              {selectedBatch.description && (
                <p className="bt-showcase-desc">{selectedBatch.description}</p>
              )}

              {/* Class Schedule - STRICT ASCENDING CHRONOLOGICAL ORDER (Monday -> Sunday) */}
              <div className="bt-section-heading">
                <CalendarDays size={18} style={{ color: selectedBatch.color }} />
                <span>Class Schedule (Ascending Order)</span>
              </div>

              {selectedBatch.schedules && selectedBatch.schedules.length > 0 ? (
                <div className="bt-schedule-grid">
                  {selectedBatch.schedules.map((sch: any, idx: number) => (
                    <div key={idx} className="bt-sch-card">
                      <span className="bt-sch-day">📅 {sch.day_of_week}</span>
                      <span className="bt-sch-time">{sch.start_time} – {sch.end_time}</span>
                      <span className="bt-sch-class">{sch.class_name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: selectedBatch.bg, padding: '0.85rem 1rem', borderRadius: '12px', fontSize: '0.86rem', fontWeight: 700, color: '#3F3A52' }}>
                  ℹ️ Timing: {selectedBatch.timing} ({selectedBatch.days})
                </div>
              )}

              {/* What's Included - 100% Genuine backend data */}
              {selectedBatch.includes && selectedBatch.includes.length > 0 && (
                <>
                  <div className="bt-section-heading">
                    <Sparkles size={18} style={{ color: selectedBatch.color }} />
                    <span>What's Included</span>
                  </div>
                  <div className="bt-inc-grid">
                    {selectedBatch.includes.map((inc: any, idx: number) => {
                      const text = typeof inc === 'object' && inc !== null ? inc.text : inc;
                      return (
                        <div className="bt-inc-item" key={idx}>
                          <Sparkles size={14} style={{ color: selectedBatch.color, flexShrink: 0 }} />
                          <span>{text}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Benefits for Children - only rendered when items exist */}
              {selectedBatch.childBenefits && selectedBatch.childBenefits.length > 0 && (
                <>
                  <div className="bt-section-heading">
                    <Star size={18} style={{ color: selectedBatch.color }} />
                    <span>Benefits for Children</span>
                  </div>
                  <div className="bt-benefits-grid">
                    {selectedBatch.childBenefits.map((b: any, idx: number) => (
                      <div className="bt-ben-item" key={idx}>
                        <CheckCircle2 style={{ color: selectedBatch.color }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Benefits for Mothers - only rendered when items exist */}
              {selectedBatch.motherBenefits && selectedBatch.motherBenefits.length > 0 && (
                <>
                  <div className="bt-section-heading">
                    <Heart size={18} style={{ color: selectedBatch.color }} />
                    <span>Benefits for Mothers</span>
                  </div>
                  <div className="bt-benefits-grid">
                    {selectedBatch.motherBenefits.map((b: any, idx: number) => (
                      <div className="bt-ben-item" key={idx}>
                        <Heart style={{ color: selectedBatch.color }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Best For - only rendered when present */}
              {selectedBatch.bestFor && (
                <div className="bt-best-for-box">
                  <strong>Best For</strong>
                  {selectedBatch.bestFor}
                </div>
              )}

              {/* WhatsApp Enquiry Button */}
              <div style={{ marginTop: '1.75rem' }}>
                <a
                  href={`https://wa.me/916207368839?text=Hi%20Phulwari!%20I%27d%20like%20to%20know%20more%20about%20the%20*${encodeURIComponent(selectedBatch.badge)}*.%0A%0APlease%20share%20details%20about%20fees%2C%20enrollment%20and%20availability.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bt-join-btn"
                  style={{ backgroundColor: selectedBatch.color }}
                >
                  <MessageCircle />
                  <span>{selectedBatch.emoji} Enquire about {selectedBatch.badge}</span>
                </a>
              </div>
            </div>
          </div>
        )}

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