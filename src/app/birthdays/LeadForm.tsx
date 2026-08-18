'use client'

import React, { useState } from 'react'

interface LeadFormProps {
  packages?: any[]
}

export default function LeadForm({ packages = [] }: LeadFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('Select Age')
  const [customAge, setCustomAge] = useState('')
  const [showCustomAge, setShowCustomAge] = useState(false)
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState('Select Guests')
  const [customGuests, setCustomGuests] = useState('')
  const [showCustomGuests, setShowCustomGuests] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState('None')
  const [requirements, setRequirements] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleWhatsAppRedirect = async () => {
    const finalAge = showCustomAge ? customAge : age
    const finalGuests = showCustomGuests ? customGuests : guests

    if (!name || !phone || finalAge === 'Select Age' || !finalAge || !date || finalGuests === 'Select Guests' || !finalGuests) {
      alert('Please fill out all the fields to check availability!')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Send Lead to Supabase Bookings table
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: name,
          phone: phone,
          email: email,
          childName: 'N/A',
          childAge: finalAge,
          eventDate: date,
          guests: finalGuests,
          packageSelection: selectedPackage,
          requirements: requirements,
          source: 'User Panel / Birthday Party Celebration',
          paymentStatus: 'Pending',
          status: 'New'
        })
      })
    } catch (err) {
      console.error('Failed to submit booking', err)
      // Continue to WhatsApp even if DB fails
    }

    // Prepare WhatsApp Message text
    const message = `Hi Phulwari! 🎈\nI would like to check date availability for a Birthday Party:\n\n` + 
                    `👤 *Parent's Name:* ${name}\n` +
                    `📞 *WhatsApp Phone:* ${phone}\n` +
                    `📧 *Email:* ${email || 'N/A'}\n` +
                    `👶 *Child's Age Turning:* ${finalAge}\n` +
                    `📅 *Tentative Date:* ${date}\n` +
                    `👥 *Expected Guest Count:* ${finalGuests}\n` +
                    `📦 *Selected Package:* ${selectedPackage}\n` +
                    `💬 *Requirements:* ${requirements || 'N/A'}\n\n` +
                    `Could you please get back to me with a personalized quote? Thank you!`
    
    const waNumber = '919876543210' // Mock WhatsApp contact number matching mockup
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`
    
    // Open WhatsApp
    window.open(waUrl, '_blank')
    setIsSubmitting(false)
  }

  return (
    <div 
      id="book-now" 
      className="max-w-[1000px] w-full bg-[#FFF0F2] rounded-[44px] p-8 md:p-12 border-2 border-white shadow-2xl relative overflow-visible mx-auto transition-transform duration-300 hover:scale-[1.01]"
    >
      
      <div className="text-center relative z-10 mb-10">
        <h2 className="text-3xl font-extrabold text-[#24364B] mb-3">Reserve Your Special Date Today!</h2>
        <p className="text-sm text-slate-600 font-bold max-w-xl mx-auto leading-relaxed">
          Fill in the details below to check venue availability and get a personalized quote.
        </p>
      </div>
      
      <form className="relative z-10 space-y-6 w-full">
        {/* Row 1: Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Parent's Name */}
          <div>
            <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">Parent's Name *</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300" 
              placeholder="Enter your name" 
            />
          </div>

          {/* WhatsApp Phone */}
          <div>
            <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">WhatsApp Number *</label>
            <input 
              type="tel" 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300" 
              placeholder="Enter WhatsApp number" 
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300" 
              placeholder="Enter email address" 
            />
          </div>
        </div>

        {/* Row 2: Booking Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tentative Date */}
          <div>
            <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">Tentative Party Date *</label>
            <input 
              type="date" 
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-[11px] font-semibold text-slate-500 focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300 cursor-pointer" 
            />
          </div>

          {/* Child's Age Turning */}
          <div>
            <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">Child's Age Turning *</label>
            {showCustomAge ? (
              <div className="flex gap-2">
                <input 
                  type="text" 
                  required
                  value={customAge}
                  onChange={(e) => setCustomAge(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] outline-none bg-white shadow-sm" 
                  placeholder="Specify age (e.g. 6th)" 
                />
                <button 
                  type="button" 
                  onClick={() => { setShowCustomAge(false); setAge('Select Age'); setCustomAge(''); }} 
                  className="px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-2xl"
                >
                  List
                </button>
              </div>
            ) : (
              <select 
                value={age}
                onChange={(e) => {
                  if (e.target.value === 'Other') {
                    setShowCustomAge(true)
                    setAge('Other')
                  } else {
                    setAge(e.target.value)
                  }
                }}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300 cursor-pointer"
              >
                <option disabled value="Select Age">Select Age</option>
                <option value="1st Birthday">1st Birthday</option>
                <option value="2nd Birthday">2nd Birthday</option>
                <option value="3rd Birthday">3rd Birthday</option>
                <option value="4th Birthday">4th Birthday</option>
                <option value="5th Birthday">5th Birthday</option>
                <option value="Other">Other (Specify)</option>
              </select>
            )}
          </div>

          {/* Expected Guests */}
          <div>
            <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">Expected Guests *</label>
            {showCustomGuests ? (
              <div className="flex gap-2">
                <input 
                  type="text" 
                  required
                  value={customGuests}
                  onChange={(e) => setCustomGuests(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] outline-none bg-white shadow-sm" 
                  placeholder="Specify guests (e.g. 75)" 
                />
                <button 
                  type="button" 
                  onClick={() => { setShowCustomGuests(false); setGuests('Select Guests'); setCustomGuests(''); }} 
                  className="px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-2xl"
                >
                  List
                </button>
              </div>
            ) : (
              <select 
                value={guests}
                onChange={(e) => {
                  if (e.target.value === 'Other') {
                    setShowCustomGuests(true)
                    setGuests('Other')
                  } else {
                    setGuests(e.target.value)
                  }
                }}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300 cursor-pointer"
              >
                <option disabled value="Select Guests">Select Guests</option>
                <option value="15-30 Guests">15-30 Guests</option>
                <option value="30-50 Guests">30-50 Guests</option>
                <option value="50+ Guests">50+ Guests</option>
                <option value="Other">Other (Specify)</option>
              </select>
            )}
          </div>
        </div>

        {/* Row 3: Package & Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Package Selection */}
          <div className="md:col-span-1">
            <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">Select Package</label>
            <select 
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300 cursor-pointer"
            >
              <option value="None">None / Custom Quote</option>
              {packages.map((pkg) => (
                <option key={pkg.id || pkg.name} value={pkg.name}>
                  {pkg.name} ({pkg.price})
                </option>
              ))}
            </select>
          </div>

          {/* Special Requirements */}
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">Special Requirements or Message</label>
            <textarea 
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300 h-[48px] resize-none" 
              placeholder="e.g. Cartoon themes, soft-play toys preference, etc."
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="w-full pt-4">
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
