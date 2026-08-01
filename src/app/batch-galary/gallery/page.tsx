'use client';

import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { src: '/galary2.webp'  },
  { src: '/galary3.webp'  },
  { src: '/galary4.webp'  },
  { src: '/galary5.webp'  },
  { src: '/galary6.webp'  },
  { src: '/galary7.webp'  },
  { src: '/galary8.webp'  },
  { src: '/galary9.webp'  },
  { src: '/galary10.webp' },
  { src: '/galary11.webp' },
  { src: '/galary12.webp' },
  { src: '/galary13.webp' },
  { src: '/galary14.webp' },
  { src: '/galary15.webp' },
  { src: '/galary16.webp' },
  { src: '/galary17.webp' },
  { src: '/galary18.webp' },
  { src: '/galary19.webp' },
  { src: '/galary20.webp' },
  { src: '/galary21.webp' },
  { src: '/galary22.webp' },
  { src: '/galary23.webp' },
  { src: '/galary24.webp' },
  { src: '/galary25.webp' },
  { src: '/galary26.webp' },

 
];

export default function GalleryPage() {
  const [current, setCurrent] = useState(0);

  const goPrev = useCallback(() => setCurrent((i) => (i - 1 + slides.length) % slides.length), []);
  const goNext = useCallback(() => setCurrent((i) => (i + 1) % slides.length), []);

  // Neighbours for desktop side previews
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
            <div className="gl-frame">
              <img
                key={current}
                className="gl-img"
                src={slides[current].src}
                alt={`Phulwari Mother & Child Activity Centre Patna - Photo ${current + 1}`}
                loading={current === 0 ? 'eager' : 'lazy'}
                decoding="async"
                width={420}
                height={560}
                draggable={false}
              />
              <button className="gl-arrow gl-arrow--left" onClick={goPrev} aria-label="Previous photo">
                <ChevronLeft />
              </button>
              <button className="gl-arrow gl-arrow--right" onClick={goNext} aria-label="Next photo">
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* Right side preview */}
          <div className="gl-side" onClick={goNext} aria-hidden="true">
            <img src={slides[nextIdx].src} alt="Phulwari Activity Preview" loading="lazy" decoding="async" width={220} height={293} draggable={false} />
          </div>

        </div>

        {/* Counter + dots */}
        <div className="gl-footer">
          <p className="gl-counter"><strong>{current + 1}</strong> / {slides.length}</p>
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
              <img src={s.src} alt="" draggable={false} />
            </div>
          ))}
        </div>

      </div>
    </>
  );
}