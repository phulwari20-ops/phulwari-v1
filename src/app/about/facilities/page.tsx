'use client';

import React from 'react';
import { Building2, ShieldCheck, Dumbbell, Palette, PartyPopper, Baby, Sparkles,Eye } from 'lucide-react';
import CurvedImage from '../CurvedImage';

export default function FacilitiesPage() {
  const image = 'cricketplay.webp';
  const facilities = [
    { icon: Building2, label: 'Spacious Activity Area', color: '#FF4D8D', bg: '#FFE6EF' },
    { icon: Baby, label: 'Safe Play Zone', color: '#3D8BFF', bg: '#E5EFFF' },
    { icon: Dumbbell, label: 'Fitness Space for Mothers', color: '#34B36B', bg: '#E3F7EA' },
    { icon: Palette, label: 'Creative Learning Environment', color: '#E8A621', bg: '#FFF3D9' },
    { icon: PartyPopper, label: 'Event & Celebration Area', color: '#FF8A3D', bg: '#FFEADB' },
    { icon: ShieldCheck, label: 'Child-Friendly Infrastructure', color: '#8B5CF6', bg: '#EFE7FE' },
    { icon: Sparkles, label: 'Clean & Hygienic Premises', color: '#FF4D8D', bg: '#FFE6EF' },
    { icon: Eye, label: '24/7 CCTV Monitoring', color: '#FF4D8D', bg: '#FFE6EF' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');

        .fac-section {
          width: 100%;
          background-color: #FFF7EC;
          padding: 4rem 1.25rem;
        }

        .fac-inner {
          max-width: 72rem;
          margin: 0 auto;
        }

        .fac-intro {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          margin-bottom: 3.5rem;
        }

        .fac-badge {
          display: inline-flex;
          padding: 0.5rem 1.2rem;
          margin-bottom: 1rem;
          background-color: #E5EFFF;
          border-radius: 9999px;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: #3D8BFF;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .fac-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 2.25rem;
          color: #3F3A52;
          margin-bottom: 1.25rem;
          line-height: 1.15;
        }

        .fac-title span { color: #FF8A3D; }

        .fac-text {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #6B6480;
          max-width: 36rem;
        }

        .fac-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .fac-item {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding: 1.1rem 1.3rem;
          background-color: #ffffff;
          border-radius: 18px;
          transition: transform 0.2s ease;
        }

        .fac-item:hover { transform: translateY(-3px); }

        .fac-item-icon {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fac-item-icon svg { width: 19px; height: 19px; stroke-width: 2.25; }

        .fac-item-label {
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          font-size: 0.92rem;
          color: #3F3A52;
        }

        @media (min-width: 640px) {
          .fac-title { font-size: 2.75rem; }
          .fac-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 1024px) {
          .fac-section { padding: 5.5rem 2rem; }
          .fac-title { font-size: 3.25rem; }
          .fac-intro { grid-template-columns: 1.1fr 0.9fr; }
        }
      `}</style>

      <section className="fac-section">
        <div className="fac-inner">
          <div className="fac-intro">
            <div>
              <div className="fac-badge">Take a Look Inside</div>
              <h2 className="fac-title">
                Our <span>Facilities</span>
              </h2>
              <p className="fac-text">
                Every corner of Phulwari is designed with children's safety and comfort in
                mind &mdash; and with enough space for mothers to stay active too.
              </p>
            </div>

            <CurvedImage
              src={`/${image}`}
              alt="Inside the Phulwari activity centre"
              ringColor="#3D8BFF"
              dotColors={['#3D8BFF', '#FF8A3D']}
            />
          </div>

          <div className="fac-grid">
            {facilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="fac-item">
                  <span className="fac-item-icon" style={{ backgroundColor: item.bg }}>
                    <Icon style={{ stroke: item.color }} />
                  </span>
                  <span className="fac-item-label">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}