'use client';

import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Tent,
  Sparkles,
  Smile,
  Users2,
  Dumbbell,
  MonitorOff,
  Heart,
  Music4,
  Palette,
  Footprints,
  Trophy,
  Brain,
  PartyPopper,
  Mic2,
  Target,
  ScrollText,
  CheckCircle2,
  ShieldCheck,
  X,
} from 'lucide-react';

const campBenefits = [
  { icon: Sparkles, text: 'Builds Confidence' },
  { icon: Palette, text: 'Encourages Creativity' },
  { icon: Mic2, text: 'Improves Communication Skills' },
  { icon: Trophy, text: 'Develops Leadership Qualities' },
  { icon: Users2, text: 'Enhances Social Interaction' },
  { icon: Dumbbell, text: 'Promotes Physical Fitness' },
  { icon: MonitorOff, text: 'Reduces Screen Time' },
  { icon: Heart, text: 'Creates Lifelong Memories' },
];

const campActivities = [
  { icon: Music4, title: 'Music Sessions', text: 'Children explore rhythm, sound, creativity and self-expression through fun music activities.', color: '#FF4D8D', bg: '#FFE6EF' },
  { icon: Smile, title: 'Dance Classes', text: 'Energetic dance sessions that improve confidence, coordination, flexibility and fitness.', color: '#3D8BFF', bg: '#E5EFFF' },
  { icon: Palette, title: 'Art & Craft', text: 'Creative projects that encourage imagination, innovation and artistic expression.', color: '#34B36B', bg: '#E3F7EA' },
  { icon: Footprints, title: 'Gymnastics & Fitness', text: 'Fun physical activities designed to improve strength, balance, flexibility and overall fitness.', color: '#E8A621', bg: '#FFF3D9' },
  { icon: Trophy, title: 'Sports & Games', text: 'Interactive sports and group games that promote teamwork, discipline and sportsmanship.', color: '#8B5CF6', bg: '#EFE7FE' },
  { icon: Brain, title: 'Yoga & Wellness', text: 'Simple yoga practices that help improve concentration, flexibility, mindfulness and emotional well-being.', color: '#FF8A3D', bg: '#FFEADB' },
  { icon: PartyPopper, title: 'Fun & Play Activities', text: 'Exciting play-based activities that make learning enjoyable while encouraging social interaction.', color: '#FF4D8D', bg: '#FFE6EF' },
  { icon: Mic2, title: 'Personality Development', text: 'Special sessions focused on confidence building, communication skills, leadership and positive habits.', color: '#3D8BFF', bg: '#E5EFFF' },
];

const learningPillars = [
  { title: 'Physical Development', color: '#34B36B', bg: '#E3F7EA', icon: Dumbbell, items: ['Fitness', 'Coordination', 'Flexibility', 'Active Lifestyle'] },
  { title: 'Creative Development', color: '#FF4D8D', bg: '#FFE6EF', icon: Palette, items: ['Art Skills', 'Imagination', 'Problem Solving', 'Innovation'] },
  { title: 'Social Development', color: '#3D8BFF', bg: '#E5EFFF', icon: Users2, items: ['Teamwork', 'Friendship', 'Communication', 'Leadership'] },
  { title: 'Personal Growth', color: '#8B5CF6', bg: '#EFE7FE', icon: Sparkles, items: ['Confidence', 'Discipline', 'Self-Expression', 'Positive Thinking'] },
];

const attractions = [
  { icon: Mic2, title: 'Talent Show', text: 'A wonderful platform for children to showcase their unique talents and abilities.' },
  { icon: Trophy, title: 'Fun Competitions', text: 'Exciting contests, challenges and games designed to encourage participation and confidence.' },
  { icon: Target, title: 'Activity Challenges', text: 'Interactive challenges that promote teamwork, creativity and problem-solving skills.' },
  { icon: ScrollText, title: 'Certificate of Participation', text: 'Every participant receives a certificate recognizing their successful completion of the program.' },
];

const parentFavorites = [
  'Safe & Child-Friendly Environment',
  'Experienced Trainers',
  'Learning Through Fun Activities',
  'Focus on Overall Development',
  'Engaging & Interactive Sessions',
  'Positive Social Environment',
  'Skill Development Opportunities',
  'Balanced Learning & Recreation',
];

export default function SummerCampPage() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');
        @keyframes blobFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-16px) rotate(1.5deg); } }
        @keyframes blobMorph { 0%, 100% { border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%; } 50% { border-radius: 42% 58% 62% 38% / 40% 62% 38% 60%; } }
        @media (prefers-reduced-motion: reduce) { .sc-blob, .sc-blob-shape { animation: none !important; } }
        .sc-page { background-color: #FFF7EC; font-family: 'Quicksand', sans-serif; color: #3F3A52; }
        .sc-hero { max-width: 72rem; margin: 0 auto; padding: 3.5rem 1.25rem 1rem; }
        .sc-hero-inner { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: center; background-color: #ffffff; border-radius: 32px; padding: 2rem; box-shadow: 0 12px 30px rgba(63,58,82,0.06); }
        .sc-blob { position: relative; width: 100%; max-width: 20rem; margin: 0 auto; aspect-ratio: 1/1; animation: blobFloat 7s ease-in-out infinite; }
        .sc-blob-shape { position: absolute; inset: 0; overflow: hidden; animation: blobMorph 9s ease-in-out infinite; box-shadow: 0 18px 36px rgba(0,0,0,0.12); }
        .sc-blob-shape img { width: 100%; height: 100%; object-fit: cover; }
        .sc-blob-ring { position: absolute; inset: -14px; border: 3px dashed #FFD166; border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%; opacity: 0.5; }
        .sc-blob-dot { position: absolute; width: 16px; height: 16px; border-radius: 9999px; }
        .sc-blob-dot-1 { top: -6px; right: 14%; background-color: #34B36B; }
        .sc-blob-dot-2 { bottom: 6%; left: -10px; background-color: #FFD166; }
        .sc-badge { display: inline-flex; align-self: flex-start; padding: 0.5rem 1.2rem; margin-bottom: 1rem; background-color: #E3F7EA; color: #34B36B; border-radius: 9999px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; }
        .sc-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 2.1rem; line-height: 1.16; margin-bottom: 1rem; }
        .sc-title span { color: #34B36B; }
        .sc-description { font-weight: 600; font-size: 1rem; line-height: 1.75; color: #6B6480; margin-bottom: 1.5rem; max-width: 36rem; }
        .sc-cta-buttons { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .sc-cta-button { display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.85rem 1.6rem; border: none; color: #ffffff; font-weight: 700; font-size: 0.92rem; font-family: 'Quicksand', sans-serif; border-radius: 9999px; cursor: pointer; transition: transform 0.15s ease; box-shadow: 0 4px 10px rgba(0,0,0,0.08); text-decoration: none; }
        .sc-cta-button:hover { transform: translateY(-2px); }
        .sc-cta-button svg { width: 18px; height: 18px; stroke: #ffffff; stroke-width: 2.25; }
        .btn-register { background-color: #34B36B; }
        .btn-call { background-color: #FF4D8D; }
        .btn-whatsapp { background-color: #3D8BFF; }
        @media (min-width: 1024px) { .sc-hero-inner { grid-template-columns: 0.85fr 1.15fr; gap: 3rem; padding: 3rem; } .sc-blob { max-width: 23rem; } .sc-title { font-size: 2.5rem; } }
        .sc-section { max-width: 72rem; margin: 0 auto; padding: 3rem 1.25rem; }
        .sc-section-head { text-align: center; max-width: 42rem; margin: 0 auto 2.25rem; }
        .sc-section-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.9rem; margin-bottom: 0.6rem; }
        .sc-section-title span { color: #34B36B; }
        .sc-section-text { font-weight: 600; color: #6B6480; line-height: 1.6; }
        .sc-benefits-grid { display: grid; grid-template-columns: 1fr; gap: 0.75rem; }
        .sc-benefit-item { display: flex; align-items: center; gap: 0.6rem; background-color: #ffffff; border-radius: 16px; padding: 0.9rem 1.1rem; box-shadow: 0 6px 16px rgba(63,58,82,0.05); font-weight: 700; font-size: 0.88rem; }
        .sc-benefit-item svg { width: 18px; height: 18px; flex-shrink: 0; color: #34B36B; stroke-width: 2.5; }
        @media (min-width: 640px) { .sc-benefits-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .sc-benefits-grid { grid-template-columns: repeat(4, 1fr); } }
        .sc-activities-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        .sc-activity-card { background-color: #ffffff; border-radius: 24px; padding: 1.75rem; box-shadow: 0 10px 24px rgba(63,58,82,0.06); }
        .sc-activity-icon { width: 48px; height: 48px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        .sc-activity-icon svg { width: 24px; height: 24px; stroke-width: 2.25; }
        .sc-activity-title { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.5rem; }
        .sc-activity-text { font-size: 0.88rem; font-weight: 600; color: #6B6480; line-height: 1.6; }
        @media (min-width: 640px) { .sc-activities-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .sc-activities-grid { grid-template-columns: repeat(4, 1fr); } }
        .sc-pillars { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        .sc-pillar { background-color: #ffffff; border-radius: 24px; padding: 1.75rem; box-shadow: 0 10px 24px rgba(63,58,82,0.06); }
        .sc-pillar-icon { width: 48px; height: 48px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        .sc-pillar-icon svg { width: 24px; height: 24px; stroke-width: 2.25; }
        .sc-pillar-title { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.85rem; }
        .sc-pillar-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .sc-pillar-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 600; color: #6B6480; }
        .sc-pillar-item svg { width: 15px; height: 15px; flex-shrink: 0; stroke-width: 2.5; }
        @media (min-width: 640px) { .sc-pillars { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .sc-pillars { grid-template-columns: repeat(4, 1fr); } }
        .sc-attractions-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        .sc-attraction-card { display: flex; gap: 1rem; background-color: #ffffff; border-radius: 22px; padding: 1.5rem; box-shadow: 0 8px 20px rgba(63,58,82,0.05); }
        .sc-attraction-icon { width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background-color: #FFEADB; }
        .sc-attraction-icon svg { width: 22px; height: 22px; color: #FF8A3D; stroke-width: 2.25; }
        .sc-attraction-title { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 0.3rem; }
        .sc-attraction-text { font-size: 0.85rem; font-weight: 600; color: #6B6480; line-height: 1.55; }
        @media (min-width: 640px) { .sc-attractions-grid { grid-template-columns: 1fr 1fr; } }
        .sc-lightbox { position: fixed; inset: 0; z-index: 100; background-color: rgba(63,58,82,0.85); display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
        .sc-lightbox-img { max-width: 90vw; max-height: 85vh; border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
        .sc-lightbox-close { position: absolute; top: 1.25rem; right: 1.25rem; width: 42px; height: 42px; border-radius: 9999px; background-color: #ffffff; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; }
        .sc-lightbox-close svg { width: 20px; height: 20px; color: #3F3A52; stroke-width: 2.5; }
        .sc-seats-banner { max-width: 72rem; margin: 0 auto 1rem; padding: 0 1.25rem; }
        .sc-seats-inner { display: flex; align-items: center; gap: 0.75rem; background-color: #FFEADB; border-radius: 18px; padding: 1rem 1.25rem; font-weight: 700; font-size: 0.9rem; color: #B85B00; }
        .sc-seats-inner svg { width: 22px; height: 22px; color: #FF8A3D; flex-shrink: 0; stroke-width: 2.25; }
        .sc-cta { max-width: 56rem; margin: 0 auto; padding: 1rem 1.25rem 4.5rem; text-align: center; }
        .sc-cta-box { background-color: #ffffff; border-radius: 32px; padding: 2.75rem 2rem; box-shadow: 0 12px 30px rgba(63,58,82,0.07); }
        .sc-cta-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.6rem; margin-bottom: 0.6rem; }
        .sc-cta-text { font-weight: 600; color: #6B6480; margin-bottom: 1.6rem; }
        .sc-cta-buttons-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
      `}</style>

      <div className="sc-page">
        <section className="sc-hero">
          <div className="sc-hero-inner">
            <div className="sc-blob">
              <div className="sc-blob-ring" />
              <div className="sc-blob-shape">
                <img src="/summercamp.webp" alt="Phulwari Summer Camp"  loading="lazy" decoding="async" />
              </div>
              <span className="sc-blob-dot sc-blob-dot-1" />
              <span className="sc-blob-dot sc-blob-dot-2" />
            </div>
            <div>
              <span className="sc-badge">Summer Camp</span>
              <h1 className="sc-title">Learn, Play, Explore <span>& Grow This Summer</span></h1>
              <p className="sc-description">
                A perfect blend of learning, creativity, fitness, sports and fun-filled activities.
                Children build confidence, communication skills, creativity, teamwork and leadership
                while making new friends and creating lasting memories.
              </p>
              <div className="sc-cta-buttons">
                <a href="https://wa.me/916207368839?text=%F0%9F%8C%BC%20Hi%20Phulwari!%20I%27d%20like%20to%20register%20my%20child%20for%20the%20*Summer%20Camp*.%0A%0APlease%20share%20the%20details%20%E2%80%94%20dates%2C%20timings%2C%20fees%20and%20availability.%20%F0%9F%8F%95%EF%B8%8F" target="_blank" rel="noopener noreferrer" className="sc-cta-button btn-register">
                  <Tent />
                  <span>Register Now</span>
                </a>
                <a href="tel:+916207368839" className="sc-cta-button btn-call">
                  <Phone />
                  <span>Call Now</span>
                </a>
                <a href="https://wa.me/916207368839?text=%F0%9F%8C%BC%20Hi%20Phulwari!%20I%27d%20like%20to%20register%20my%20child%20for%20the%20*Summer%20Camp*.%0A%0APlease%20share%20the%20details%20%E2%80%94%20dates%2C%20timings%2C%20fees%20and%20availability.%20%F0%9F%8F%95%EF%B8%8F" target="_blank" rel="noopener noreferrer" className="sc-cta-button btn-whatsapp">
                  <MessageCircle />
                  <span>WhatsApp Now</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="sc-seats-banner">
          <div className="sc-seats-inner">
            <Tent />
            <span>Limited Seats Available — Register early to secure your child&apos;s place.</span>
          </div>
        </div>

        <section className="sc-section">
          <div className="sc-section-head">
            <h2 className="sc-section-title">Why Join <span>Our Summer Camp?</span></h2>
            <p className="sc-section-text">Every day at Phulwari Summer Camp is filled with exciting opportunities that encourage learning through fun and participation.</p>
          </div>
          <div className="sc-benefits-grid">
            {campBenefits.map((b, i) => { const Icon = b.icon; return (<div className="sc-benefit-item" key={i}><Icon /><span>{b.text}</span></div>); })}
          </div>
        </section>

        <section className="sc-section">
          <div className="sc-section-head">
            <h2 className="sc-section-title">Activities <span>Included</span></h2>
          </div>
          <div className="sc-activities-grid">
            {campActivities.map((a, i) => { const Icon = a.icon; return (<div className="sc-activity-card" key={i}><div className="sc-activity-icon" style={{ backgroundColor: a.bg }}><Icon style={{ color: a.color }} /></div><h3 className="sc-activity-title">{a.title}</h3><p className="sc-activity-text">{a.text}</p></div>); })}
          </div>
        </section>

        <section className="sc-section">
          <div className="sc-section-head">
            <h2 className="sc-section-title">What Children <span>Will Learn</span></h2>
          </div>
          <div className="sc-pillars">
            {learningPillars.map((pillar, index) => { const Icon = pillar.icon; return (<div className="sc-pillar" key={index}><div className="sc-pillar-icon" style={{ backgroundColor: pillar.bg }}><Icon style={{ color: pillar.color }} /></div><h3 className="sc-pillar-title">{pillar.title}</h3><div className="sc-pillar-list">{pillar.items.map((item, i) => (<div className="sc-pillar-item" key={i}><CheckCircle2 style={{ color: pillar.color }} /><span>{item}</span></div>))}</div></div>); })}
          </div>
        </section>

        <section className="sc-section">
          <div className="sc-section-head">
            <h2 className="sc-section-title">Special Summer Camp <span>Attractions</span></h2>
          </div>
          <div className="sc-attractions-grid">
            {attractions.map((a, i) => { const Icon = a.icon; return (<div className="sc-attraction-card" key={i}><div className="sc-attraction-icon"><Icon /></div><div><h3 className="sc-attraction-title">{a.title}</h3><p className="sc-attraction-text">{a.text}</p></div></div>); })}
          </div>
        </section>

        <section className="sc-section">
          <div className="sc-section-head">
            <h2 className="sc-section-title">Why Parents Choose <span>Our Summer Camp</span></h2>
          </div>
          <div className="sc-benefits-grid">
            {parentFavorites.map((item, i) => (<div className="sc-benefit-item" key={i}><ShieldCheck style={{ color: '#34B36B' }} /><span>{item}</span></div>))}
          </div>
        </section>

        <section className="sc-cta">
          <div className="sc-cta-box">
            <Tent style={{ width: 36, height: 36, color: '#34B36B', marginBottom: 12 }} />
            <h2 className="sc-cta-title">Register for Summer Camp Today</h2>
            <p className="sc-cta-text">Give your child a summer filled with learning, creativity, confidence, friendships and unforgettable memories.</p>
            <div className="sc-cta-buttons-row">
              <a href="https://wa.me/916207368839?text=%F0%9F%8C%BC%20Hi%20Phulwari!%20I%27d%20like%20to%20register%20my%20child%20for%20the%20*Summer%20Camp*.%0A%0APlease%20share%20the%20details%20%E2%80%94%20dates%2C%20timings%2C%20fees%20and%20availability.%20%F0%9F%8F%95%EF%B8%8F" target="_blank" rel="noopener noreferrer" className="sc-cta-button btn-register">
                <Tent />
                <span>Register Now</span>
              </a>
              <a href="tel:+916207368839" className="sc-cta-button btn-call">
                <Phone />
                <span>Call Now</span>
              </a>
              <a href="https://wa.me/916207368839?text=%F0%9F%8C%BC%20Hi%20Phulwari!%20I%27d%20like%20to%20register%20my%20child%20for%20the%20*Summer%20Camp*.%0A%0APlease%20share%20the%20details%20%E2%80%94%20dates%2C%20timings%2C%20fees%20and%20availability.%20%F0%9F%8F%95%EF%B8%8F" target="_blank" rel="noopener noreferrer" className="sc-cta-button btn-whatsapp">
                <MessageCircle />
                <span>WhatsApp Now</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {lightboxImg && (
        <div className="sc-lightbox" onClick={() => setLightboxImg(null)}>
          <button className="sc-lightbox-close" onClick={() => setLightboxImg(null)}><X /></button>
          <img className="sc-lightbox-img" src={lightboxImg} alt="Summer camp moment"  loading="lazy" decoding="async" />
        </div>
      )}
    </>
  );
}