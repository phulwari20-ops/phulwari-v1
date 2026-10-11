'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Pause,
  Video,
  Camera,
  Sparkles,
  Maximize2,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { ActivityVideoGallery } from '@/components/activities/ActivityVideoGallery';

// Pre-cached verified starting images from local public storage for ZERO INITIAL DELAY on page load
const INITIAL_GALLERY_SLIDES = [
  { src: '/galary1.webp', title: 'Phulwari Creative Arts & Sensory Play' },
  { src: '/galary2.webp', title: 'Toddler Movement & Joy Space' },
  { src: '/galary3.webp', title: 'Childhood Balance & Outdoor Training' },
  { src: '/galary4.webp', title: 'Interactive Group Learning & Fun' },
  { src: '/galary5.webp', title: 'Mother & Child Bonding Moments' },
  { src: '/galary6.webp', title: 'Kids Gymnastics & Flexibility Drills' },
  { src: '/galary7.webp', title: 'Safe Padded Indoor Activity Zone' },
  { src: '/galary8.webp', title: 'Early Childhood Active Skill Building' },
  { src: '/galary9.webp', title: 'Motor Skills & Creative Expression' },
  { src: '/galary10.webp', title: 'Music, Rhythm & Coordination Play' },
  { src: '/galary11.webp', title: 'Junior Sports & Agility Circuit' },
  { src: '/galary12.webp', title: 'Active Toddler Exploration Hour' },
  { src: '/galary13.webp', title: 'Confidence & Social Play Zone' },
  { src: '/galary14.webp', title: 'Indoor Gymnastics Mats & Rolls' },
  { src: '/galary15.webp', title: 'Kids Creative Dance & Movement' },
  { src: '/galary16.webp', title: 'Sensory Tactile Learning Workshop' },
  { src: '/galary17.webp', title: 'Safe Foam Pit & Soft Play' },
  { src: '/galary18.webp', title: 'Junior Team Sports & Games' },
  { src: '/galary19.webp', title: 'Mom & Baby Interactive Circle' },
  { src: '/galary20.webp', title: 'Balance Beam & Agility Path' },
  { src: '/galary21.webp', title: 'Art & Craft Handprint Wall' },
  { src: '/galary22.webp', title: 'Phulwari Celebration & Fun Fest' },
  { src: '/galary23.webp', title: 'Roller Skating Basics Session' },
  { src: '/galary24.webp', title: 'Mother Fitness & Wellness Batch' },
  { src: '/galary25.webp', title: 'Kids Karate & Discipline Practice' },
  { src: '/galary26.webp', title: 'Phulwari Patna Activity Graduation' },
];

export default function GalleryPage({ headingLevel = 'h1' }: { headingLevel?: 'h1' | 'h2' } = {}) {
  const Heading = headingLevel;
  // Initialize with 26 verified real slides for ZERO DELAY on first paint
  const [slides, setSlides] = useState<any[]>(INITIAL_GALLERY_SLIDES);
  const [current, setCurrent] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [mediaTab, setMediaTab] = useState<'photos' | 'videos'>('photos');
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Background fetch of any dynamic additions from Supabase/backend
  useEffect(() => {
    let isMounted = true;
    async function loadGallery() {
      try {
        const res = await fetch('/api/gallery?limit=24', {
          headers: { 'Cache-Control': 'public, max-age=120' },
        });
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.data && Array.isArray(json.data) && json.data.length > 0) {
            const dbSlides = json.data.map((item: any) => ({
              src: item.image_url || item.url || item.src,
              title: item.title || 'Phulwari Activity Photo',
            }));
            setSlides((prev) => {
              const prevUrls = new Set(prev.map((s) => s.src));
              const newSlides = [...prev];
              dbSlides.forEach((ds: any) => {
                if (!prevUrls.has(ds.src)) {
                  newSlides.push(ds);
                  prevUrls.add(ds.src);
                }
              });
              return newSlides;
            });
          }
        }
      } catch (err) {
        console.warn('Background gallery sync:', err);
      }
    }
    loadGallery();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalSlides = slides.length;

  const goPrev = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrent((i) => (i - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goNext = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrent((i) => (i + 1) % totalSlides);
  }, [totalSlides]);

  // Jump by batch of 4 images
  const goNextBatch = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrent((i) => (i + 4) % totalSlides);
  }, [totalSlides]);

  const goPrevBatch = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrent((i) => (i - 4 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-slide with time: smoothly shows next 3, 4 images over time
  useEffect(() => {
    if (!autoPlay || isHovered || mediaTab !== 'photos' || totalSlides <= 1) return;
    const interval = setInterval(() => {
      goNext();
    }, 3600);
    return () => clearInterval(interval);
  }, [autoPlay, isHovered, mediaTab, totalSlides, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImg) {
        if (e.key === 'Escape') setLightboxImg(null);
        if (e.key === 'ArrowLeft') goPrev();
        if (e.key === 'ArrowRight') goNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg, goPrev, goNext]);

  // Calculate side indices: 4 images on left, 1 center, 4 images on right (9 visible)
  const getIndex = (offset: number) => {
    if (totalSlides === 0) return 0;
    return (current + offset + totalSlides * 10) % totalSlides;
  };

  const leftIndices = [getIndex(-4), getIndex(-3), getIndex(-2), getIndex(-1)];
  const rightIndices = [getIndex(1), getIndex(2), getIndex(3), getIndex(4)];

  // Pagination calculations (8 images per page)
  const PAGE_SIZE = 8;
  const totalPages = Math.max(1, Math.ceil(totalSlides / PAGE_SIZE));
  const currentPage = Math.floor(current / PAGE_SIZE) + 1;

  // Windowed visible thumbnails (9 slots: 4 left, center, 4 right)
  const windowedIndices: number[] = [];
  if (totalSlides > 0) {
    for (let offset = -4; offset <= 4; offset++) {
      windowedIndices.push(getIndex(offset));
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Quicksand:wght@600;700;800&display=swap');

        @keyframes glFadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glFloat  { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
        @keyframes glFadeIn { from { opacity:0; transform:scale(0.98); } to { opacity:1; transform:scale(1); } }
        @media (prefers-reduced-motion:reduce) { .gl-img, .gl-side-card { animation:none !important; transition:none !important; } }

        .gl-page {
          background-color: #FFF7EC;
          font-family: 'Quicksand', sans-serif;
          color: #3F3A52;
          min-height: 100vh;
          padding-bottom: 4.5rem;
        }

        /* Hero */
        .gl-hero {
          max-width: 52rem;
          margin: 0 auto;
          padding: 3.5rem 1.25rem 2rem;
          text-align: center;
          animation: glFadeUp 0.5s ease both;
        }
        .gl-badge {
          display: inline-block;
          padding: 0.5rem 1.3rem;
          background-color: #FFD166;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #6B4500;
          animation: glFloat 4s ease-in-out infinite;
        }
        .gl-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 3.2vw + 1rem, 2.9rem);
          line-height: 1.15;
          margin: 1rem 0 0.75rem;
        }
        .gl-title span { color: #FF4D8D; }
        .gl-sub {
          font-size: 0.98rem;
          font-weight: 600;
          color: #6B6480;
          line-height: 1.65;
          max-width: 36rem;
          margin: 0 auto;
        }

        /* Panoramic Stage with 3-4 visible images on both sides */
        .gl-stage-wrap {
          position: relative;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
          overflow: hidden;
        }

        .gl-panoramic-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          width: 100%;
          position: relative;
          perspective: 1000px;
        }

        /* Left and Right Side Wings (showing 3-4 images from both sides) */
        .gl-side-wing {
          display: none;
          align-items: center;
          gap: 0.65rem;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .gl-side-wing { display: flex; }
        }

        .gl-side-card {
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          box-shadow: 0 8px 24px rgba(63,58,82,0.12);
          transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
          flex-shrink: 0;
          background: #E8E2D2;
        }
        .gl-side-card:hover {
          opacity: 0.95 !important;
          transform: translateY(-4px) scale(1.02) !important;
          box-shadow: 0 14px 30px rgba(255,77,141,0.22);
        }

        /* Tiered sizing for 4 items on left & right */
        .card-depth-1 {
          width: 120px;
          height: 175px;
          opacity: 0.85;
          transform: scale(0.92);
        }
        .card-depth-2 {
          width: 100px;
          height: 150px;
          opacity: 0.65;
          transform: scale(0.82);
        }
        .card-depth-3 {
          width: 85px;
          height: 128px;
          opacity: 0.45;
          transform: scale(0.72);
        }
        .card-depth-4 {
          display: none;
        }

        @media (min-width: 1100px) {
          .card-depth-1 { width: 145px; height: 205px; }
          .card-depth-2 { width: 120px; height: 175px; }
          .card-depth-3 { width: 100px; height: 148px; }
        }

        @media (min-width: 1280px) {
          .card-depth-4 {
            display: block;
            width: 85px;
            height: 125px;
            opacity: 0.30;
            transform: scale(0.62);
          }
        }

        /* Main Focused Center Frame */
        .gl-main-frame {
          flex-shrink: 0;
          position: relative;
          width: 100%;
          max-width: 360px;
          aspect-ratio: 3 / 4;
          border-radius: 28px;
          overflow: hidden;
          background-color: #F0ECE2;
          box-shadow: 0 24px 60px rgba(63,58,82,0.22), 0 0 0 1px rgba(255,255,255,0.8);
          z-index: 10;
          transition: transform 0.3s ease;
        }
        @media (min-width: 640px) {
          .gl-main-frame { max-width: 400px; }
        }
        @media (min-width: 1024px) {
          .gl-main-frame { max-width: 430px; }
        }

        .gl-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          animation: glFadeIn 0.35s ease both;
        }

        /* Floating Nav Arrows */
        .gl-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          background-color: rgba(255,255,255,0.96);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          z-index: 20;
          transition: all 0.2s ease;
        }
        .gl-arrow:hover {
          background-color: #FF4D8D;
          color: #ffffff;
          transform: translateY(-50%) scale(1.1);
        }
        .gl-arrow svg { width: 22px; height: 22px; stroke-width: 2.5; }
        .gl-arrow--left { left: 0.75rem; }
        .gl-arrow--right { right: 0.75rem; }
      `}</style>

      <div className="gl-page">
        {/* Header Hero with Photos / Videos Switcher */}
        <header className="gl-hero">
          <div className="flex flex-col items-center gap-3">
            <span className="gl-badge">Phulwari Showcase</span>

            {/* Media Mode Switcher (Photos vs Real Videos) */}
            <div className="inline-flex bg-white/90 p-1 rounded-full border border-orange-200 shadow-sm gap-1">
              <button
                type="button"
                onClick={() => setMediaTab('photos')}
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
                  mediaTab === 'photos'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Photos ({totalSlides})</span>
              </button>

              <button
                type="button"
                onClick={() => setMediaTab('videos')}
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer ${
                  mediaTab === 'videos'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Real Videos (HD Stream)</span>
              </button>
            </div>
          </div>

          <Heading className="gl-title">
            Moments of <span>Joy &amp; Real Growth</span>
          </Heading>
          <p className="gl-sub">
            {mediaTab === 'photos'
              ? 'Explore real photos from activity classes, celebrations, and interactive camps at Phulwari Patna.'
              : 'Watch real session videos and live celebrations with YouTube-style chunked streaming.'}
          </p>
        </header>

        {/* ── MODE 1: PHOTOS GALLERY (PANORAMIC STAGE + PAGINATION) ── */}
        {mediaTab === 'photos' ? (
          <div
            className="space-y-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Panoramic Stage: 3-4 images visible from both sides with center featured card */}
            <div className="gl-stage-wrap" ref={stageRef}>
              <div className="gl-panoramic-stage">
                {/* 4 PREVIEW CARDS ON THE LEFT */}
                <div className="gl-side-wing gl-side-wing--left">
                  {/* Card -4 (furthest left) */}
                  <div
                    onClick={() => setCurrent(leftIndices[0])}
                    className="gl-side-card card-depth-4"
                    title={`View: ${slides[leftIndices[0]]?.title}`}
                  >
                    <img
                      src={slides[leftIndices[0]]?.src}
                      alt={slides[leftIndices[0]]?.title || 'Preview'}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  {/* Card -3 */}
                  <div
                    onClick={() => setCurrent(leftIndices[1])}
                    className="gl-side-card card-depth-3"
                    title={`View: ${slides[leftIndices[1]]?.title}`}
                  >
                    <img
                      src={slides[leftIndices[1]]?.src}
                      alt={slides[leftIndices[1]]?.title || 'Preview'}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  {/* Card -2 */}
                  <div
                    onClick={() => setCurrent(leftIndices[2])}
                    className="gl-side-card card-depth-2"
                    title={`View: ${slides[leftIndices[2]]?.title}`}
                  >
                    <img
                      src={slides[leftIndices[2]]?.src}
                      alt={slides[leftIndices[2]]?.title || 'Preview'}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  {/* Card -1 (immediate left) */}
                  <div
                    onClick={() => setCurrent(leftIndices[3])}
                    className="gl-side-card card-depth-1"
                    title={`View: ${slides[leftIndices[3]]?.title}`}
                  >
                    <img
                      src={slides[leftIndices[3]]?.src}
                      alt={slides[leftIndices[3]]?.title || 'Preview'}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* MAIN FOCUSED CENTER FRAME */}
                <div className="gl-main-frame group cursor-pointer" onClick={() => setLightboxImg(slides[current]?.src)}>
                  <img
                    key={`center-${current}`}
                    className="gl-img"
                    src={slides[current]?.src}
                    alt={slides[current]?.title || `Phulwari Photo ${current + 1}`}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    draggable={false}
                  />

                  {/* Overlay Gradient & Title Badge */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none text-white">
                    <span className="inline-flex items-center gap-1 bg-pink-600/90 backdrop-blur-xs text-[10px] font-black uppercase px-2 py-0.5 rounded-full mb-1">
                      <Sparkles className="w-3 h-3" /> Featured Moment
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold line-clamp-1 drop-shadow-md">
                      {slides[current]?.title || 'Phulwari Activity Moment'}
                    </h3>
                  </div>

                  {/* Expand Lightbox Button Top Right */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImg(slides[current]?.src);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-pink-600 text-white flex items-center justify-center transition shadow-md backdrop-blur-xs cursor-pointer"
                    title="Open Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  {/* Center Frame Left / Right Step Arrows */}
                  <button
                    type="button"
                    className="gl-arrow gl-arrow--left text-slate-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    aria-label="Previous photo"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    type="button"
                    className="gl-arrow gl-arrow--right text-slate-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    aria-label="Next photo"
                  >
                    <ChevronRight />
                  </button>
                </div>

                {/* 4 PREVIEW CARDS ON THE RIGHT */}
                <div className="gl-side-wing gl-side-wing--right">
                  {/* Card +1 (immediate right) */}
                  <div
                    onClick={() => setCurrent(rightIndices[0])}
                    className="gl-side-card card-depth-1"
                    title={`View: ${slides[rightIndices[0]]?.title}`}
                  >
                    <img
                      src={slides[rightIndices[0]]?.src}
                      alt={slides[rightIndices[0]]?.title || 'Preview'}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  {/* Card +2 */}
                  <div
                    onClick={() => setCurrent(rightIndices[1])}
                    className="gl-side-card card-depth-2"
                    title={`View: ${slides[rightIndices[1]]?.title}`}
                  >
                    <img
                      src={slides[rightIndices[1]]?.src}
                      alt={slides[rightIndices[1]]?.title || 'Preview'}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  {/* Card +3 */}
                  <div
                    onClick={() => setCurrent(rightIndices[2])}
                    className="gl-side-card card-depth-3"
                    title={`View: ${slides[rightIndices[2]]?.title}`}
                  >
                    <img
                      src={slides[rightIndices[2]]?.src}
                      alt={slides[rightIndices[2]]?.title || 'Preview'}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  {/* Card +4 (furthest right) */}
                  <div
                    onClick={() => setCurrent(rightIndices[3])}
                    className="gl-side-card card-depth-4"
                    title={`View: ${slides[rightIndices[3]]?.title}`}
                  >
                    <img
                      src={slides[rightIndices[3]]?.src}
                      alt={slides[rightIndices[3]]?.title || 'Preview'}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── PAGINATION CONTROLS & BATCH ADVANCE (ISSUE SPECIFICATION) ── */}
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-3">
              {/* Batch Skip & Status Bar */}
              <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-orange-200/60 shadow-sm text-xs font-bold text-slate-700">
                {/* Batch Jump Prev 4 */}
                <button
                  type="button"
                  onClick={goPrevBatch}
                  className="px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 flex items-center gap-1 transition cursor-pointer"
                  title="Shift by 4 images"
                >
                  <ChevronsLeft className="w-4 h-4" />
                  <span>Prev 4</span>
                </button>

                {/* Central Counter & Auto-Play Toggle */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-500">
                    Photo <strong className="text-slate-900">{current + 1}</strong> of{' '}
                    <strong className="text-slate-900">{totalSlides}</strong> (Page {currentPage}/{totalPages})
                  </span>

                  <button
                    type="button"
                    onClick={() => setAutoPlay((prev) => !prev)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center gap-1 text-[11px] transition"
                    title={autoPlay ? 'Pause auto slideshow' : 'Resume auto slideshow'}
                  >
                    {autoPlay ? <Pause className="w-3 h-3 text-pink-600" /> : <Play className="w-3 h-3 text-emerald-600" />}
                    <span>{autoPlay ? 'Auto (3.6s)' : 'Paused'}</span>
                  </button>
                </div>

                {/* Batch Jump Next 4 */}
                <button
                  type="button"
                  onClick={goNextBatch}
                  className="px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 flex items-center gap-1 transition cursor-pointer"
                  title="Shift by 4 images"
                >
                  <span>Next 4</span>
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>

              {/* Paginated Thumbnail Strip (Sliding Window of 7 Slots: 3 Left, Active, 3 Right) */}
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-full">
                {windowedIndices.map((idx, pos) => {
                  const isCurrent = idx === current;
                  return (
                    <div
                      key={`window-${idx}-${pos}`}
                      onClick={() => setCurrent(idx)}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 shrink-0 ${
                        isCurrent
                          ? 'ring-3 ring-pink-500 scale-105 shadow-md opacity-100'
                          : 'opacity-55 hover:opacity-85 hover:scale-100'
                      }`}
                    >
                      <img
                        src={slides[idx]?.src}
                        alt={slides[idx]?.title || 'Thumbnail'}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                      {isCurrent && (
                        <div className="absolute inset-0 border-2 border-pink-500 rounded-xl pointer-events-none" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Numerical Page Jump Pills */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 pt-1">
                  {Array.from({ length: totalPages }).map((_, pIdx) => {
                    const isPageActive = currentPage === pIdx + 1;
                    return (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setCurrent(pIdx * PAGE_SIZE)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                          isPageActive
                            ? 'bg-pink-600 text-white shadow-xs'
                            : 'bg-white hover:bg-orange-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {pIdx + 1}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ── MODE 2: REAL ACTION VIDEOS (YOUTUBE ARCHITECTURE) ── */
          <div className="max-w-5xl mx-auto px-4">
            <ActivityVideoGallery
              title="Real Kids Action & Celebrations at Phulwari"
              accentColor="#FF4D8D"
              accentBg="#FFE6EF"
            />
          </div>
        )}
      </div>

      {/* Lightbox Fullscreen Popup Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl p-4 shadow-2xl border border-slate-700 space-y-3 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition cursor-pointer border border-white/30"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={lightboxImg}
              alt="Phulwari Full View"
              className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-lg"
              loading="eager"
              decoding="async"
            />

            <div className="text-center text-white text-xs font-semibold pt-1">
              <span>Phulwari Mother & Child Activity Centre — Full View Photo</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}