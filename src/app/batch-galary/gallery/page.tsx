'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { appLog } from '@/lib/logger';

const defaultSlides = [
  { src: '/galary2.webp', title: 'Activity Room' },
  { src: '/galary3.webp', title: 'Toddler Play Area' },
  { src: '/galary4.webp', title: 'Art & Craft Workshop' },
  { src: '/galary5.webp', title: 'Gymnastics Class' },
  { src: '/galary6.webp', title: 'Kids Dance & Music' },
  { src: '/galary7.webp', title: 'Roller Skating Track' },
  { src: '/galary8.webp', title: 'MMA & Martial Arts' },
  { src: '/galary9.webp', title: 'Birthday Celebration Hall' },
  { src: '/galary10.webp', title: 'Summer Camp Fun' },
  { src: '/galary11.webp', title: 'Mother Fitness Studio' },
  { src: '/galary12.webp', title: 'Outdoor Play Garden' },
  { src: '/galary13.webp', title: 'Storytelling Session' },
  { src: '/galary14.webp', title: 'Phulwari Circle Time' },
  { src: '/galary15.webp', title: 'Clay Modeling' },
  { src: '/galary16.webp', title: 'Music & Movement' },
  { src: '/galary17.webp', title: 'Indoor Cricket Net' },
  { src: '/galary18.webp', title: 'Winter Camp Creative Arts' },
  { src: '/galary19.webp', title: 'Yoga & Mindfulness' },
  { src: '/galary20.webp', title: 'Party Decoration Setup' },
  { src: '/galary21.webp', title: 'Preschool Learning Corner' },
  { src: '/galary22.webp', title: 'Obstacle Course Fun' },
  { src: '/galary23.webp', title: 'Sensory Play Table' },
  { src: '/galary24.webp', title: 'Mini Stage Performances' },
  { src: '/galary25.webp', title: 'Phulwari Annual Celebration' },
  { src: '/galary26.webp', title: 'Mother & Child Bonding' }
];

export default function GalleryPage() {
  const [slides, setSlides] = useState<any[]>(defaultSlides);
  const [current, setCurrent] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      // 1. Fetch from zero-token public API route
      try {
        appLog('request', 'GALLERY_API', 'GET /api/gallery (Zero Token Public Sync)');
        const res = await fetch('/api/gallery', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            appLog('success', 'GALLERY_API', `Received ${json.data.length} custom gallery photos`);
            setSlides(json.data.map((item: any) => ({ src: item.url || item.src, title: item.title || 'Phulwari Photo' })));
            return;
          }
        }
      } catch (e: any) {
        appLog('error', 'GALLERY_API', e.message || 'Public API Error');
      }

      // 2. Direct Supabase fetch with public anon headers
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ftnbzukwjvgxdnkrvuer.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_GFV9g9M3vPdFlOtFZ_dnEA_bR2Cm0HV';
      appLog('request', 'SUPABASE_REST', `GET ${supabaseUrl}/rest/v1/gallery`);

      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/gallery?select=*`, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          },
          cache: 'no-store'
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            appLog('success', 'SUPABASE_REST', `Received ${data.length} gallery images from Supabase DB`);
            setSlides(data.map((item: any) => ({ src: item.url || item.src, title: item.title || 'Phulwari Photo' })));
          }
        }
      } catch (err: any) {
        appLog('error', 'SUPABASE_REST', err.message || 'REST Exception');
      }
    };
    fetchGallery();
  }, []);

  const goPrev = useCallback(() => setCurrent((i) => (i - 1 + slides.length) % slides.length), [slides.length]);
  const goNext = useCallback(() => setCurrent((i) => (i + 1) % slides.length), [slides.length]);

  const prevIdx = (current - 1 + slides.length) % slides.length;
  const nextIdx = (current + 1) % slides.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Quicksand:wght@600;700&display=swap');

        @keyframes glFadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glFloat  { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
        @keyframes glFadeIn { from { opacity:0; } to { opacity:1; } }
        @media (prefers-reduced-motion:reduce) { .gl-img { animation:none !important; } }

        * { box-sizing:border-box; }

        .gl-page {
          background-color: #FFF7EC;
          font-family: 'Quicksand', sans-serif;
          color: #3F3A52;
          min-height: 100vh;
          padding-bottom: 4rem;
        }

        /* ── Hero ─────────────────────────────────── */
        .gl-hero {
          max-width: 44rem;
          margin: 0 auto;
          padding: 3.5rem 1.25rem 2.5rem;
          text-align: center;
          animation: glFadeUp 0.5s ease both;
        }
        .gl-badge {
          display: inline-block;
          padding: 0.5rem 1.2rem;
          background-color: #FFD166;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #6B4500;
          animation: glFloat 4s ease-in-out infinite;
        }
        .gl-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(1.9rem, 3vw + 1rem, 2.7rem);
          line-height: 1.18;
          margin: 1rem 0 0.75rem;
        }
        .gl-title span { color: #FF4D8D; }
        .gl-sub {
          font-size: 0.97rem;
          font-weight: 600;
          color: #6B6480;
          line-height: 1.7;
        }

        /* ── Stage ────────────────────────────────── */
        .gl-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          padding: 0 1.25rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Side previews — hidden on mobile */
        .gl-side {
          display: none;
        }
        @media (min-width: 900px) {
          .gl-side {
            display: block;
            flex-shrink: 0;
            width: 180px;
            aspect-ratio: 3 / 4;
            border-radius: 20px;
            overflow: hidden;
            opacity: 0.45;
            transform: scale(0.93);
            transition: opacity 0.3s ease, transform 0.3s ease;
            cursor: pointer;
            box-shadow: 0 10px 28px rgba(63,58,82,0.12);
          }
          .gl-side:hover {
            opacity: 0.7;
            transform: scale(0.96);
          }
          .gl-side img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            pointer-events: none;
          }
        }
        @media (min-width: 1100px) {
          .gl-side { width: 220px; }
        }

        /* Main frame */
        .gl-main {
          flex-shrink: 0;
          position: relative;
          width: 100%;
          max-width: 380px;
        }
        @media (min-width: 640px)  { .gl-main { max-width: 420px; } }
        @media (min-width: 900px)  { .gl-main { max-width: 380px; } }
        @media (min-width: 1100px) { .gl-main { max-width: 420px; } }

        .gl-frame {
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 28px;
          overflow: hidden;
          background-color: #F0ECE2;
          box-shadow: 0 20px 50px rgba(63,58,82,0.18);
          position: relative;
        }

        .gl-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          animation: glFadeIn 0.3s ease both;
        }

        /* Arrows */
        .gl-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 46px;
          height: 46px;
          border-radius: 9999px;
          background-color: rgba(255,255,255,0.95);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(0,0,0,0.18);
          z-index: 2;
          transition: transform 0.15s ease, background-color 0.15s ease;
        }
        .gl-arrow:hover { background-color: #fff; transform: translateY(-50%) scale(1.1); }
        .gl-arrow:focus-visible { outline: 3px solid #FF4D8D; outline-offset: 2px; }
        .gl-arrow svg { width: 22px; height: 22px; color: #3F3A52; stroke-width: 2.5; }
        .gl-arrow--left  { left: 0.7rem; }
        .gl-arrow--right { right: 0.7rem; }

        /* ── Counter + dots ───────────────────────── */
        .gl-footer {
          max-width: 1100px;
          margin: 1.1rem auto 0;
          padding: 0 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .gl-counter {
          font-size: 0.85rem;
          font-weight: 700;
          color: #A39CB5;
        }
        .gl-counter strong { color: #3F3A52; }

        .gl-dots {
          display: flex;
          justify-content: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .gl-dot {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #E3DCC9;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: width 0.25s ease, background-color 0.25s ease;
          flex-shrink: 0;
        }
        .gl-dot.active { width: 22px; background-color: #FF4D8D; }
        .gl-dot:focus-visible { outline: 2px solid #FF4D8D; outline-offset: 2px; }

        /* ── Thumbnail strip (desktop only) ──────── */
        .gl-thumbs {
          display: none;
        }
        @media (min-width: 900px) {
          .gl-thumbs {
            display: flex;
            justify-content: center;
            gap: 0.55rem;
            flex-wrap: wrap;
            max-width: 860px;
            margin: 2rem auto 0;
            padding: 0 1.25rem;
          }
          .gl-thumb {
            width: 64px;
            height: 64px;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            border: 2.5px solid transparent;
            flex-shrink: 0;
            transition: border-color 0.18s ease, transform 0.18s ease, opacity 0.18s ease;
            opacity: 0.55;
          }
          .gl-thumb:hover { opacity: 0.8; transform: translateY(-2px); }
          .gl-thumb.active { border-color: #FF4D8D; opacity: 1; transform: translateY(-2px); }
          .gl-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        }
      `}</style>

      <div className="gl-page">

        {/* Hero */}
        <header className="gl-hero">
          <span className="gl-badge">Gallery</span>
          <h1 className="gl-title">Moments of <span>Joy &amp; Growth</span></h1>
          <p className="gl-sub">Explore photos from activities, celebrations and camps at Phulwari.</p>
        </header>

        {/* Stage: side previews + main frame */}
        <div className="gl-stage">

          {/* Left side preview */}
          <div className="gl-side" onClick={goPrev} aria-hidden="true">
            <img src={slides[prevIdx].src} alt="Phulwari Activity Preview" loading="lazy" decoding="async" width={220} height={293} draggable={false} />
          </div>

          {/* Main frame */}
          <div className="gl-main">
            <div className="gl-frame cursor-pointer" onClick={() => setLightboxImg(slides[current]?.src)}>
              <img
                key={current}
                className="gl-img"
                src={slides[current]?.src}
                alt={slides[current]?.title || `Phulwari Photo ${current + 1}`}
                loading={current === 0 ? 'eager' : 'lazy'}
                decoding="async"
                width={420}
                height={560}
                draggable={false}
              />
              <button className="gl-arrow gl-arrow--left" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous photo">
                <ChevronLeft />
              </button>
              <button className="gl-arrow gl-arrow--right" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next photo">
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* Right side preview */}
          <div className="gl-side" onClick={goNext} aria-hidden="true">
            <img src={slides[nextIdx]?.src} alt="Phulwari Activity Preview" loading="lazy" decoding="async" width={220} height={293} draggable={false} />
          </div>

        </div>

        {/* Counter + dots */}
        <div className="gl-footer">
          <p className="gl-counter"><strong>{current + 1}</strong> / {slides.length} — <span className="text-pink-500 font-bold">{slides[current]?.title || 'Phulwari Photo'}</span></p>
          <div className="gl-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`gl-dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip — desktop only */}
        <div className="gl-thumbs">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`gl-thumb ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Photo ${i + 1}`}
            >
              <img src={s.src} alt={s.title || ''} draggable={false} />
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Fullscreen Popup Modal with Top-Right Cross X Button */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn"
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
            />

            <div className="text-center text-white text-xs font-semibold pt-1">
              <span>Phulwari Mother & Child Activity Centre — Full Photo View</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}