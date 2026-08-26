'use client';

import React from 'react';
import { Users, Palette, Shield, GraduationCap, HeartHandshake, Sparkle } from 'lucide-react';
import CurvedImage from '../CurvedImage';

export default function WhyChooseUsPage() {
  const image = 'motherfit.webp';
  const reasons = [
    {
      icon: Users,
      title: 'Mother & Child Focused Environment',
      text: 'A unique concept where mothers and children learn, grow and stay active together, creating stronger family bonds.',
      color: '#FF4D8D',
      bg: '#FFE6EF',
    },
    {
      icon: Palette,
      title: 'Activity-Based Learning',
      text: 'Children learn best through participation. Our programs favor creativity, teamwork and hands-on practice over classroom routine.',
      color: '#E8A621',
      bg: '#FFF3D9',
    },
    {
      icon: Shield,
      title: 'Safe & Secure Environment',
      text: 'Child safety is our highest priority \u2014 a comfortable, child-friendly atmosphere built for confident exploration.',
      color: '#34B36B',
      bg: '#E3F7EA',
    },
    {
      icon: GraduationCap,
      title: 'Experienced Trainers',
      text: 'Qualified, passionate trainers who understand children\u2019s developmental needs and keep every activity engaging.',
      color: '#3D8BFF',
      bg: '#E5EFFF',
    },
    {
      icon: Sparkle,
      title: 'Holistic Development',
      text: 'Programs designed to support physical, emotional, social and cognitive growth for well-rounded kids.',
      color: '#8B5CF6',
      bg: '#EFE7FE',
    },
    {
      icon: HeartHandshake,
      title: 'Family Engagement',
      text: 'Special programs and events that involve parents directly, strengthening family connections.',
      color: '#FF8A3D',
      bg: '#FFEADB',
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');

        .why-section {
          width: 100%;
          background-color: #FFF7EC;
          padding: 4rem 1.25rem;
        }

        .why-inner {
          max-width: 72rem;
          margin: 0 auto;
        }

        .why-intro {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          margin-bottom: 3.5rem;
        }

        .why-badge {
          display: inline-flex;
          padding: 0.5rem 1.2rem;
          margin-bottom: 1rem;
          background-color: #FFEADB;
          border-radius: 9999px;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: #FF8A3D;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .why-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 2.25rem;
          color: #3F3A52;
          margin-bottom: 1.25rem;
          line-height: 1.15;
        }

        .why-title span { color: #34B36B; }

        .why-text {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #6B6480;
          max-width: 36rem;
        }

        .why-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        .why-card {
          padding: 1.5rem;
          background-color: #ffffff;
          border-radius: 20px;
          transition: transform 0.2s ease;
        }

        .why-card:hover { transform: translateY(-4px); }

        .why-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.9rem;
        }

        .why-card-icon svg { width: 22px; height: 22px; stroke-width: 2.25; }

        .why-card-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #3F3A52;
          margin-bottom: 0.4rem;
        }

        .why-card-text {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          line-height: 1.55;
          color: #6B6480;
        }

        @media (min-width: 640px) {
          .why-title { font-size: 2.75rem; }
          .why-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 1024px) {
          .why-section { padding: 5.5rem 2rem; }
          .why-title { font-size: 3.25rem; }
          .why-grid { grid-template-columns: repeat(3, 1fr); }
          .why-intro { grid-template-columns: 1.1fr 0.9fr; }
        }
      `}</style>

      <section className="why-section">
        <div className="why-inner">
          <div className="why-intro">
            <div>
              <div className="why-badge">Why Phulwari</div>
              <h1 className="why-title">
                Why Choose <span>Us</span>
              </h1>
              <p className="why-text">
                What makes Phulwari different isn't just our activities &mdash; it's how we bring
                mothers and children together, with safety, experienced guidance and real family
                engagement at the center of everything we do.
              </p>
            </div>

            <CurvedImage
              src={`/${image}`}
              alt="A trainer guiding children at Phulwari"
              ringColor="#34B36B"
              dotColors={['#FF8A3D', '#34B36B']}
            />
          </div>

          <div className="why-grid">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className="why-card">
                  <div className="why-card-icon" style={{ backgroundColor: reason.bg }}>
                    <Icon style={{ stroke: reason.color }} />
                  </div>
                  <p className="why-card-title">{reason.title}</p>
                  <p className="why-card-text">{reason.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}