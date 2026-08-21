'use client';

import React from 'react';
import { Sparkles, Heart, Dumbbell, Users2, Smile, Award } from 'lucide-react';

export default function MissionPage() {
  const image = 'grow.webp';
  const values = [
    { icon: Sparkles, label: 'Confidence', color: '#FF4D8D' },
    { icon: Heart, label: 'Creativity', color: '#E8A621' },
    { icon: Dumbbell, label: 'Physical Fitness', color: '#34B36B' },
    { icon: Users2, label: 'Social Skills', color: '#3D8BFF' },
    { icon: Smile, label: 'Emotional Growth', color: '#8B5CF6' },
    { icon: Award, label: 'Leadership', color: '#FF8A3D' },
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
          .mission-blob, .mission-blob-shape { animation: none !important; }
        }

        .mission-section {
          width: 100%;
          background-color: #FFF7EC;
          padding: 4rem 1.25rem;
          overflow: hidden;
        }

        .mission-inner {
          max-width: 72rem;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
        }

        /* ---------- Image side ---------- */
        .mission-blob {
          position: relative;
          width: 100%;
          max-width: 22rem;
          margin: 0 auto;
          aspect-ratio: 1 / 1;
          animation: blobFloat 7s ease-in-out infinite;
        }

        .mission-blob-shape {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%;
          animation: blobMorph 9s ease-in-out infinite;
          box-shadow: 0 18px 36px rgba(0,0,0,0.12);
        }

        .mission-blob-shape img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mission-blob-ring {
          position: absolute;
          inset: -14px;
          border: 3px dashed #FFD166;
          border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%;
          opacity: 0.6;
        }

        .mission-blob-dot {
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
        }
        .mission-blob-dot-1 { top: -6px; right: 14%; background-color: #FF4D8D; }
        .mission-blob-dot-2 { bottom: 6%; left: -10px; background-color: #3D8BFF; }

        /* ---------- Text side ---------- */
        .mission-badge {
          display: inline-flex;
          align-self: flex-start;
          padding: 0.5rem 1.2rem;
          margin-bottom: 1rem;
          background-color: #FFE6EF;
          border-radius: 9999px;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: #FF4D8D;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .mission-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 2.25rem;
          color: #3F3A52;
          margin-bottom: 1rem;
          line-height: 1.15;
        }

        .mission-title span { color: #3D8BFF; }

        .mission-text {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #6B6480;
          max-width: 34rem;
          margin-bottom: 1.75rem;
        }

        .mission-values {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .mission-value {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem 0.5rem 0.5rem;
          background-color: #ffffff;
          border-radius: 9999px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .mission-value-icon {
          width: 26px;
          height: 26px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mission-value-icon svg { width: 13px; height: 13px; stroke: #ffffff; stroke-width: 2.5; }

        .mission-value-label {
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          color: #3F3A52;
        }

        @media (min-width: 1024px) {
          .mission-inner {
            grid-template-columns: 0.95fr 1.05fr;
            gap: 3rem;
          }
          .mission-inner.mission-reverse { grid-template-columns: 1.05fr 0.95fr; }
          .mission-blob { max-width: 26rem; }
          .mission-title { font-size: 2.75rem; }
        }
      `}</style>

      <section className="mission-section">
        <div className="mission-inner">
          <div className="mission-blob">
            <div className="mission-blob-ring" />
            <div className="mission-blob-shape">
              <img src={`/${image}`} alt="Children and mothers enjoying activities at Phulwari"  loading="lazy" decoding="async" />
            </div>
            <span className="mission-blob-dot mission-blob-dot-1" />
            <span className="mission-blob-dot mission-blob-dot-2" />
          </div>

          <div>
            <div className="mission-badge">Our Mission</div>

            <h1 className="mission-title">
              Helping every child <span>grow with confidence</span>
            </h1>

            <p className="mission-text">
              Our mission is to provide high-quality, activity-based learning experiences
              that help children build confidence, creativity and life skills &mdash; while
              mothers stay active and supported. Through engaging programs and caring
              guidance, we help every family grow, together.
            </p>

            <div className="mission-values">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="mission-value">
                    <span className="mission-value-icon" style={{ backgroundColor: value.color }}>
                      <Icon />
                    </span>
                    <span className="mission-value-label">{value.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}