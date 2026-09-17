'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Baby, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

const toddlerImages = [
  {
    src: '/mother_and_toddler_program/image.png',
    title: 'Sensory Play & Musical Rhyme Circle',
    caption: 'Mothers and toddlers exploring textures, music, and colorful learning tools together',
    tag: 'Sensory & Music'
  },
  {
    src: '/mother_and_toddler_program/image copy.png',
    title: 'Safe Soft-Play & Motor Coordination',
    caption: 'Crawlers and early walkers developing balance, motor skills, and social confidence',
    tag: 'Gross Motor Skills'
  }
]

export default function ToddlerGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? toddlerImages.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === toddlerImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-pink-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-bold text-xs mb-2">
            <Baby className="w-3.5 h-3.5" />
            <span>Phulwari Toddler Memories</span>
          </div>
          <h3 className="text-2xl font-black text-slate-800">Inside Our Mother &amp; Toddler Sessions</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous photo"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-pink-500 hover:text-white flex items-center justify-center transition shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-slate-500 px-2">
            {currentIndex + 1} / {toddlerImages.length}
          </span>
          <button
            onClick={nextSlide}
            aria-label="Next photo"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-pink-500 hover:text-white flex items-center justify-center transition shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Feature Image Display */}
      <div className="relative w-full h-[320px] sm:h-[450px] lg:h-[480px] rounded-2xl overflow-hidden bg-slate-100 shadow-inner group">
        <Image
          src={toddlerImages[currentIndex].src}
          alt={toddlerImages[currentIndex].title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

        <div className="absolute top-4 left-4">
          <span className="bg-pink-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg">
            {toddlerImages[currentIndex].tag}
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
          <h4 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-md mb-1">
            {toddlerImages[currentIndex].title}
          </h4>
          <p className="text-xs sm:text-sm text-pink-100 font-medium drop-shadow leading-relaxed max-w-xl">
            {toddlerImages[currentIndex].caption}
          </p>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {toddlerImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative h-24 rounded-xl overflow-hidden transition-all duration-300 ${
              currentIndex === idx
                ? 'ring-4 ring-pink-500 scale-[1.02] shadow-md'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={img.src}
              alt={img.title}
              fill
              sizes="300px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 hover:bg-transparent" />
          </button>
        ))}
      </div>
    </div>
  )
}
