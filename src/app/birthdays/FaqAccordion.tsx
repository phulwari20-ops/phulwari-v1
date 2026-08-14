'use client'

import React, { useState } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  faqs: FaqItem[]
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4 w-full">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx
        return (
          <div 
            key={idx} 
            className={`bg-white rounded-2xl border transition-all duration-300 shadow-sm overflow-hidden ${isOpen ? 'border-[#FF4081] ring-2 ring-[#FF4081]/5 shadow-md' : 'border-slate-100 hover:border-[#FF4081]/30'}`}
          >
            {/* Summary/Header */}
            <button
              onClick={() => toggleIndex(idx)}
              className="flex items-center justify-between w-full p-5 text-left outline-none cursor-pointer focus:text-[#FF4081]"
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-[#FF4081] text-white' : 'bg-[#FFF0F4] text-[#FF4081]'}`}>
                  <span className="text-xs font-black font-sans">Q</span>
                </div>
                <span className="text-sm font-extrabold text-slate-800 transition-colors duration-300">{faq.question}</span>
              </div>
              <span className={`transition-transform duration-300 shrink-0 text-slate-400 ${isOpen ? '-rotate-180 text-[#FF4081]' : ''}`}>
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            {/* Collapsible content utilizing CSS Grid row height transitions */}
            <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pl-14 text-xs text-slate-600 font-semibold leading-relaxed border-t border-rose-50/50 pt-3">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
