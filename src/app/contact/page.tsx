'use client';

import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock3,
  CheckCircle2,
  Navigation as NavigationIcon,
  Sparkles,
  Cake,
  Tent,
  Snowflake,
  Baby,
  Dumbbell,
  Palette,
  ClipboardList,
  Heart,
  Video,
  Star,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const PHONE_NUMBER = '+916207368839';
const WHATSAPP_NUMBER = '916207368839';
const EMAIL = 'phulwari02@gmail.com';
const ADDRESS = 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001';

const workingHours = [
  { name: 'Phulwari Premium Circle', time: '5:00 PM Onwards', days: 'Monday to Sunday', color: '#3D8BFF', bg: '#E5EFFF' },
  { name: 'Phulwari Core', time: '6:30 PM Onwards', days: 'Wednesday to Sunday', color: '#8B5CF6', bg: '#EFE7FE' },
  { name: 'Mother & Toddler Program', time: '10:30 AM – 11:30 AM', days: 'Monday to Saturday', color: '#FF4D8D', bg: '#FFE6EF' },
];

const services = [
  { icon: Baby, text: 'Child Admissions' },
  { icon: Sparkles, text: 'Activity Program Information' },
  { icon: Baby, text: 'Mother & Toddler Program' },
  { icon: ClipboardList, text: 'Phulwari Premium Circle Enrollment' },
  { icon: Palette, text: 'Phulwari Core Enrollment' },
  { icon: Cake, text: 'Birthday Party Bookings' },
  { icon: Tent, text: 'Summer Camp Registration' },
  { icon: Snowflake, text: 'Winter Camp Registration' },
  { icon: Dumbbell, text: 'Mother Fitness Program' },
  { icon: MessageCircle, text: 'General Inquiries' },
];

const whatsappTopics = [
  'Admissions', 'Batch Details', 'Birthday Party Bookings',
  'Summer Camp Registration', 'Winter Camp Registration',
  'Program Information', 'General Inquiries',
];

const programOptions = [
  'Phulwari Premium Circle', 'Phulwari Core', 'Mother & Toddler Program',
  'Mother Fitness Program', 'Birthday Party', 'Summer Camp', 'Winter Camp', 'General Inquiry',
];

const mapsUrl = 'https://maps.app.goo.gl/g7qiU1BqineG2RF56';

const socialLinks = [
  {
    name: 'Facebook',
    handle: 'Phulwari Mother & Kids',
    url: 'https://www.facebook.com/share/1DWjMMRAjT/',
    bg: '#1877F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" style={{ color: '#fff' }}>
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@phulwari.motherkids',
    url: 'https://www.instagram.com/phulwari.motherkids/',
    bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" style={{ color: '#fff' }}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '@phulwari-s1d7o',
    url: 'https://youtube.com/@phulwari-s1d7o?si=41VbAwYujvmndntr',
    bg: '#FF0000',
    icon: <Video style={{ color: '#fff', width: 22, height: 22 }} />,
  },
];

interface FormState {
  parentName: string; childName: string; mobile: string;
  email: string; program: string; message: string;
}
const initialForm: FormState = { parentName: '', childName: '', mobile: '', email: '', program: '', message: '' };

function buildWhatsAppMessage(form: FormState) {
  const lines = [
    `🌼 *New Inquiry from the Phulwari Website* 🌼`, ``,
    `👋 Hi Phulwari! I'd love to know more.`, ``,
    `👨‍👩‍👧 *Parent Name:* ${form.parentName}`,
    form.childName ? `🧒 *Child Name:* ${form.childName}` : null,
    `📱 *Mobile:* ${form.mobile}`,
    form.email ? `📧 *Email:* ${form.email}` : null,
    form.program ? `🎈 *Interested Program:* ${form.program}` : null,
    ``, `📝 *Message:*`, form.message,
  ].filter(Boolean);
  return lines.join('\n');
}

/**
 * These sections are used two ways: as their own route (where the section
 * heading is the page's single <h1>) and composed into the homepage (where the
 * hero already owns the <h1>, so they must step down to <h2>).
 * `headingLevel` lets the homepage demote them and keeps exactly one <h1> per
 * page, which is what both the accessibility tree and Google expect.
 */
export default function ContactPage({ headingLevel = 'h1' }: { headingLevel?: 'h1' | 'h2' } = {}) {
  const Heading = headingLevel;
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.parentName.trim()) next.parentName = 'Please tell us your name 🙂';
    if (!form.mobile.trim()) next.mobile = 'A mobile number helps us reach you!';
    else if (!/^[+]?[\d\s-]{7,15}$/.test(form.mobile.trim())) next.mobile = 'Hmm, that number looks off — mind double-checking?';
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'That email looks a little funky — check it?';
    if (!form.message.trim()) next.message = 'Tell us a bit about what you need 💬';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    
    try {
      const supabase = createClient();
      const newEnq = {
        child_name: form.childName,
        parent_name: form.parentName,
        phone: form.mobile,
        email: form.email,
        program_interested: form.program,
        message: form.message,
        source: 'Website / Home Page',
        status: 'New'
      };
      
      const { error } = await supabase.from('enquiries').insert([newEnq]);
      
      if (error) {
        console.error('Failed to submit enquiry:', error);
        setStatus('idle');
        alert('There was a problem sending your message. Please try again.');
        return;
      }
      
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus('idle');
      alert('There was a problem sending your message. Please try again.');
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.parentName.trim() || !form.mobile.trim() || !form.message.trim()) {
      alert("Please fill in Parent Name, Mobile Number, and Message to send via WhatsApp.");
      return;
    }
    const text = buildWhatsAppMessage(form);
    window.open(`https://wa.me/916207368839?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSMSClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.parentName.trim() || !form.mobile.trim() || !form.message.trim()) {
      alert("Please fill in Parent Name, Mobile Number, and Message to send via SMS.");
      return;
    }
    const text = buildWhatsAppMessage(form);
    window.location.href = `sms:+916207368839?body=${encodeURIComponent(text)}`;
  };

  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `tel:+916207368839`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');
        @keyframes ctFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ctFloatBadge { 0%, 100% { transform: rotate(-2deg) translateY(0); } 50% { transform: rotate(-2deg) translateY(-4px); } }
        @keyframes ctPop { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes ctWiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-4deg); } 75% { transform: rotate(4deg); } }
        @keyframes ctSpinDots { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .ct-intro, .ct-intro-badge, .ct-card, .ct-success { animation: none !important; } }
        .ct-page { background-color: #FFF7EC; font-family: 'Quicksand', sans-serif; color: #3F3A52; }
        .ct-intro { max-width: 56rem; margin: 0 auto; padding: 4rem 1.25rem 2.5rem; text-align: center; animation: ctFadeUp 0.6s ease both; }
        .ct-intro-badge { display: inline-flex; padding: 0.5rem 1.2rem; margin-bottom: 1rem; background-color: #FFD166; border-radius: 9999px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #6B4500; animation: ctFloatBadge 4s ease-in-out infinite; }
        .ct-intro-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 2.2rem; line-height: 1.15; margin-bottom: 0.9rem; }
        .ct-intro-title span { color: #FF4D8D; }
        .ct-intro-text { font-weight: 600; font-size: 1.02rem; line-height: 1.7; color: #6B6480; }
        .ct-section { max-width: 72rem; margin: 0 auto; padding: 1.5rem 1.25rem; }
        .ct-section-head { text-align: center; max-width: 42rem; margin: 0 auto 2rem; }
        .ct-section-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.8rem; margin-bottom: 0.5rem; }
        .ct-section-title span { color: #3D8BFF; }
        .ct-section-text { font-weight: 600; color: #6B6480; line-height: 1.6; }
        .ct-info-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        .ct-card { background-color: #ffffff; border-radius: 24px; padding: 1.75rem; box-shadow: 0 10px 24px rgba(63,58,82,0.06); animation: ctFadeUp 0.5s ease both; transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .ct-card:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(63,58,82,0.1); }
        .ct-card-icon { width: 50px; height: 50px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; transition: transform 0.3s ease; }
        .ct-card:hover .ct-card-icon { animation: ctWiggle 0.4s ease; }
        .ct-card-icon svg { width: 24px; height: 24px; stroke-width: 2.25; }
        .ct-card-title { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.5rem; }
        .ct-card-text { font-size: 0.88rem; font-weight: 600; color: #6B6480; line-height: 1.65; margin-bottom: 0.5rem; }
        .ct-card-link { font-weight: 700; font-size: 0.95rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem; }
        .ct-mini-list { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.6rem; }
        .ct-mini-list li { position: relative; padding-left: 1.1rem; font-weight: 700; font-size: 0.82rem; color: #3F3A52; }
        .ct-mini-list li::before { content: ''; position: absolute; left: 0; top: 0.5em; width: 6px; height: 6px; border-radius: 9999px; background-color: #34B36B; }
        @media (min-width: 640px) { .ct-info-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .ct-info-grid { grid-template-columns: repeat(3, 1fr); } }
        .ct-hours-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        .ct-hour-card { background-color: #ffffff; border-radius: 20px; padding: 1.4rem; box-shadow: 0 8px 20px rgba(63,58,82,0.06); }
        .ct-hour-badge { display: inline-flex; padding: 0.4rem 0.9rem; border-radius: 9999px; font-size: 0.72rem; font-weight: 700; margin-bottom: 0.7rem; }
        .ct-hour-time { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; margin-bottom: 0.3rem; }
        .ct-hour-time svg { width: 16px; height: 16px; stroke-width: 2.25; }
        .ct-hour-days { font-size: 0.82rem; font-weight: 600; color: #6B6480; }
        @media (min-width: 768px) { .ct-hours-grid { grid-template-columns: repeat(3, 1fr); } }
        .ct-social-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        .ct-social-card { display: flex; align-items: center; gap: 1rem; background-color: #ffffff; border-radius: 20px; padding: 1.1rem 1.25rem; box-shadow: 0 8px 20px rgba(63,58,82,0.06); text-decoration: none; color: #3F3A52; transition: transform 0.18s ease; }
        .ct-social-card:hover { transform: translateY(-2px); }
        .ct-social-icon { width: 46px; height: 46px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ct-social-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 0.15rem; }
        .ct-social-sub { font-size: 0.8rem; font-weight: 600; color: #6B6480; }
        @media (min-width: 640px) { .ct-social-grid { grid-template-columns: repeat(3, 1fr); } }
        .ct-services-grid { display: grid; grid-template-columns: 1fr; gap: 0.7rem; }
        .ct-service-item { display: flex; align-items: center; gap: 0.6rem; background-color: #ffffff; border-radius: 16px; padding: 0.85rem 1.05rem; box-shadow: 0 6px 16px rgba(63,58,82,0.05); font-weight: 700; font-size: 0.85rem; transition: transform 0.15s ease; }
        .ct-service-item:hover { transform: translateX(3px); }
        .ct-service-item svg { width: 18px; height: 18px; flex-shrink: 0; color: #34B36B; stroke-width: 2.5; }
        @media (min-width: 640px) { .ct-services-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .ct-services-grid { grid-template-columns: repeat(3, 1fr); } }
        .ct-form-wrap { max-width: 42rem; margin: 0 auto; background-color: #ffffff; border-radius: 28px; padding: 2rem; box-shadow: 0 14px 32px rgba(63,58,82,0.08); }
        .ct-form-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
        .ct-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .ct-field label { font-weight: 700; font-size: 0.82rem; color: #3F3A52; }
        .ct-field input, .ct-field select, .ct-field textarea { font-family: 'Quicksand', sans-serif; font-weight: 600; font-size: 0.9rem; color: #3F3A52; background-color: #FFF7EC; border: 2px solid transparent; border-radius: 14px; padding: 0.75rem 1rem; outline: none; transition: border-color 0.15s ease; }
        .ct-field input:focus, .ct-field select:focus, .ct-field textarea:focus { border-color: #34B36B; }
        .ct-field textarea { resize: vertical; min-height: 100px; }
        .ct-field-error { color: #E0457A; font-size: 0.76rem; font-weight: 700; }
        @media (min-width: 640px) { .ct-form-grid.two-col { grid-template-columns: 1fr 1fr; } }
        .ct-form-hint { margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; font-weight: 700; color: #1F7A45; background-color: #E3F7EA; border-radius: 12px; padding: 0.65rem 0.9rem; }
        .ct-form-hint svg { width: 16px; height: 16px; flex-shrink: 0; stroke-width: 2.5; }
        .ct-submit-container { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.5rem; }
        .ct-submit-btn { width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 0.55rem; padding: 0.95rem 1.6rem; border: none; color: #ffffff; font-weight: 700; font-size: 0.95rem; font-family: 'Quicksand', sans-serif; border-radius: 9999px; cursor: pointer; background-color: #34B36B; box-shadow: 0 6px 16px rgba(52,179,107,0.32); transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease; }
        .ct-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(52,179,107,0.4); }
        .ct-submit-btn:disabled { opacity: 0.8; cursor: progress; }
        .ct-submit-btn svg { width: 18px; height: 18px; stroke: #ffffff; stroke-width: 2.25; }
        .ct-quick-actions { display: flex; align-items: center; gap: 0.5rem; }
        .ct-circle-btn { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease; color: white; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08); flex-shrink: 0; }
        .ct-circle-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(0, 0, 0, 0.15); }
        .ct-circle-btn.btn-wa { background-color: #25D366; }
        .ct-circle-btn.btn-wa:hover { background-color: #20BA56; }
        .ct-circle-btn.btn-wa svg { fill: #ffffff; width: 22px; height: 22px; }
        .ct-circle-btn.btn-msg { background-color: #3D8BFF; color: white; }
        .ct-circle-btn.btn-msg:hover { background-color: #2B7AEE; }
        .ct-circle-btn.btn-msg svg { stroke: #ffffff; stroke-width: 2.25; width: 22px; height: 22px; }
        .ct-circle-btn.btn-call-quick { background-color: #FF9F43; color: white; }
        .ct-circle-btn.btn-call-quick:hover { background-color: #EE8E32; }
        .ct-circle-btn.btn-call-quick svg { stroke: #ffffff; stroke-width: 2.25; width: 20px; height: 20px; }
        .ct-submit-spinner { width: 16px; height: 16px; border-radius: 9999px; border: 2.5px solid rgba(255,255,255,0.4); border-top-color: #ffffff; animation: ctSpinDots 0.7s linear infinite; }
        .ct-success { margin-top: 1.5rem; display: flex; align-items: flex-start; gap: 0.6rem; background-color: #E3F7EA; color: #1F7A45; border-radius: 14px; padding: 0.9rem 1.1rem; font-weight: 700; font-size: 0.85rem; animation: ctPop 0.3s ease both; }
        .ct-success svg { width: 18px; height: 18px; flex-shrink: 0; stroke-width: 2.5; margin-top: 0.1rem; }
        .ct-map-card { max-width: 72rem; margin: 0 auto; background-color: #ffffff; border-radius: 28px; overflow: hidden; box-shadow: 0 12px 30px rgba(63,58,82,0.07); }
        .ct-map-embed { width: 100%; aspect-ratio: 16/7; border: none; display: block; background-color: #E5EFFF; }
        .ct-map-info { padding: 1.5rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; }
        .ct-map-address { display: flex; align-items: flex-start; gap: 0.6rem; font-weight: 700; font-size: 0.9rem; max-width: 30rem; }
        .ct-map-address svg { width: 20px; height: 20px; color: #FF4D8D; flex-shrink: 0; margin-top: 0.1rem; stroke-width: 2.25; }
        .ct-cta { max-width: 56rem; margin: 0 auto; padding: 1rem 1.25rem 4.5rem; text-align: center; }
        .ct-cta-box { background-color: #ffffff; border-radius: 32px; padding: 2.75rem 2rem; box-shadow: 0 12px 30px rgba(63,58,82,0.07); }
        .ct-cta-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.6rem; margin-bottom: 0.6rem; }
        .ct-cta-text { font-weight: 600; color: #6B6480; margin-bottom: 1.6rem; }
        .ct-cta-buttons { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
        .ct-cta-button { display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.85rem 1.5rem; border: none; color: #ffffff; font-weight: 700; font-size: 0.88rem; font-family: 'Quicksand', sans-serif; border-radius: 9999px; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease; box-shadow: 0 4px 10px rgba(0,0,0,0.08); text-decoration: none; }
        .ct-cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 18px rgba(0,0,0,0.14); }
        .ct-cta-button svg { width: 17px; height: 17px; stroke: #ffffff; stroke-width: 2.25; }
        .btn-call { background-color: #FF4D8D; }
        .btn-whatsapp { background-color: #34B36B; }
      `}</style>

      <div className="ct-page">
        <section className="ct-intro">
          <span className="ct-intro-badge">Contact Us</span>
          <Heading className="ct-intro-title">We&apos;d Love to <span>Hear From You!</span></Heading>
          <p className="ct-intro-text">Whether you&apos;re looking to enroll your child, join our activity programs, book a birthday party, register for a camp, or simply learn more about Phulwari, our team is here to help.</p>
        </section>

        {/* Contact info cards */}
        <section className="ct-section">
          <div className="ct-info-grid">
            <div className="ct-card">
              <div className="ct-card-icon" style={{ backgroundColor: '#FFE6EF' }}><Phone style={{ color: '#FF4D8D' }} /></div>
              <h3 className="ct-card-title">Call Us</h3>
              <p className="ct-card-text">Get information about admissions, batches, activities, camps, birthday celebrations and more.</p>
              <a href={`tel:${PHONE_NUMBER}`} className="ct-card-link" style={{ color: '#FF4D8D' }}>
                <Phone style={{ width: 16, height: 16 }} />+91 6207368839
              </a>
            </div>
            <div className="ct-card" style={{ animationDelay: '0.08s' }}>
              <div className="ct-card-icon" style={{ backgroundColor: '#E3F7EA' }}><MessageCircle style={{ color: '#34B36B' }} /></div>
              <h3 className="ct-card-title">WhatsApp Support</h3>
              <p className="ct-card-text">Chat with us directly for:</p>
              <ul className="ct-mini-list">{whatsappTopics.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
            <div className="ct-card" style={{ animationDelay: '0.16s' }}>
              <div className="ct-card-icon" style={{ backgroundColor: '#E5EFFF' }}><Mail style={{ color: '#3D8BFF' }} /></div>
              <h3 className="ct-card-title">Email Us</h3>
              <p className="ct-card-text">We typically respond within one business day.</p>
              <a href={`mailto:${EMAIL}`} className="ct-card-link" style={{ color: '#3D8BFF' }}>
                <Mail style={{ width: 16, height: 16 }} />{EMAIL}
              </a>
            </div>
          </div>
        </section>

        {/* Visit */}
        <section className="ct-section">
          <div className="ct-card" style={{ maxWidth: '52rem', margin: '0 auto' }}>
            <div className="ct-card-icon" style={{ backgroundColor: '#FFEADB' }}><MapPin style={{ color: '#FF8A3D' }} /></div>
            <h3 className="ct-card-title">Visit Our Centre</h3>
            <p className="ct-card-text" style={{ marginBottom: 0 }}>Phulwari Mother &amp; Child Activity Centre<br />{ADDRESS}</p>
          </div>
        </section>

        {/* Social Media */}
        <section className="ct-section">
          <div className="ct-section-head">
            <h2 className="ct-section-title">Follow Us <span>Online</span></h2>
            <p className="ct-section-text">Stay connected and get the latest updates, photos and news from Phulwari.</p>
          </div>
          <div className="ct-social-grid">
            {socialLinks.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="ct-social-card">
                <div className="ct-social-icon" style={{ background: s.bg }}>{s.icon}</div>
                <div>
                  <div className="ct-social-title">{s.name}</div>
                  <div className="ct-social-sub">{s.handle}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Working hours */}
        <section className="ct-section">
          <div className="ct-section-head"><h2 className="ct-section-title">Working <span>Hours</span></h2></div>
          <div className="ct-hours-grid">
            {workingHours.map((h, i) => (
              <div className="ct-hour-card" key={i}>
                <span className="ct-hour-badge" style={{ backgroundColor: h.bg, color: h.color }}>{h.name}</span>
                <div className="ct-hour-time"><Clock3 style={{ color: h.color }} />{h.time}</div>
                <div className="ct-hour-days">{h.days}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="ct-section">
          <div className="ct-section-head"><h2 className="ct-section-title">Services You Can <span>Contact Us For</span></h2></div>
          <div className="ct-services-grid">
            {services.map((s, i) => { const Icon = s.icon; return (<div className="ct-service-item" key={i}><Icon /><span>{s.text}</span></div>); })}
          </div>
        </section>

        {/* Form */}
        <section className="ct-section">
          <div className="ct-section-head">
            <h2 className="ct-section-title">Send Us <span>a Message</span></h2>
            <p className="ct-section-text">Fill out the form below — hit send and we&apos;ll get back to you shortly! 💬</p>
          </div>
          <div className="ct-form-wrap">
            <form onSubmit={handleSubmit} noValidate>
              <div className="ct-form-hint"><MessageCircle /><span>Send us your details and our team will get back to you shortly!</span></div>
              <div className="ct-form-grid two-col">
                <div className="ct-field">
                  <label htmlFor="parentName">Parent Name *</label>
                  <input id="parentName" type="text" value={form.parentName} onChange={(e) => handleChange('parentName', e.target.value)} placeholder="Your full name" />
                  {errors.parentName && <span className="ct-field-error">{errors.parentName}</span>}
                </div>
                <div className="ct-field">
                  <label htmlFor="childName">Child Name</label>
                  <input id="childName" type="text" value={form.childName} onChange={(e) => handleChange('childName', e.target.value)} placeholder="Your child's name" />
                </div>
                <div className="ct-field">
                  <label htmlFor="mobile">Mobile Number *</label>
                  <input id="mobile" type="tel" value={form.mobile} onChange={(e) => handleChange('mobile', e.target.value)} placeholder="+91 XXXXX XXXXX" />
                  {errors.mobile && <span className="ct-field-error">{errors.mobile}</span>}
                </div>
                <div className="ct-field">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="you@example.com" />
                  {errors.email && <span className="ct-field-error">{errors.email}</span>}
                </div>
              </div>
              <div className="ct-field" style={{ marginTop: '1rem' }}>
                <label htmlFor="program">Interested Program</label>
                <select id="program" value={form.program} onChange={(e) => handleChange('program', e.target.value)}>
                  <option value="">Select a program</option>
                  {programOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="ct-field" style={{ marginTop: '1rem' }}>
                <label htmlFor="message">Message *</label>
                <textarea id="message" value={form.message} onChange={(e) => handleChange('message', e.target.value)} placeholder="Tell us a little about what you're looking for..." />
                {errors.message && <span className="ct-field-error">{errors.message}</span>}
              </div>
              <div className="ct-submit-container">
                <button className="ct-submit-btn" type="submit" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <><span className="ct-submit-spinner" /><span>Sending your message...</span></>
                  ) : (
                    <><MessageCircle /><span>Send Message</span></>
                  )}
                </button>

                <div className="ct-quick-actions">
                  <button
                    onClick={handleWhatsAppClick}
                    className="ct-circle-btn btn-wa"
                    title="Inquire via WhatsApp"
                    type="button"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.805.002-2.617-1.013-5.074-2.86-6.921C16.375 2.03 13.927.994 11.999.994 6.595.994 2.195 5.391 2.193 10.803c-.001 1.512.404 2.99 1.173 4.298l-.993 3.624 3.714-.973zm10.23-7.228c-.282-.142-1.67-.823-1.929-.918-.258-.095-.447-.142-.636.142-.189.283-.733.918-.898 1.104-.165.188-.33.212-.612.07-.282-.142-1.192-.44-2.272-1.402-.84-.75-1.407-1.676-1.572-1.959-.165-.283-.018-.435.123-.576.127-.127.282-.33.424-.496.142-.165.189-.283.283-.472.095-.19.047-.354-.024-.496-.07-.142-.636-1.531-.871-2.097-.23-.553-.462-.477-.636-.486-.165-.008-.354-.01-.543-.01-.189 0-.496.07-.755.354-.26.283-.99.967-.99 2.36s1.013 2.735 1.155 2.924c.142.19 1.992 3.044 4.826 4.267.674.29 1.2.464 1.611.595.677.215 1.293.185 1.78.113.543-.08 1.67-.683 1.905-1.343.236-.66.236-1.226.165-1.343-.07-.118-.26-.189-.543-.33z"/>
                    </svg>
                  </button>
                  <button
                    onClick={handleSMSClick}
                    className="ct-circle-btn btn-msg"
                    title="Inquire via SMS Message"
                    type="button"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCallClick}
                    className="ct-circle-btn btn-call-quick"
                    title="Call Phulwari Centre"
                    type="button"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {status === 'success' && (<div className="ct-success"><CheckCircle2 /><span>Yay! 🎉 We&apos;ve received your message and will reach out to you shortly!</span></div>)}
            </form>
          </div>
        </section>

        {/* Map */}
        <section className="ct-section">
          <div className="ct-section-head">
            <h2 className="ct-section-title">Find Us <span>Easily</span></h2>
            <p className="ct-section-text">Visit our centre and experience the Phulwari environment firsthand.</p>
          </div>
          <div className="ct-map-card">
            <iframe
              className="ct-map-embed"
              title="Phulwari Mother & Child Activity Centre location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.5!2d85.1!3d25.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM32+Road+No+25+Sri+Krishna+Nagar+Kidwaipuri+Patna+Bihar!5e0!3m2!1sen!2sin!4v1"
              loading="lazy"
              allowFullScreen
            />
            <div className="ct-map-info">
              <div className="ct-map-address"><MapPin /><span>{ADDRESS}</span></div>
              <div className="flex flex-wrap gap-2">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="ct-cta-button btn-call">
                  <NavigationIcon /><span>Get Directions</span>
                </a>
                <a href="https://maps.app.goo.gl/vGM1Em5s5NSsbFJA8?g_st=aw" target="_blank" rel="noopener noreferrer" className="ct-cta-button btn-whatsapp">
                  <Star style={{ fill: '#FFD166', color: '#FFD166' }} /><span>Read our Google Reviews</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}