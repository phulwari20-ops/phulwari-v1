'use client';

import React from 'react';
import { Users, Palette, Shield, GraduationCap, Compass } from 'lucide-react';
import CurvedImage from './CurvedImage';

import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';
/**
 * Renders as its own /about route (where this heading is the page's single
 * <h1>) and as a section of the homepage (where the hero owns the <h1>, so this
 * steps down to <h2>).
 */

const SEO_PATH = '/about';
const SEO_BREADCRUMB = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
];

export default function AboutPage({ headingLevel = 'h1' }: { headingLevel?: 'h1' | 'h2' } = {}) {
  const Heading = headingLevel;
  // Composed into the homepage as an <h2> section; only the standalone
  // route should emit this page's structured data.
  const isStandalone = headingLevel === 'h1';
  const image = 'childrens_cricket.webp';
  const highlights = [
    {
      icon: Users,
      title: 'Mother & Child Focused',
      text: 'A space where mothers and children learn, grow and stay active together.',
      color: '#FF4D8D',
      bg: '#FFE6EF',
    },
    {
      icon: Palette,
      title: 'Activity-Based Learning',
      text: 'Children learn through play, creativity and hands-on experiences.',
      color: '#E8A621',
      bg: '#FFF3D9',
    },
    {
      icon: Shield,
      title: 'Safe & Secure Space',
      text: 'A child-friendly environment built around safety and comfort.',
      color: '#34B36B',
      bg: '#E3F7EA',
    },
    {
      icon: GraduationCap,
      title: 'Experienced Trainers',
      text: 'Qualified trainers who understand every child\u2019s needs.',
      color: '#3D8BFF',
      bg: '#E5EFFF',
    },
  ];

  return (
    <>
      {isStandalone && <JsonLd
        id="about-schema"
        nodes={[
          webPageSchema({
            path: SEO_PATH,
            name: 'About Phulwari — Mother & Child Activity Centre, Patna',
            description:
              'Phulwari is Patna\'s mother & child activity centre in Kidwaipuri, built around activity-based learning for children and programs that keep mothers active and involved.',
            type: 'AboutPage',
            breadcrumb: SEO_BREADCRUMB,
          }),
          breadcrumbSchema(SEO_PATH, SEO_BREADCRUMB),
        ]}
      />}
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');

        .about-section {
          width: 100%;
          background-color: #ffffff;
          padding: 4rem 1.25rem;
        }

        .about-inner {
          max-width: 72rem;
          margin: 0 auto;
        }

        .about-badge {
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

        .about-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 2.25rem;
          color: #3F3A52;
          margin-bottom: 1.25rem;
          line-height: 1.15;
        }

        .about-title span { color: #FF4D8D; }

        .about-text {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #6B6480;
          max-width: 38rem;
          margin-bottom: 1.5rem;
        }

        /* ---------- Intro: text + image ---------- */
        .about-intro {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          margin-bottom: 3.5rem;
        }

        /* ---------- Vision banner ---------- */
        .about-vision {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background-color: #FFF7EC;
          border-radius: 22px;
          margin-bottom: 3.5rem;
        }

        .about-vision-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 9999px;
          background-color: #FFD166;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-vision-icon svg { width: 22px; height: 22px; stroke: #6B4500; stroke-width: 2.25; }

        .about-vision-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #3F3A52;
          margin-bottom: 0.35rem;
        }

        .about-vision-text {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #6B6480;
        }

        /* ---------- Highlights ---------- */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        .about-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background-color: #FFF7EC;
          border-radius: 20px;
          transition: transform 0.2s ease;
        }

        .about-card:hover { transform: translateY(-4px); }

        .about-card-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-card-icon svg { width: 22px; height: 22px; stroke-width: 2.25; }

        .about-card-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #3F3A52;
          margin-bottom: 0.25rem;
        }

        .about-card-text {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #6B6480;
        }

        .about-closing {
          margin-top: 3rem;
          text-align: center;
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: #3F3A52;
        }

        @media (min-width: 640px) {
          .about-title { font-size: 2.75rem; }
          .about-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 1024px) {
          .about-section { padding: 5.5rem 2rem; }
          .about-title { font-size: 3.25rem; }
          .about-grid { grid-template-columns: repeat(4, 1fr); }
          .about-intro { grid-template-columns: 1.1fr 0.9fr; }
        }
      `}</style>

      <section className="about-section">
        <div className="about-inner">
          <div className="about-intro">
            <div>
              <div className="about-badge">Who We Are</div>

              <Heading className="about-title">
                Welcome to <span>Phulwari</span>
              </Heading>

              <p className="about-text">
                Phulwari Mother &amp; Child Activity Centre is a space dedicated to children's
                growth and mothers' well-being. We believe every child is born with unlimited
                potential, so we provide a safe, engaging environment where children learn,
                explore and grow through fun-filled activities.
              </p>

              <p className="about-text" style={{ marginBottom: 0 }}>
                While children enjoy meaningful learning experiences, mothers stay active and
                healthy through dedicated fitness programs &mdash; because we grow better as a family.
              </p>
            </div>

            <CurvedImage
              src={`/${image}`}
              alt="Children and mothers enjoying activities at Phulwari"
              ringColor="#FFD166"
              dotColors={['#FF4D8D', '#3D8BFF']}
            />
          </div>

          <div className="about-vision">
            <span className="about-vision-icon">
              <Compass />
            </span>
            <div>
              <p className="about-vision-title">Our Vision</p>
              <p className="about-vision-text">
                To become the most trusted Mother &amp; Child Activity Centre by creating a
                positive environment that encourages learning, creativity, fitness, confidence
                and family bonding &mdash; where every child explores their talents and every
                parent feels supported.
              </p>
            </div>
          </div>

          <div className="about-grid">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="about-card">
                  <div className="about-card-icon" style={{ backgroundColor: item.bg }}>
                    <Icon style={{ stroke: item.color }} />
                  </div>
                  <div>
                    <p className="about-card-title">{item.title}</p>
                    <p className="about-card-text">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="about-closing">
            Phulwari isn't just an activity centre &mdash; it's a community where families grow together. 🌱
          </p>
        </div>
      </section>
    </>
    </>
  );
}