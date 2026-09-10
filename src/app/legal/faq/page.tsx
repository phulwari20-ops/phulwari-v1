'use client';

import React, { useState, useEffect } from 'react';
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
  FileText,
  Heart,
  Star
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const ICON_MAP: Record<string, React.ElementType> = {
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
  FileText,
  Heart,
  Star,
  Phone,
  MapPin
};

const DEFAULT_FAQS = [
  {
    icon: 'HelpCircle',
    color: '#FF4D8D',
    bg: '#FFE6EF',
    question: 'What is Phulwari Mother & Child Activity Centre?',
    answer:
      "Phulwari is a unique activity centre where children can learn, play, explore and develop through engaging activities, while mothers can participate in dedicated fitness programs and family-oriented experiences.",
  },
  {
    icon: 'Baby',
    color: '#3D8BFF',
    bg: '#E5EFFF',
    question: 'What is the minimum age for admission?',
    answer:
      "Children aged 3 years and above can join our regular activity programs and batches. For younger children, we offer our special Mother & Toddler Program designed for toddlers and their mothers.",
  },
  {
    icon: 'Music4',
    color: '#34B36B',
    bg: '#E3F7EA',
    question: 'What activities are available at Phulwari?',
    answer:
      "• Music Classes\n• Dance Classes\n• Gymnastics\n• MMA Training\n• Roller Skating\n• Art & Craft\n• Cricket Training\n• Yoga\n• Play Zone Activities\n• Mother & Toddler Program\n• Fitness Program for Mothers",
  },
  {
    icon: 'Dumbbell',
    color: '#E8A621',
    bg: '#FFF3D9',
    question: 'Do you have programs for mothers?',
    answer:
      'Yes. We offer a dedicated Fitness Program for Mothers that helps mothers stay active, healthy and energetic while their children participate in activities.',
  },
  {
    icon: 'Sparkles',
    color: '#8B5CF6',
    bg: '#EFE7FE',
    question: 'What programs and batches are available?',
    answer:
      "1. Phulwari Premium Circle (5:00 PM Onwards · Monday to Sunday · 3+ Years)\n2. Phulwari Core (6:30 PM Onwards · Wednesday to Sunday · 3+ Years)\n3. Mother & Toddler Program (10:30 AM – 11:30 AM · Monday to Saturday · 1–3 Years)",
  },
  {
    icon: 'ShieldCheck',
    color: '#34B36B',
    bg: '#E3F7EA',
    question: 'Is the environment safe for children?',
    answer:
      'Absolutely. Child safety and well-being are our highest priorities. We provide a secure, clean, hygienic and child-friendly environment with trained instructors and staff.',
  },
  {
    icon: 'Cake',
    color: '#FF8A3D',
    bg: '#FFEADB',
    question: 'How You Organise Birthday ?',
    answer:
      "• Theme Decorations\n• Fun Activities\n• Entertainment\n• Customized Packages\n• Photo-Friendly Setups",
  },
  {
    icon: 'Tent',
    color: '#34B36B',
    bg: '#E3F7EA',
    question: 'Do you organize Summer Camps?',
    answer:
      "• Dance\n• Music\n• Art & Craft\n• Sports & Games\n• Fitness Activities\n• Personality Development Sessions",
  },
  {
    icon: 'Snowflake',
    color: '#3D8BFF',
    bg: '#E5EFFF',
    question: 'Do you organize Winter Camps?',
    answer:
      "• Creative Learning\n• Art & Craft\n• Fitness Activities\n• Sports & Games\n• Team Building Activities\n• Fun Competitions",
  },
  {
    icon: 'Eye',
    color: '#8B5CF6',
    bg: '#EFE7FE',
    question: 'Can parents visit the centre before enrollment?',
    answer:
      'Yes. Parents are welcome to visit our centre, explore the facilities, meet our team and understand the programs before enrollment.',
  },
  {
    icon: 'ClipboardCheck',
    color: '#FF4D8D',
    bg: '#FFE6EF',
    question: 'How can I enroll my child?',
    answer:
      "• Call Us (+91 6207368839)\n• Contact Us on WhatsApp\n• Visit the Centre Directly\n• Complete the Admission Process",
  },
  {
    icon: 'Settings2',
    color: '#3D8BFF',
    bg: '#E5EFFF',
    question: 'Are customized activity options available?',
    answer:
      'Yes. Customized activity options are available under Phulwari Premium Circle, subject to availability and requirements.',
  },
  {
    icon: 'Gamepad2',
    color: '#FF8A3D',
    bg: '#FFEADB',
    question: 'Do you have a Play Zone?',
    answer:
      'Yes. We provide a safe, clean and enjoyable Play Zone where children can play, interact and have fun in a supervised environment.',
  },
  {
    icon: 'Trophy',
    color: '#E8A621',
    bg: '#FFF3D9',
    question: 'Do you conduct special events and competitions?',
    answer:
      "• Competitions\n• Talent Shows\n• Celebrations\n• Children's Events\n• Family Engagement Activities",
  },
  {
    icon: 'Clock3',
    color: '#34B36B',
    bg: '#E3F7EA',
    question: 'What are your operating hours?',
    answer:
      'Activities generally begin from 5:00 PM onwards and continue according to the selected batch schedule. For the latest timings and updates, please contact us directly.',
  },
  {
    icon: 'MapPin',
    color: '#FF4D8D',
    bg: '#FFE6EF',
    question: 'Where is Phulwari located?',
    answer: 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001',
  },
  {
    icon: 'Phone',
    color: '#3D8BFF',
    bg: '#E5EFFF',
    question: 'How can I contact Phulwari?',
    answer:
      "• +91 6207368839\n• WhatsApp Support Available\n• Visit Our Centre Directly",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [pageConfig, setPageConfig] = useState<any>({
    badge_text: 'FAQ',
    hero_title: 'Find Answers to',
    hero_highlight: 'Common Questions',
    hero_subtitle: 'We understand parents may have questions before enrolling their child or joining our programs — here are answers to the most frequently asked ones.',
    faqs: DEFAULT_FAQS
  });

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('faq_page_config')
          .select('*')
          .eq('id', 1)
          .single();

        if (data && !error) {
          setPageConfig({
            badge_text: data.badge_text || 'FAQ',
            hero_title: data.hero_title || 'Find Answers to',
            hero_highlight: data.hero_highlight || 'Common Questions',
            hero_subtitle: data.hero_subtitle || 'We understand parents may have questions before enrolling their child or joining our programs — here are answers to the most frequently asked ones.',
            faqs: data.faqs && data.faqs.length > 0 ? data.faqs : DEFAULT_FAQS
          });
        }
      } catch (e) {
        // Suppress and fallback gracefully
      }
    };

    fetchFaq();

    let channel: any = null;
    try {
      const supabase = createClient();
      channel = supabase
        .channel('faq-realtime-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'faq_page_config' }, () => {
          fetchFaq();
        })
        .subscribe();
    } catch (e) {}

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'LIVE_FAQ_UPDATE' && event.data?.config) {
        setPageConfig(event.data.config);
      }
    };
    window.addEventListener('message', handleMessage);

    // Polling fallback every 3s to guarantee freshness
    const interval = setInterval(fetchFaq, 3000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('message', handleMessage);
      if (channel) {
        try {
          const supabase = createClient();
          supabase.removeChannel(channel);
        } catch (e) {}
      }
    };
  }, []);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const renderAnswerContent = (rawAnswer: any) => {
    if (typeof rawAnswer !== 'string') return rawAnswer;

    const lines = rawAnswer.split('\n').filter(Boolean);
    const isBulletList = lines.every((l: string) => l.startsWith('•') || l.startsWith('-') || /^\d+\./.test(l));

    if (isBulletList) {
      return (
        <ul className="faq-list">
          {lines.map((l: string, idx: number) => {
            const clean = l.replace(/^[•\-\d+\.]\s*/, '');
            return <li key={idx}>{clean}</li>;
          })}
        </ul>
      );
    }

    return (
      <div style={{ whiteSpace: 'pre-line' }}>
        {rawAnswer}
      </div>
    );
  };

  const currentFaqs = pageConfig.faqs || DEFAULT_FAQS;

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

        .faq-page { background-color: #FFF7EC; font-family: 'Quicksand', sans-serif; color: #3F3A52; min-height: 100vh; padding-bottom: 3rem; }

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
      `}</style>

      <div className="faq-page">
        {/* Intro */}
        <section className="faq-intro">
          <span className="faq-intro-badge">{pageConfig.badge_text || 'FAQ'}</span>
          <h1 className="faq-intro-title">
            {pageConfig.hero_title} <span>{pageConfig.hero_highlight}</span>
          </h1>
          <p className="faq-intro-text">
            {pageConfig.hero_subtitle}
          </p>
        </section>

        {/* Accordion */}
        <div className="faq-list-wrap">
          {currentFaqs.map((faq: any, i: number) => {
            const Icon = ICON_MAP[faq.icon] || HelpCircle;
            const isOpen = openIndex === i;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={faq.id || i}>
                <button
                  className="faq-question-btn"
                  onClick={() => toggle(i)}
                  type="button"
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-icon" style={{ backgroundColor: faq.bg || '#FFE6EF' }}>
                    <Icon style={{ color: faq.color || '#FF4D8D' }} />
                  </span>
                  <span className="faq-question-text">{faq.question}</span>
                  <ChevronDown className="faq-chevron" />
                </button>
                <div className="faq-answer-wrap">
                  <div className="faq-answer-inner">
                    {isOpen && (
                      <div className="faq-answer">
                        {renderAnswerContent(faq.answer)}
                      </div>
                    )}
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