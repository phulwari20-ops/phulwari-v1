'use client'

import React, { useState } from 'react'
import { MessageCircle, Phone, Sparkles, CheckCircle2, Dumbbell, Calendar, Clock } from 'lucide-react'

export default function FitnessTrialForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [program, setProgram] = useState('Postnatal Yoga & Core')
  const [batchTime, setBatchTime] = useState('Morning Batch (7:30 AM - 8:30 AM)')
  const [childCareNeeded, setChildCareNeeded] = useState('Yes, need play zone access for toddler')
  const [postpartumStage, setPostpartumStage] = useState('6+ Months Postpartum')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const buildMessage = () => {
    return (
      `Hi Phulwari! 🌸\nI would like to book a *Free Trial Class* for the *Mothers Fitness & Zumba Program*:\n\n` +
      `👤 *Mother's Name:* ${name}\n` +
      `📞 *Phone Number:* ${phone}\n` +
      `🧘‍♀️ *Selected Program:* ${program}\n` +
      `⏰ *Preferred Batch Timing:* ${batchTime}\n` +
      `👶 *Postpartum Stage:* ${postpartumStage}\n` +
      `🧸 *Playzone Access for Child:* ${childCareNeeded}\n` +
      `💬 *Note:* ${message || 'Looking forward to trying out a class!'}\n\n` +
      `Please confirm the next available trial slot for me. Thank you!`
    )
  }

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!name || !phone) {
      setErrorMessage('Please fill in your name and phone number to book your trial class.')
      return
    }
    const text = buildMessage()
    window.open(`https://wa.me/916207368839?text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) {
      setErrorMessage('Please fill in your name and phone number to book your trial class.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: name.trim(),
          phone: phone.trim(),
          email: '',
          childName: 'N/A',
          childAge: postpartumStage,
          eventDate: new Date().toISOString().split('T')[0],
          guests: '1 Mother',
          packageSelection: `Mothers Fitness - ${program} (${batchTime})`,
          requirements: `Playzone: ${childCareNeeded}. Note: ${message}`,
          source: 'User Panel / Mothers Fitness & Zumba Patna',
          paymentStatus: 'Free Trial',
          status: 'New'
        })
      })

      const payload = await res.json().catch(() => null)
      if (!res.ok || !payload?.success) {
        throw new Error(payload?.error || `Request failed (${res.status})`)
      }

      setStatus('success')
      setName('')
      setPhone('')
      setMessage('')
    } catch (err) {
      console.error('Failed to submit fitness trial booking', err)
      setErrorMessage('We received an error while booking your trial class. Please click the green WhatsApp button below to confirm instantly!')
      setStatus('idle')
    }
  }

  return (
    <div
      id="book-trial"
      className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-3xl p-8 sm:p-12 border-2 border-emerald-200 shadow-xl"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Special Offer: First Session is Free</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Book Your Free Trial Class in Patna
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto mt-2 leading-relaxed">
          Experience our safe, judgment-free mom fitness community. Bring your toddler along to play while you rejuvenate!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5 ml-1">
              Mother&apos;s Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Shruti Sharma"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none bg-white shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5 ml-1">
              WhatsApp Contact Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none bg-white shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5 ml-1">
              Preferred Fitness Program
            </label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none bg-white shadow-sm cursor-pointer"
            >
              <option value="Postnatal Yoga & Core">Postnatal Yoga &amp; Core Rehabilitation</option>
              <option value="High-Energy Zumba Cardio">High-Energy Zumba &amp; Dance Cardio</option>
              <option value="Mom-Strength Conditioning">Mom-Strength &amp; Functional Fitness</option>
              <option value="All-Inclusive Combo">All-Inclusive Mothers Circle Pass</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5 ml-1">
              Preferred Batch Timing
            </label>
            <select
              value={batchTime}
              onChange={(e) => setBatchTime(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none bg-white shadow-sm cursor-pointer"
            >
              <option value="Morning Batch (7:30 AM - 8:30 AM)">Morning Batch (7:30 AM - 8:30 AM)</option>
              <option value="Mid-Morning Batch (10:00 AM - 11:00 AM)">Mid-Morning Batch (10:00 AM - 11:00 AM)</option>
              <option value="Evening Batch (5:00 PM - 6:00 PM)">Evening Batch (5:00 PM - 6:00 PM)</option>
              <option value="Weekend Special (Sat & Sun)">Weekend Special (Sat &amp; Sun)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5 ml-1">
              Childcare / Play Zone Option
            </label>
            <select
              value={childCareNeeded}
              onChange={(e) => setChildCareNeeded(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none bg-white shadow-sm cursor-pointer"
            >
              <option value="Yes, need play zone access for toddler">Yes, will bring child (Playzone access)</option>
              <option value="No, attending solo">No, attending solo</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-800 mb-1.5 ml-1">
              Postpartum / Fitness Stage
            </label>
            <select
              value={postpartumStage}
              onChange={(e) => setPostpartumStage(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none bg-white shadow-sm cursor-pointer"
            >
              <option value="0–6 Months Postpartum (Gentle Rehab)">0–6 Months Postpartum (Gentle Rehab)</option>
              <option value="6–18 Months Postpartum">6–18 Months Postpartum</option>
              <option value="Mom with Toddler / Older Child">Mom with Toddler / Older Child</option>
              <option value="General Female Fitness">General Female Fitness &amp; Toning</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-slate-800 mb-1.5 ml-1">
            Health Goals or Special Requests (Optional)
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. Diastasis recti recovery, back pain relief, stamina improvement"
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none bg-white shadow-sm"
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
            <span>🎉 Trial request received! Our fitness coordinator will contact you via WhatsApp to reserve your slot.</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="flex-1 py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            <Dumbbell className="w-4 h-4" />
            <span>{status === 'submitting' ? 'Reserving Trial Slot...' : 'Reserve Free Trial Class'}</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="sm:w-auto py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us Instantly</span>
          </button>
        </div>
      </form>
    </div>
  )
}
