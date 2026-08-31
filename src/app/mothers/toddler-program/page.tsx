'use client';

import React from 'react';
import {
  Phone,
  MessageCircle,
  Clock3,
  CalendarDays,
  Baby,
  CheckCircle2,
  TrendingUp,
  Dumbbell,
  Sparkles,
  Users2,
  Smile,
} from 'lucide-react';

export default function ToddlerProgramPage() {
  const accentColor = '#FF4D8D';

  const includes = [
    { icon: Dumbbell, text: 'Fitness Programme for Mothers' },
    { icon: Sparkles, text: 'Playzone Access for Children' },
    { icon: Users2, text: 'Parent-Child Engagement Activities' },
    { icon: Smile, text: 'Early Learning Environment' },
  ];

  const benefits = [
    'Social Interaction',
    'Motor Skill Development',
    'Confidence Building',
    'Learning Through Play',
    'Better Fitness & Health',
    'Quality Time with Child',
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');

        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(1.5deg); }
        }
        @keyframes blobMorph {
          0%, 100% { border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%; }
          50% { border-radius: 42% 58% 62% 38% / 40% 62% 38% 60%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pd-blob, .pd-blob-shape { animation: none !important; }
        }

        .pd-page {
          background-color: #FFF7EC;
          font-family: 'Quicksand', sans-serif;
          color: #3F3A52;
          min-height: 100vh;
          padding-bottom: 2rem;
        }

        .pd-hero {
          max-width: 72rem;
          margin: 0 auto;
          padding: 3.5rem 1.25rem 1rem;
        }

        .pd-block-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          background-color: #ffffff;
          border-radius: 32px;
          padding: 2rem;
          box-shadow: 0 12px 30px rgba(63,58,82,0.06);
        }

        .pd-blob {
          position: relative;
          width: 100%;
          max-width: 22rem;
          margin: 0 auto;
          aspect-ratio: 1 / 1;
          animation: blobFloat 7s ease-in-out infinite;
        }
        .pd-blob-shape {
          position: absolute;
          inset: 0;
          overflow: hidden;
          animation: blobMorph 9s ease-in-out infinite;
          box-shadow: 0 18px 36px rgba(0,0,0,0.12);
        }
        .pd-blob-shape img { width: 100%; height: 100%; object-fit: cover; }
        .pd-blob-ring {
          position: absolute;
          inset: -14px;
          border: 3px dashed #FFD166;
          border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%;
          opacity: 0.5;
        }
        .pd-blob-dot { position: absolute; width: 16px; height: 16px; border-radius: 9999px; }
        .pd-blob-dot-1 { top: -6px; right: 14%; }
        .pd-blob-dot-2 { bottom: 6%; left: -10px; background-color: #FFD166; }

        .pd-badge {
          display: inline-flex;
          align-self: flex-start;
          padding: 0.5rem 1.2rem;
          margin-bottom: 1rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .pd-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 2.1rem;
          line-height: 1.16;
          margin-bottom: 1rem;
          color: #3F3A52;
        }

        .pd-description {
          font-weight: 600;
          font-size: 1rem;
          line-height: 1.75;
          color: #6B6480;
          margin-bottom: 1.5rem;
          max-width: 36rem;
        }

        .pd-meta { display: flex; flex-wrap: wrap; gap: 0.65rem; margin-bottom: 1.5rem; }
        .pd-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 1rem;
          background-color: #FFF7EC;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 700;
        }
        .pd-meta-pill svg { width: 15px; height: 15px; stroke-width: 2.25; }

        .pd-subhead {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 0.7rem;
        }

        .pd-includes { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.6rem; }
        .pd-include-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.55rem 1rem 0.55rem 0.55rem;
          background-color: #ffffff;
          border: 1px solid #F0ECE2;
          border-radius: 9999px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }
        .pd-include-icon {
          width: 28px; height: 28px; border-radius: 9999px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .pd-include-icon svg { width: 14px; height: 14px; stroke: #ffffff; stroke-width: 2.5; }
        .pd-include-text { font-size: 0.82rem; font-weight: 700; }

        .pd-benefits {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.55rem 1rem;
          margin-bottom: 1.6rem;
        }
        .pd-benefit-item { display: flex; align-items: center; gap: 0.45rem; font-size: 0.85rem; font-weight: 700; color: #6B6480; }
        .pd-benefit-item svg { width: 17px; height: 17px; flex-shrink: 0; stroke-width: 2.5; }

        .pd-bestfor {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 1rem 1.1rem;
          background-color: #FFF7EC;
          border-radius: 18px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #6B6480;
          line-height: 1.6;
        }
        .pd-bestfor svg { width: 19px; height: 19px; flex-shrink: 0; margin-top: 0.1rem; stroke-width: 2.25; }

        .pd-cta-buttons { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.75rem; }
        .pd-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.85rem 1.6rem;
          border: none;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.92rem;
          font-family: 'Quicksand', sans-serif;
          border-radius: 9999px;
          cursor: pointer;
          transition: transform 0.15s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }
        .pd-cta-button:hover { transform: translateY(-2px); }
        .pd-cta-button svg { width: 18px; height: 18px; stroke: #ffffff; stroke-width: 2.25; }
        .btn-call { background-color: #FF4D8D; }
        .btn-whatsapp { background-color: #34B36B; }

        @media (min-width: 1024px) {
          .pd-block-inner { grid-template-columns: 0.85fr 1.15fr; gap: 3rem; padding: 3rem; }
          .pd-blob { max-width: 24rem; }
          .pd-title { font-size: 2.5rem; }
        }
      `}</style>

      <div className="pd-page">
        <section className="pd-hero">
          <div className="pd-block-inner">
            <div className="pd-blob">
              <div className="pd-blob-ring" style={{ borderColor: accentColor, opacity: 0.45 }} />
              <div className="pd-blob-shape">
                <img src="/mothertod.webp" alt="Mother & Toddler Program"  loading="lazy" decoding="async" />
              </div>
              <span className="pd-blob-dot pd-blob-dot-1" style={{ backgroundColor: accentColor }} />
              <span className="pd-blob-dot pd-blob-dot-2" />
            </div>

            <div>
              <span className="pd-badge" style={{ backgroundColor: '#FFE6EF', color: accentColor }}>
                Mother & Toddler Program
              </span>

              <h1 className="pd-title">
                Learn, Play & <span style={{ color: accentColor }}>Grow Together</span>
              </h1>

              <p className="pd-description">
                A specially designed morning program for toddlers and their mothers. While children
                enjoy safe and engaging Playzone activities, mothers participate in guided fitness
                sessions — strengthening parent-child bonding while supporting early childhood
                development.
              </p>

              <div className="pd-meta">
                <span className="pd-meta-pill" style={{ color: accentColor }}>
                  <Clock3 style={{ color: accentColor }} />
                  10:30 AM – 11:30 AM
                </span>
                <span className="pd-meta-pill" style={{ color: accentColor }}>
                  <Baby style={{ color: accentColor }} />
                  1 – 3 Years
                </span>
                <span className="pd-meta-pill" style={{ color: accentColor }}>
                  <CalendarDays style={{ color: accentColor }} />
                  Monday to Saturday
                </span>
              </div>

              <h2 className="pd-subhead">Includes</h2>
              <div className="pd-includes">
                {includes.map((item, i) => {
                  const Icon = item.icon;
                  const isFitness = item.text.toLowerCase().includes('fitness programme');
                  const pillContent = (
                    <span className="pd-include-pill">
                      <span className="pd-include-icon" style={{ backgroundColor: accentColor }}>
                        <Icon />
                      </span>
                      <span className="pd-include-text">{item.text}</span>
                    </span>
                  );
                  if (isFitness) {
                    return (
                      <a href="https://phulwari.co.in/mothers/fitness" key={i} className="hover:opacity-85 transition-opacity">
                        {pillContent}
                      </a>
                    );
                  }
                  return (
                    <span key={i}>
                      {pillContent}
                    </span>
                  );
                })}
              </div>

              <h2 className="pd-subhead">Benefits</h2>
              <div className="pd-benefits">
                {benefits.map((benefit, i) => (
                  <div className="pd-benefit-item" key={i}>
                    <CheckCircle2 style={{ color: accentColor }} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pd-bestfor">
                <TrendingUp style={{ color: accentColor }} />
                <span>
                  <strong>Best For: </strong>
                  Mothers who want to stay active while giving their toddlers a fun, safe and
                  engaging learning environment.
                </span>
              </div>

              <div className="pd-cta-buttons">
                <a
                  href="tel:+916207368839"
                  className="pd-cta-button btn-call"
                  style={{ textDecoration: 'none' }}
                >
                  <Phone />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/916207368839?text=${encodeURIComponent('Hello Phulwari! I am interested in the Mother & Toddler Program.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-cta-button btn-whatsapp"
                  style={{ textDecoration: 'none' }}
                >
                  <MessageCircle />
                  <span>WhatsApp Now</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}