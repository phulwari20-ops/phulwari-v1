'use client'

import React, { useState } from 'react'

export default function LeadForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState('Select Age')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState('Select Guests')
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleWhatsAppRedirect = () => {
    if (!name || !phone || age === 'Select Age' || !date || guests === 'Select Guests') {
      alert('Please fill out all the fields to check availability!')
      return
    }

    setIsSubmitting(true)
    
    // Prepare WhatsApp Message text
    const message = `Hi Phulwari! 🎈\nI would like to check date availability for a Birthday Party:\n\n` + 
                    `👤 *Parent's Name:* ${name}\n` +
                    `📞 *WhatsApp Phone:* ${phone}\n` +
                    `👶 *Child's Age Turning:* ${age}\n` +
                    `📅 *Tentative Date:* ${date}\n` +
                    `👥 *Expected Guest Count:* ${guests}\n\n` +
                    `Could you please get back to me with a personalized quote? Thank you!`
    
    const waNumber = '919876543210' // Mock WhatsApp contact number matching mockup
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`
    
    // Simulate slight API/Button delay for animations
    setTimeout(() => {
      window.open(waUrl, '_blank')
      setIsSubmitting(false)
    }, 800)
  }

  return (
    <div 
      id="book-now" 
      className="max-w-[1000px] w-full bg-[#FFF0F2] rounded-[44px] p-8 md:p-12 border-2 border-white shadow-2xl relative overflow-visible mx-auto transition-transform duration-300 hover:scale-[1.01]"
    >
      
      <div className="text-center relative z-10 mb-10">
        <h2 className="text-3xl font-extrabold text-[#24364B] mb-3">Reserve Your Special Date Today!</h2>
        <p className="text-sm text-slate-600 font-bold max-w-xl mx-auto leading-relaxed">
          Fill in the details below to check venue availability and get a personalized quote within 2 hours.
        </p>
      </div>
      
      <form className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-end w-full">
        {/* Parent's Name */}
        <div className="col-span-1">
          <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">Parent's Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300" 
            placeholder="Enter your name" 
          />
        </div>

        {/* WhatsApp Phone */}
        <div className="col-span-1">
          <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">WhatsApp Number</label>
          <input 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300" 
            placeholder="Enter WhatsApp number" 
          />
        </div>

        {/* Child's Age Turning */}
        <div className="col-span-1">
          <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">Child's Age Turning</label>
          <div className="relative">
            <select 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300 appearance-none cursor-pointer"
            >
              <option disabled value="Select Age">Select Age</option>
              <option value="1st Birthday">1st Birthday</option>
              <option value="2nd Birthday">2nd Birthday</option>
              <option value="3rd Birthday">3rd Birthday</option>
              <option value="4th Birthday">4th Birthday</option>
              <option value="5th Birthday">5th Birthday</option>
            </select>
          </div>
        </div>

        {/* Tentative Date */}
        <div className="col-span-1">
          <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">Tentative Party Date</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-[11px] font-semibold text-slate-500 focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300 cursor-pointer" 
          />
        </div>

        {/* Expected Guests */}
        <div className="col-span-1">
          <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">Expected Guests</label>
          <div className="relative">
            <select 
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300 appearance-none cursor-pointer"
            >
              <option disabled value="Select Guests">Select Guests</option>
              <option value="15-30 Guests">15-30 Guests</option>
              <option value="30-50 Guests">30-50 Guests</option>
              <option value="50+ Guests">50+ Guests</option>
            </select>
          </div>
        </div>
        
        {/* Premium Call to Action Button */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-5 mt-6 w-full">
          <button 
            type="button" 
            onClick={handleWhatsAppRedirect}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#FF4081] to-[#E91E63] hover:from-[#E91E63] hover:to-[#C2185B] text-white font-extrabold py-4.5 px-8 rounded-full text-xs tracking-widest uppercase shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-80"
          >
            {isSubmitting ? (
              <span>Preparing WhatsApp Quote...</span>
            ) : (
              <>
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.864-9.83.002-2.623-1.023-5.086-2.887-6.95C16.587 1.96 14.138.933 11.52.933c-5.44 0-9.866 4.415-9.87 9.835-.001 1.77.465 3.492 1.353 5.009l-.995 3.633 3.737-.978zm11.758-6.866c-.32-.16-1.89-.93-2.185-1.038-.295-.108-.51-.16-.724.16-.215.32-.83.1.038-1.02.162-.19.16-.32.054-.48-.11-.16-.724-1.748-.993-2.395-.262-.63-.53-.544-.724-.554l-.617-.008c-.215 0-.564.08-.86.4-.295.32-1.128 1.102-1.128 2.69 0 1.587 1.155 3.123 1.316 3.339.16.215 2.274 3.473 5.51 4.868.77.332 1.37.53 1.838.679.774.246 1.48.21 2.037.127.62-.093 1.89-.772 2.158-1.48.268-.707.268-1.316.188-1.44-.08-.124-.295-.205-.616-.365z" />
                </svg>
                GET FREE INSTANT QUOTE ON WHATSAPP
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
