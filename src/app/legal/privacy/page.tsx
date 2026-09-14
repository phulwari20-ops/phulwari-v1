'use client';

import React, { useEffect, useState } from 'react';
import {
  Shield,
  UserCheck,
  Database,
  CreditCard,
  Share2,
  Camera,
  Lock,
  Baby,
  Cookie,
  FileText,
  Link,
  RefreshCw,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  Info,
  MessageCircle,
  Heart,
  ArrowUp,
  CalendarDays,
  Sparkles,
  Star
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const ICON_MAP: Record<string, React.ComponentType<{ style?: React.CSSProperties; size?: number }>> = {
  Shield,
  UserCheck,
  Database,
  CreditCard,
  Share2,
  Camera,
  Lock,
  Baby,
  Cookie,
  FileText,
  Link,
  RefreshCw,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  Info,
  MessageCircle,
  Heart,
  CalendarDays,
  Sparkles
};

function resolveIcon(name?: string): React.ComponentType<any> {
  if (!name) return Shield;
  const clean = name.trim();
  const pascal = clean.replace(/(^|[-_ ])(\w)/g, (_, __, c) => c.toUpperCase());
  if ((LucideIcons as any)[pascal]) return (LucideIcons as any)[pascal];
  if ((LucideIcons as any)[clean]) return (LucideIcons as any)[clean];
  const lower = clean.toLowerCase().replace(/[-_ ]/g, '');
  const foundKey = Object.keys(LucideIcons).find(k => k.toLowerCase() === lower);
  if (foundKey) return (LucideIcons as any)[foundKey];
  return ICON_MAP[clean] || Shield;
}

const DEFAULT_PRIVACY_SECTIONS = [
  { id: 'intro', num: '01', label: 'Our Commitment', icon: 'Shield', color: '#FF4D8D', bg: '#FFE6EF', content: 'Phulwari – Mother & Child Activity Centre is committed to protecting the privacy of every child, parent, and guardian who interacts with our services or visits our website.\nBy using our website or enrolling in our programs, you agree to the practices described in this Privacy Policy.' },
  { id: 'collection', num: '02', label: 'Information We Collect', icon: 'Database', color: '#3D8BFF', bg: '#E5EFFF', content: 'We may collect personal information during registration, admissions, inquiries, event bookings, camp registrations, and website interactions.', bullets: ['Parent / Guardian: Full Name, Mobile Number, Email Address, Residential Address, Emergency Contact Details', 'Child: Name, Age & Date of Birth, Medical Info, Allergy Details, Special Needs', 'Additional: Payment Information, Event Bookings, Photo/Video Consent, Device Info'] },
  { id: 'usage', num: '03', label: 'How We Use It', icon: 'FileText', color: '#34B36B', bg: '#E3F7EA', content: 'The information we collect is used to manage admissions, classes, event registrations, parent communications, and ensure safety.', bullets: ['Processing admissions and registrations', 'Managing classes and attendance', 'Birthday Party, Summer Camp & Winter Camp bookings', 'Parent communication and emergency alerts', 'Customer support and assistance', 'Ensuring child safety and well-being'] },
  { id: 'payments', num: '04', label: 'Payment Information', icon: 'CreditCard', color: '#E8A621', bg: '#FFF3D9', content: 'Online payments may be processed through secure third-party payment providers.', notes: ['Phulwari does not store complete debit card, credit card, UPI, or banking information on its servers.', 'All payment transactions are handled through secure payment gateways.'] },
  { id: 'sharing', num: '05', label: 'Sharing of Information', icon: 'Share2', color: '#8B5CF6', bg: '#EFE7FE', content: 'We respect your privacy and do not sell, rent, or trade personal information to third parties.', bullets: ['Authorized staff members', 'Payment processing partners', 'Emergency medical personnel (when necessary)', 'Law enforcement or government authorities when legally required'] },
  { id: 'media', num: '06', label: 'Photography & Media', icon: 'Camera', color: '#FF8A3D', bg: '#FFEADB', content: 'Photographs and videos may be captured during Activity Classes, Birthday Celebrations, Summer Camps, Winter Camps, Competitions, and Events for promotional materials and galleries.\nParents may submit a written opt-out request before participation.' },
  { id: 'security', num: '07', label: 'Data Security', icon: 'Lock', color: '#14B8A6', bg: '#DFF7F1', content: 'We implement reasonable administrative, technical, and physical safeguards to protect personal information against unauthorized access, disclosure, or loss.' },
  { id: 'children', num: '08', label: "Children's Privacy", icon: 'Baby', color: '#F43F5E', bg: '#FFE1E6', content: 'Protecting children\'s privacy is paramount. Information is collected only with the knowledge and consent of parents or legal guardians.' },
  { id: 'cookies', num: '09', label: 'Cookies', icon: 'Cookie', color: '#3D8BFF', bg: '#E5EFFF', content: 'Our website may use cookies to improve user experience, analyse website traffic, and enhance performance.\nUsers can manage or disable cookies through their browser settings.' },
  { id: 'rights', num: '10', label: 'Your Rights', icon: 'UserCheck', color: '#34B36B', bg: '#E3F7EA', content: 'You have the right to request access, correction, or deletion of your personal records at any time.' },
  { id: 'third-party', num: '11', label: 'Third-Party Links', icon: 'Link', color: '#E8A621', bg: '#FFF3D9', content: 'Our website may contain links to external platforms (social media, Google Maps). Users are encouraged to review the privacy policies of those third-party services.' },
  { id: 'changes', num: '12', label: 'Changes to Policy', icon: 'RefreshCw', color: '#8B5CF6', bg: '#EFE7FE', content: 'Phulwari reserves the right to modify or update this Privacy Policy at any time.\nAny updates will be published on this page along with the revised Last Updated date.' },
  { id: 'contact', num: '13', label: 'Contact Us', icon: 'Mail', color: '#FF4D8D', bg: '#FFE6EF', content: 'If you have any questions regarding this Privacy Policy or the handling of your personal information, please contact us.' },
];

function ContactCard({ contactInfo }: { contactInfo?: any }) {
  const address = contactInfo?.address || 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001';
  const phone = contactInfo?.phone || '+91 6207368839';
  const email = contactInfo?.email || 'phulwari02@gmail.com';

  return (
    <div className="pp-contact-card">
      <div className="pp-contact-row">
        <MapPin size={16} />
        <span>{address}</span>
      </div>
      <div className="pp-contact-row">
        <Phone size={16} />
        <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
      </div>
      <div className="pp-contact-row">
        <Mail size={16} />
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  const [pageConfig, setPageConfig] = useState<any>({
    badge_text: 'Privacy Policy',
    last_updated: 'June 2026',
    title_part1: 'Your',
    title_highlight: 'Privacy',
    title_part2: 'Matters',
    intro_text: 'At Phulwari – Mother & Child Activity Centre, we value the privacy and trust of every child, parent, guardian, and visitor. This policy explains how we collect, use, and protect your personal information.',
    sections: DEFAULT_PRIVACY_SECTIONS,
    contact_info: {
      address: 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001',
      phone: '+91 6207368839',
      email: 'phulwari02@gmail.com'
    }
  });

  const [activeId, setActiveId] = useState<string>(DEFAULT_PRIVACY_SECTIONS[0].id);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('privacy_page_config')
          .select('*')
          .eq('id', 1)
          .single();

        if (data && !error) {
          const highlightColor = data.contact_info?.title_highlight_color || data.title_highlight_color || '#3D8BFF';
          setPageConfig({
            badge_text: data.badge_text || 'Privacy Policy',
            last_updated: data.last_updated || 'June 2026',
            title_part1: data.title_part1 || 'Your',
            title_highlight: data.title_highlight || 'Privacy',
            title_part2: data.title_part2 || 'Matters',
            title_highlight_color: highlightColor,
            intro_text: data.intro_text || pageConfig.intro_text,
            sections: data.sections && data.sections.length > 0 ? data.sections : DEFAULT_PRIVACY_SECTIONS,
            contact_info: data.contact_info || pageConfig.contact_info
          });
        }
      } catch (e) {
        // Fallback gracefully
      }
    };

    fetchPrivacy();

    let channel: any = null;
    try {
      const supabase = createClient();
      channel = supabase
        .channel('privacy-realtime-channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'privacy_page_config' }, () => {
          fetchPrivacy();
        })
        .subscribe();
    } catch (e) {}

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'LIVE_PRIVACY_UPDATE' && event.data?.config) {
        setPageConfig(event.data.config);
      }
    };
    window.addEventListener('message', handleMessage);

    // 3s polling fallback for instant refresh
    const interval = setInterval(fetchPrivacy, 3000);
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

  const sections = pageConfig.sections || DEFAULT_PRIVACY_SECTIONS;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-110px 0px -65% 0px', threshold: 0 }
    );
    sections.forEach((s: any) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jumpTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');

        @keyframes ppFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ppPopIn  { from { opacity: 0; transform: scale(0.94); }     to { opacity: 1; transform: scale(1); } }
        @keyframes ppFloat  { 0%, 100% { transform: rotate(-2deg) translateY(0); } 50% { transform: rotate(-2deg) translateY(-4px); } }

        @media (prefers-reduced-motion: reduce) {
          .pp-hero, .pp-badge, .pp-section, .pp-top-btn { animation: none !important; transition: none !important; }
        }

        .pp-page { background-color: #FFF7EC; font-family: 'Quicksand', sans-serif; color: #3F3A52; }

        /* ---------- Hero ---------- */
        .pp-hero { max-width: 50rem; margin: 0 auto; padding: 3.25rem 1.25rem 1.75rem; text-align: center; animation: ppFadeUp 0.6s ease both; }
        .pp-badge {
          display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1.2rem;
          background-color: #D1FAE5; border-radius: 9999px; font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase; color: #065F46;
          animation: ppFloat 4s ease-in-out infinite;
        }
        .pp-updated {
          display: inline-flex; align-items: center; gap: 0.4rem; margin: 0.85rem 0 0; padding: 0.4rem 0.9rem;
          background-color: #ffffff; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; color: #6B6480;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
        .pp-updated svg { width: 14px; height: 14px; color: #FF4D8D; }
        .pp-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(2rem, 3.6vw + 1rem, 2.9rem); line-height: 1.15; margin: 1rem 0 1rem; }
        .pp-title span { color: #3D8BFF; }
        .pp-intro-text { font-weight: 600; font-size: 1rem; line-height: 1.75; color: #6B6480; max-width: 40rem; margin: 0 auto 1.5rem; }

        .pp-quick-contact { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; }
        .pp-quick-pill {
          display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.05rem; background-color: #ffffff;
          border-radius: 9999px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); font-weight: 700; font-size: 0.82rem;
          color: #3F3A52; text-decoration: none; transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .pp-quick-pill:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
        .pp-quick-pill svg { width: 15px; height: 15px; color: #3D8BFF; }

        /* ---------- Mobile chip nav ---------- */
        .pp-chip-nav {
          position: sticky; top: 84px; z-index: 20; display: flex; gap: 0.5rem; overflow-x: auto;
          padding: 0.75rem 1.25rem; margin-bottom: 0.25rem; background-color: #FFF7EC;
          -webkit-overflow-scrolling: touch; scrollbar-width: none;
        }
        .pp-chip-nav::-webkit-scrollbar { display: none; }
        .pp-chip {
          flex-shrink: 0; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5rem 0.9rem 0.5rem 0.6rem;
          background-color: #ffffff; border-radius: 9999px; font-size: 0.78rem; font-weight: 700; color: #6B6480;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05); white-space: nowrap; border: none; cursor: pointer;
          transition: background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
        }
        .pp-chip-icon { width: 20px; height: 20px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .pp-chip-icon svg { width: 11px; height: 11px; stroke-width: 2.5; }
        .pp-chip.active { background-color: var(--accent); color: #ffffff; box-shadow: 0 6px 14px rgba(0,0,0,0.18); }
        .pp-chip.active .pp-chip-icon { background-color: rgba(255,255,255,0.25) !important; }
        .pp-chip.active .pp-chip-icon svg { stroke: #ffffff !important; }

        @media (min-width: 1024px) { .pp-chip-nav { display: none; } }

        /* ---------- Shell / layout ---------- */
        .pp-shell { max-width: 72rem; margin: 0 auto; padding: 0 1.25rem 2rem; display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        @media (min-width: 1024px) { .pp-shell { grid-template-columns: 16rem 1fr; gap: 3rem; align-items: start; } }

        /* ---------- Desktop sidebar TOC ---------- */
        .pp-toc { display: none; }
        @media (min-width: 1024px) {
          .pp-toc { display: block; position: sticky; top: 7rem; max-height: calc(100vh - 9rem); overflow-y: auto; padding-right: 0.5rem; }
        }
        .pp-toc-label { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: #A39CB5; margin-bottom: 0.75rem; padding-left: 0.75rem; }
        .pp-toc-list { display: flex; flex-direction: column; gap: 0.1rem; }
        .pp-toc-link {
          display: flex; align-items: center; gap: 0.6rem; padding: 0.5rem 0.7rem; border-radius: 12px;
          font-size: 0.82rem; font-weight: 700; color: #6B6480; text-decoration: none;
          border-left: 3px solid transparent; transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }
        .pp-toc-link:hover { background-color: #ffffff; color: #3F3A52; }
        .pp-toc-link.active { background-color: #ffffff; color: var(--accent); border-left-color: var(--accent); box-shadow: 0 2px 8px rgba(63,58,82,0.06); }
        .pp-toc-num { font-variant-numeric: tabular-nums; opacity: 0.55; font-size: 0.72rem; flex-shrink: 0; }
        .pp-toc-link:focus-visible { outline: 2px solid #3F3A52; outline-offset: 2px; }

        /* ---------- Content sections ---------- */
        .pp-content { display: flex; flex-direction: column; gap: 1.1rem; min-width: 0; }
        .pp-section {
          scroll-margin-top: 6.5rem; background-color: #ffffff; border-radius: 22px; padding: 1.75rem 1.5rem;
          box-shadow: 0 6px 18px rgba(63,58,82,0.06); animation: ppPopIn 0.4s ease both;
        }
        .pp-section-head { display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1.1rem; }
        .pp-section-icon { width: 42px; height: 42px; border-radius: 9999px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .pp-section-icon svg { width: 19px; height: 19px; stroke-width: 2.25; }
        .pp-section-num { display: block; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 0.74rem; color: #C9C2D6; margin-bottom: 0.1rem; }
        .pp-section-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.2rem; color: #3F3A52; line-height: 1.25; }

        .pp-section p { font-size: 0.93rem; line-height: 1.75; color: #5B5570; margin-bottom: 0.85rem; white-space: pre-line; }
        .pp-section p:last-child { margin-bottom: 0; }
        .pp-section ul { list-style: none; margin: 0 0 0.85rem; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
        .pp-section ul:last-child { margin-bottom: 0; }
        .pp-section li { display: flex; align-items: flex-start; gap: 0.55rem; font-size: 0.9rem; line-height: 1.6; color: #5B5570; }
        .pp-section li svg { width: 15px; height: 15px; flex-shrink: 0; margin-top: 0.2rem; color: var(--accent); }

        .pp-note { background-color: #FFF7EC; border: 1.5px dashed #EADFC8; border-radius: 16px; padding: 1rem 1.1rem; margin: 0.25rem 0 0.85rem; }
        .pp-note:last-child { margin-bottom: 0; }
        .pp-note-label { display: flex; align-items: center; gap: 0.4rem; font-weight: 800; font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.04em; color: #C9821E; margin-bottom: 0.65rem; }
        .pp-note-label svg { width: 14px; height: 14px; }
        .pp-note ul { margin-bottom: 0; }

        .pp-contact-card { display: flex; flex-direction: column; gap: 0.65rem; background-color: #FFF7EC; border-radius: 16px; padding: 1.1rem 1.2rem; margin-top: 0.25rem; }
        .pp-contact-row { display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.87rem; font-weight: 700; color: #3F3A52; line-height: 1.5; }
        .pp-contact-row svg { width: 16px; height: 16px; color: #3D8BFF; flex-shrink: 0; margin-top: 0.15rem; }
        .pp-contact-row a { color: inherit; text-decoration: none; }
        .pp-contact-row a:hover { text-decoration: underline; }

        /* ---------- Closing banner ---------- */
        .pp-thanks { max-width: 72rem; margin: 0.5rem auto 4rem; padding: 0 1.25rem; }
        .pp-thanks-card {
          position: relative; overflow: hidden; text-align: center; border-radius: 28px; padding: 2.75rem 1.75rem;
          background: linear-gradient(135deg, #E5EFFF 0%, #DFF7F1 35%, #EFE7FE 70%, #FFE6EF 100%);
        }
        .pp-thanks-icon { width: 56px; height: 56px; border-radius: 9999px; background-color: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.1rem; box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
        .pp-thanks-icon svg { width: 24px; height: 24px; color: #3D8BFF; }
        .pp-thanks-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.5rem; margin-bottom: 0.65rem; color: #3F3A52; }
        .pp-thanks-text { font-weight: 600; color: #6B6480; line-height: 1.75; max-width: 36rem; margin: 0 auto 1.6rem; }
        .pp-thanks-actions { display: flex; flex-wrap: wrap; gap: 0.65rem; justify-content: center; }
        .pp-thanks-btn {
          display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.8rem 1.4rem; border: none; border-radius: 9999px;
          color: #ffffff; font-weight: 700; font-size: 0.9rem; font-family: 'Quicksand', sans-serif; cursor: pointer;
          text-decoration: none; box-shadow: 0 6px 14px rgba(0,0,0,0.12); transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .pp-thanks-btn:hover { transform: translateY(-2px); }
        .pp-thanks-btn svg { width: 17px; height: 17px; }
        .pp-thanks-btn--call { background-color: #3D8BFF; }
        .pp-thanks-btn--whatsapp { background-color: #34B36B; }

        /* ---------- Back to top ---------- */
        .pp-top-btn {
          position: fixed; right: 1.25rem; bottom: 1.25rem; z-index: 30; width: 44px; height: 44px; border-radius: 9999px;
          background-color: #3F3A52; color: #ffffff; border: none; display: flex; align-items: center; justify-content: center;
          cursor: pointer; box-shadow: 0 10px 24px rgba(63,58,82,0.3); opacity: 0; visibility: hidden; transform: translateY(10px);
          transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
        }
        .pp-top-btn.is-visible { opacity: 1; visibility: visible; transform: translateY(0); }
        .pp-top-btn svg { width: 19px; height: 19px; }
      `}</style>

      <div className="pp-page">
        {/* Hero */}
        <header className="pp-hero">
          <span className="pp-badge"><Shield size={13} /> {pageConfig.badge_text || 'Privacy Policy'}</span>
          <div>
            <span className="pp-updated">
              <CalendarDays />
              Last Updated: {pageConfig.last_updated || 'June 2026'}
            </span>
          </div>
          <h1 className="pp-title">
            {(() => {
              const p1 = (pageConfig.title_part1 || '').trim();
              const hl = (pageConfig.title_highlight || 'Privacy').trim();
              const p2 = (pageConfig.title_part2 || '').trim();
              const hlColor = pageConfig.title_highlight_color || pageConfig.contact_info?.title_highlight_color || '#3D8BFF';
              if (!p1 && !p2) return <span style={{ color: hlColor }}>{hl}</span>;
              if (hl.toLowerCase() === p1.toLowerCase()) {
                return <span style={{ color: hlColor }}>{hl}</span>;
              }
              return (
                <>
                  {p1 ? `${p1} ` : ''}<span style={{ color: hlColor }}>{hl}</span>{p2 ? ` ${p2}` : ''}
                </>
              );
            })()}
          </h1>
          <p className="pp-intro-text">
            {pageConfig.intro_text}
          </p>
          <div className="pp-quick-contact">
            <a className="pp-quick-pill" href={`tel:${pageConfig.contact_info?.phone?.replace(/\s+/g, '') || '+916207368839'}`}>
              <Phone size={15} /> Call Us
            </a>
            <a
              className="pp-quick-pill"
              href="https://wa.me/916207368839"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={15} /> WhatsApp Us
            </a>
            <a className="pp-quick-pill" href={`mailto:${pageConfig.contact_info?.email || 'phulwari02@gmail.com'}`}>
              <Mail size={15} /> Email Us
            </a>
          </div>
        </header>

        {/* Mobile chip nav */}
        <nav className="pp-chip-nav" aria-label="Jump to section">
          {sections.map((s: any) => {
            const Icon = resolveIcon(s.icon);
            const active = activeId === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={jumpTo(s.id)}
                className={`pp-chip ${active ? 'active' : ''}`}
                style={{ ['--accent' as any]: s.color || '#3D8BFF' }}
                aria-current={active}
              >
                <span className="pp-chip-icon" style={{ backgroundColor: s.bg || '#E5EFFF' }}>
                  <Icon style={{ stroke: s.color || '#3D8BFF', color: s.color || '#3D8BFF' }} />
                </span>
                {s.label}
              </a>
            );
          })}
        </nav>

        <div className="pp-shell">
          {/* Desktop sidebar TOC */}
          <aside className="pp-toc" aria-label="Table of contents">
            <p className="pp-toc-label">On this page</p>
            <div className="pp-toc-list">
              {sections.map((s: any) => {
                const active = activeId === s.id;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={jumpTo(s.id)}
                    className={`pp-toc-link ${active ? 'active' : ''}`}
                    style={{ ['--accent' as any]: s.color || '#3D8BFF' }}
                    aria-current={active}
                  >
                    <span className="pp-toc-num">{s.num}</span>
                    {s.label}
                  </a>
                );
              })}
            </div>
          </aside>

          {/* Section content */}
          <main className="pp-content">
            {sections.map((sec: any) => {
              const Icon = resolveIcon(sec.icon);
              return (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="pp-section"
                  style={{ ['--accent' as any]: sec.color || '#3D8BFF' }}
                >
                  <div className="pp-section-head">
                    <span className="pp-section-icon" style={{ backgroundColor: sec.bg || '#E5EFFF' }}>
                      <Icon style={{ stroke: sec.color || '#3D8BFF', color: sec.color || '#3D8BFF' }} />
                    </span>
                    <div>
                      <span className="pp-section-num">{sec.num}</span>
                      <h2 className="pp-section-title">{sec.label}</h2>
                    </div>
                  </div>

                  {sec.content && <p>{sec.content}</p>}

                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul>
                      {sec.bullets.map((b: string, bIdx: number) => (
                        <li key={bIdx}>
                          <CheckCircle2 />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.notes && sec.notes.length > 0 && (
                    <div className="pp-note">
                      <p className="pp-note-label"><Info /> Important</p>
                      <ul>
                        {sec.notes.map((n: string, nIdx: number) => (
                          <li key={nIdx}>
                            <CheckCircle2 />
                            <span>{n}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(sec.id === 'intro' || sec.id === 'rights' || sec.id === 'contact') && (
                    <ContactCard contactInfo={pageConfig.contact_info} />
                  )}
                </section>
              );
            })}
          </main>
        </div>

        {/* Closing banner */}
        <div className="pp-thanks">
          <div className="pp-thanks-card">
            <div className="pp-thanks-icon">
              <Heart fill="#3D8BFF" />
            </div>
            <h2 className="pp-thanks-title">Your Privacy is in Safe Hands</h2>
            <p className="pp-thanks-text">
              At Phulwari, we are committed to maintaining the privacy, safety, and trust of every
              child and family who becomes part of our community.
            </p>
            <div className="pp-thanks-actions">
              <a className="pp-thanks-btn pp-thanks-btn--call" href={`tel:${pageConfig.contact_info?.phone?.replace(/\s+/g, '') || '+916207368839'}`}>
                <Phone /> Call Us
              </a>
              <a
                className="pp-thanks-btn pp-thanks-btn--whatsapp"
                href="https://wa.me/916207368839"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        className={`pp-top-btn ${showTop ? 'is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp />
      </button>
    </>
  );
}