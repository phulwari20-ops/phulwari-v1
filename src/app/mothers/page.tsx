'use client';

import React from 'react';
import {
  Phone,
  MessageCircle,
  Baby,
  Dumbbell,
  Sparkles,
  Palette,
  PartyPopper,
  Smile,
  Brain,
  Users2,
  Heart,
  ShieldCheck,
  Footprints,
  TrendingUp,
  BatteryCharging,
  Coffee,
  Clock3,
  CalendarDays,
  CheckCircle2,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Shared types                                                              */
/* -------------------------------------------------------------------------- */

interface ProgramDetail {
  icon: React.ElementType;
  text: string;
}

interface ProgramData {
  badge: string;
  badgeColor: string;
  badgeBg: string;
  title: string;
  titleAccent: string;
  accentColor: string;
  description: string;
  timing: string;
  ageGroup: string;
  days: string;
  includes: ProgramDetail[];
  benefits: string[];
  benefitColor: string;
  bestFor: string;
  image: string;
  reverse?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Program content                                                          */
/* -------------------------------------------------------------------------- */

const programs: ProgramData[] = [
  {
    badge: 'Mother & Toddler Program',
    badgeColor: '#FF4D8D',
    badgeBg: '#FFE6EF',
    title: 'Learn, Play &',
    titleAccent: 'Grow Together',
    accentColor: '#FF4D8D',
    description:
      "A specially designed morning program for toddlers and their mothers. While children enjoy safe and engaging Playzone activities, mothers participate in guided fitness sessions — strengthening parent-child bonding while supporting early childhood development.",
    timing: '10:30 AM – 11:30 AM',
    ageGroup: '1 – 3 Years',
    days: 'Monday to Saturday',
    includes: [
      { icon: Dumbbell, text: 'Fitness Programme for Mothers' },
      { icon: Sparkles, text: 'Playzone Access for Children' },
      { icon: Users2, text: 'Parent-Child Engagement Activities' },
      { icon: Smile, text: 'Early Learning Environment' },
    ],
    benefits: [
      'Social Interaction',
      'Motor Skill Development',
      'Confidence Building',
      'Learning Through Play',
      'Better Fitness & Health',
      'Quality Time with Child',
    ],
    benefitColor: '#FF4D8D',
    bestFor:
      'Mothers who want to stay active while giving their toddlers a fun, safe and engaging learning environment.',
    image: 'mothertod.webp',
  },
  {
    badge: 'Phulwari Premium Circle',
    badgeColor: '#3D8BFF',
    badgeBg: '#E5EFFF',
    title: 'The Ultimate Mother',
    titleAccent: '& Child Experience',
    accentColor: '#3D8BFF',
    description:
      'Our flagship premium program designed for complete family engagement and development — combining children\'s activities, Playzone access and fitness opportunities for mothers in one balanced, enriching experience.',
    timing: '5:00 PM Onwards',
    ageGroup: '3+ Years',
    days: 'Monday to Sunday',
    includes: [
      { icon: Dumbbell, text: 'Fitness Programme for Mothers (5 Days a Week)' },
      { icon: Sparkles, text: 'Playzone Access for Children' },
      { icon: CheckCircle2, text: 'Customized Activity Options' },
      { icon: Heart, text: 'Family-Centered Learning Environment' },
    ],
    benefits: [
      'Complete Development Experience',
      'Flexible Activity Selection',
      'Healthy Lifestyle Promotion',
      'Parent-Child Engagement',
      'Active Learning Environment',
      'Social & Emotional Development',
    ],
    benefitColor: '#3D8BFF',
    bestFor:
      'Families seeking a comprehensive program that supports both child development and mother wellness.',
    image: 'motherhappy.webp',
    reverse: true,
  },
  {
    badge: 'Phulwari Core',
    badgeColor: '#8B5CF6',
    badgeBg: '#EFE7FE',
    title: 'Creativity, Confidence',
    titleAccent: '& Skill Development',
    accentColor: '#8B5CF6',
    description:
      'A structured activity batch focused on developing creativity, self-expression, confidence and physical fitness through carefully selected activities like dance, art and yoga.',
    timing: '6:30 PM Onwards',
    ageGroup: '3+ Years',
    days: 'Wednesday to Sunday',
    includes: [
      { icon: Sparkles, text: 'Dance' },
      { icon: Palette, text: 'Art & Craft' },
      { icon: Footprints, text: 'Gymnastics' },
      { icon: Brain, text: 'Yoga (3 Days a Week)' },
    ],
    benefits: [
      'Improves Creativity',
      'Enhances Flexibility',
      'Builds Confidence',
      'Improves Physical Fitness',
      'Develops Focus & Concentration',
      'Strengthens Social Skills',
    ],
    benefitColor: '#8B5CF6',
    bestFor:
      'Children who enjoy creative and physical activities in a structured learning environment.',
    image: 'motherfit.webp',
  },
];

const developmentPillars = [
  {
    title: 'Physical Development',
    color: '#34B36B',
    bg: '#E3F7EA',
    icon: Dumbbell,
    items: ['Fitness', 'Strength', 'Coordination', 'Flexibility'],
  },
  {
    title: 'Mental Development',
    color: '#3D8BFF',
    bg: '#E5EFFF',
    icon: Brain,
    items: ['Focus', 'Creativity', 'Problem Solving', 'Confidence'],
  },
  {
    title: 'Social Development',
    color: '#E8A621',
    bg: '#FFF3D9',
    icon: Users2,
    items: ['Teamwork', 'Communication Skills', 'Leadership', 'Friendship Building'],
  },
  {
    title: 'Emotional Development',
    color: '#FF4D8D',
    bg: '#FFE6EF',
    icon: Heart,
    items: ['Self-Confidence', 'Positive Thinking', 'Discipline', 'Self-Expression'],
  },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                */
/* -------------------------------------------------------------------------- */

export default function MothersPage() {
  const imageBasePath = '/';
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
          .pg-blob, .pg-blob-shape { animation: none !important; }
        }

        .pg-page { background-color: #FFF7EC; font-family: 'Quicksand', sans-serif; color: #3F3A52; }

        /* ---------- Intro ---------- */
        .pg-intro {
          max-width: 56rem;
          margin: 0 auto;
          padding: 4.5rem 1.25rem 2.5rem;
          text-align: center;
        }
        .pg-intro-badge {
          display: inline-flex;
          padding: 0.5rem 1.2rem;
          margin-bottom: 1rem;
          background-color: #FFD166;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #6B4500;
          transform: rotate(-2deg);
        }
        .pg-intro-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 2.25rem;
          line-height: 1.15;
          margin-bottom: 0.9rem;
        }
        .pg-intro-title span { color: #FF4D8D; }
        .pg-intro-text {
          font-weight: 600;
          font-size: 1.05rem;
          line-height: 1.7;
          color: #6B6480;
        }

        /* ---------- Program block ---------- */
        .pg-block {
          max-width: 72rem;
          margin: 0 auto;
          padding: 2.5rem 1.25rem;
        }
        .pg-block-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          background-color: #ffffff;
          border-radius: 32px;
          padding: 2rem;
          box-shadow: 0 12px 30px rgba(63,58,82,0.06);
        }

        .pg-blob {
          position: relative;
          width: 100%;
          max-width: 20rem;
          margin: 0 auto;
          aspect-ratio: 1 / 1;
          animation: blobFloat 7s ease-in-out infinite;
        }
        .pg-blob-shape {
          position: absolute;
          inset: 0;
          overflow: hidden;
          animation: blobMorph 9s ease-in-out infinite;
          box-shadow: 0 18px 36px rgba(0,0,0,0.12);
        }
        .pg-blob-shape img { width: 100%; height: 100%; object-fit: cover; }
        .pg-blob-ring {
          position: absolute;
          inset: -14px;
          border: 3px dashed #FFD166;
          border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%;
          opacity: 0.6;
        }
        .pg-blob-dot { position: absolute; width: 14px; height: 14px; border-radius: 9999px; }
        .pg-blob-dot-1 { top: -6px; right: 14%; }
        .pg-blob-dot-2 { bottom: 6%; left: -8px; }

        .pg-badge {
          display: inline-flex;
          align-self: flex-start;
          padding: 0.5rem 1.1rem;
          margin-bottom: 0.9rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .pg-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 1.85rem;
          line-height: 1.18;
          margin-bottom: 0.85rem;
          color: #3F3A52;
        }

        .pg-description {
          font-weight: 600;
          font-size: 0.98rem;
          line-height: 1.7;
          color: #6B6480;
          margin-bottom: 1.4rem;
        }

        /* meta row: timing / age / days */
        .pg-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.4rem;
        }
        .pg-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          background-color: #FFF7EC;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #3F3A52;
        }
        .pg-meta-pill svg { width: 14px; height: 14px; stroke-width: 2.25; }

        .pg-subhead {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 0.6rem;
          color: #3F3A52;
        }

        .pg-includes {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-bottom: 1.4rem;
        }
        .pg-include-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.9rem 0.5rem 0.5rem;
          background-color: #ffffff;
          border: 1px solid #F0ECE2;
          border-radius: 9999px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }
        .pg-include-icon {
          width: 26px;
          height: 26px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .pg-include-icon svg { width: 13px; height: 13px; stroke: #ffffff; stroke-width: 2.5; }
        .pg-include-text { font-size: 0.78rem; font-weight: 700; color: #3F3A52; }

        .pg-benefits {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem 0.9rem;
          margin-bottom: 1.4rem;
        }
        .pg-benefit-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: #6B6480;
        }
        .pg-benefit-item svg { width: 16px; height: 16px; flex-shrink: 0; stroke-width: 2.5; }

        .pg-bestfor {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          padding: 0.9rem 1rem;
          background-color: #FFF7EC;
          border-radius: 16px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #6B6480;
          line-height: 1.55;
        }
        .pg-bestfor svg { width: 18px; height: 18px; flex-shrink: 0; margin-top: 0.1rem; stroke-width: 2.25; }

        @media (min-width: 1024px) {
          .pg-block-inner {
            grid-template-columns: 0.85fr 1.15fr;
            gap: 3rem;
            padding: 3rem;
          }
          .pg-block-inner.pg-reverse { grid-template-columns: 1.15fr 0.85fr; }
          .pg-block-inner.pg-reverse .pg-blob { order: 2; }
          .pg-blob { max-width: 23rem; }
          .pg-title { font-size: 2.15rem; }
        }

        /* ---------- Why choose ---------- */
        .pg-why {
          max-width: 72rem;
          margin: 0 auto;
          padding: 3.5rem 1.25rem 2rem;
        }
        .pg-why-head { text-align: center; max-width: 40rem; margin: 0 auto 2.5rem; }
        .pg-why-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          margin-bottom: 0.6rem;
        }
        .pg-why-title span { color: #3D8BFF; }
        .pg-why-text { font-weight: 600; color: #6B6480; line-height: 1.6; }

        .pg-pillars {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        .pg-pillar {
          background-color: #ffffff;
          border-radius: 24px;
          padding: 1.75rem;
          box-shadow: 0 10px 24px rgba(63,58,82,0.06);
        }
        .pg-pillar-icon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .pg-pillar-icon svg { width: 24px; height: 24px; stroke-width: 2.25; }
        .pg-pillar-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          margin-bottom: 0.85rem;
          color: #3F3A52;
        }
        .pg-pillar-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .pg-pillar-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #6B6480;
        }
        .pg-pillar-item svg { width: 15px; height: 15px; flex-shrink: 0; stroke-width: 2.5; }

        @media (min-width: 640px) {
          .pg-pillars { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .pg-pillars { grid-template-columns: repeat(4, 1fr); }
        }

        /* ---------- CTA ---------- */
        .pg-cta {
          max-width: 56rem;
          margin: 0 auto;
          padding: 3rem 1.25rem 4.5rem;
          text-align: center;
        }
        .pg-cta-box {
          background-color: #ffffff;
          border-radius: 32px;
          padding: 2.75rem 2rem;
          box-shadow: 0 12px 30px rgba(63,58,82,0.07);
        }
        .pg-cta-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          margin-bottom: 0.6rem;
          color: #3F3A52;
        }
        .pg-cta-text { font-weight: 600; color: #6B6480; margin-bottom: 1.6rem; }
        .pg-cta-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }
        .pg-cta-button {
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
        .pg-cta-button:hover { transform: translateY(-2px); }
        .pg-cta-button svg { width: 18px; height: 18px; stroke: #ffffff; stroke-width: 2.25; }
        .btn-call { background-color: #FF4D8D; }
        .btn-whatsapp { background-color: #34B36B; }
      `}</style>

      <div className="pg-page">
        {/* Intro */}
        <section className="pg-intro">
          <span className="pg-intro-badge">Programs &amp; Batches</span>
          <h1 className="pg-intro-title">
            Choose the Perfect Program for <span>Your Child &amp; Family</span>
          </h1>
          <p className="pg-intro-text">
            Thoughtfully designed programs that focus on children&apos;s learning, creativity, fitness
            and personality development &mdash; while giving mothers the chance to stay active and healthy.
          </p>
        </section>

        {/* Program blocks */}
        {programs.map((program, index) => (
          <section className="pg-block" key={index}>
            <div className={`pg-block-inner ${program.reverse ? 'pg-reverse' : ''}`}>
              <div className="pg-blob">
                <div
                  className="pg-blob-ring"
                  style={{ borderColor: program.accentColor, opacity: 0.45 }}
                />
                <div className="pg-blob-shape">
                  <img
                    src={`${imageBasePath}${program.image}`}
                    alt={program.badge}
                  />
                </div>
                <span
                  className="pg-blob-dot pg-blob-dot-1"
                  style={{ backgroundColor: program.accentColor }}
                />
                <span
                  className="pg-blob-dot pg-blob-dot-2"
                  style={{ backgroundColor: '#FFD166' }}
                />
              </div>

              <div>
                <span
                  className="pg-badge"
                  style={{ backgroundColor: program.badgeBg, color: program.badgeColor }}
                >
                  {program.badge}
                </span>

                <h2 className="pg-title">
                  {program.title}{' '}
                  <span style={{ color: program.accentColor }}>{program.titleAccent}</span>
                </h2>

                <p className="pg-description">{program.description}</p>

                <div className="pg-meta">
                  <span className="pg-meta-pill">
                    <Clock3 style={{ color: program.accentColor }} />
                    {program.timing}
                  </span>
                  <span className="pg-meta-pill">
                    <Baby style={{ color: program.accentColor }} />
                    {program.ageGroup}
                  </span>
                  <span className="pg-meta-pill">
                    <CalendarDays style={{ color: program.accentColor }} />
                    {program.days}
                  </span>
                </div>

                <h3 className="pg-subhead">Includes</h3>
                <div className="pg-includes">
                  {program.includes.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <span className="pg-include-pill" key={i}>
                        <span
                          className="pg-include-icon"
                          style={{ backgroundColor: program.accentColor }}
                        >
                          <Icon />
                        </span>
                        <span className="pg-include-text">{item.text}</span>
                      </span>
                    );
                  })}
                </div>

                <h3 className="pg-subhead">Benefits</h3>
                <div className="pg-benefits">
                  {program.benefits.map((benefit, i) => (
                    <div className="pg-benefit-item" key={i}>
                      <CheckCircle2 style={{ color: program.benefitColor }} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="pg-bestfor">
                  <TrendingUp style={{ color: program.accentColor }} />
                  <span>
                    <strong>Best For: </strong>
                    {program.bestFor}
                  </span>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Why choose our programs */}
        <section className="pg-why">
          <div className="pg-why-head">
            <h2 className="pg-why-title">
              Why Choose <span>Our Programs?</span>
            </h2>
            <p className="pg-why-text">
              At Phulwari, every program is designed to support a child&apos;s overall growth and development.
            </p>
          </div>

          <div className="pg-pillars">
            {developmentPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div className="pg-pillar" key={index}>
                  <div className="pg-pillar-icon" style={{ backgroundColor: pillar.bg }}>
                    <Icon style={{ color: pillar.color }} />
                  </div>
                  <h3 className="pg-pillar-title">{pillar.title}</h3>
                  <div className="pg-pillar-list">
                    {pillar.items.map((item, i) => (
                      <div className="pg-pillar-item" key={i}>
                        <CheckCircle2 style={{ color: pillar.color }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        
      </div>
    </>
  );
}