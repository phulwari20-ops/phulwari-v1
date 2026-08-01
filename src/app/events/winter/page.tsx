'use client';

import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Snowflake,
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
  Drama,
  PartyPopper,
  Mic2,
  Handshake,
  Gift,
  ScrollText,
  CheckCircle2,
  ShieldCheck,
  X,
} from 'lucide-react';

const campBenefits = [
  { icon: Dumbbell, text: 'Keeps Children Active During Holidays' },
  { icon: Sparkles, text: 'Encourages Creativity & Innovation' },
  { icon: Smile, text: 'Builds Confidence' },
  { icon: Users2, text: 'Improves Social Skills' },
  { icon: Handshake, text: 'Promotes Teamwork' },
  { icon: Mic2, text: 'Enhances Communication Skills' },
  { icon: Heart, text: 'Creates Positive Learning Experiences' },
  { icon: MonitorOff, text: 'Reduces Excessive Screen Time' },
];

const campActivities = [
  { icon: Palette, title: 'Art & Craft Sessions', text: 'Creative activities that encourage imagination, artistic expression and hands-on learning through exciting projects.', color: '#34B36B', bg: '#E3F7EA' },
  { icon: Smile, title: 'Dance & Fun Movement', text: 'Energetic dance sessions that improve flexibility, confidence, coordination and physical fitness.', color: '#FF4D8D', bg: '#FFE6EF' },
  { icon: Music4, title: 'Music & Entertainment', text: 'Interactive music sessions that inspire creativity, rhythm, self-expression and enjoyment.', color: '#3D8BFF', bg: '#E5EFFF' },
  { icon: Footprints, title: 'Gymnastics & Fitness', text: 'Physical exercises and fun activities designed to improve strength, balance, flexibility and overall fitness.', color: '#E8A621', bg: '#FFF3D9' },
  { icon: Trophy, title: 'Sports & Indoor Games', text: 'Exciting sports and team-based games that encourage healthy competition, teamwork and sportsmanship.', color: '#8B5CF6', bg: '#EFE7FE' },
  { icon: Brain, title: 'Yoga & Wellness', text: 'Simple yoga practices that help children improve focus, relaxation, flexibility and emotional well-being.', color: '#FF8A3D', bg: '#FFEADB' },
  { icon: Drama, title: 'Creative Learning Activities', text: 'Interactive sessions focused on imagination, problem-solving, creativity and skill development.', color: '#3D8BFF', bg: '#E5EFFF' },
  { icon: PartyPopper, title: 'Fun Group Activities', text: 'Engaging games, challenges and team-building exercises that make learning enjoyable and memorable.', color: '#FF4D8D', bg: '#FFE6EF' },
];

const learningPillars = [
  { title: 'Physical Development', color: '#34B36B', bg: '#E3F7EA', icon: Dumbbell, items: ['Better Fitness', 'Improved Coordination', 'Enhanced Flexibility', 'Healthy Lifestyle Habits'] },
  { title: 'Creative Development', color: '#FF4D8D', bg: '#FFE6EF', icon: Palette, items: ['Creative Thinking', 'Artistic Skills', 'Innovation', 'Imagination'] },
  { title: 'Social Development', color: '#3D8BFF', bg: '#E5EFFF', icon: Users2, items: ['Teamwork', 'Communication Skills', 'Friendship Building', 'Leadership Skills'] },
  { title: 'Personal Development', color: '#8B5CF6', bg: '#EFE7FE', icon: Sparkles, items: ['Confidence', 'Discipline', 'Self-Expression', 'Positive Attitude'] },
];

const highlights = [
  { icon: Mic2, title: 'Talent Showcase', text: 'Children get an opportunity to showcase their talents, creativity and achievements in a supportive environment.' },
  { icon: Trophy, title: 'Fun Competitions', text: 'Exciting competitions designed to encourage participation, confidence and healthy learning experiences.' },
  { icon: Handshake, title: 'Team Challenges', text: 'Interactive group activities that promote collaboration, leadership, communication and teamwork.' },
  { icon: Gift, title: 'Festival Celebrations', text: 'Special winter-themed celebrations, festive events and joyful activities that create memorable experiences.' },
  { icon: ScrollText, title: 'Participation Certificate', text: 'Every participant receives a Winter Camp Participation Certificate upon successful completion.' },
];

const parentFavorites = [
  'Safe & Secure Environment',
  'Experienced Trainers',
  'Learning Through Fun',
  'Engaging Holiday Activities',
  'Skill Development Opportunities',
  'Positive & Friendly Atmosphere',
  'Focus on Overall Growth',
  'Balanced Learning & Recreation',
];

export default function WinterCampPage() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');
        @keyframes blobFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-16px) rotate(1.5deg); } }
        @keyframes blobMorph { 0%, 100% { border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%; } 50% { border-radius: 42% 58% 62% 38% / 40% 62% 38% 60%; } }
        @media (prefers-reduced-motion: reduce) { .wc-blob, .wc-blob-shape { animation: none !important; } }
        .wc-page { background-color: #F3F8FF; font-family: 'Quicksand', sans-serif; color: #3F3A52; }
        .wc-hero { max-width: 72rem; margin: 0 auto; padding: 3.5rem 1.25rem 1rem; }
        .wc-hero-inner { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: center; background-color: #ffffff; border-radius: 32px; padding: 2rem; box-shadow: 0 12px 30px rgba(63,58,82,0.06); }
        .wc-blob { position: relative; width: 100%; max-width: 20rem; margin: 0 auto; aspect-ratio: 1/1; animation: blobFloat 7s ease-in-out infinite; }
        .wc-blob-shape { position: absolute; inset: 0; overflow: hidden; animation: blobMorph 9s ease-in-out infinite; box-shadow: 0 18px 36px rgba(0,0,0,0.12); }
        .wc-blob-shape img { width: 100%; height: 100%; object-fit: cover; }
        .wc-blob-ring { position: absolute; inset: -14px; border: 3px dashed #BFE0FF; border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%; opacity: 0.7; }
        .wc-blob-dot { position: absolute; width: 16px; height: 16px; border-radius: 9999px; }
        .wc-blob-dot-1 { top: -6px; right: 14%; background-color: #3D8BFF; }
        .wc-blob-dot-2 { bottom: 6%; left: -10px; background-color: #BFE0FF; }
        .wc-badge { display: inline-flex; align-self: flex-start; padding: 0.5rem 1.2rem; margin-bottom: 1rem; background-color: #E5EFFF; color: #3D8BFF; border-radius: 9999px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; }
        .wc-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 2.1rem; line-height: 1.16; margin-bottom: 1rem; }
        .wc-title span { color: #3D8BFF; }
        .wc-description { font-weight: 600; font-size: 1rem; line-height: 1.75; color: #6B6480; margin-bottom: 1.5rem; max-width: 36rem; }
        .wc-cta-buttons { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .wc-cta-button { display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.85rem 1.6rem; border: none; color: #ffffff; font-weight: 700; font-size: 0.92rem; font-family: 'Quicksand', sans-serif; border-radius: 9999px; cursor: pointer; transition: transform 0.15s ease; box-shadow: 0 4px 10px rgba(0,0,0,0.08); text-decoration: none; }
        .wc-cta-button:hover { transform: translateY(-2px); }
        .wc-cta-button svg { width: 18px; height: 18px; stroke: #ffffff; stroke-width: 2.25; }
        .btn-register { background-color: #3D8BFF; }
        .btn-call { background-color: #FF4D8D; }
        .btn-whatsapp { background-color: #34B36B; }
        @media (min-width: 1024px) { .wc-hero-inner { grid-template-columns: 0.85fr 1.15fr; gap: 3rem; padding: 3rem; } .wc-blob { max-width: 23rem; } .wc-title { font-size: 2.5rem; } }
        .wc-section { max-width: 72rem; margin: 0 auto; padding: 3rem 1.25rem; }
        .wc-section-head { text-align: center; max-width: 42rem; margin: 0 auto 2.25rem; }
        .wc-section-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.9rem; margin-bottom: 0.6rem; }
        .wc-section-title span { color: #3D8BFF; }
        .wc-section-text { font-weight: 600; color: #6B6480; line-height: 1.6; }
        .wc-benefits-grid { display: grid; grid-template-columns: 1fr; gap: 0.75rem; }
        .wc-benefit-item { display: flex; align-items: center; gap: 0.6rem; background-color: #ffffff; border-radius: 16px; padding: 0.9rem 1.1rem; box-shadow: 0 6px 16px rgba(63,58,82,0.05); font-weight: 700; font-size: 0.88rem; }
        .wc-benefit-item svg { width: 18px; height: 18px; flex-shrink: 0; color: #3D8BFF; stroke-width: 2.5; }
        @media (min-width: 640px) { .wc-benefits-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .wc-benefits-grid { grid-template-columns: repeat(4, 1fr); } }
        .wc-activities-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        .wc-activity-card { background-color: #ffffff; border-radius: 24px; padding: 1.75rem; box-shadow: 0 10px 24px rgba(63,58,82,0.06); }
        .wc-activity-icon { width: 48px; height: 48px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        .wc-activity-icon svg { width: 24px; height: 24px; stroke-width: 2.25; }
        .wc-activity-title { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.5rem; }
        .wc-activity-text { font-size: 0.88rem; font-weight: 600; color: #6B6480; line-height: 1.6; }
        @media (min-width: 640px) { .wc-activities-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .wc-activities-grid { grid-template-columns: repeat(4, 1fr); } }
        .wc-pillars { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        .wc-pillar { background-color: #ffffff; border-radius: 24px; padding: 1.75rem; box-shadow: 0 10px 24px rgba(63,58,82,0.06); }
        .wc-pillar-icon { width: 48px; height: 48px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        .wc-pillar-icon svg { width: 24px; height: 24px; stroke-width: 2.25; }
        .wc-pillar-title { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.85rem; }
        .wc-pillar-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .wc-pillar-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 600; color: #6B6480; }
        .wc-pillar-item svg { width: 15px; height: 15px; flex-shrink: 0; stroke-width: 2.5; }
        @media (min-width: 640px) { .wc-pillars { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .wc-pillars { grid-template-columns: repeat(4, 1fr); } }
        .wc-highlights-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        .wc-highlight-card { display: flex; gap: 1rem; background-color: #ffffff; border-radius: 22px; padding: 1.5rem; box-shadow: 0 8px 20px rgba(63,58,82,0.05); }
        .wc-highlight-icon { width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background-color: #E5EFFF; }
        .wc-highlight-icon svg { width: 22px; height: 22px; color: #3D8BFF; stroke-width: 2.25; }
        .wc-highlight-title { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 1rem; margin-bottom: 0.3rem; }
        .wc-highlight-text { font-size: 0.85rem; font-weight: 600; color: #6B6480; line-height: 1.55; }
        @media (min-width: 640px) { .wc-highlights-grid { grid-template-columns: 1fr 1fr; } }
        .wc-lightbox { position: fixed; inset: 0; z-index: 100; background-color: rgba(63,58,82,0.85); display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
        .wc-lightbox-img { max-width: 90vw; max-height: 85vh; border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
        .wc-lightbox-close { position: absolute; top: 1.25rem; right: 1.25rem; width: 42px; height: 42px; border-radius: 9999px; background-color: #ffffff; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; }
        .wc-lightbox-close svg { width: 20px; height: 20px; color: #3F3A52; stroke-width: 2.5; }
        .wc-seats-banner { max-width: 72rem; margin: 0 auto 1rem; padding: 0 1.25rem; }
        .wc-seats-inner { display: flex; align-items: center; gap: 0.75rem; background-color: #E5EFFF; border-radius: 18px; padding: 1rem 1.25rem; font-weight: 700; font-size: 0.9rem; color: #2563C9; }
        .wc-seats-inner svg { width: 22px; height: 22px; color: #3D8BFF; flex-shrink: 0; stroke-width: 2.25; }
        .wc-cta { max-width: 56rem; margin: 0 auto; padding: 1rem 1.25rem 4.5rem; text-align: center; }
        .wc-cta-box { background-color: #ffffff; border-radius: 32px; padding: 2.75rem 2rem; box-shadow: 0 12px 30px rgba(63,58,82,0.07); }
        .wc-cta-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.6rem; margin-bottom: 0.6rem; }
        .wc-cta-text { font-weight: 600; color: #6B6480; margin-bottom: 1.6rem; }
        .wc-cta-buttons-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
      `}</style>

      <div className="wc-page">
        <section className="wc-hero">
          <div className="wc-hero-inner">
            <div className="wc-blob">
              <div className="wc-blob-ring" />
              <div className="wc-blob-shape">
                <img src="/wintercamp.webp" alt="Phulwari Winter Camp" />
              </div>
              <span className="wc-blob-dot wc-blob-dot-1" />
              <span className="wc-blob-dot wc-blob-dot-2" />
            </div>
            <div>
              <span className="wc-badge">Winter Camp</span>
              <h1 className="wc-title">Learn, Create <span>& Enjoy This Winter</span></h1>
              <p className="wc-description">
                Exciting activities, creative workshops, games, fitness sessions and skill-building
                experiences that keep children active, creative and engaged during the holiday
                season — all in a safe and joyful environment.
              </p>
              <div className="wc-cta-buttons">
                <a href="https://wa.me/916207368839?text=%E2%9D%84%EF%B8%8F%20Hi%20Phulwari!%20I%27d%20like%20to%20register%20my%20child%20for%20the%20*Winter%20Camp*.%0A%0APlease%20share%20the%20details%20%E2%80%94%20dates%2C%20timings%2C%20fees%20and%20availability.%20%F0%9F%8E%BF" target="_blank" rel="noopener noreferrer" className="wc-cta-button btn-register">
                  <Snowflake />
                  <span>Register Now</span>
                </a>
                <a href="tel:+916207368839" className="wc-cta-button btn-call">
                  <Phone />
                  <span>Call Now</span>
                </a>
                <a href="https://wa.me/916207368839?text=%E2%9D%84%EF%B8%8F%20Hi%20Phulwari!%20I%27d%20like%20to%20register%20my%20child%20for%20the%20*Winter%20Camp*.%0A%0APlease%20share%20the%20details%20%E2%80%94%20dates%2C%20timings%2C%20fees%20and%20availability.%20%F0%9F%8E%BF" target="_blank" rel="noopener noreferrer" className="wc-cta-button btn-whatsapp">
                  <MessageCircle />
                  <span>WhatsApp Now</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="wc-seats-banner">
          <div className="wc-seats-inner">
            <Snowflake />
            <span>Limited Seats Available — Reserve your child&apos;s spot today.</span>
          </div>
        </div>

        <section className="wc-section">
          <div className="wc-section-head">
            <h2 className="wc-section-title">Why Join <span>Our Winter Camp?</span></h2>
            <p className="wc-section-text">Winter vacations should be more than just staying indoors. Our camp encourages children to stay active, explore new interests and build valuable life skills.</p>
          </div>
          <div className="wc-benefits-grid">
            {campBenefits.map((b, i) => { const Icon = b.icon; return (<div className="wc-benefit-item" key={i}><Icon /><span>{b.text}</span></div>); })}
          </div>
        </section>

        <section className="wc-section">
          <div className="wc-section-head">
            <h2 className="wc-section-title">Activities <span>Included</span></h2>
          </div>
          <div className="wc-activities-grid">
            {campActivities.map((a, i) => { const Icon = a.icon; return (<div className="wc-activity-card" key={i}><div className="wc-activity-icon" style={{ backgroundColor: a.bg }}><Icon style={{ color: a.color }} /></div><h3 className="wc-activity-title">{a.title}</h3><p className="wc-activity-text">{a.text}</p></div>); })}
          </div>
        </section>

        <section className="wc-section">
          <div className="wc-section-head">
            <h2 className="wc-section-title">What Children <span>Will Gain</span></h2>
          </div>
          <div className="wc-pillars">
            {learningPillars.map((pillar, index) => { const Icon = pillar.icon; return (<div className="wc-pillar" key={index}><div className="wc-pillar-icon" style={{ backgroundColor: pillar.bg }}><Icon style={{ color: pillar.color }} /></div><h3 className="wc-pillar-title">{pillar.title}</h3><div className="wc-pillar-list">{pillar.items.map((item, i) => (<div className="wc-pillar-item" key={i}><CheckCircle2 style={{ color: pillar.color }} /><span>{item}</span></div>))}</div></div>); })}
          </div>
        </section>

        <section className="wc-section">
          <div className="wc-section-head">
            <h2 className="wc-section-title">Special Winter Camp <span>Highlights</span></h2>
          </div>
          <div className="wc-highlights-grid">
            {highlights.map((h, i) => { const Icon = h.icon; return (<div className="wc-highlight-card" key={i}><div className="wc-highlight-icon"><Icon /></div><div><h3 className="wc-highlight-title">{h.title}</h3><p className="wc-highlight-text">{h.text}</p></div></div>); })}
          </div>
        </section>

        <section className="wc-section">
          <div className="wc-section-head">
            <h2 className="wc-section-title">Why Parents Love <span>Our Winter Camp</span></h2>
          </div>
          <div className="wc-benefits-grid">
            {parentFavorites.map((item, i) => (<div className="wc-benefit-item" key={i}><ShieldCheck style={{ color: '#3D8BFF' }} /><span>{item}</span></div>))}
          </div>
        </section>

        <section className="wc-cta">
          <div className="wc-cta-box">
            <Snowflake style={{ width: 36, height: 36, color: '#3D8BFF', marginBottom: 12 }} />
            <h2 className="wc-cta-title">Register for Winter Camp Today</h2>
            <p className="wc-cta-text">Give your child a winter vacation filled with learning, creativity, friendship, confidence and fun.</p>
            <div className="wc-cta-buttons-row">
              <a href="https://wa.me/916207368839?text=%E2%9D%84%EF%B8%8F%20Hi%20Phulwari!%20I%27d%20like%20to%20register%20my%20child%20for%20the%20*Winter%20Camp*.%0A%0APlease%20share%20the%20details%20%E2%80%94%20dates%2C%20timings%2C%20fees%20and%20availability.%20%F0%9F%8E%BF" target="_blank" rel="noopener noreferrer" className="wc-cta-button btn-register">
                <Snowflake />
                <span>Register Now</span>
              </a>
              <a href="tel:+916207368839" className="wc-cta-button btn-call">
                <Phone />
                <span>Call Now</span>
              </a>
              <a href="https://wa.me/916207368839?text=%E2%9D%84%EF%B8%8F%20Hi%20Phulwari!%20I%27d%20like%20to%20register%20my%20child%20for%20the%20*Winter%20Camp*.%0A%0APlease%20share%20the%20details%20%E2%80%94%20dates%2C%20timings%2C%20fees%20and%20availability.%20%F0%9F%8E%BF" target="_blank" rel="noopener noreferrer" className="wc-cta-button btn-whatsapp">
                <MessageCircle />
                <span>WhatsApp Now</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {lightboxImg && (
        <div className="wc-lightbox" onClick={() => setLightboxImg(null)}>
          <button className="wc-lightbox-close" onClick={() => setLightboxImg(null)}><X /></button>
          <img className="wc-lightbox-img" src={lightboxImg} alt="Winter camp moment" />
        </div>
      )}
    </>
  );
}