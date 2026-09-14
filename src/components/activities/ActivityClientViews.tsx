'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Maximize2,
  X,
} from 'lucide-react';
import { ActivityFaq } from '@/lib/activitiesFallback';

interface GalleryProps {
  images: string[];
  title: string;
  accentColor: string;
}

export function ActivityGallery({ images, title, accentColor }: GalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, selectedIdx, images.length]);

  if (!images || images.length === 0) return null;

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full min-w-0 space-y-4 select-none">
      {/* Featured Big Image Card */}
      <div className="relative w-full min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/70 border border-slate-200 bg-slate-900 group">
        {/* Ambient Blur Backdrop to fill any wide or narrow aspect ratios */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={images[selectedIdx]}
            alt="Ambient background blur"
            fill
            sizes="800px"
            className="object-cover blur-2xl opacity-40 scale-110"
            aria-hidden="true"
          />
        </div>

        {/* Crisp Main Foreground Image (object-contain ensures zero text or child is ever cut off) */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="relative w-full h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] cursor-zoom-in flex items-center justify-center p-2 sm:p-3"
        >
          <Image
            src={images[selectedIdx]}
            alt={`${title} - Photo ${selectedIdx + 1}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
            className="object-contain drop-shadow-md transition-transform duration-500 ease-out group-hover:scale-[1.01]"
          />
        </div>

        {/* Top Tag & Zoom Button */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <span className="bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-xs font-semibold tracking-wide border border-white/15 shadow-sm">
            {selectedIdx + 1} / {images.length} Photos
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="pointer-events-auto p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-transform active:scale-95 border border-white/15 shadow-sm"
            title="Click to view full image in high definition"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Arrows on Left & Right */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 backdrop-blur-md text-white flex items-center justify-center opacity-85 hover:opacity-100 hover:bg-black/80 hover:scale-105 transition active:scale-95 border border-white/15 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 backdrop-blur-md text-white flex items-center justify-center opacity-85 hover:opacity-100 hover:bg-black/80 hover:scale-105 transition active:scale-95 border border-white/15 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Showcase Strip (Widescreen thumbnails, clean no-scroll design) */}
      {images.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 scrollbar-none w-full">
          {images.map((img, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`relative flex-shrink-0 w-24 sm:w-28 h-16 sm:h-18 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-200 bg-slate-900 ${
                  isSelected
                    ? 'ring-2 scale-105 shadow-md z-10'
                    : 'opacity-70 hover:opacity-100 border-transparent hover:scale-100'
                }`}
                style={{ borderColor: isSelected ? accentColor : 'transparent' }}
                aria-label={`View photo ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen HD Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo view"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Lightbox Bar */}
          <div
            className="w-full max-w-7xl flex items-center justify-between text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg">{title}</span>
              <span className="text-white/60 text-sm">
                • {selectedIdx + 1} of {images.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Enlarged Image */}
          <div
            className="relative w-full max-w-6xl flex-1 my-2 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[85vh]">
              <Image
                src={images[selectedIdx]}
                alt={`${title} - Large HD View ${selectedIdx + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* Lightbox Prev / Next Buttons */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition active:scale-95 shadow-xl"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition active:scale-95 shadow-xl"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails inside Lightbox */}
          <div
            className="flex items-center gap-2 max-w-3xl overflow-x-auto p-2 scrollbar-none z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={`relative w-16 h-10 rounded-lg overflow-hidden border-2 transition ${
                  selectedIdx === idx ? 'border-white scale-110 ring-2 ring-white/50' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="thumb" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface FaqAccordionProps {
  faqs: ActivityFaq[];
  accentColor: string;
}

export function ActivityFaqAccordion({ faqs, accentColor }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-3.5">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-300 bg-white overflow-hidden ${
              isOpen
                ? 'shadow-md border-gray-200 ring-1 ring-black/5'
                : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 font-semibold text-gray-900 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg flex items-center gap-3">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors"
                  style={{
                    backgroundColor: isOpen ? accentColor : '#F3F4F6',
                    color: isOpen ? '#FFFFFF' : '#6B7280',
                  }}
                >
                  Q{idx + 1}
                </span>
                {faq.question}
              </span>
              <span
                className="shrink-0 p-1.5 rounded-full transition-transform duration-300"
                style={{
                  backgroundColor: isOpen ? `${accentColor}1A` : '#F9FAFB',
                  color: isOpen ? accentColor : '#9CA3AF',
                }}
              >
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-50 animate-fadeIn">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface MobileStickyBarProps {
  activityTitle: string;
  phone?: string;
  whatsapp?: string;
  accentColor: string;
}

export function ActivityMobileStickyBar({
  activityTitle,
  phone = '+91 62073 68839',
  whatsapp = '+916207368839',
  accentColor,
}: MobileStickyBarProps) {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');
  const whatsappMsg = encodeURIComponent(
    `Hello Phulwari! I would like to book a free trial / demo for ${activityTitle}. Please share batch timings and details.`
  );

  return (
    <aside aria-label="Quick Actions" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-2xl flex items-center gap-3">
      <a
        href={`tel:${cleanPhone}`}
        className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-gray-300 text-gray-800 font-semibold text-sm hover:bg-gray-50 transition active:scale-95"
      >
        <Phone className="w-4 h-4 text-emerald-600" />
        <span>Call Centre</span>
      </a>

      <a
        href={`https://wa.me/${cleanWhatsapp}?text=${whatsappMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-[1.4] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md transition active:scale-95"
        style={{ backgroundColor: accentColor }}
      >
        <MessageCircle className="w-4 h-4" />
        <span>Book Free Demo</span>
      </a>
    </aside>
  );
}
