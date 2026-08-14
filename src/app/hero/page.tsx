'use client';

import React, { useEffect, useState } from 'react';
import {
  Phone,
  MessageCircle,
  Cake,
  Shield,
  Users,
  Zap,
  Dumbbell,
  Tent,
  Gift,
  Sparkles,
  Star,
  ChevronDown,
} from 'lucide-react';

const PROGRAMS = ['Summer Camp', 'Birthday Parties', 'Mom Fitness Sessions', 'Daily Play Hours'];

export default function HeroPage() {
  const backgroundImage = 'herobg.webp';
  const [programIndex, setProgramIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgramIndex((i) => (i + 1) % PROGRAMS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const features = [
    { icon: Shield, label: 'Safe & Child-Friendly', color: '#34B36B', bg: '#E3F7EA' },
    { icon: Users, label: 'Experienced Trainers', color: '#3D8BFF', bg: '#E5EFFF' },
    { icon: Zap, label: 'Activity-Based Learning', color: '#E8A621', bg: '#FFF3D9' },
    { icon: Dumbbell, label: 'Mother Fitness Programs', color: '#FF4D8D', bg: '#FFE6EF' },
    { icon: Tent, label: 'Summer & Winter Camps', color: '#8B5CF6', bg: '#EFE7FE' },
    { icon: Gift, label: 'Birthday Celebrations', color: '#FF8A3D', bg: '#FFEADB' },
  ];

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; scroll-behavior: smooth; }

        body {
          font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #3F3A52;
        }

        h1 {
          font-family: 'Baloo 2', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 800;
          line-height: 1.05;
        }

        .sr-only {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* ---------- Section shell ---------- */
        .hero-container {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background-color: #FFF7EC;
          background-image: radial-gradient(#EADFC8 1.4px, transparent 1.4px);
          background-size: 26px 26px;
          padding-bottom: 40px; /* room for the scalloped edge */
        }

        /* Signature detail: a soft scalloped edge, like a torn-paper cloud,
           closing out the section instead of a flat line. */
        .hero-container::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 40px;
          background: #ffffff;
        }

        /* ---------- Floating decoration ---------- */
        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        }
        .hero-blob--pink { top: -60px; left: -60px; width: 280px; height: 280px; background: #FFCBE0; animation: blob-float 9s ease-in-out infinite; }
        .hero-blob--blue { top: 10%; right: 4%; width: 320px; height: 320px; background: #CFE3FF; animation: blob-float 11s ease-in-out infinite -3s; }
        .hero-blob--yellow { bottom: 8%; left: 6%; width: 220px; height: 220px; background: #FFE9B3; animation: blob-float 8s ease-in-out infinite -1.5s; }

        .hero-sparkle { position: absolute; pointer-events: none; z-index: 1; }
        .hero-sparkle--1 { top: 6%; left: 46%; color: #FFD166; animation: sparkle-spin 6s linear infinite; }
        .hero-sparkle--2 { top: 78%; left: 38%; color: #34B36B; animation: blob-float 5s ease-in-out infinite -2s; }
        .hero-sparkle--3 { top: 16%; left: 58%; color: #FF4D8D; animation: sparkle-spin 7s linear infinite reverse; }

        @keyframes blob-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes sparkle-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.15); }
          100% { transform: rotate(360deg) scale(1); }
        }

        /* ---------- Content shell & grid ---------- */
        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 1.25rem;
        }

        .hero-grid {
          max-width: 80rem;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.75rem;
          align-items: center;
        }

        .hero-text-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          order: 1;
        }

        .hero-badges-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }

        .hero-google-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.2rem;
          background-color: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #334155;
          text-decoration: none;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
          align-self: flex-start;
          margin-bottom: 1.25rem;
        }

        .hero-google-badge:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        /* ---------- Badge ---------- */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          align-self: flex-start;
          margin-bottom: 1.25rem;
          padding: 0.5rem 1.2rem;
          background-color: #FFD166;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 700;
          color: #6B4500;
          letter-spacing: 0.04em;
        }
        .hero-badge svg { flex-shrink: 0; }

        /* ---------- Title ---------- */
        .hero-title {
          margin-bottom: 1.1rem;
          font-size: clamp(4.25rem, 6.5vw + 2rem, 4.25rem);
          letter-spacing: -0.01em;
        }

        .hero-title-line { display: block; }
        .text-pink { color: #FF4D8D; }
        .text-blue { color: #3D8BFF; }
        .underline-squiggle {
          text-decoration: underline;
          text-decoration-style: wavy;
          text-decoration-thickness: 3px;
          text-underline-offset: 7px;
        }

        /* ---------- Description ---------- */
        .hero-description {
          margin-bottom: 1.5rem;
          font-size: 1rem;
          line-height: 1.6;
          color: #6B6480;
          max-width: 34rem;
          font-weight: 600;
        }

        /* ---------- Buttons ---------- */
        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .hero-button {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.85rem 1.5rem;
          border: none;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          font-family: 'Quicksand', sans-serif;
          border-radius: 9999px;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }

        .hero-button:nth-child(odd):hover { transform: translateY(-3px) rotate(-1.5deg); box-shadow: 0 8px 16px rgba(0,0,0,0.12); }
        .hero-button:nth-child(even):hover { transform: translateY(-3px) rotate(1.5deg); box-shadow: 0 8px 16px rgba(0,0,0,0.12); }
        .hero-button:active { transform: scale(0.96); }
        .hero-button:focus-visible { outline: 3px solid #3F3A52; outline-offset: 3px; }
        .hero-button svg { width: 18px; height: 18px; stroke: #ffffff; stroke-width: 2.25; }

        .btn-call { background-color: #FF4D8D; }
        .btn-whatsapp { background-color: #34B36B; }
        .btn-birthday { background-color: #FF8A3D; }

        /* ---------- Ticker ---------- */
        .hero-ticker {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
          padding: 0.45rem 0.9rem 0.45rem 0.7rem;
          background-color: #ffffff;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #6B6480;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
        .hero-ticker-dot {
          width: 8px; height: 8px;
          border-radius: 9999px;
          background: #34B36B;
          animation: pulse-dot 1.6s ease-in-out infinite;
        }
        .hero-ticker-word {
          color: #FF4D8D;
          font-weight: 800;
          animation: ticker-pop 0.35s ease;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes ticker-pop {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ---------- Features ---------- */
        .hero-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.65rem;
          width: 100%;
        }

        .hero-feature {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.55rem 0.85rem 0.55rem 0.5rem;
          background-color: #ffffff;
          border-radius: 9999px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          animation: feature-pop 0.45s ease backwards;
          animation-delay: var(--delay, 0s);
        }
        .hero-feature:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 18px rgba(0,0,0,0.1); }
        .hero-feature:hover .hero-feature-icon { animation: icon-bounce 0.5s ease; }

        @keyframes feature-pop {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes icon-bounce {
          0%, 100% { transform: translateY(0); }
          30% { transform: translateY(-3px); }
          60% { transform: translateY(1px); }
        }

        .hero-feature-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-feature-icon svg { width: 14px; height: 14px; stroke-width: 2.25; }

        .hero-feature-text {
          font-size: 0.74rem;
          font-weight: 700;
          line-height: 1.25;
        }

        /* ---------- Illustration column ---------- */
        .hero-illustration-col {
          position: relative;
          order: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 320px;
        }

        .hero-illustration-blob {
          position: absolute;
          inset: 6% 8%;
          z-index: 0;
          background: linear-gradient(135deg, #FFE3EE 0%, #FFF3D9 50%, #E5EFFF 100%);
          border-radius: 58% 42% 65% 35% / 45% 55% 45% 55%;
        }

        .hero-illustration-img {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 26rem;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 18px 24px rgba(63, 58, 82, 0.18));
          transition: transform 0.4s ease;
        }
        .hero-illustration-col:hover .hero-illustration-img { transform: rotate(-1.5deg) scale(1.03); }

        .hero-sticker {
          position: absolute;
          bottom: 4%;
          left: 2%;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.9rem;
          background-color: #ffffff;
          border-radius: 9999px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          font-size: 0.72rem;
          font-weight: 700;
          color: #3F3A52;
          transform: rotate(-4deg);
        }
        .hero-sticker svg { color: #FFD166; fill: #FFD166; flex-shrink: 0; }

        /* ---------- Scroll cue ---------- */
        .hero-scroll-cue {
          display: none;
          position: absolute;
          left: 50%;
          bottom: 52px;
          transform: translateX(-50%);
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 9999px;
          background-color: #ffffff;
          color: #6B6480;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          cursor: pointer;
          z-index: 10;
          animation: bob 1.8s ease-in-out infinite;
        }
        .hero-scroll-cue:focus-visible { outline: 3px solid #3F3A52; outline-offset: 3px; }
        @keyframes bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        /* ---------- Responsive ---------- */
        @media (min-width: 480px) {
          .hero-features { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 640px) {
          .hero-badge { font-size: 0.8rem; padding: 0.55rem 1.4rem; }
          .hero-description { font-size: 1.1rem; margin-bottom: 1.75rem; }
          .hero-feature-text { font-size: 0.85rem; }
          .hero-features { grid-template-columns: repeat(3, 1fr); }
          .hero-scroll-cue { display: flex; }
        }

        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1.05fr 0.95fr; gap: 3rem; }
          .hero-text-col { max-width: 100%; }
          .hero-illustration-col { min-height: 460px; }
        }

        @media (max-width: 1023px) {
          .hero-illustration-img { max-width: 22rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-container *,
          .hero-container *::after,
          .hero-container *::before {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <section className="hero-container">
        <span className="hero-blob hero-blob--pink" aria-hidden="true" />
        <span className="hero-blob hero-blob--blue" aria-hidden="true" />
        <span className="hero-blob hero-blob--yellow" aria-hidden="true" />
        <Star className="hero-sparkle hero-sparkle--1" size={20} fill="#FFD166" aria-hidden="true" />
        <Sparkles className="hero-sparkle hero-sparkle--2" size={22} aria-hidden="true" />
        <Star className="hero-sparkle hero-sparkle--3" size={16} fill="#FF4D8D" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-grid">
            <div className="hero-text-col">
              <div className="hero-badges-wrapper">
                <div className="hero-badge" style={{ marginBottom: 0 }}>
                  <Sparkles size={14} />
                  <span>Phulwari Mother & Child Activity Centre</span>
                </div>
                <a
                  href="https://www.google.com/search?q=phulwari+mother+and+child+activity+centre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-google-badge"
                  style={{ marginBottom: 0 }}
                  title="Verified 4.9 Star Rating on Google Reviews"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontWeight: 800, color: '#1e293b' }}>4.9</span>
                    <span style={{ color: '#fbbf24' }}>★★★★★</span>
                    <span style={{ color: '#94a3b8', fontWeight: 500, fontSize: '10px' }}>(Google)</span>
                  </div>
                </a>
              </div>

              <h1 className="hero-title">
                <span className="hero-title-line">
                  Where Kids <span className="text-pink underline-squiggle">Play</span>
                </span>
                <span className="hero-title-line">
                  &amp; Moms <span className="text-blue underline-squiggle">Shine</span>
                </span>
              </h1>

              <p className="hero-description">
                Patna's own mother &amp; child activity centre — children learn,
                play and grow right alongside you, while moms stay active,
                social and strong.
              </p>

              <div className="hero-buttons">
                <button
                  className="hero-button btn-call"
                  onClick={() => (window.location.href = 'tel:+916207368839')}
                >
                  <Phone size={18} />
                  <span>Call Now</span>
                </button>

                <button
                  className="hero-button btn-whatsapp"
                  onClick={() =>
                    window.open(
                      'https://wa.me/916207368839?text=Hello%20Phulwari%20Mother%20%26%20Child%20Activity%20Centre.%20I%20would%20like%20to%20know%20more%20about%20your%20programs%2C%20admissions%2C%20birthday%20parties%20and%20camps.',
                      '_blank'
                    )
                  }
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Us</span>
                </button>

                <button
                  className="hero-button btn-birthday"
                  onClick={() =>
                    window.open(
                      'https://wa.me/916207368839?text=Hello%20Phulwari%20Mother%20%26%20Child%20Activity%20Centre.%20I%20would%20like%20to%20enquire%20about%20booking%20a%20demo%20at%20Phulwari.',
                      '_blank'
                    )
                  }
                >
                  <Cake size={18} />
                  <span>Book a Free Demo Class</span>
                </button>
              </div>



              <div className="hero-features">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={index}
                      className="hero-feature"
                      style={{ ['--delay' as any]: `${index * 0.06}s` }}
                    >
                      <div className="hero-feature-icon" style={{ backgroundColor: feature.bg }}>
                        <IconComponent style={{ stroke: feature.color }} />
                      </div>
                      <p className="hero-feature-text" style={{ color: feature.color }}>
                        {feature.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hero-illustration-col">
              <div className="hero-illustration-blob" aria-hidden="true" />
              <img
                className="hero-illustration-img"
                src={`/${backgroundImage}`}
                alt="A mother and child playing together"
              />
              <div className="hero-sticker">
                <Star size={14} />
                <span>A Joyful Spot for Moms &amp; Kids</span>
              </div>
            </div>
          </div>

          <button
            className="hero-scroll-cue"
            aria-label="Scroll to learn more"
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
          >
            <ChevronDown size={20} />
          </button>
        </div>
      </section>
    </>
  );
}