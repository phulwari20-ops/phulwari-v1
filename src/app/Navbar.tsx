'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Watch,
  X,
  ChevronDown,
  Sparkles,
  Heart,
  Target,
  Shield,
  Building2,
  Phone,
  Music,
  Disc3,
  Swords,
  Footprints,
  Palette,
  Activity,
  Gamepad2,
  Dumbbell,
  Baby,
  Sun,
  Snowflake,
  Cake,
  House,
  Camera,
  FileText,
  Lock,
  CalendarDays,
  HelpCircle,
  Video,
  UserCheck,
  Star,
} from 'lucide-react';

interface SubItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  color: string;
  bg: string;
}

interface NavItem {
  label: string;
  href: string;
  accent: string;
  accentBg: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  subpages?: SubItem[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', accent: '#FF4D8D', accentBg: '#FFE6EF', icon: House },
  {
    label: 'About Us',
    href: '/about',
    accent: '#3D8BFF',
    accentBg: '#E5EFFF',
    icon: Heart,
    subpages: [
      { href: '/about',             label: 'Welcome to Phulwari', icon: Heart,     color: '#FF4D8D', bg: '#FFE6EF' },
      { href: '/about/mission',     label: 'Our Mission',         icon: Target,    color: '#3D8BFF', bg: '#E5EFFF' },
      { href: '/about/whychooseus', label: 'Why Choose Us',       icon: Sparkles,  color: '#E8A621', bg: '#FFF3D9' },
      { href: '/about/corevalues',  label: 'Core Values',         icon: Shield,    color: '#34B36B', bg: '#E3F7EA' },
      { href: '/about/facilities',  label: 'Our Facilities',      icon: Building2, color: '#8B5CF6', bg: '#EFE7FE' },
    ],
  },
  {
    label: 'Activities',
    href: '/activities',
    accent: '#34B36B',
    accentBg: '#E3F7EA',
    icon: Activity,
    subpages: [
      { href: '/activities/music-dance',    label: 'Music & Dance',      icon: Music,    color: '#FF4D8D', bg: '#FFE6EF' },
      { href: '/activities/gymnastics-mma', label: 'Gymnastics & MMA',   icon: Swords,   color: '#3D8BFF', bg: '#E5EFFF' },
      { href: '/activities/roller-skating', label: 'Roller Skating & Karate', icon: Footprints,color: '#E8A621',bg: '#FFF3D9' },
      { href: '/activities/art-craft',      label: 'Art & Craft',        icon: Palette,  color: '#34B36B', bg: '#E3F7EA' },
      { href: '/activities/yoga-cricket',   label: 'Yoga & Cricket',     icon: Disc3,    color: '#8B5CF6', bg: '#EFE7FE' },
      { href: '/activities/play-zone',      label: 'Play Zone',          icon: Gamepad2, color: '#FF8A3D', bg: '#FFEADB' },
    ],
  },
  { label: 'Blogs', href: '/blogs', accent: '#FF8A3D', accentBg: '#FFEADB', icon: FileText },
  { label: 'FAQ', href: '/faq', accent: '#8B5CF6', accentBg: '#EFE7FE', icon: HelpCircle },
  {
    label: 'Programs for Mothers',
    href: '/mothers',
    accent: '#8B5CF6',
    accentBg: '#EFE7FE',
    icon: Dumbbell,
    subpages: [
      { href: '/mothers/fitness',         label: 'Mother Fitness Program',    icon: Dumbbell, color: '#34B36B', bg: '#E3F7EA' },
      { href: '/mothers/toddler-program', label: 'Mother & Toddler Program',  icon: Baby,     color: '#FF4D8D', bg: '#FFE6EF' },
    ],
  },
  {
    label: 'Camps & Events',
    href: '/events',
    accent: '#FF8A3D',
    accentBg: '#FFEADB',
    icon: Cake,
    subpages: [
      { href: '/events/summer',   label: 'Summer Camp',               icon: Sun,      color: '#E8A621', bg: '#FFF3D9' },
      { href: '/events/winter',   label: 'Winter Camp',               icon: Snowflake,color: '#3D8BFF', bg: '#E5EFFF' },
      { href: '/birthdays', label: 'Birthday Party Celebrations',icon: Cake,    color: '#FF8A3D', bg: '#FFEADB' },
    ],
  },
  {
    label: 'Batch & Gallery',
    href: '/batch-gallery',
    accent: '#14B8A6',
    accentBg: '#DFF7F1',
    icon: CalendarDays,
    subpages: [
      { href: '/batch-galary/batch',   label: 'Batch & Timings', icon: Watch,        color: '#E8A621', bg: '#FFF3D9' },
      { href: '/batch-galary/gallery', label: 'Gallery',         icon: Camera,       color: '#3D8BFF', bg: '#E5EFFF' },
    ],
  },
  {
    label: 'Legal',
    href: '/legal',
    accent: '#6B6480',
    accentBg: '#F0ECF8',
    icon: FileText,
    subpages: [
      { href: '/legal/terms',   label: 'Terms & Conditions',         icon: FileText,  color: '#FF4D8D', bg: '#FFE6EF' },
      { href: '/legal/privacy', label: 'Privacy Policy',             icon: Lock,      color: '#3D8BFF', bg: '#E5EFFF' },
      { href: '/legal/faq',    label: 'Frequently Asked Questions',  icon: HelpCircle,color: '#FF8A3D', bg: '#FFEADB' },
    ],
  },
  {
    label: 'Reviews',
    href: '/testinomals',
    accent: '#FF4D8D',
    accentBg: '#FFE6EF',
    icon: Star,
  },
  {
    label: 'Parent Portal',
    href: '/portal/login',
    accent: '#34B36B',
    accentBg: '#E3F7EA',
    icon: UserCheck,
  },
];

const socialLinks = [
  {
    name: 'Facebook',
    handle: 'Phulwari Mother & Kids',
    url: 'https://www.facebook.com/share/1DWjMMRAjT/',
    bg: '#1877F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style={{ color: '#fff' }}>
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@phulwari.motherkids',
    url: 'https://www.instagram.com/phulwari.motherkids/',
    bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style={{ color: '#fff' }}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '@phulwari-s1d7o',
    url: 'https://youtube.com/@phulwari-s1d7o?si=41VbAwYujvmndntr',
    bg: '#FF0000',
    icon: <Video style={{ color: '#fff', width: 18, height: 18 }} />,
  },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [openMobile, setOpenMobile]   = useState<string | null>(null);
  const [scrolled, setScrolled]       = useState(false);
  const navRef      = useRef<HTMLDivElement>(null);
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname    = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname?.startsWith(`${href}/`);

  const isParentActive = (item: NavItem) =>
    isActive(item.href) || (item.subpages?.some((s) => isActive(s.href)) ?? false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDesktop(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpenDesktop(null); setMobileOpen(false); }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMobile(null);
  }, [pathname]);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDesktop(null), 180);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      <style>{`
        @keyframes navPop {
          0% { transform: translateY(-14px) scale(0.97); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes dropFade {
          0% { opacity: 0; transform: translate(-50%, -8px) scale(0.96); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        @keyframes drawerSlide {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0); }
        }
        @keyframes itemRise {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 6px 16px rgba(52,179,107,0.35), 0 0 0 0 rgba(52,179,107,0.35); }
          50% { box-shadow: 0 6px 16px rgba(52,179,107,0.35), 0 0 0 6px rgba(52,179,107,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-bar, .nav-dropdown, .nav-drawer, .nav-drawer-item, .nav-logo-mark {
            animation: none !important; transition: none !important;
          }
        }

        .nav-wrap {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          width: 100%; padding: 1rem 1.25rem 0; background: transparent;
          transition: padding 0.25s ease;
        }
        .nav-wrap.is-scrolled { padding-top: 0.6rem; }

        .nav-spacer { width: 100%; height: 84px; }
        @media (min-width: 1024px) { .nav-spacer { height: 92px; } }

        .nav-bar {
          max-width: 82rem; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between; gap: 0.6rem;
          padding: 0.55rem 0.6rem 0.55rem 1rem;
          background-color: transparent; border-radius: 9999px;
          box-shadow: none; border: 1px solid transparent;
          transition: box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
          animation: navPop 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-bar:hover { transform: translateY(-1px); }
        .nav-wrap.is-scrolled .nav-bar {
          background-color: rgba(255,255,255,0.9);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 10px 28px rgba(63,58,82,0.16);
          border: 1px solid rgba(255,255,255,0.6);
        }

        .nav-logo { display: flex; align-items: center; gap: 0.55rem; text-decoration: none; flex-shrink: 0; }
        .nav-logo-mark {
          width: 38px; height: 38px; border-radius: 9999px; background-color: #FF4D8D;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .nav-logo:hover .nav-logo-mark { transform: rotate(-12deg) scale(1.08); }
        .nav-logo-mark svg { width: 19px; height: 19px; stroke: #ffffff; stroke-width: 2.5; }
        .nav-logo-text { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.2rem; color: #3F3A52; line-height: 1; }
        .nav-logo-text span { color: #FF4D8D; }

        .nav-mobile-brand {
          display: flex; flex: 1; min-width: 0; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          text-decoration: none; line-height: 1.15; padding: 0 0.35rem;
        }
        .nav-mobile-brand-main { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(0.82rem, 3.4vw, 1rem); color: #3F3A52; white-space: nowrap; }
        .nav-mobile-brand-main span { color: #FF4D8D; }
        .nav-mobile-brand-sub { font-family: 'Quicksand', sans-serif; font-weight: 600; font-size: clamp(0.5rem, 2.1vw, 0.62rem); letter-spacing: 0.01em; color: #6B6480; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
        @media (min-width: 1024px) { .nav-mobile-brand { display: none; } }

        .nav-links { display: none; align-items: center; gap: 0.2rem; font-family: 'Quicksand', sans-serif; }
        .nav-dropdown-wrap { position: relative; }

        .nav-link {
          position: relative; display: inline-flex; align-items: center; gap: 0.3rem;
          padding: 0.6rem 0.8rem; border-radius: 9999px; font-weight: 700; font-size: 0.84rem;
          color: #3F3A52; text-decoration: none; background: none; border: none; cursor: pointer;
          white-space: nowrap; transition: background-color 0.2s ease, color 0.2s ease;
        }
        .nav-link:hover { background-color: var(--accent-bg); color: var(--accent); }
        .nav-link.is-active { background-color: var(--accent-bg); color: var(--accent); }
        .nav-link.is-active::after {
          content: ''; position: absolute; bottom: 3px; left: 50%; transform: translateX(-50%);
          width: 5px; height: 5px; border-radius: 9999px; background-color: var(--accent);
        }
        .nav-link svg.nav-chevron { width: 13px; height: 13px; stroke-width: 2.75; transition: transform 0.25s ease; flex-shrink: 0; }
        .nav-link.is-open svg.nav-chevron { transform: rotate(180deg); }

        .nav-dropdown {
          position: absolute; top: calc(100% + 16px); left: 50%;
          padding: 0.65rem; background-color: #ffffff; border-radius: 22px;
          box-shadow: 0 18px 38px rgba(63,58,82,0.18); display: none;
          grid-template-columns: repeat(2, minmax(9.5rem, 1fr)); gap: 0.25rem;
          transform-origin: top center;
        }
        .nav-dropdown.has-few { grid-template-columns: 1fr; width: 16rem; }
        .nav-dropdown.has-many { width: 22rem; }
        .nav-dropdown.is-open { display: grid; animation: dropFade 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .nav-dropdown::before {
          content: ''; position: absolute; top: -6px; left: 50%; transform: translateX(-50%) rotate(45deg);
          width: 12px; height: 12px; background-color: #ffffff; border-radius: 2px;
        }

        .nav-dropdown-item {
          position: relative; z-index: 1; display: flex; align-items: center; gap: 0.65rem;
          padding: 0.55rem 0.6rem; border-radius: 14px; text-decoration: none;
          transition: background-color 0.15s ease, transform 0.15s ease;
        }
        .nav-dropdown-item:hover { background-color: #FFF7EC; transform: translateX(2px); }
        .nav-dropdown-icon {
          flex-shrink: 0; width: 32px; height: 32px; border-radius: 9999px;
          display: flex; align-items: center; justify-content: center;
        }
        .nav-dropdown-icon svg { width: 15px; height: 15px; stroke-width: 2.25; }
        .nav-dropdown-label { font-family: 'Quicksand', sans-serif; font-weight: 700; font-size: 0.8rem; line-height: 1.25; color: #3F3A52; }

        .nav-cta {
          display: none; align-items: center; gap: 0.5rem; padding: 0.62rem 1.3rem;
          background-color: #34B36B; color: #ffffff; border-radius: 9999px;
          font-family: 'Quicksand', sans-serif; font-weight: 700; font-size: 0.88rem;
          text-decoration: none; flex-shrink: 0; box-shadow: 0 6px 16px rgba(52,179,107,0.35);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          animation: ctaPulse 2.6s ease-in-out infinite;
        }
        .nav-cta:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 10px 22px rgba(52,179,107,0.4); animation-play-state: paused; }
        .nav-cta svg { width: 16px; height: 16px; stroke-width: 2.5; }

        .nav-toggle {
          display: flex; align-items: center; justify-content: center;
          width: 42px; height: 42px; border-radius: 9999px; background-color: #FFF3D9;
          border: none; cursor: pointer; flex-shrink: 0; box-shadow: 0 4px 12px rgba(63,58,82,0.12);
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .nav-toggle:active { transform: scale(0.92); }
        .nav-toggle svg { width: 20px; height: 20px; stroke: #3F3A52; stroke-width: 2.4; }

        .nav-drawer-overlay {
          position: fixed; inset: 0; z-index: 110; background-color: rgba(63,58,82,0.42);
          backdrop-filter: blur(2px); opacity: 0; visibility: hidden; transition: opacity 0.25s ease, visibility 0.25s;
        }
        .nav-drawer-overlay.is-open { opacity: 1; visibility: visible; }

        .nav-drawer {
          position: fixed; top: 0; right: 0; z-index: 120; height: 100%;
          width: min(22rem, 86vw); background-color: #FFF7EC;
          box-shadow: -16px 0 40px rgba(63,58,82,0.2); padding: 1.5rem 1.1rem 2rem;
          overflow-y: auto; transform: translateX(100%);
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-drawer.is-open { transform: translateX(0); }

        .nav-drawer-head { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 1.25rem; }
        .nav-drawer-close {
          width: 38px; height: 38px; border-radius: 9999px; background-color: #ffffff;
          border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;
          flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .nav-drawer-close svg { width: 18px; height: 18px; stroke: #3F3A52; stroke-width: 2.5; }

        .nav-drawer-item { opacity: 0; animation: itemRise 0.4s ease forwards; }

        .nav-mobile-link {
          display: flex; align-items: center; justify-content: space-between; width: 100%;
          padding: 0.85rem 0.9rem; margin-bottom: 0.3rem; border-radius: 16px;
          font-family: 'Quicksand', sans-serif; font-weight: 700; font-size: 0.95rem;
          color: #3F3A52; text-decoration: none; background-color: #ffffff; border: none; cursor: pointer; text-align: left;
        }
        .nav-mobile-link-label { display: flex; align-items: center; gap: 0.6rem; }
        .nav-mobile-link.is-active { background-color: var(--accent-bg); color: var(--accent); }
        .nav-mobile-link svg.nav-chevron { width: 16px; height: 16px; stroke-width: 2.5; transition: transform 0.25s ease; flex-shrink: 0; }
        .nav-mobile-link.is-open svg.nav-chevron { transform: rotate(180deg); }
        .nav-mobile-link-icon { width: 30px; height: 30px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .nav-mobile-link-icon svg { width: 14px; height: 14px; stroke-width: 2.4; }

        .nav-mobile-sub { overflow: hidden; max-height: 0; transition: max-height 0.3s ease; padding-left: 0.5rem; }
        .nav-mobile-sub.is-open { max-height: 32rem; }

        .nav-mobile-sub-item { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 0.7rem; margin-bottom: 0.25rem; border-radius: 14px; text-decoration: none; }
        .nav-mobile-sub-item:hover, .nav-mobile-sub-item.is-active { background-color: #ffffff; }

        .nav-drawer-cta {
          display: flex; align-items: center; justify-content: center; gap: 0.55rem;
          margin-top: 0.75rem; padding: 0.95rem; background-color: #34B36B; color: #ffffff;
          border-radius: 16px; font-family: 'Quicksand', sans-serif; font-weight: 700;
          font-size: 0.95rem; text-decoration: none; box-shadow: 0 6px 16px rgba(52,179,107,0.3);
        }
        .nav-drawer-cta svg { width: 17px; height: 17px; stroke-width: 2.5; }

        /* Social links in drawer */
        .nav-drawer-social-divider {
          border: none; border-top: 1px solid rgba(63,58,82,0.1);
          margin: 1rem 0 0.55rem;
        }
        .nav-drawer-social-label {
          font-family: 'Quicksand', sans-serif; font-weight: 700; font-size: 0.7rem;
          letter-spacing: 0.05em; text-transform: uppercase; color: #9B95B0; margin-bottom: 0.6rem;
        }
        .nav-drawer-social-row {
          display: flex; gap: 0.1rem;
        }
        .nav-drawer-social-btn {
          display: flex; align-items: center; gap: 0.3rem; padding: 0.6rem 0.5rem;
          border-radius: 12px; color: #ffffff; font-family: 'Quicksand', sans-serif;
          font-weight: 700; font-size: 0.78rem; text-decoration: none; flex: 1;
          justify-content: center; transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .nav-drawer-social-btn:hover { transform: translateY(-2px); opacity: 0.92; }

        @media (min-width: 1024px) {
          .nav-links { display: flex; }
          .nav-cta { display: inline-flex; }
          .nav-toggle { display: none; }
        }
      `}</style>

      <div className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`} ref={navRef}>
        <nav className="nav-bar">
          <Link href="/" className="nav-logo">
            <Image
              src="/phulwari_logo.webp"
              alt="Phulwari Mother & Child Activity Centre"
              width={60}
              height={30}
              style={{ width: 'auto', height: 'auto' }}
              className="object-contain"
              priority
            />
          </Link>

          <Link href="/" className="nav-mobile-brand">
            <span className="nav-mobile-brand-main">Phulwari</span>
            <span className="nav-mobile-brand-sub">Mother &amp; Child Activity Centre</span>
          </Link>

          <div className="nav-links">
            {navItems.map((item) => {
              const active = isParentActive(item);
              const styleVars = { '--accent': item.accent, '--accent-bg': item.accentBg } as React.CSSProperties;

              if (!item.subpages) {
                return (
                  <Link key={item.label} href={item.href} className={`nav-link ${active ? 'is-active' : ''}`} style={styleVars}>
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openDesktop === item.label;
              return (
                <div
                  key={item.label}
                  className="nav-dropdown-wrap"
                  onMouseEnter={() => { cancelClose(); setOpenDesktop(item.label); }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    className={`nav-link ${isOpen ? 'is-open' : ''} ${active ? 'is-active' : ''}`}
                    style={styleVars}
                    aria-expanded={isOpen}
                    onClick={() => setOpenDesktop(isOpen ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown className="nav-chevron" />
                  </button>
                  <div className={`nav-dropdown ${isOpen ? 'is-open' : ''} ${item.subpages.length > 4 ? 'has-many' : 'has-few'}`}>
                    {item.subpages.map((sub) => {
                      const Icon = sub.icon;
                      return (
                        <Link key={sub.href} href={sub.href} className="nav-dropdown-item" onClick={() => setOpenDesktop(null)}>
                          <span className="nav-dropdown-icon" style={{ backgroundColor: sub.bg }}>
                            <Icon style={{ stroke: sub.color }} />
                          </span>
                          <span className="nav-dropdown-label">{sub.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>



          <Link href="/contact" className="nav-cta">
            <Phone />
            Contact Us
          </Link>

          <button className="nav-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
        </nav>
      </div>
      <div className="nav-spacer" aria-hidden="true" />

      {/* Mobile drawer */}
      <div className={`nav-drawer-overlay ${mobileOpen ? 'is-open' : ''}`} onClick={() => setMobileOpen(false)} />
      <aside className={`nav-drawer ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="nav-drawer-head">
          <span className="nav-logo-text">
            Phulwari <span style={{ color: '#34B36B' }}>Mother & Child</span> Activity Centre
          </span>
          <button className="nav-drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X />
          </button>
        </div>

        {navItems.map((item, index) => {
          const ItemIcon = item.icon;
          const active = isParentActive(item);
          const styleVars = { '--accent': item.accent, '--accent-bg': item.accentBg } as React.CSSProperties;
          const animDelay = { animationDelay: `${index * 0.05 + 0.05}s` };

          if (!item.subpages) {
            return (
              <div key={item.label} className="nav-drawer-item" style={animDelay}>
                <Link href={item.href} className={`nav-mobile-link ${active ? 'is-active' : ''}`} style={styleVars} onClick={() => setMobileOpen(false)}>
                  <span className="nav-mobile-link-label">
                    <span className="nav-mobile-link-icon" style={{ backgroundColor: item.accentBg }}>
                      <ItemIcon style={{ stroke: item.accent }} />
                    </span>
                    {item.label}
                  </span>
                </Link>
              </div>
            );
          }

          const isOpen = openMobile === item.label;
          return (
            <div key={item.label} className="nav-drawer-item" style={animDelay}>
              <button
                className={`nav-mobile-link ${isOpen ? 'is-open' : ''} ${active ? 'is-active' : ''}`}
                style={styleVars}
                aria-expanded={isOpen}
                onClick={() => setOpenMobile(isOpen ? null : item.label)}
              >
                <span className="nav-mobile-link-label">
                  <span className="nav-mobile-link-icon" style={{ backgroundColor: item.accentBg }}>
                    <ItemIcon style={{ stroke: item.accent }} />
                  </span>
                  {item.label}
                </span>
                <ChevronDown className="nav-chevron" />
              </button>
              <div className={`nav-mobile-sub ${isOpen ? 'is-open' : ''}`}>
                {item.subpages.map((sub) => {
                  const Icon = sub.icon;
                  const subActive = isActive(sub.href);
                  return (
                    <Link key={sub.href} href={sub.href} className={`nav-mobile-sub-item ${subActive ? 'is-active' : ''}`} onClick={() => setMobileOpen(false)}>
                      <span className="nav-dropdown-icon" style={{ backgroundColor: sub.bg, width: 28, height: 28 }}>
                        <Icon style={{ stroke: sub.color }} />
                      </span>
                      <span className="nav-dropdown-label">{sub.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Contact CTA */}
        <div className="nav-drawer-item" style={{ animationDelay: `${navItems.length * 0.05 + 0.1}s` }}>
          <Link href="/contact" className="nav-drawer-cta" onClick={() => setMobileOpen(false)}>
            <Phone />
            Contact Us
          </Link>
        </div>

        {/* Social Links */}
        <div
          className="nav-drawer-item"
          style={{ animationDelay: `${navItems.length * 0.05 + 0.15}s` }}
        >
          <hr className="nav-drawer-social-divider" />
          <p className="nav-drawer-social-label">Follow Us</p>
          <div className="nav-drawer-social-row">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-drawer-social-btn"
                style={{ background: social.bg }}
                aria-label={`${social.name} – ${social.handle}`}
                title={social.handle}
              >
                {social.icon}
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;