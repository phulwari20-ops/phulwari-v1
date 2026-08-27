'use client';

import React from 'react';
import { Crown, Check, Brain, Phone, MessageCircle } from 'lucide-react';

const programs = [
  {
    icon: Crown,
    emoji: '♟️',
    badge: 'Chess Coaching',
    badgeColor: '#6D28D9',
    badgeBg: '#EDE9FE',
    title: 'Think, Plan &',
    titleSpan: 'Win',
    spanColor: '#6D28D9',
    description:
      'Chess is one of the best activities for building focus, patience and strategic thinking. At Phulwari, children learn the game from the very first move — piece movements, openings, tactics and end-game — in a fun, encouraging environment that sharpens the mind.',
    benefits: [
      'Sharpens Focus & Memory',
      'Builds Strategic Thinking',
      'Improves Patience & Calm',
      'Boosts Problem-Solving',
    ],
    age: '5+ Years',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&auto=format&fit=crop&q=80',
    sectionBg: '#ffffff',
    blobRing: '#6D28D9',
    dot1: '#6D28D9',
    dot2: '#FF4D8D',
    reverse: false,
  },
  {
    icon: Brain,
    emoji: '🧠',
    badge: 'Mind Development',
    badgeColor: '#3D8BFF',
    badgeBg: '#E5EFFF',
    title: 'Learn the Game,',
    titleSpan: 'Grow the Mind',
    spanColor: '#3D8BFF',
    description:
      'Our structured chess sessions grow with your child — from friendly beginner games to tournament-level strategy. Coaches guide each learner at their own pace, turning every match into a lesson in concentration, planning and sportsmanship.',
    benefits: [
      'Beginner to Advanced Levels',
      'Coached Practice Matches',
      'Tournament Preparation',
      'Confidence & Sportsmanship',
    ],
    age: '5+ Years',
    image: '/mind_development.jpg',
    sectionBg: '#F7F5FF',
    blobRing: '#3D8BFF',
    dot1: '#3D8BFF',
    dot2: '#6D28D9',
    reverse: true,
  },
];

export default function ChessPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');
        @keyframes blobFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-16px) rotate(1.5deg); } }
        @keyframes blobMorph { 0%, 100% { border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%; } 50% { border-radius: 42% 58% 62% 38% / 40% 62% 38% 60%; } }
        @media (prefers-reduced-motion: reduce) { .pd-blob, .pd-blob-shape { animation: none !important; } }
        .pd-hero { width: 100%; background: linear-gradient(135deg, #EDE9FE 0%, #E5EFFF 100%); padding: 4rem 1.25rem 3rem; text-align: center; }
        .pd-hero-badge { display: inline-flex; padding: 0.5rem 1.2rem; margin-bottom: 1rem; background-color: #EDE9FE; border-radius: 9999px; font-family: 'Quicksand', sans-serif; font-size: 0.7rem; font-weight: 700; color: #6D28D9; letter-spacing: 0.06em; text-transform: uppercase; }
        .pd-hero-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 2.5rem; color: #3F3A52; line-height: 1.1; margin-bottom: 1rem; }
        .pd-hero-title span { color: #6D28D9; }
        .pd-hero-sub { font-family: 'Quicksand', sans-serif; font-weight: 600; font-size: 1.05rem; color: #6B6480; max-width: 36rem; margin: 0 auto; line-height: 1.7; }
        .pd-section { width: 100%; padding: 4rem 1.25rem; overflow: hidden; }
        .pd-inner { max-width: 72rem; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: center; }
        .pd-inner.reverse .pd-text-col { order: 2; }
        .pd-blob { position: relative; width: 100%; max-width: 22rem; margin: 0 auto; aspect-ratio: 1 / 1; animation: blobFloat 7s ease-in-out infinite; }
        .pd-blob-shape { position: absolute; inset: 0; overflow: hidden; border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%; animation: blobMorph 9s ease-in-out infinite; box-shadow: 0 18px 36px rgba(0,0,0,0.12); }
        .pd-blob-shape img { width: 100%; height: 100%; object-fit: cover; }
        .pd-blob-ring { position: absolute; inset: -14px; border: 3px dashed; border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%; opacity: 0.6; }
        .pd-blob-dot { position: absolute; width: 16px; height: 16px; border-radius: 9999px; }
        .pd-dot-1 { top: -6px; right: 14%; }
        .pd-dot-2 { bottom: 6%; left: -10px; }
        .pd-badge { display: inline-flex; padding: 0.5rem 1.2rem; margin-bottom: 1rem; border-radius: 9999px; font-family: 'Quicksand', sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
        .pd-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 2.25rem; color: #3F3A52; line-height: 1.15; margin-bottom: 1rem; }
        .pd-text { font-family: 'Quicksand', sans-serif; font-weight: 600; font-size: 1.05rem; line-height: 1.7; color: #6B6480; max-width: 34rem; margin-bottom: 1.25rem; }
        .pd-age { display: inline-flex; padding: 0.4rem 1rem; border-radius: 9999px; background-color: #F3EEFF; font-family: 'Quicksand', sans-serif; font-size: 0.8rem; font-weight: 700; color: #6D28D9; margin-bottom: 1.5rem; }
        .pd-benefits { display: flex; flex-direction: column; gap: 0.6rem; }
        .pd-benefit { display: flex; align-items: center; gap: 0.6rem; font-family: 'Quicksand', sans-serif; font-weight: 600; font-size: 0.95rem; color: #3F3A52; }
        .pd-check { width: 22px; height: 22px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pd-check svg { width: 12px; height: 12px; stroke: #fff; stroke-width: 2.5; }
        .pd-cta-buttons { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.75rem; }
        .pd-cta-button { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.4rem; border-radius: 9999px; font-family: 'Quicksand', sans-serif; font-weight: 700; font-size: 0.95rem; color: #fff; text-decoration: none; border: none; cursor: pointer; transition: transform 0.15s ease; }
        .pd-cta-button:hover { transform: translateY(-2px); }
        .pd-cta-button svg { width: 18px; height: 18px; stroke: #ffffff; stroke-width: 2.25; }
        .btn-call { background-color: #6D28D9; }
        .btn-whatsapp { background-color: #34B36B; }
        @media (min-width: 1024px) {
          .pd-inner { grid-template-columns: 1fr 1fr; gap: 3.5rem; }
          .pd-inner.reverse .pd-blob { order: 2; }
          .pd-inner.reverse .pd-text-col { order: 1; }
          .pd-blob { max-width: 26rem; }
          .pd-title { font-size: 2.75rem; }
          .pd-hero-title { font-size: 3.25rem; }
        }
      `}</style>

      <div className="pd-hero">
        <div className="pd-hero-badge">♟️ Activities &amp; Programs</div>
        <h1 className="pd-hero-title">Chess for <span>Young Minds</span></h1>
        <p className="pd-hero-sub">A fun, structured chess programme that builds focus, patience and strategic thinking — from the very first move to tournament play!</p>
      </div>

      {programs.map((p, i) => {
        const Icon = p.icon;
        return (
          <section key={i} className="pd-section" style={{ backgroundColor: p.sectionBg }}>
            <div className={`pd-inner${p.reverse ? ' reverse' : ''}`}>
              <div className="pd-blob">
                <div className="pd-blob-ring" style={{ borderColor: p.blobRing }} />
                <div className="pd-blob-shape">
                  <img src={p.image} alt={p.badge} loading="lazy" decoding="async" />
                </div>
                <span className="pd-blob-dot pd-dot-1" style={{ backgroundColor: p.dot1 }} />
                <span className="pd-blob-dot pd-dot-2" style={{ backgroundColor: p.dot2 }} />
              </div>
              <div className="pd-text-col">
                <div className="pd-badge" style={{ backgroundColor: p.badgeBg, color: p.badgeColor }}>{p.emoji} {p.badge}</div>
                <h2 className="pd-title">{p.title} <span style={{ color: p.spanColor }}>{p.titleSpan}</span></h2>
                <p className="pd-text">{p.description}</p>

                <div className="pd-benefits">
                  {p.benefits.map((b, bi) => (
                    <div key={bi} className="pd-benefit">
                      <span className="pd-check" style={{ backgroundColor: p.badgeColor }}><Check /></span>
                      {b}
                    </div>
                  ))}
                </div>
                {i === 0 && (
                  <div className="pd-cta-buttons">
                    <a href="tel:+916207368839" className="pd-cta-button btn-call">
                      <Phone />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={`https://wa.me/916207368839?text=${encodeURIComponent('Hello Phulwari! I am interested in the Chess coaching program.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pd-cta-button btn-whatsapp"
                    >
                      <MessageCircle />
                      <span>WhatsApp Now</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
