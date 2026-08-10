'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  MessageCircle,
  Cake,
  Tent,
  Snowflake,
  MapPin,
  Mail,
  Music,
  Disc3,
  Activity,
  Swords,
  Footprints,
  Palette,
  Target,
  Flower2,
  Blocks,
  Baby,
  Dumbbell,
  Users,
  Star,
  Sparkles,
  FileText,
  Lock,
  CalendarDays,
  Camera,
  Clock,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Video,
} from 'lucide-react';

interface LinkItem {
  label: string;
  href: string;
}

const quickLinks: LinkItem[] = [
  { label: 'Home',                   href: '/' },
  { label: 'About Us',               href: '/about' },
  { label: 'Activities',             href: '/activities' },
  { label: 'Programs for Mothers',   href: '/mothers' },
  { label: 'Birthday Parties',       href: '/events/birthday' },
  { label: 'Summer Camp',            href: '/events/summer' },
  { label: 'Winter Camp',            href: '/events/winter' },
  { label: 'Batch & Timings',        href: '/batch-galary/batch' },
  { label: 'Gallery',                href: '/batch-galary/gallery' },
  { label: 'FAQ',                    href: '/faq' },
  { label: 'Contact Us',             href: '/contact' },
];

const legalLinks: LinkItem[] = [
  { label: 'Terms & Conditions', href: '/legal/terms' },
  { label: 'Privacy Policy',     href: '/legal/privacy' },
];

const activities = [
  { icon: Music,       label: 'Music Classes',               color: '#FF4D8D', href: '/activities/music-dance' },
  { icon: Disc3,       label: 'Dance Classes',               color: '#3D8BFF', href: '/activities/music-dance' },
  { icon: Activity,    label: 'Gymnastics',                  color: '#34B36B', href: '/activities/gymnastics-mma' },
  { icon: Swords,      label: 'MMA Training',                color: '#E8A621', href: '/activities/gymnastics-mma' },
  { icon: Footprints,  label: 'Roller Skating',              color: '#8B5CF6', href: '/activities/roller-skating' },
  { icon: Palette,     label: 'Art & Craft',                 color: '#FF8A3D', href: '/activities/art-craft' },
  { icon: Target,      label: 'Cricket Training',            color: '#3D8BFF', href: '/activities/yoga-cricket' },
  { icon: Flower2,     label: 'Yoga',                        color: '#34B36B', href: '/activities/yoga-cricket' },
  { icon: Blocks,      label: 'Play Zone',                   color: '#FF4D8D', href: '/activities/play-zone' },
  { icon: Baby,        label: 'Mother & Toddler Program',    color: '#E8A621', href: '/mothers/toddler-program' },
  { icon: Dumbbell,    label: 'Fitness Program for Mothers', color: '#8B5CF6', href: '/mothers/fitness' },
];

const programs = [
  { icon: Users,        label: 'Mother & Toddler Program', color: '#3D8BFF', href: '/mothers/toddler-program' },
  { icon: Dumbbell,     label: 'Mother Fitness Program',   color: '#34B36B', href: '/mothers/fitness' },
  { icon: Tent,         label: 'Summer Camp',              color: '#34B36B', href: '/events/summer' },
  { icon: Snowflake,    label: 'Winter Camp',              color: '#3D8BFF', href: '/events/winter' },
  { icon: Cake,         label: 'Birthday Celebrations',    color: '#FF8A3D', href: '/events/birthday' },
  { icon: CalendarDays, label: 'Batch & Timings',          color: '#14B8A6', href: '/batch-galary/batch' },
  { icon: Camera,       label: 'Gallery',                  color: '#8B5CF6', href: '/batch-galary/gallery' },
];

const workingHours = [
  { icon: Users,    title: 'Mother & Toddler Program', color: '#3D8BFF', lines: ['Monday – Saturday', '10:30 AM – 11:30 AM'] },
  { icon: Star,     title: 'Premium Circle',           color: '#FFD166', lines: ['Monday – Sunday',   '5:00 PM Onwards'] },
  { icon: Sparkles, title: 'Phulwari Core',            color: '#FF4D8D', lines: ['Wednesday – Sunday','6:30 PM Onwards'] },
];

const whyUs = [
  { icon: ShieldCheck, label: 'Safe & Secure Environment',      color: '#34B36B' },
  { icon: Users,       label: 'Expert & Certified Trainers',    color: '#3D8BFF' },
  { icon: Star,        label: '4.9★ Google Rating',             color: '#FFD166' },
  { icon: CheckCircle, label: '200+ Happy Families',            color: '#FF4D8D' },
  { icon: HelpCircle,  label: 'Dedicated Parent Support',       color: '#8B5CF6' },
  { icon: CalendarDays,label: 'Flexible Batch Timings',         color: '#FF8A3D' },
];

const faqs = [
  { q: 'What age groups do you accept?', a: 'Children from 1.5 years to 14 years across all programs.' },
  { q: 'Is there a trial class?',         a: 'Yes! Contact us to book a free trial session.' },
  { q: 'Do mothers also participate?',    a: 'Absolutely — our Mother & Toddler and Fitness programs are designed for moms.' },
];

const quickActions = [
  { icon: Phone,         label: 'Call Now',            bg: '#FF4D8D', href: 'tel:+916207368839',          external: true  },
  { icon: MessageCircle, label: 'WhatsApp Now',        bg: '#34B36B', href: 'https://wa.me/916207368839', external: true  },
  { icon: Cake,          label: 'Book Birthday Party', bg: '#FF8A3D', href: '/events/birthday',            external: false },
  { icon: Tent,          label: 'Join Summer Camp',    bg: '#3D8BFF', href: '/events/summer',              external: false },
  { icon: Snowflake,     label: 'Join Winter Camp',    bg: '#8B5CF6', href: '/events/winter',              external: false },
];

const socialLinks = [
  {
    name: 'Facebook',
    handle: 'Phulwari Mother & Kids',
    url: 'https://www.facebook.com/share/1DWjMMRAjT/',
    bg: '#1877F2',
    hoverBg: '#1464d2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style={{ color: '#fff', flexShrink: 0 }}>
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@phulwari.motherkids',
    url: 'https://www.instagram.com/phulwari.motherkids/',
    bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    hoverBg: 'linear-gradient(45deg, #d4821d, #ca5a33, #c0203a, #b01d58, #a01575)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style={{ color: '#fff', flexShrink: 0 }}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '@phulwari-s1d7o',
    url: 'https://youtube.com/@phulwari-s1d7o?si=41VbAwYujvmndntr',
    bg: '#FF0000',
    hoverBg: '#cc0000',
    icon: <Video style={{ color: '#fff', width: 20, height: 20, flexShrink: 0 }} />,
  },
  {
    name: 'Find us on Google',
    handle: 'Kidwaipuri, Patna',
    url: 'https://maps.app.goo.gl/g2PRe3oV2QhhZoEk8',
    bg: '#34A853',
    hoverBg: '#2d9247',
    icon: <MapPin style={{ color: '#fff', width: 20, height: 20, flexShrink: 0 }} />,
  },
];

const Footer: React.FC = () => {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <>
      <style>{`
        .footer-shell {
          position:relative; width:100%; background-color:#322D45;
          padding-top:40px; overflow:hidden;
          font-family:'Quicksand',-apple-system,BlinkMacSystemFont,sans-serif;
        }
        .footer-shell::before {
          content:''; position:absolute; top:0; left:0; right:0; height:36px;
          background:radial-gradient(circle at 18px 36px,transparent 19px,#FFF7EC 20px);
          background-size:36px 36px; background-repeat:repeat-x;
        }
        .footer-inner {
          position:relative; z-index:1; max-width:80rem;
          margin:0 auto; padding:1.5rem 1.25rem 0;
        }
        .footer-heading { font-family:'Baloo 2',sans-serif; font-weight:800; color:#ffffff; letter-spacing:-.01em; }

        .footer-brand-row { display:flex; align-items:center; gap:.6rem; margin-bottom:.85rem; }
        .footer-brand-name { font-size:1.3rem; line-height:1.15; }
        .footer-tagline { font-weight:700; font-size:.9rem; color:#FFD166; margin-bottom:.85rem; }
        .footer-description { font-weight:600; font-size:.9rem; line-height:1.65; color:#C7C0DC; max-width:26rem; margin-bottom:1.5rem; }

        .footer-grid {
          display:grid; grid-template-columns:1fr; gap:2.25rem;
          padding:2.5rem 0 2.75rem;
          border-top:1px solid rgba(255,255,255,.08); margin-top:1.5rem;
        }
        @media(min-width:768px){ .footer-grid { grid-template-columns:1.2fr 0.85fr 1fr 1fr; gap:1.75rem; } }
        @media(min-width:1024px){ .footer-inner { padding-left:2rem; padding-right:2rem; } }

        .footer-col-title { font-family:'Baloo 2',sans-serif; font-weight:700; font-size:1.05rem; color:#ffffff; margin-bottom:1rem; }

        .footer-links-list { list-style:none; display:flex; flex-direction:column; gap:.6rem; }
        .footer-links-list a { font-weight:600; font-size:.88rem; color:#C7C0DC; text-decoration:none; transition:color .15s ease; }
        .footer-links-list a:hover, .footer-links-list a.is-active { color:#FFD166; }

        .footer-legal-divider { border:none; border-top:1px solid rgba(255,255,255,.08); margin:1rem 0; }
        .footer-legal-label { font-size:.7rem; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:#7A7393; margin-bottom:.6rem; }
        .footer-legal-list { list-style:none; display:flex; flex-direction:column; gap:.55rem; }
        .footer-legal-item { display:flex; align-items:center; gap:.5rem; font-weight:600; font-size:.85rem; color:#C7C0DC; text-decoration:none; transition:color .15s ease; }
        .footer-legal-item:hover { color:#FFD166; }
        .footer-legal-item svg { width:13px; height:13px; stroke-width:2.25; flex-shrink:0; opacity:.7; }

        .footer-tag-list { display:flex; flex-direction:column; gap:.65rem; }
        .footer-tag-item { display:flex; align-items:center; gap:.55rem; text-decoration:none; transition:transform .15s ease; }
        .footer-tag-item:hover { transform:translateX(2px); }
        .footer-tag-item:hover .footer-tag-label { color:#FFD166; }
        .footer-tag-icon { flex-shrink:0; width:26px; height:26px; border-radius:9999px; display:flex; align-items:center; justify-content:center; }
        .footer-tag-icon svg { width:13px; height:13px; stroke-width:2.4; }
        .footer-tag-label { font-weight:600; font-size:.86rem; color:#DCD7EB; transition:color .15s ease; }

        .footer-contact-item { display:flex; align-items:flex-start; gap:.65rem; margin-bottom:1rem; }
        .footer-contact-icon { flex-shrink:0; width:30px; height:30px; border-radius:9999px; background-color:rgba(255,255,255,.08); display:flex; align-items:center; justify-content:center; margin-top:.05rem; }
        .footer-contact-icon svg { width:14px; height:14px; stroke:#FFD166; stroke-width:2.25; }
        .footer-contact-text { font-weight:600; font-size:.86rem; line-height:1.55; color:#DCD7EB; }
        .footer-contact-text a { color:#DCD7EB; text-decoration:none; }
        .footer-contact-text a:hover { color:#FFD166; }

        .footer-hours-card { display:flex; align-items:flex-start; gap:.65rem; padding:.75rem; background-color:rgba(255,255,255,.05); border-radius:16px; margin-bottom:.75rem; }
        .footer-hours-icon { flex-shrink:0; width:30px; height:30px; border-radius:9999px; display:flex; align-items:center; justify-content:center; }
        .footer-hours-icon svg { width:14px; height:14px; stroke:#ffffff; stroke-width:2.4; }
        .footer-hours-title { font-weight:700; font-size:.84rem; color:#ffffff; margin-bottom:.2rem; }
        .footer-hours-line { font-weight:600; font-size:.78rem; color:#B7AFD1; line-height:1.45; }

        /* Social strip */
        .footer-social-strip {
          border-top:1px solid rgba(255,255,255,.08);
          padding:1.75rem 0;
        }
        .footer-social-title {
          font-family:'Baloo 2',sans-serif; font-weight:800; font-size:1rem;
          color:#FFD166; margin-bottom:1rem; text-align:center;
        }
        .footer-social-cards {
          display:flex; flex-wrap:wrap; justify-content:center; gap:.85rem;
        }
        .footer-social-card {
          display:flex; align-items:center; gap:.75rem;
          padding:.75rem 1.2rem; border-radius:16px;
          color:#ffffff; text-decoration:none; font-family:'Quicksand',sans-serif;
          transition:transform .18s ease, opacity .18s ease;
          min-width:13rem; flex:1; max-width:17rem;
        }
        .footer-social-card:hover { transform:translateY(-3px); opacity:.92; }
        .footer-social-card-icon {
          width:40px; height:40px; border-radius:12px;
          background:rgba(255,255,255,.15);
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .footer-social-card-info { min-width:0; }
        .footer-social-card-name { font-weight:800; font-size:.9rem; line-height:1.2; }
        .footer-social-card-handle { font-weight:600; font-size:.75rem; opacity:.8; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

        /* Why us strip */
        .footer-why-strip { border-top:1px solid rgba(255,255,255,.08); padding:1.75rem 0; }
        .footer-why-title { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:1rem; color:#FFD166; margin-bottom:1rem; text-align:center; }
        .footer-why-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:.65rem; }
        @media(min-width:640px){ .footer-why-grid { grid-template-columns:repeat(3,1fr); } }
        @media(min-width:1024px){ .footer-why-grid { grid-template-columns:repeat(6,1fr); } }
        .footer-why-item { display:flex; align-items:center; gap:.5rem; padding:.55rem .75rem; background:rgba(255,255,255,.05); border-radius:12px; }
        .footer-why-item svg { width:14px; height:14px; stroke-width:2.4; flex-shrink:0; }
        .footer-why-label { font-size:.76rem; font-weight:700; color:#DCD7EB; line-height:1.35; }

        /* FAQ strip */
        .footer-faq-strip { border-top:1px solid rgba(255,255,255,.08); padding:1.75rem 0; }
        .footer-faq-title { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:1rem; color:#FFD166; margin-bottom:1rem; text-align:center; }
        .footer-faq-grid { display:grid; grid-template-columns:1fr; gap:.75rem; }
        @media(min-width:768px){ .footer-faq-grid { grid-template-columns:repeat(3,1fr); } }
        .footer-faq-item { background:rgba(255,255,255,.05); border-radius:16px; padding:1rem 1.1rem; }
        .footer-faq-q { font-weight:700; font-size:.83rem; color:#ffffff; margin-bottom:.3rem; }
        .footer-faq-a { font-weight:600; font-size:.78rem; color:#B7AFD1; line-height:1.55; }

        /* Quick actions */
        .footer-actions-band { display:flex; flex-wrap:wrap; justify-content:center; gap:.7rem; padding-bottom:2.25rem; border-top:1px solid rgba(255,255,255,.08); padding-top:1.75rem; }
        .footer-action-btn { display:inline-flex; align-items:center; gap:.5rem; padding:.7rem 1.25rem; border:none; border-radius:9999px; color:#ffffff; font-family:'Quicksand',sans-serif; font-weight:700; font-size:.82rem; text-decoration:none; cursor:pointer; transition:transform .15s ease; }
        .footer-action-btn:hover { transform:translateY(-2px); }
        .footer-action-btn svg { width:15px; height:15px; stroke:#ffffff; stroke-width:2.4; }

        .footer-bottom-bar { border-top:1px solid rgba(255,255,255,.08); padding:1.25rem 0 1.75rem; text-align:center; }
        .footer-bottom-text { font-weight:600; font-size:.78rem; color:#9991B3; line-height:1.6; }
        .footer-bottom-text strong { color:#C7C0DC; font-weight:700; }
        .footer-bottom-links { display:flex; justify-content:center; gap:1.25rem; margin-top:.65rem; flex-wrap:wrap; }
        .footer-bottom-links a { font-size:.76rem; font-weight:700; color:#7A7393; text-decoration:none; transition:color .15s ease; }
        .footer-bottom-links a:hover { color:#FFD166; }
        .footer-bottom-sep { color:#4A4360; }
        .footer-credit { font-weight:600; font-size:.78rem; color:#9991B3; margin-top:.4rem; }
        .footer-credit a { color:#FFD166; font-weight:700; text-decoration:none; }
        .footer-credit a:hover { text-decoration:underline; }

        @media(min-width:640px){ .footer-brand-name { font-size:1.45rem; } }
      `}</style>

      <footer className="footer-shell">
        <div className="footer-inner">

          {/* Brand */}
          <div>
            <div className="footer-brand-row">
              <h2 className="footer-heading footer-brand-name">
                Phulwari Mother &amp; Child Activity Centre
              </h2>
            </div>
            <p className="footer-tagline">Where Learning, Play &amp; Growth Come Together.</p>
            <p className="footer-description">
              A unique activity centre dedicated to the holistic development of children
              and the well-being of mothers through engaging activities, fitness programs,
              camps, celebrations, and family-focused experiences.
            </p>
          </div>

          {/* Main Grid */}
          <div className="footer-grid">

            {/* Quick Links + Legal */}
            <div>
              <h3 className="footer-col-title">Quick Links</h3>
              <ul className="footer-links-list">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={isActive(link.href) ? 'is-active' : ''}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <hr className="footer-legal-divider" />
              <p className="footer-legal-label">Legal</p>
              <ul className="footer-legal-list">
                {legalLinks.map((link) => {
                  const Icon = link.label === 'Privacy Policy' ? Lock : FileText;
                  return (
                    <li key={link.label}>
                      <Link href={link.href} className={`footer-legal-item ${isActive(link.href) ? 'is-active' : ''}`}>
                        <Icon /> {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Activities */}
            <div>
              <h3 className="footer-col-title">Our Activities</h3>
              <div className="footer-tag-list">
                {activities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <Link key={activity.label} href={activity.href} className="footer-tag-item">
                      <span className="footer-tag-icon" style={{ backgroundColor:`${activity.color}26` }}>
                        <Icon style={{ stroke: activity.color }} />
                      </span>
                      <span className="footer-tag-label">{activity.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Programs */}
            <div>
              <h3 className="footer-col-title">Programs</h3>
              <div className="footer-tag-list" style={{ marginBottom:'1.75rem' }}>
                {programs.map((program) => {
                  const Icon = program.icon;
                  return (
                    <Link key={program.label} href={program.href} className="footer-tag-item">
                      <span className="footer-tag-icon" style={{ backgroundColor:`${program.color}26` }}>
                        <Icon style={{ stroke: program.color }} />
                      </span>
                      <span className="footer-tag-label">{program.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Contact + Hours */}
            <div>
              <h3 className="footer-col-title">Contact Information</h3>
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><MapPin /></span>
                <p className="footer-contact-text">M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001</p>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><Phone /></span>
                <p className="footer-contact-text"><a href="tel:+916207368839">+91 62073 68839</a></p>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><Mail /></span>
                <p className="footer-contact-text"><a href="mailto:phulwari02@gmail.com">phulwari02@gmail.com</a></p>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon"><MessageCircle /></span>
                <p className="footer-contact-text">
                  <a href="https://wa.me/916207368839" target="_blank" rel="noopener noreferrer">
                    WhatsApp Support Available<br /><span>+91 62073 68839</span>
                  </a>
                </p>
              </div>

            
            </div>

          </div>

          {/* Social Media Strip */}
          <div className="footer-social-strip">
            <p className="footer-social-title">Follow Us on Social Media</p>
            <div className="footer-social-cards">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-card"
                  style={{ background: social.bg }}
                  aria-label={`${social.name} – ${social.handle}`}
                >
                  <span className="footer-social-card-icon">
                    {social.icon}
                  </span>
                  <span className="footer-social-card-info">
                    <div className="footer-social-card-name">{social.name}</div>
                    <div className="footer-social-card-handle">{social.handle}</div>
                  </span>
                </a>
              ))}
            </div>
          </div>

         

          

         

          {/* Bottom bar */}
          <div className="footer-bottom-bar">
            <p className="footer-bottom-text">
              © 2026 <strong>Phulwari Mother &amp; Child Activity Centre</strong>. All Rights Reserved.
              <br />Designed with ❤️ for Children, Mothers &amp; Families.
            </p>
            <div className="footer-bottom-links">
              <Link href="/legal/terms">Terms &amp; Conditions</Link>
              <span className="footer-bottom-sep">·</span>
              <Link href="/legal/privacy">Privacy Policy</Link>
            </div>
            <p className="footer-credit">
              Website designed &amp; developed by{' '}
              <a href="https://www.sabkasaathidigitalservices.com/" target="_blank" rel="noopener noreferrer">
                Sabka Saathi Digital Services
              </a>
            </p>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;