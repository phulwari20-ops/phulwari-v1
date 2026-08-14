'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageCircle, Star, Quote, ThumbsUp, ExternalLink, Send, X, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const GOOGLE_REVIEW_URL =
  'https://www.google.com/search?q=phulwari+mother+and+child+activity+centre&oq=&gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIGCAAQRRg5MgYIARBFGDsyBwgCEAAYgAQyBwgDEAAYgAQyBwgEEAAYgAQyBwgFEAAYgAQyBwgGEAAYgAQyBwgHEAAYgAQyBwgIEAAYgAQyBggJEEUYPDIHCAoQLhiABDIHCAsQABiABDIHCAwQABiABDIHCA0QABiABDIGCA4QRRg80gEINTQ5MGowajSoAgGwAgE&client=ms-android-motorola-rvo3&sourceid=chrome-mobile&ie=UTF-8&zx=1782149690079#sv=CAESzQEKuQEStgEKd0FJaVQ0dEpoZ3V3V1MyRnR5TWM1Z0dzbjlxLXBSZWpFWmZVeTlhRUNtRTFQQ1hVS0w0SWFrbUZDNS1uenpVaks4dWkyUFdCZVNzR01uX3ZSeC1NUkJZVGt4SklLelVZMmNqaVRpeFlRTE85TTRRcDVuaHpPWk5FEhdQSEk1YW9yVkRKS1RzZU1QMlp5NTZRRRoiQURzcjlmUmhsY2d1bFJRZWJvdzliRnhteVMxcmh5QVAwZxIEODA1MRoBMyoAMAA4AUAAGAAg9pm1jgxKAhAC';

const WHATSAPP_BASE = 'https://wa.me/916207368839?text=';

const defaultReviews = [
  {
    name: 'Priyaraj',
    avatar: 'PR',
    rating: 5,
    date: 'November 2024',
    text: 'Phulwari is an amazing place for kids! My daughter has improved so much in dance and art since joining. The trainers are very experienced and caring. Highly recommend to all parents.',
    color: '#FF4D8D',
    bg: '#FFE6EF',
    program: 'Phulwari Core',
  },
  {
    name: 'Braj Raj',
    avatar: 'BR',
    rating: 4,
    date: 'October 2024',
    text: "The Mother & Toddler Program is absolutely wonderful. My toddler loves the playzone and I enjoy the fitness sessions. It's a great bonding experience. The staff is very supportive and friendly.",
    color: '#34B36B',
    bg: '#E3F7EA',
    program: 'Mother & Toddler Program',
  },
  {
    name: 'Sushmita Kumari',
    avatar: 'SK',
    rating: 5,
    date: 'October 2024',
    text: 'My son joined the Premium Circle and it has been life-changing. He is more confident, active and social. The gymnastics and yoga sessions are excellent. The environment is very safe and nurturing.',
    color: '#8B5CF6',
    bg: '#EFE7FE',
    program: 'Phulwari Premium Circle',
  },
  {
    name: 'Ankita Prasun',
    avatar: 'AP',
    rating: 5,
    date: 'September 2024',
    text: 'We enrolled our daughter in the Summer Camp and she had the best time of her life. She made new friends, learnt new skills and came back every day with so much energy and happiness. Thank you Phulwari!',
    color: '#FF8A3D',
    bg: '#FFEADB',
    program: 'Summer Camp',
  },
  {
    name: 'Manicallysh',
    avatar: 'M',
    rating: 4,
    date: 'September 2024',
    text: "Excellent centre for children's overall development. My child has shown remarkable improvement in creativity and confidence after joining Phulwari Core. The art and dance sessions are top quality.",
    color: '#3D8BFF',
    bg: '#E5EFFF',
    program: 'Phulwari Core',
  },
  {
    name: 'Shilpa Shree',
    avatar: 'SS',
    rating: 5,
    date: 'August 2024',
    text: 'The birthday party we booked at Phulwari was absolutely magical! The kids had so much fun. Everything was well organized and the staff made sure every child was happy. Will definitely book again.',
    color: '#E8A621',
    bg: '#FFF3D9',
    program: 'Birthday Party',
  },
  {
    name: 'Puja Kumari',
    avatar: 'PK',
    rating: 4,
    date: 'August 2024',
    text: 'As a mother, I was looking for a safe and engaging place for my child. Phulwari exceeded all my expectations. The trainers are professional, the environment is clean and the programs are well structured.',
    color: '#FF4D8D',
    bg: '#FFE6EF',
    program: 'Phulwari Premium Circle',
  },
  {
    name: 'Sidhart Kumar',
    avatar: 'SK',
    rating: 5,
    date: 'July 2024',
    text: 'My daughter loves the yoga and gymnastics sessions at Phulwari. She has become more flexible, focused and disciplined. The Winter Camp was also fantastic. Highly recommended centre in Patna.',
    color: '#34B36B',
    bg: '#E3F7EA',
    program: 'Phulwari Core',
  },
  {
    name: 'Rohit Aanand',
    avatar: 'RA',
    rating: 5,
    date: 'July 2024',
    text: 'Wonderful place for children. My son has developed great social skills and leadership qualities after joining Phulwari. The activities are fun, educational and engaging. The staff is always helpful.',
    color: '#8B5CF6',
    bg: '#EFE7FE',
    program: 'Phulwari Core',
  },
];

const stats = [
  { value: '4.9', label: 'Google Rating', icon: '⭐' },
  { value: '200+', label: 'Happy Families', icon: '👨‍👩‍👧' },
  { value: '100%', label: 'Parent Satisfaction', icon: '💯' },
  { value: '10+', label: 'Fun and learning activities', icon: '🎯' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          style={{
            width: 14,
            height: 14,
            fill: s <= rating ? '#FFD166' : '#E5E0D8',
            stroke: s <= rating ? '#FFD166' : '#E5E0D8',
          }}
        />
      ))}
    </div>
  );
}

function InteractiveStars({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
          aria-label={`${s} star`}
        >
          <Star
            style={{
              width: 32,
              height: 32,
              fill: s <= (hovered || value) ? '#FFD166' : '#E5E0D8',
              stroke: s <= (hovered || value) ? '#FFD166' : '#E5E0D8',
              transition: 'all 0.15s',
            }}
          />
        </button>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });
        if (data && data.length > 0) {
          setReviewsList(data);
        } else {
          setReviewsList([]);
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
        setReviewsList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Map reviews dynamically
  const reviews = reviewsList.map(r => {
    const colors = ['#FF4D8D', '#34B36B', '#8B5CF6', '#FF8A3D', '#3D8BFF', '#E8A621'];
    const charCodeSum = (r.author_name || r.name || '').split('').reduce((sum: number, char: string) => sum + char.charCodeAt(0), 0);
    const color = colors[charCodeSum % colors.length];
    const bg = color + '15'; // 10% opacity
    
    return {
      id: r.id,
      name: r.author_name || r.name,
      avatar: (r.author_name || r.name || 'P').split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase(),
      rating: r.rating || 5,
      date: r.review_date || r.date,
      text: r.content || r.text,
      color: r.color || color,
      bg: r.bg || bg,
      program: r.program_tag || r.program || 'Phulwari Premium Circle',
      is_verified: r.is_verified !== undefined ? r.is_verified : true
    };
  });

  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, 6);

  /* ── Carousel ── */
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const totalSlides = reviews.length || 1;

  useEffect(() => {
    if (totalSlides <= 1) return;
    const id = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % totalSlides);
    }, 3500);
    return () => clearInterval(id);
  }, [totalSlides]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector('.cs-card') as HTMLElement | null;
    if (!card) return;
    const w = card.offsetWidth + 16;
    el.scrollTo({ left: carouselIdx * w, behavior: 'smooth' });
  }, [carouselIdx]);

  /* ── Review form ── */
  const [form, setForm] = useState({ name: '', program: '', rating: 5, message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [lowRatingShown, setLowRatingShown] = useState(false);

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.message.trim() || form.rating === 0) return;

    if (form.rating >= 4) {
      // Save directly to reviews table in Supabase
      try {
        const supabase = createClient();
        await supabase.from('reviews').insert([{
          author_name: form.name,
          review_date: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
          rating: form.rating,
          content: form.message,
          program_tag: form.program || 'Phulwari Premium Circle',
          is_verified: true
        }]);
      } catch (e) {
        console.error('Failed to post review:', e);
      }

      const text = `${form.message}`;
      navigator.clipboard.writeText(text).catch(() => {});
      window.open(GOOGLE_REVIEW_URL, '_blank');
      setSubmitted(true);
    } else {
      const msg = encodeURIComponent(
        `Hi Phulwari Team! My name is ${form.name}${
          form.program ? ` (enrolled in ${form.program})` : ''
        }.\n\nFeedback: ${form.message}\n\nRating: ${'⭐'.repeat(form.rating)}`
      );
      window.open(`${WHATSAPP_BASE}${msg}`, '_blank');
      setLowRatingShown(true);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Quicksand:wght@500;600;700&display=swap');
        @keyframes tmFadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes tmFloat  { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-5px); } }

        .tm-page { background-color:#FFF7EC; font-family:'Quicksand',sans-serif; color:#3F3A52; min-height:100vh; padding-bottom:4rem; }

        .tm-hero { max-width:48rem; margin:0 auto; padding:3.5rem 1.25rem 2rem; text-align:center; animation:tmFadeUp 0.5s ease both; }
        .tm-hero-badge { display:inline-flex; align-items:center; gap:.4rem; padding:.5rem 1.2rem; background-color:#FFD166; border-radius:9999px; font-size:.7rem; font-weight:700; letter-spacing:.04em; text-transform:uppercase; color:#6B4500; animation:tmFloat 4s ease-in-out infinite; margin-bottom:1rem; }
        .tm-hero-title { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(1.8rem,3vw+1rem,2.4rem); line-height:1.18; margin-bottom:.75rem; }
        .tm-hero-title span { color:#FF4D8D; }
        .tm-hero-sub { font-size:.97rem; font-weight:600; color:#6B6480; line-height:1.7; }

        .tm-stats { max-width:56rem; margin:0 auto; padding:0 1.25rem 2rem; display:grid; grid-template-columns:repeat(2,1fr); gap:.75rem; }
        @media(min-width:640px){ .tm-stats { grid-template-columns:repeat(4,1fr); } }
        .tm-stat { background-color:#ffffff; border-radius:20px; padding:1.25rem 1rem; text-align:center; box-shadow:0 6px 16px rgba(63,58,82,.06); }
        .tm-stat-emoji { font-size:1.5rem; margin-bottom:.4rem; }
        .tm-stat-value { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:1.6rem; color:#FF4D8D; line-height:1; margin-bottom:.25rem; }
        .tm-stat-label { font-size:.78rem; font-weight:700; color:#6B6480; }

        .tm-google-badge { max-width:56rem; margin:0 auto 2rem; padding:0 1.25rem; }
        .tm-google-inner { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; background-color:#ffffff; border-radius:20px; padding:1.25rem 1.5rem; box-shadow:0 6px 16px rgba(63,58,82,.06); }
        .tm-google-left { display:flex; align-items:center; gap:.75rem; }
        .tm-google-logo { width:36px; height:36px; flex-shrink:0; }
        .tm-google-rating { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:1.3rem; color:#3F3A52; }
        .tm-google-sub { font-size:.78rem; font-weight:600; color:#6B6480; }
        .tm-google-link { display:inline-flex; align-items:center; gap:.4rem; padding:.6rem 1.1rem; background-color:#4285F4; color:#ffffff; border-radius:9999px; font-size:.82rem; font-weight:700; text-decoration:none; transition:transform .15s ease; }
        .tm-google-link:hover { transform:translateY(-2px); }

        .cs-wrap { max-width:100%; overflow:hidden; padding:0 1.25rem 1.5rem; }
        .cs-track { display:flex; gap:16px; overflow-x:auto; scroll-snap-type:x mandatory; scrollbar-width:none; -ms-overflow-style:none; cursor:grab; }
        .cs-track::-webkit-scrollbar { display:none; }
        .cs-card { scroll-snap-align:start; flex:0 0 calc(min(320px,84vw)); background:#ffffff; border-radius:24px; padding:1.4rem; box-shadow:0 8px 20px rgba(63,58,82,.07); display:flex; flex-direction:column; gap:.85rem; }
        .cs-dots { display:flex; justify-content:center; gap:7px; margin-top:.85rem; }
        .cs-dot { width:8px; height:8px; border-radius:9999px; background:#E5DFCE; border:none; cursor:pointer; padding:0; transition:background .2s,width .2s; }
        .cs-dot.active { background:#FF4D8D; width:22px; }

        .tm-grid { max-width:72rem; margin:0 auto; padding:0 1.25rem; display:grid; grid-template-columns:1fr; gap:1rem; }
        @media(min-width:640px){ .tm-grid { grid-template-columns:1fr 1fr; } }
        @media(min-width:1024px){ .tm-grid { grid-template-columns:repeat(3,1fr); } }
        .tm-card { background-color:#ffffff; border-radius:24px; padding:1.5rem; box-shadow:0 8px 20px rgba(63,58,82,.06); display:flex; flex-direction:column; gap:.9rem; animation:tmFadeUp .4s ease both; }
        .tm-card-top { display:flex; align-items:center; gap:.75rem; }
        .tm-avatar { width:44px; height:44px; border-radius:9999px; display:flex; align-items:center; justify-content:center; font-family:'Baloo 2',sans-serif; font-weight:800; font-size:.85rem; color:#ffffff; flex-shrink:0; }
        .tm-name { font-family:'Baloo 2',sans-serif; font-weight:700; font-size:.95rem; color:#3F3A52; margin-bottom:.2rem; }
        .tm-date { font-size:.75rem; font-weight:600; color:#9B93B0; }
        .tm-program-pill { display:inline-block; padding:.2rem .65rem; border-radius:9999px; font-size:.72rem; font-weight:700; }
        .tm-quote-icon { color:#FFD166; flex-shrink:0; }
        .tm-text { font-size:.87rem; font-weight:600; color:#5B5570; line-height:1.7; flex:1; }
        .tm-card-footer { display:flex; align-items:center; justify-content:space-between; padding-top:.5rem; border-top:1px solid #F0EBE0; }
        .tm-verified { display:flex; align-items:center; gap:.35rem; font-size:.72rem; font-weight:700; color:#34B36B; }

        .tm-show-more { max-width:72rem; margin:1.5rem auto 0; padding:0 1.25rem; text-align:center; }
        .tm-show-btn { display:inline-flex; align-items:center; gap:.5rem; padding:.8rem 2rem; background-color:#ffffff; border:2px solid #FFD166; border-radius:9999px; font-weight:700; font-size:.9rem; color:#3F3A52; cursor:pointer; font-family:'Quicksand',sans-serif; transition:transform .15s ease,background-color .15s ease; }
        .tm-show-btn:hover { transform:translateY(-2px); background-color:#FFF7EC; }

        .rf-wrap { max-width:40rem; margin:2.5rem auto 0; padding:0 1.25rem; }
        .rf-box { background:#ffffff; border-radius:28px; padding:2rem 1.75rem; box-shadow:0 8px 24px rgba(63,58,82,.09); }
        .rf-title { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:1.35rem; color:#3F3A52; margin-bottom:.35rem; }
        .rf-sub { font-size:.88rem; font-weight:600; color:#6B6480; margin-bottom:1.5rem; line-height:1.6; }
        .rf-label { display:block; font-size:.82rem; font-weight:700; color:#3F3A52; margin-bottom:.4rem; }
        .rf-input { width:100%; padding:.7rem 1rem; border:2px solid #EDE8F5; border-radius:14px; font-family:'Quicksand',sans-serif; font-size:.9rem; font-weight:600; color:#3F3A52; background:#FAFAF8; outline:none; transition:border-color .15s; box-sizing:border-box; }
        .rf-input:focus { border-color:#FF4D8D; }
        .rf-textarea { resize:vertical; min-height:96px; }
        .rf-field { margin-bottom:1.1rem; }
        .rf-star-row { margin-bottom:1.25rem; }
        .rf-star-hint { font-size:.76rem; font-weight:600; color:#9B93B0; margin-top:.35rem; }
        .rf-submit { display:inline-flex; align-items:center; gap:.5rem; width:100%; justify-content:center; padding:.9rem 1.5rem; background:#FF4D8D; color:#ffffff; border:none; border-radius:9999px; font-family:'Quicksand',sans-serif; font-weight:700; font-size:.95rem; cursor:pointer; transition:transform .15s,opacity .15s; }
        .rf-submit:hover { transform:translateY(-2px); }
        .rf-submit:disabled { opacity:.5; cursor:not-allowed; transform:none; }
        .rf-success { text-align:center; padding:1.5rem 1rem; }
        .rf-success-icon { font-size:2.5rem; margin-bottom:.75rem; }
        .rf-success-title { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:1.2rem; color:#34B36B; margin-bottom:.4rem; }
        .rf-success-text { font-size:.88rem; font-weight:600; color:#6B6480; line-height:1.65; }
        .rf-low-msg { background:#FFF3D9; border:2px solid #FFD166; border-radius:20px; padding:1.25rem 1.5rem; margin-top:1rem; }
        .rf-low-msg-title { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:1rem; color:#6B4500; margin-bottom:.3rem; }
        .rf-low-msg-text { font-size:.84rem; font-weight:600; color:#6B4500; line-height:1.6; }

        .tm-cta { max-width:56rem; margin:2.5rem auto 0; padding:0 1.25rem; }
        .tm-cta-box { background:linear-gradient(135deg,#FFE6EF 0%,#FFF3D9 50%,#E5EFFF 100%); border-radius:28px; padding:2.5rem 1.75rem; text-align:center; }
        .tm-cta-title { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:1.5rem; margin-bottom:.6rem; color:#3F3A52; }
        .tm-cta-text { font-weight:600; color:#6B6480; margin-bottom:1.5rem; font-size:.95rem; }
        .tm-cta-buttons { display:flex; flex-wrap:wrap; justify-content:center; gap:.75rem; }
        .tm-cta-btn { display:inline-flex; align-items:center; gap:.5rem; padding:.8rem 1.5rem; border:none; border-radius:9999px; color:#ffffff; font-weight:700; font-size:.88rem; font-family:'Quicksand',sans-serif; cursor:pointer; text-decoration:none; transition:transform .15s ease; box-shadow:0 4px 10px rgba(0,0,0,.1); }
        .tm-cta-btn:hover { transform:translateY(-2px); }
        .btn-call { background-color:#FF4D8D; }
        .btn-wa   { background-color:#34B36B; }
        .btn-google { background-color:#4285F4; }
      `}</style>

      <div className="tm-page" id="reviews">

        {/* Hero */}
        <header className="tm-hero">
          <div className="tm-hero-badge">
            <Star size={12} /> Reviews &amp; Testimonials
          </div>
          <h1 className="tm-hero-title">
            What <span>Parents Say</span> About Us
          </h1>
          <p className="tm-hero-sub">
            Real stories from real families who have experienced the Phulwari difference. Trusted by hundreds of parents in Patna.
          </p>
        </header>

        {/* Stats */}
        <div className="tm-stats">
          {stats.map((s, i) => (
            <div className="tm-stat" key={i}>
              <div className="tm-stat-emoji">{s.icon}</div>
              <div className="tm-stat-value">{s.value}</div>
              <div className="tm-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Google badge */}
        <div className="tm-google-badge">
          <div className="tm-google-inner">
            <div className="tm-google-left">
              <svg className="tm-google-logo" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="tm-google-rating">4.9</span>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} style={{ width: 16, height: 16, fill: '#FFD166', stroke: '#FFD166' }} />
                    ))}
                  </div>
                </div>
                <div className="tm-google-sub">
                  Verified Google Reviews · Phulwari Mother &amp; Child Activity Centre
                </div>
              </div>
            </div>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="tm-google-link"
            >
              <ExternalLink size={14} /> See on Google
            </a>
          </div>
        </div>

        {/* Auto-scroll Carousel */}
        {reviews.length > 0 ? (
          <div className="cs-wrap">
            <div className="cs-track" ref={carouselRef}>
              {reviews.map((r, i) => (
                <div className="cs-card tm-card" key={i}>
                  <div className="tm-card-top">
                    <div className="tm-avatar" style={{ backgroundColor: r.color }}>
                      {r.avatar}
                    </div>
                    <div>
                      <div className="tm-name">{r.name}</div>
                      <div className="tm-date">{r.date}</div>
                    </div>
                    <Quote size={18} className="tm-quote-icon" style={{ marginLeft: 'auto' }} />
                  </div>
                  <StarRating rating={r.rating} />
                  <p className="tm-text">{r.text}</p>
                  <div className="tm-card-footer">
                    <span
                      className="tm-program-pill"
                      style={{ backgroundColor: r.bg, color: r.color }}
                    >
                      {r.program}
                    </span>
                    {r.is_verified && (
                      <span className="tm-verified">
                        <ThumbsUp size={13} />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="cs-dots">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  className={`cs-dot ${i === carouselIdx ? 'active' : ''}`}
                  onClick={() => setCarouselIdx(i)}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 font-bold flex flex-col items-center justify-center gap-2">
            <span className="text-2xl">💬</span>
            <p>No parent reviews found in the database yet.</p>
          </div>
        )}

        
       

        {/* Write a Review Form */}
        <div className="rf-wrap">
          <div className="rf-box">
            {submitted ? (
              <div className="rf-success">
                <div className="rf-success-icon">🎉</div>
                <div className="rf-success-title">Thank You for Your Review!</div>
                <p className="rf-success-text">
                  Your review has been copied to clipboard. Google Reviews has opened — just paste
                  it and submit. We really appreciate your kind words!
                </p>
              </div>
            ) : lowRatingShown ? (
              <div>
                <div className="rf-low-msg">
                  <div className="rf-low-msg-title">We've received your feedback 💬</div>
                  <p className="rf-low-msg-text">
                    Your message has been sent to our WhatsApp. Our team will get back to you
                    shortly to understand your concern and make things right. Thank you for helping
                    us improve!
                  </p>
                </div>
                <button
                  className="rf-submit"
                  style={{ marginTop: '1rem' }}
                  onClick={() => {
                    setForm({ name: '', program: '', rating: 0, message: '' });
                    setLowRatingShown(false);
                  }}
                >
                  <X size={16} /> Close
                </button>
              </div>
            ) : (
              <>
                <div className="rf-title">Share Your Experience ✍️</div>
                <p className="rf-sub">Your feedback helps other parents and helps us grow!</p>

                <div className="rf-field">
                  <label className="rf-label">Your Name *</label>
                  <input
                    className="rf-input"
                    placeholder="e.g. John Doe"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>

                <div className="rf-field">
                  <label className="rf-label">Program / Activity (optional)</label>
                  <select
                    className="rf-input"
                    value={form.program}
                    onChange={(e) => setForm((f) => ({ ...f, program: e.target.value }))}
                  >
                    <option value="">Select a program...</option>
                    <option>Phulwari Core</option>
                    <option>Phulwari Premium Circle</option>
                    <option>Mother &amp; Toddler Program</option>
                    <option>Mother Fitness Program</option>
                    <option>Summer Camp</option>
                    <option>Winter Camp</option>
                    <option>Birthday Party</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="rf-field rf-star-row">
                  <label className="rf-label">Your Rating *</label>
                  <InteractiveStars
                    value={form.rating}
                    onChange={(v) => setForm((f) => ({ ...f, rating: v }))}
                  />
                  <div className="rf-star-hint">
                    {form.rating === 0 && 'Click to rate'}
                    {form.rating === 1 && 'Poor'}
                    {form.rating === 2 && 'Fair'}
                    {form.rating === 3 && 'Good'}
                    {form.rating === 4 && 'Great'}
                    {form.rating === 5 && 'Excellent!'}
                  </div>
                </div>

                <div className="rf-field">
                  <label className="rf-label">Your Review *</label>
                  <textarea
                    className="rf-input rf-textarea"
                    placeholder="Tell other parents about your experience at Phulwari..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  />
                </div>

                <button
                  className="rf-submit"
                  onClick={handleSubmit}
                  disabled={!form.name.trim() || !form.message.trim() || form.rating === 0}
                >
                  <Send size={16} />
                  {form.rating >= 4
                    ? 'Submit & Post on Google'
                    : form.rating > 0
                    ? 'Send Feedback on WhatsApp'
                    : 'Submit Review'}
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </>
  );
}