'use client';

import React, { useState } from 'react';
import {
  X,
  ChevronDown,
  ChevronRight,
  Check,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { ActivityFaq, ActivityPoint } from '@/lib/activitiesFallback';

interface SummerCampClientViewProps {
  galleryImages: string[];
  faqs: ActivityFaq[];
  title: string;
  color: string;
  bg: string;
  contentColor?: string;
  whatsappUrl: string;
  phone: string;
  address: string;
  whyChooseTitle?: string;
  whyChoosePoints: ActivityPoint[];
}

export function SummerCampClientView({
  galleryImages,
  faqs,
  title,
  color,
  bg,
  contentColor,
  whatsappUrl,
  phone,
  address,
  whyChooseTitle,
  whyChoosePoints,
}: SummerCampClientViewProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {/* 1. PHOTO GALLERY (FROM SUPABASE DB) */}
      {galleryImages && galleryImages.length > 0 && (
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-12">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: bg, color }}
            >
              Captured Moments
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
              Live Camp Gallery & Facility
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Explore our child-safe indoor arenas, skating tracks, and joyous workshops.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(src)}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 border border-orange-100 shadow-xs hover:shadow-xl transition-all duration-300 text-left cursor-pointer focus:outline-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${title} photo ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e: any) => {
                    e.target.src = '/phulwari_logo.webp';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 inset-x-0 p-5 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-300">
                      Camp Photo {idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold">{title}</h3>
                  </div>
                  <span className="text-xs text-gray-300 inline-flex items-center gap-1 group-hover:text-white">
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] bg-black flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="Enlarged camp photo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-5 bg-gray-900 text-white flex items-center justify-between">
              <span className="text-sm font-bold">{title}</span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-white text-xs font-bold transition shadow-sm"
                style={{ backgroundColor: color }}
              >
                Enroll Child
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. BATCH TIMINGS & COMPARISON TABLE */}
      <section className="py-14 sm:py-20 bg-white border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-12">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: bg, color }}
            >
              Daily Schedule
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
              Morning vs. Evening Batches
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Both batches feature identical certified coaches, air-conditioned tracks, and creative modules.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-xs bg-white">
                <table className="min-w-full divide-y divide-gray-200 text-left">
                  <thead className="bg-orange-50/70">
                    <tr>
                      <th className="py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Feature / Inclusions
                      </th>
                      <th className="py-4 px-6 text-xs font-bold text-orange-700 uppercase tracking-wider">
                        Morning Batch (09:00 AM – 12:00 PM)
                      </th>
                      <th className="py-4 px-6 text-xs font-bold text-blue-700 uppercase tracking-wider">
                        Evening Batch (04:00 PM – 07:00 PM)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                    {[
                      {
                        f: 'Daily Session Time',
                        m: '3 Hours of High-Energy Engagement',
                        e: '3 Hours of High-Energy Engagement',
                      },
                      {
                        f: 'Indoor Arena Climate',
                        m: '100% Centrally AC & UV Filtered',
                        e: '100% Centrally AC & UV Filtered',
                      },
                      {
                        f: 'Skating & Gymnastics Arena',
                        m: 'Full Access with Safety Pads',
                        e: 'Full Access with Safety Pads',
                      },
                      {
                        f: 'Art, Pottery & Craft Kit',
                        m: 'All Materials Included',
                        e: 'All Materials Included',
                      },
                      {
                        f: 'Nutrition & Refreshment',
                        m: 'Healthy Snack & Pure RO Water',
                        e: 'Healthy Snack & Pure RO Water',
                      },
                      {
                        f: 'Mentor to Student Ratio',
                        m: 'Max 12–15 Kids per Coach',
                        e: 'Max 12–15 Kids per Coach',
                      },
                      {
                        f: 'Grand Showcase & Award',
                        m: 'Official Certificate & Medal',
                        e: 'Official Certificate & Medal',
                      },
                    ].map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="py-3.5 px-6 font-semibold text-gray-900">{row.f}</td>
                        <td className="py-3.5 px-6 text-gray-700">
                          <Check className="w-4 h-4 text-emerald-600 inline mr-1.5" />
                          {row.m}
                        </td>
                        <td className="py-3.5 px-6 text-gray-700">
                          <Check className="w-4 h-4 text-emerald-600 inline mr-1.5" />
                          {row.e}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE PHULWARI (FROM DB) */}
      {whyChoosePoints && whyChoosePoints.length > 0 && (
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white uppercase tracking-wider backdrop-blur-xs">
                Parent Peace of Mind
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">
                {whyChooseTitle || 'Why Choose Phulwari?'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {whyChoosePoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-yellow-300" />
                  <h3 className="font-bold text-base text-white">{pt.title}</h3>
                  <p className="text-xs text-white/80 leading-relaxed">{pt.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. LOCATION & CONTACT CARD */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-orange-100 p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: bg, color }}
            >
              Central Patna Campus
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Visit Phulwari Activity Centre
            </h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900">Phulwari Mother & Child Activity Centre</strong>
                  <p>{address}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    (Close to Boring Road, Bailey Road, Fraser Road, and Patna Women&apos;s College)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-500 shrink-0" />
                <span>Operating Hours: 08:30 AM – 07:30 PM (Mon – Sun)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-2xl text-white font-bold text-center flex items-center justify-center gap-2 shadow-md transition-all"
              style={{ backgroundColor: color }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Register via WhatsApp</span>
            </a>

            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="py-3.5 px-6 rounded-2xl border-2 border-orange-200 text-gray-800 font-bold text-center flex items-center justify-center gap-2 hover:bg-orange-50 transition-all"
            >
              <Phone className="w-5 h-5 text-orange-600" />
              <span>Call Us: {phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. PARENT FAQS ACCORDION (FROM DB) */}
      {faqs && faqs.length > 0 && (
        <section className="py-14 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2.5 mb-10">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: bg, color }}
            >
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs transition"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 hover:text-orange-600 transition cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-orange-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3"
                      style={contentColor ? { color: contentColor } : undefined}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. STICKY MOBILE CONVERSION BAR */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-orange-100 p-3 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
          className="flex-1 py-3 rounded-xl border border-orange-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          <Phone className="w-4 h-4 text-orange-600" />
          <span>Call Now</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
          style={{ backgroundColor: color }}
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Slot</span>
        </a>
      </div>
    </>
  );
}
