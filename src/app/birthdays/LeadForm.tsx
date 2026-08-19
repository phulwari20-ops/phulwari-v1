'use client'

import React, { useState } from 'react'
import { MessageCircle, MessageSquare, Phone } from 'lucide-react'

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
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const buildMessageText = () => {
    const finalAge = showCustomAge ? customAge : age
    const finalGuests = showCustomGuests ? customGuests : guests
    return `Hi Phulwari! 🎈\nI would like to check date availability for a Birthday Party:\n\n` + 
           `👤 *Parent's Name:* ${name}\n` +
           `📞 *WhatsApp Phone:* ${phone}\n` +
           `📧 *Email:* ${email || 'N/A'}\n` +
           `👶 *Child's Age Turning:* ${finalAge}\n` +
           `📅 *Tentative Date:* ${date}\n` +
           `👥 *Expected Guest Count:* ${finalGuests}\n` +
           `📦 *Selected Package:* ${selectedPackage}\n` +
           `💬 *Requirements:* ${requirements || 'N/A'}\n\n` +
           `Could you please get back to me with a personalized quote? Thank you!`
  }

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const finalAge = showCustomAge ? customAge : age
    const finalGuests = showCustomGuests ? customGuests : guests

    if (!name || !phone || finalAge === 'Select Age' || !finalAge || !date || finalGuests === 'Select Guests' || !finalGuests) {
      alert('Please fill out all the required fields to check availability!')
      return
    }
    const text = buildMessageText()
    window.open(`https://wa.me/916207368839?text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleSMSClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const finalAge = showCustomAge ? customAge : age
    const finalGuests = showCustomGuests ? customGuests : guests

    if (!name || !phone || finalAge === 'Select Age' || !finalAge || !date || finalGuests === 'Select Guests' || !finalGuests) {
      alert('Please fill out all the required fields to check availability!')
      return
    }
    const text = buildMessageText()
    window.location.href = `sms:+916207368839?body=${encodeURIComponent(text)}`
  }

  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = `tel:+916207368839`
  }

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    const finalAge = showCustomAge ? customAge : age
    const finalGuests = showCustomGuests ? customGuests : guests

    if (!name || !phone || finalAge === 'Select Age' || !finalAge || !date || finalGuests === 'Select Guests' || !finalGuests) {
      alert('Please fill out all the required fields to check availability!')
      return
    }

    setIsSubmitting(true)
    setStatus('submitting')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          childName: 'N/A',
          childAge: finalAge,
          eventDate: date,
          guests: finalGuests,
          packageSelection: selectedPackage,
          requirements: requirements.trim(),
          source: 'User Panel / Birthday Party Celebration',
          paymentStatus: 'Pending',
          status: 'New'
        })
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setPhone('')
        setEmail('')
        setDate('')
        setAge('Select Age')
        setGuests('Select Guests')
        setSelectedPackage('None')
        setRequirements('')
      } else {
        throw new Error('Failed response')
      }
    } catch (err) {
      console.error('Failed to submit booking', err)
      alert('There was a problem submitting your reservation request. Please try again.')
      setStatus('idle')
    } finally {
      setIsSubmitting(false)
    }
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
      
      <form onSubmit={handleSubmitLead} className="relative z-10 space-y-6 w-full">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Package Selection */}
          <div className="sm:col-span-1">
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
          <div className="sm:col-span-2">
            <label className="block text-xs font-black text-[#24364B] mb-2 ml-1">Special Requirements or Message</label>
            <textarea 
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100/80 text-xs font-semibold focus:border-[#FF4081] focus:ring-4 focus:ring-[#FF4081]/5 outline-none bg-white shadow-sm transition-all duration-300 h-[48px] resize-none" 
              placeholder="e.g. Cartoon themes, soft-play toys preference, etc."
            />
          </div>
        </div>
        
        {/* Submit & Quick Actions Row */}
        <div className="w-full pt-4 flex flex-col sm:flex-row items-center gap-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-[#FF4081] to-[#E91E63] hover:from-[#E91E63] hover:to-[#C2185B] text-white font-extrabold py-4.5 px-8 rounded-full text-xs tracking-widest uppercase shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-80 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Submitting Quote Request...</span>
            ) : (
              <>
                <MessageCircle className="w-4 h-4" />
                <span>Send Booking Enquiry</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3 shrink-0">
            {/* WhatsApp Quick Action Button */}
            <button
              onClick={handleWhatsAppClick}
              type="button"
              className="w-12 h-12 rounded-full bg-[#34B36B] hover:bg-[#2e9e5e] text-white flex items-center justify-center shadow-md hover:shadow-lg transition cursor-pointer"
              title="Send Details via WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.805.002-2.617-1.013-5.074-2.86-6.921C16.375 2.03 13.927.994 11.999.994 6.595.994 2.195 5.391 2.193 10.803c-.001 1.512.404 2.99 1.173 4.298l-.993 3.624 3.714-.973zm10.23-7.228c-.282-.142-1.67-.823-1.929-.918-.258-.095-.447-.142-.636.142-.189.283-.733.918-.898 1.104-.165.188-.33.212-.612.07-.282-.142-1.192-.44-2.272-1.402-.84-.75-1.407-1.676-1.572-1.959-.165-.283-.018-.435.123-.576.127-.127.282-.33.424-.496.142-.165.189-.283.283-.472.095-.19.047-.354-.024-.496-.07-.142-.636-1.531-.871-2.097-.23-.553-.462-.477-.636-.486-.165-.008-.354-.01-.543-.01-.189 0-.496.07-.755.354-.26.283-.99.967-.99 2.36s1.013 2.735 1.155 2.924c.142.19 1.992 3.044 4.826 4.267.674.29 1.2.464 1.611.595.677.215 1.293.185 1.78.113.543-.08 1.67-.683 1.905-1.343.236-.66.236-1.226.165-1.343-.07-.118-.26-.189-.543-.33z"/>
              </svg>
            </button>

            {/* SMS Message Button */}
            <button
              onClick={handleSMSClick}
              type="button"
              className="w-12 h-12 rounded-full bg-[#3b82f6] hover:bg-[#2563eb] text-white flex items-center justify-center shadow-md hover:shadow-lg transition cursor-pointer"
              title="Send Details via SMS"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            {/* Phone Call Button */}
            <button
              onClick={handleCallClick}
              type="button"
              className="w-12 h-12 rounded-full bg-[#ec4899] hover:bg-[#db2777] text-white flex items-center justify-center shadow-md hover:shadow-lg transition cursor-pointer"
              title="Call Centre Support"
            >
              <Phone className="w-5 h-5" />
            </button>
          </div>
        </div>

        {status === 'success' && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 rounded-2xl text-xs font-bold font-mono animate-fadeIn flex items-center gap-2 mt-4">
            🎉 <span>Yay! Your reservation enquiry has been submitted. Our team will verify date availability and get back to you shortly!</span>
          </div>
        )}
      </form>
    </div>
  )
}
