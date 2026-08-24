'use client';

import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Target,
  ChevronDown,
  HelpCircle,
  Baby,
  Music4,
  Dumbbell,
  Sparkles,
  Cake,
  Tent,
  Snowflake,
  ShieldCheck,
  ClipboardCheck,
  Gamepad2,
  Trophy,
  Clock3,
  Eye,
  Settings2,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

interface FAQItem {
  icon: React.ElementType;
  color: string;
  bg: string;
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    icon: HelpCircle,
    color: '#FF4D8D',
    bg: '#FFE6EF',
    question: 'What is Phulwari Mother & Child Activity Centre?',
    answer:
      "Phulwari is a unique activity centre where children can learn, play, explore and develop through engaging activities, while mothers can participate in dedicated fitness programs and family-oriented experiences.",
  },
  {
    icon: Baby,
    color: '#3D8BFF',
    bg: '#E5EFFF',
    question: 'What is the minimum age for admission?',
    answer: (
      <>
        Children aged <strong>3 years and above</strong> can join our regular activity programs
        and batches. For younger children, we offer our special Mother & Toddler Program designed
        for toddlers and their mothers.
      </>
    ),
  },
  {
    icon: Music4,
    color: '#34B36B',
    bg: '#E3F7EA',
    question: 'What activities are available at Phulwari?',
    answer: (
      <ul className="faq-list">
        <li>Music Classes</li>
        <li>Dance Classes</li>
        <li>Gymnastics</li>
        <li>MMA Training</li>
        <li>Roller Skating</li>
        <li>Art & Craft</li>
        <li>Cricket Training</li>
        <li>Yoga</li>
        <li>Play Zone Activities</li>
        <li>Mother & Toddler Program</li>
        <li>Fitness Program for Mothers</li>
      </ul>
    ),
  },
  {
    icon: Dumbbell,
    color: '#E8A621',
    bg: '#FFF3D9',
    question: 'Do you have programs for mothers?',
    answer:
      'Yes. We offer a dedicated Fitness Program for Mothers that helps mothers stay active, healthy and energetic while their children participate in activities.',
  },
  {
    icon: Sparkles,
    color: '#8B5CF6',
    bg: '#EFE7FE',
    question: 'What programs and batches are available?',
    answer: (
      <div className="faq-programs">
        <div className="faq-program-card">
          <span className="faq-program-name" style={{ color: '#3D8BFF' }}>
            Phulwari Premium Circle
          </span>
          <span className="faq-program-meta">5:00 PM Onwards · Monday to Sunday · 3+ Years</span>
          <ul className="faq-list">
            <li>Fitness Program for Mothers</li>
            <li>Play Zone Access</li>
            <li>Customized Activity Options</li>
            <li>Family-Centered Learning Environment</li>
          </ul>
        </div>
        <div className="faq-program-card">
          <span className="faq-program-name" style={{ color: '#8B5CF6' }}>
            Phulwari Core
          </span>
          <span className="faq-program-meta">6:30 PM Onwards · Wednesday to Sunday · 3+ Years</span>
          <ul className="faq-list">
            <li>Dance</li>
            <li>Art & Craft</li>
            <li>Gymnastics</li>
            <li>Yoga</li>
          </ul>
        </div>
        <div className="faq-program-card">
          <span className="faq-program-name" style={{ color: '#FF4D8D' }}>
            Mother & Toddler Program
          </span>
          <span className="faq-program-meta">10:30 AM – 11:30 AM · Monday to Saturday · 1–3 Years</span>
          <ul className="faq-list">
            <li>Fitness Program for Mothers</li>
            <li>Play Zone Access</li>
            <li>Parent-Child Engagement Activities</li>
            <li>Early Learning Environment</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    icon: ShieldCheck,
    color: '#34B36B',
    bg: '#E3F7EA',
    question: 'Is the environment safe for children?',
    answer:
      'Absolutely. Child safety and well-being are our highest priorities. We provide a secure, clean, hygienic and child-friendly environment with trained instructors and staff.',
  },
  {
    icon: Cake,
    color: '#FF8A3D',
    bg: '#FFEADB',
    question: 'How You Organise Birthday ?',
    answer: (
      <ul className="faq-list">
        <li>Theme Decorations</li>
        <li>Fun Activities</li>
        <li>Entertainment</li>
        <li>Customized Packages</li>
        <li>Photo-Friendly Setups</li>
      </ul>
    ),
  },
  {
    icon: Tent,
    color: '#34B36B',
    bg: '#E3F7EA',
    question: 'Do you organize Summer Camps?',
    answer: (
      <ul className="faq-list">
        <li>Dance</li>
        <li>Music</li>
        <li>Art & Craft</li>
        <li>Sports & Games</li>
        <li>Fitness Activities</li>
        <li>Personality Development Sessions</li>
      </ul>
    ),
  },
  {
    icon: Snowflake,
    color: '#3D8BFF',
    bg: '#E5EFFF',
    question: 'Do you organize Winter Camps?',
    answer: (
      <ul className="faq-list">
        <li>Creative Learning</li>
        <li>Art & Craft</li>
        <li>Fitness Activities</li>
        <li>Sports & Games</li>
        <li>Team Building Activities</li>
        <li>Fun Competitions</li>
      </ul>
    ),
  },
  {
    icon: Eye,
    color: '#8B5CF6',
    bg: '#EFE7FE',
    question: 'Can parents visit the centre before enrollment?',
    answer:
      'Yes. Parents are welcome to visit our centre, explore the facilities, meet our team and understand the programs before enrollment.',
  },
  {
    icon: ClipboardCheck,
    color: '#FF4D8D',
    bg: '#FFE6EF',
    question: 'How can I enroll my child?',
    answer: (
      <ul className="faq-list">
        <li>Call Us</li>
        <li>Contact Us on WhatsApp</li>
        <li>Visit the Centre Directly</li>
        <li>Complete the Admission Process</li>
      </ul>
    ),
  },
  {
    icon: Settings2,
    color: '#3D8BFF',
    bg: '#E5EFFF',
    question: 'Are customized activity options available?',
    answer:
      'Yes. Customized activity options are available under Phulwari Premium Circle, subject to availability and requirements.',
  },
  {
    icon: Gamepad2,
    color: '#FF8A3D',
    bg: '#FFEADB',
    question: 'Do you have a Play Zone?',
    answer:
      'Yes. We provide a safe, clean and enjoyable Play Zone where children can play, interact and have fun in a supervised environment.',
  },
  {
    icon: Trophy,
    color: '#E8A621',
    bg: '#FFF3D9',
    question: 'Do you conduct special events and competitions?',
    answer: (
      <ul className="faq-list">
        <li>Competitions</li>
        <li>Talent Shows</li>
        <li>Celebrations</li>
        <li>Children&apos;s Events</li>
        <li>Family Engagement Activities</li>
      </ul>
    ),
  },
  {
    icon: Clock3,
    color: '#34B36B',
    bg: '#E3F7EA',
    question: 'What are your operating hours?',
    answer:
      'Activities generally begin from 5:00 PM onwards and continue according to the selected batch schedule. For the latest timings and updates, please contact us directly.',
  },
  {
    icon: MapPin,
    color: '#FF4D8D',
    bg: '#FFE6EF',
    question: 'Where is Phulwari located?',
    answer: 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001',
  },
  {
    icon: Phone,
    color: '#3D8BFF',
    bg: '#E5EFFF',
    question: 'How can I contact Phulwari?',
    answer: (
      <ul className="faq-list">
        <li>+91 6207368839</li>
        <li>WhatsApp Support Available</li>
        <li>Visit Our Centre</li>
      </ul>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                */
/* -------------------------------------------------------------------------- */

const PHONE_NUMBER = '+916207368839';
const WHATSAPP_NUMBER = '916207368839';

export default function FAQPage() {
  // All FAQs start collapsed on page load — an answer only expands when the
  // user clicks its question (accordion: opening one closes the others).
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');

        @keyframes faqFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes faqFloatBadge {
          0%, 100% { transform: rotate(-2deg) translateY(0); }
          50% { transform: rotate(-2deg) translateY(-4px); }
        }
        @keyframes faqOpen {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 600px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-intro, .faq-intro-badge, .faq-answer { animation: none !important; }
        }

        .faq-page { background-color: #FFF7EC; font-family: 'Quicksand', sans-serif; color: #3F3A52; }

        /* ---------- Intro ---------- */
        .faq-intro {
          max-width: 56rem; margin: 0 auto; padding: 4rem 1.25rem 2.5rem; text-align: center;
          animation: faqFadeUp 0.6s ease both;
        }
        .faq-intro-badge {
          display: inline-flex; padding: 0.5rem 1.2rem; margin-bottom: 1rem; background-color: #FFD166;
          border-radius: 9999px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em;
          text-transform: uppercase; color: #6B4500; animation: faqFloatBadge 4s ease-in-out infinite;
        }
        .faq-intro-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 2.2rem; line-height: 1.15; margin-bottom: 0.9rem; }
        .faq-intro-title span { color: #FF4D8D; }
        .faq-intro-text { font-weight: 600; font-size: 1.02rem; line-height: 1.7; color: #6B6480; }

        /* ---------- Accordion ---------- */
        .faq-list-wrap { max-width: 52rem; margin: 0 auto; padding: 0 1.25rem 3rem; display: flex; flex-direction: column; gap: 0.85rem; }

        .faq-item {
          background-color: #ffffff; border-radius: 20px; box-shadow: 0 6px 18px rgba(63,58,82,0.06);
          overflow: hidden; transition: box-shadow 0.2s ease;
        }
        .faq-item.open { box-shadow: 0 12px 28px rgba(63,58,82,0.1); }

        .faq-question-btn {
          width: 100%; display: flex; align-items: center; gap: 0.85rem; padding: 1.1rem 1.25rem;
          background: none; border: none; cursor: pointer; text-align: left; font-family: 'Quicksand', sans-serif;
        }
        .faq-q-icon {
          width: 40px; height: 40px; border-radius: 14px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .faq-q-icon svg { width: 19px; height: 19px; stroke-width: 2.25; }
        .faq-question-text { flex: 1; font-weight: 700; font-size: 0.95rem; color: #3F3A52; }
        .faq-chevron { width: 19px; height: 19px; color: #6B6480; flex-shrink: 0; stroke-width: 2.5; transition: transform 0.25s ease; }
        .faq-item.open .faq-chevron { transform: rotate(180deg); color: #FF4D8D; }

        .faq-answer-wrap { overflow: hidden; transition: grid-template-rows 0.25s ease; display: grid; grid-template-rows: 0fr; }
        .faq-item.open .faq-answer-wrap { grid-template-rows: 1fr; }
        .faq-answer-inner { overflow: hidden; }
        .faq-answer {
          padding: 0 1.25rem 1.25rem 4.05rem; font-size: 0.88rem; font-weight: 600; color: #6B6480; line-height: 1.7;
          animation: faqFadeUp 0.3s ease both;
        }

        .faq-list { list-style: none; display: flex; flex-direction: column; gap: 0.45rem; margin-top: 0.4rem; }
        .faq-list li {
          position: relative; padding-left: 1.15rem; font-weight: 700; color: #3F3A52; font-size: 0.85rem;
        }
        .faq-list li::before {
          content: ''; position: absolute; left: 0; top: 0.5em; width: 6px; height: 6px; border-radius: 9999px; background-color: #FF4D8D;
        }

        .faq-programs { display: flex; flex-direction: column; gap: 1rem; margin-top: 0.4rem; }
        .faq-program-card { background-color: #FFF7EC; border-radius: 16px; padding: 1rem 1.1rem; }
        .faq-program-name { display: block; font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 0.95rem; margin-bottom: 0.2rem; }
        .faq-program-meta { display: block; font-size: 0.76rem; font-weight: 700; color: #6B6480; margin-bottom: 0.5rem; }

        /* ---------- CTA ---------- */
        .faq-cta { max-width: 56rem; margin: 0 auto; padding: 0 1.25rem 4.5rem; text-align: center; }
        .faq-cta-box { background-color: #ffffff; border-radius: 32px; padding: 2.75rem 2rem; box-shadow: 0 12px 30px rgba(63,58,82,0.07); }
        .faq-cta-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.6rem; margin-bottom: 0.6rem; }
        .faq-cta-text { font-weight: 600; color: #6B6480; margin-bottom: 1.6rem; }
        .faq-cta-buttons { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
        .faq-cta-button {
          display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.85rem 1.6rem; border: none;
          color: #ffffff; font-weight: 700; font-size: 0.92rem; font-family: 'Quicksand', sans-serif;
          border-radius: 9999px; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08); text-decoration: none;
        }
        .faq-cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 18px rgba(0,0,0,0.14); }
        .faq-cta-button:active { transform: translateY(0) scale(0.97); }
        .faq-cta-button svg { width: 18px; height: 18px; stroke: #ffffff; stroke-width: 2.25; }
        .btn-call { background-color: #FF4D8D; }
        .btn-whatsapp { background-color: #34B36B; }
        .btn-visit { background-color: #3D8BFF; }
        .btn-join { background-color: #8B5CF6; }
      `}</style>

      <div className="faq-page">
        {/* Intro */}
        <section className="faq-intro">
          <span className="faq-intro-badge">FAQ</span>
          <h1 className="faq-intro-title">
            Find Answers to <span>Common Questions</span>
          </h1>
          <p className="faq-intro-text">
            We understand parents may have questions before enrolling their child or joining our
            programs — here are answers to the most frequently asked ones.
          </p>
        </section>

        {/* Accordion */}
        <div className="faq-list-wrap">
          {faqs.map((faq, i) => {
            const Icon = faq.icon;
            const isOpen = openIndex === i;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={i}>
                <button
                  className="faq-question-btn"
                  onClick={() => toggle(i)}
                  type="button"
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-icon" style={{ backgroundColor: faq.bg }}>
                    <Icon style={{ color: faq.color }} />
                  </span>
                  <span className="faq-question-text">{faq.question}</span>
                  <ChevronDown className="faq-chevron" />
                </button>
                <div className="faq-answer-wrap">
                  <div className="faq-answer-inner">
                    {isOpen && <div className="faq-answer">{faq.answer}</div>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        
      </div>
    </>
  );
}