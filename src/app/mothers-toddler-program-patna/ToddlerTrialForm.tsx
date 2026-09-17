'use client'

import React, { useState } from 'react'
import { MessageCircle, Phone, Sparkles, CheckCircle2, Baby, Calendar, Clock } from 'lucide-react'

export default function ToddlerTrialForm() {
  const [motherName, setMotherName] = useState('')
  const [phone, setPhone] = useState('')
  const [childName, setChildName] = useState('')
  const [childAge, setChildAge] = useState('12–24 Months (Cruisers & Walkers)')
  const [batchTime, setBatchTime] = useState('Morning Batch (10:30 AM – 11:30 AM)')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const buildMessage = () => {
    return (
      `Hi Phulwari! 👶\nI would like to book a *Free Trial Session* for the *Mother and Toddler Program*:\n\n` +
      `👤 *Mother's Name:* ${motherName}\n` +
      `📞 *WhatsApp Number:* ${phone}\n` +
      `👶 *Child's Name:* ${childName || 'N/A'}\n` +
      `🎂 *Child's Age:* ${childAge}\n` +
      `⏰ *Preferred Batch:* ${batchTime}\n` +
      `💬 *Note/Interest:* ${message || 'Excited for early sensory learning!'}\n\n` +
      `Please confirm slot availability. Thank you!`
    )
  }

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!motherName || !phone) {
      setErrorMessage('Please fill in your name and phone number to book the trial session.')
      return
    }
    const text = buildMessage()
    window.open(`https://wa.me/916207368839?text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!motherName || !phone) {
      setErrorMessage('Please fill in your name and phone number to book the trial session.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: motherName.trim(),
          phone: phone.trim(),
          email: '',
          childName: childName.trim() || 'Toddler',
          childAge: childAge,
          eventDate: new Date().toISOString().split('T')[0],
          guests: '1 Mother + 1 Toddler',
          packageSelection: `Mother & Toddler Program (${childAge})`,
          requirements: `Batch: ${batchTime}. Note: ${message}`,
          source: 'User Panel / Mother & Toddler Program Patna',
          paymentStatus: 'Free Trial',
          status: 'New'
        })
      })

      const payload = await res.json().catch(() => null)
      if (!res.ok || !payload?.success) {
        throw new Error(payload?.error || `Request failed (${res.status})`)
      }

      setStatus('success')
      setMotherName('')
      setPhone('')
      setChildName('')
      setMessage('')
    } catch (err) {
      console.error('Failed to submit toddler trial booking', err)
      setErrorMessage('We received an error while booking your trial class. Please click the green WhatsApp button to confirm instantly!')
      setStatus('idle')
    }
  }

  return (
    <div
      id="book-toddler-trial"
      className="max-w-3xl mx-auto bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-3xl p-8 sm:p-12 border-2 border-pink-200 shadow-xl"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>Special Offer: Free Trial Session For New Toddlers</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Book Your Free Mother &amp; Toddler Trial Class
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto mt-2 leading-relaxed">
          Bond with your little one through sensory play, rhymes, and joyful movement in Patna&apos;s most welcoming environment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5 ml-1">
              Mother&apos;s Name *
            </label>
            <input
              type="text"
              required
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
              placeholder="e.g. Aditi Sharma"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none bg-white shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5 ml-1">
              WhatsApp Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none bg-white shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5 ml-1">
              Child&apos;s Name (Optional)
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="e.g. Aarav"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none bg-white shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5 ml-1">
              Child&apos;s Age Group
            </label>
            <select
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none bg-white shadow-sm cursor-pointer"
            >
              <option value="6–12 Months (Infants & Crawlers)">6–12 Months (Infants &amp; Crawlers)</option>
              <option value="12–24 Months (Cruisers & Walkers)">12–24 Months (Cruisers &amp; Walkers)</option>
              <option value="2–3 Years (Early Toddlers)">2–3 Years (Early Toddlers)</option>
              <option value="3+ Years (Preschool Prep)">3+ Years (Preschool Prep)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-slate-800 mb-1.5 ml-1">
            Preferred Batch Timing
          </label>
          <select
            value={batchTime}
            onChange={(e) => setBatchTime(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none bg-white shadow-sm cursor-pointer"
          >
            <option value="Morning Batch (10:30 AM – 11:30 AM)">Morning Batch (10:30 AM – 11:30 AM)</option>
            <option value="Midday Batch (11:45 AM – 12:45 PM)">Midday Batch (11:45 AM – 12:45 PM)</option>
            <option value="Evening Batch (4:30 PM – 5:30 PM)">Evening Batch (4:30 PM – 5:30 PM)</option>
            <option value="Saturday Weekend Special">Saturday Weekend Special</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-black text-slate-800 mb-1.5 ml-1">
            Special Interests or Learning Goals (Optional)
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. Speech development, sensory play, socializing with peers"
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none bg-white shadow-sm"
          />
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-2xl">
            {errorMessage}
          </div>
        )}

        {status === 'success' && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-black rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>🎉 Yay! Your trial session request has been booked. Our coordinator will message you on WhatsApp to confirm your visit.</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="flex-1 py-4 px-6 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            <Baby className="w-4 h-4" />
            <span>{status === 'submitting' ? 'Booking Trial...' : 'Book Free Trial Session'}</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="sm:w-auto py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Instant Inquiry</span>
          </button>
        </div>
      </form>
    </div>
  )
}
