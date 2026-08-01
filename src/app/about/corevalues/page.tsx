'use client';

import React from 'react';
import { ShieldCheck, Lightbulb, HandHeart, Smile, Trophy } from 'lucide-react';
import CurvedImage from '../CurvedImage';

export default function CoreValuesPage() {
  const image = 'playground.webp';
  const values = [
    {
      icon: ShieldCheck,
      title: 'Safety First',
      text: 'Every child deserves a secure environment to learn and grow.',
      color: '#34B36B',
      bg: '#E3F7EA',
    },
    {
      icon: Lightbulb,
      title: 'Creativity',
      text: 'Encouraging imagination and innovative thinking in everything we do.',
      color: '#E8A621',
      bg: '#FFF3D9',
    },
    {
      icon: Smile,
      title: 'Inclusiveness',
      text: 'Creating opportunities for every child to participate and shine.',
      color: '#FF4D8D',
      bg: '#FFE6EF',
    },
    {
      icon: HandHeart,
      title: 'Respect',
      text: 'Promoting kindness, discipline and positive relationships.',
      color: '#3D8BFF',
      bg: '#E5EFFF',
    },
    {
      icon: Trophy,
      title: 'Excellence',
      text: 'Delivering the highest quality experience in every program.',
      color: '#8B5CF6',
      bg: '#EFE7FE',
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');

        .values-section {
          width: 100%;
          background-color: #ffffff;
          padding: 4rem 1.25rem;
        }

        .values-inner {
          max-width: 72rem;
          margin: 0 auto;
        }

        .values-intro {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          margin-bottom: 3.5rem;
        }

        .values-badge {
          display: inline-flex;
          padding: 0.5rem 1.2rem;
          margin-bottom: 1rem;
          background-color: #EFE7FE;
          border-radius: 9999px;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: #8B5CF6;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .values-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 2.25rem;
          color: #3F3A52;
          margin-bottom: 1.25rem;
          line-height: 1.15;
        }

        .values-title span { color: #FF4D8D; }

        .values-text {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #6B6480;
          max-width: 36rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        .values-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background-color: #FFF7EC;
          border-radius: 9999px;
          transition: transform 0.2s ease;
        }

        .values-card:hover { transform: translateY(-3px); }

        .values-card-icon {
          flex-shrink: 0;
          width: 46px;
          height: 46px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .values-card-icon svg { width: 21px; height: 21px; stroke-width: 2.25; }

        .values-card-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #3F3A52;
          margin-bottom: 0.15rem;
        }

        .values-card-text {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          line-height: 1.4;
          color: #6B6480;
        }

        @media (min-width: 640px) {
          .values-title { font-size: 2.75rem; }
          .values-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 1024px) {
          .values-section { padding: 5.5rem 2rem; }
          .values-title { font-size: 3.25rem; }
          .values-intro { grid-template-columns: 0.9fr 1.1fr; }
        }
      `}</style>

      <section className="values-section">
        <div className="values-inner">
          <div className="values-intro">
            <CurvedImage
              src={`/${image}`}
              alt="Children proudly showing their work at Phulwari"
              ringColor="#8B5CF6"
              dotColors={['#8B5CF6', '#FF4D8D']}
            />

            <div>
              <div className="values-badge">What We Stand For</div>
              <h2 className="values-title">
                Our Core <span>Values</span>
              </h2>
              <p className="values-text">
                These are the principles that guide every program, every trainer and every
                decision we make at Phulwari.
              </p>
            </div>
          </div>

          <div className="values-grid">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="values-card">
                  <div className="values-card-icon" style={{ backgroundColor: value.bg }}>
                    <Icon style={{ stroke: value.color }} />
                  </div>
                  <div>
                    <p className="values-card-title">{value.title}</p>
                    <p className="values-card-text">{value.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}