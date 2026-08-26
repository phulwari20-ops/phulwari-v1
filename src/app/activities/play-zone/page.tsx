'use client';

import React from 'react';
import { Smile, Heart, Dumbbell, Check } from 'lucide-react';

const programs = [
  {
    icon: Smile,
    emoji: '🎈',
    badge: 'Play Zone',
    badgeColor: '#FF8A3D',
    badgeBg: '#FFEADB',
    title: 'Learn Through',
    titleSpan: 'Play',
    spanColor: '#FF8A3D',
    description:
      'A safe and exciting indoor play area where children can explore, socialize and have fun. Our play zone is thoughtfully designed to stimulate imagination, encourage physical activity and help children make new friends.',
    benefits: [
      'Social Development',
      'Physical Activity',
      'Creative Play',
      'Confidence Building',
    ],
    age: '9+ Months ',
    image: 'playground.webp',
    sectionBg: '#ffffff',
    blobRing: '#FF8A3D',
    dot1: '#FF8A3D',
    dot2: '#FFD166',
    reverse: false,
  },
  {
    icon: Heart,
    emoji: '👩‍👧',
    badge: 'Mother Toddler Program',
    badgeColor: '#FF4D8D',
    badgeBg: '#FFE6EF',
    title: 'Bond, Learn &',
    titleSpan: 'Grow Together',
    spanColor: '#FF4D8D',
    description:
      'Specially designed activities for mothers and toddlers that promote learning, interaction and emotional bonding. These sessions create meaningful shared experiences that strengthen the parent-child relationship.',
    benefits: [
      'Parent-Child Bonding',
      'Early Learning Development',
      'Social Interaction',
      'Fun Learning Experiences',
    ],
    age: '1.5 – 4 Years',
    image: 'grow.webp',
    sectionBg: '#FFF7EC',
    blobRing: '#FF4D8D',
    dot1: '#FF4D8D',
    dot2: '#FF8A3D',
    reverse: true,
  },
  {
    icon: Dumbbell,
    emoji: '💪',
    badge: 'Fitness Program for Mothers',
    badgeColor: '#34B36B',
    badgeBg: '#E3F7EA',
    title: 'Stay Active, Healthy &',
    titleSpan: 'Energetic',
    spanColor: '#34B36B',
    description:
      'A dedicated fitness program designed specifically for mothers to focus on their health and well-being while their children participate in activities. Join a supportive community of like-minded mothers and invest in yourself.',
    benefits: [
      'Improved Fitness',
      'Better Energy Levels',
      'Stress Relief',
      'Healthy Lifestyle',
      'Community Engagement',
    ],
    age: 'Mothers of All Age Groups',
    image: 'yoga.webp',
    sectionBg: '#ffffff',
    blobRing: '#34B36B',
    dot1: '#34B36B',
    dot2: '#FF4D8D',
    reverse: false,
  },
];

export default function PlayZonePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');
        @keyframes blobFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-16px) rotate(1.5deg); } }
        @keyframes blobMorph { 0%, 100% { border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%; } 50% { border-radius: 42% 58% 62% 38% / 40% 62% 38% 60%; } }
        @media (prefers-reduced-motion: reduce) { .pd-blob, .pd-blob-shape { animation: none !important; } }
        .pd-hero { width: 100%; background: linear-gradient(135deg, #FFEADB 0%, #FFE6EF 100%); padding: 4rem 1.25rem 3rem; text-align: center; }
        .pd-hero-badge { display: inline-flex; padding: 0.5rem 1.2rem; margin-bottom: 1rem; background-color: #FFEADB; border-radius: 9999px; font-family: 'Quicksand', sans-serif; font-size: 0.7rem; font-weight: 700; color: #FF8A3D; letter-spacing: 0.06em; text-transform: uppercase; }
        .pd-hero-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 2.5rem; color: #3F3A52; line-height: 1.1; margin-bottom: 1rem; }
        .pd-hero-title span { color: #FF8A3D; }
        .pd-hero-sub { font-family: 'Quicksand', sans-serif; font-weight: 600; font-size: 1.05rem; color: #6B6480; max-width: 36rem; margin: 0 auto; line-height: 1.7; }
        .pd-section { width: 100%; padding: 4rem 1.25rem; overflow: hidden; }
        .pd-inner { max-width: 72rem; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: center; }
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
        .pd-age { display: inline-flex; padding: 0.4rem 1rem; border-radius: 9999px; background-color: #FFF7EC; font-family: 'Quicksand', sans-serif; font-size: 0.8rem; font-weight: 700; color: #E8A621; margin-bottom: 1.5rem; }
        .pd-benefits { display: flex; flex-direction: column; gap: 0.6rem; }
        .pd-benefit { display: flex; align-items: center; gap: 0.6rem; font-family: 'Quicksand', sans-serif; font-weight: 600; font-size: 0.95rem; color: #3F3A52; }
        .pd-check { width: 22px; height: 22px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pd-check svg { width: 12px; height: 12px; stroke: #fff; stroke-width: 2.5; }
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
        <div className="pd-hero-badge">🎈 Activities & Programs</div>
        <h1 className="pd-hero-title">Play Zone & <span>Family Programs</span></h1>
        <p className="pd-hero-sub">From free play to mother-toddler bonding and fitness — programs for the whole family to grow, connect and thrive together.</p>
      </div>

      {programs.map((p, i) => {
        const Icon = p.icon;
        return (
          <section key={i} className="pd-section" style={{ backgroundColor: p.sectionBg }}>
            <div className={`pd-inner${p.reverse ? ' reverse' : ''}`}>
              <div className="pd-blob">
                <div className="pd-blob-ring" style={{ borderColor: p.blobRing }} />
                <div className="pd-blob-shape"><img src={`/${p.image}`} alt={p.badge}  loading="lazy" decoding="async" /></div>
                <span className="pd-blob-dot pd-dot-1" style={{ backgroundColor: p.dot1 }} />
                <span className="pd-blob-dot pd-dot-2" style={{ backgroundColor: p.dot2 }} />
              </div>
              <div className="pd-text-col">
                <div className="pd-badge" style={{ backgroundColor: p.badgeBg, color: p.badgeColor }}>{p.emoji} {p.badge}</div>
                <h2 className="pd-title">{p.title} <span style={{ color: p.spanColor }}>{p.titleSpan}</span></h2>
                <p className="pd-text">{p.description}</p>
                <div className="pd-age">🎂 Suitable Age: {p.age}</div>
                <div className="pd-benefits">
                  {p.benefits.map((b, bi) => (
                    <div key={bi} className="pd-benefit">
                      <span className="pd-check" style={{ backgroundColor: p.badgeColor }}><Check /></span>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}