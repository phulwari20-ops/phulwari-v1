'use client';

import { useState, useEffect } from 'react';
import {
  Cake,
  ShieldCheck,
  Gamepad2,
  Palette,
  Music4,
  Camera,
  Sparkles,
  PartyPopper,
  CheckCircle2,
  Trophy,
  Gift,
  Users2,
  X,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const highlights = [
  {
    icon: Sparkles,
    title: 'Theme-Based Decoration',
    text: "Choose from a variety of colorful and creative themes to match your child's interests.",
    color: '#FF4D8D',
    bg: '#FFE6EF',
  },
  {
    icon: Gamepad2,
    title: 'Fun Games & Activities',
    text: 'Engaging games and interactive activities keep children entertained throughout.',
    color: '#3D8BFF',
    bg: '#E5EFFF',
  },
  {
    icon: PartyPopper,
    title: 'Entertainment Zone',
    text: 'A lively atmosphere filled with music, fun, laughter and exciting surprises.',
    color: '#E8A621',
    bg: '#FFF3D9',
  },
  {
    icon: Camera,
    title: 'Picture Perfect Moments',
    text: 'Beautiful decoration setups create wonderful opportunities for memorable photos.',
    color: '#34B36B',
    bg: '#E3F7EA',
  },
  {
    icon: Cake,
    title: 'Customized Celebrations',
    text: 'Personalized according to your theme, preferences, budget and requirements.',
    color: '#8B5CF6',
    bg: '#EFE7FE',
  },
];

const whyChooseUs = [
  'Child-Friendly Environment',
  'Safe & Spacious Celebration Area',
  'Fun Activities & Interactive Games',
  'Creative Theme-Based Decorations',
  'Entertainment for Children',
  'Personalized Party Planning',
  'Friendly & Supportive Team',
  'Stress-Free Celebration Experience',
];

const kidsActivities = [
  { icon: Palette, text: 'Art & Craft Activities' },
  { icon: Music4, text: 'Dance Fun Sessions' },
  { icon: PartyPopper, text: 'Music & Entertainment' },
  { icon: Gamepad2, text: 'Interactive Games' },
  { icon: Sparkles, text: 'Play Zone Access' },
  { icon: Trophy, text: 'Fun Competitions' },
  { icon: Gift, text: 'Surprise Activities' },
  { icon: Users2, text: 'Creative Group Activities' },
];

const parentFavorites = [
  'Hassle-Free Planning',
  'Safe Environment',
  'Professional Team Support',
  'Fun-Filled Activities',
  'Flexible Party Options',
  'Child-Centered Celebration Approach',
  'Beautiful Decorations',
  'Memorable Experiences for Families',
];

interface Package {
  name: string;
  tagline: string;
  accentColor: string;
  accentBg: string;
  featured?: boolean;
  includes: string[];
  price?: string;
}

export default function BirthdayPartyPage() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  // Start empty — packages are driven entirely by what the admin publishes.
  // No hardcoded packages are ever shown to users.
  const [packagesList, setPackagesList] = useState<Package[]>([]);
  const [packagesLoaded, setPackagesLoaded] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();

        // Single source of truth: the party_packages table managed by the admin.
        // Only packages explicitly marked visible are shown.
        const { data: rawPkgs } = await supabase
          .from('party_packages')
          .select('*')
          .eq('is_visible', true)
          .order('name', { ascending: true });

        if (rawPkgs && rawPkgs.length > 0) {
          // Map DB data to match frontend Package interface
          const dynamicPackages = rawPkgs.map((d: any) => {
            const isPremium = d.name?.toLowerCase().includes('premium');
            const isBasic = d.name?.toLowerCase().includes('basic');
            const accentColor = isPremium ? '#FF4D8D' : isBasic ? '#34B36B' : '#8B5CF6';
            const accentBg = isPremium ? '#FFE6EF' : isBasic ? '#E3F7EA' : '#EFE7FE';
            return {
              name: d.name || 'Party Package',
              tagline: d.tagline || '',
              price: d.price || '',
              includes: d.includes ? d.includes.split(',').map((f: string) => f.trim()).filter(Boolean) : [],
              accentColor: accentColor,
              accentBg: accentBg,
              featured: isPremium
            };
          });
          setPackagesList(dynamicPackages);
        } else {
          setPackagesList([]);
        }
      } catch (err) {
        console.error('❌ [FRONTEND SUPABASE API RESPONSE ERROR]: Failed to fetch party packages', err);
        setPackagesList([]);
      } finally {
        setPackagesLoaded(true);
      }
    };
    fetchPackages();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap');

        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(1.5deg); }
        }
        @keyframes blobMorph {
          0%, 100% { border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%; }
          50% { border-radius: 42% 58% 62% 38% / 40% 62% 38% 60%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bp-blob, .bp-blob-shape { animation: none !important; }
        }

        .bp-page { background-color: #FFF7EC; font-family: 'Quicksand', sans-serif; color: #3F3A52; }

        /* ---------- Hero ---------- */
        .bp-hero { max-width: 72rem; margin: 0 auto; padding: 3.5rem 1.25rem 1rem; }
        .bp-hero-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
          background-color: #ffffff;
          border-radius: 32px;
          padding: 2rem;
          box-shadow: 0 12px 30px rgba(63,58,82,0.06);
        }
        .bp-blob { position: relative; width: 100%; max-width: 20rem; margin: 0 auto; aspect-ratio: 1/1; animation: blobFloat 7s ease-in-out infinite; }
        .bp-blob-shape { position: absolute; inset: 0; overflow: hidden; animation: blobMorph 9s ease-in-out infinite; box-shadow: 0 18px 36px rgba(0,0,0,0.12); }
        .bp-blob-shape img { width: 100%; height: 100%; object-fit: cover; }
        .bp-blob-ring { position: absolute; inset: -14px; border: 3px dashed #FFD166; border-radius: 58% 42% 38% 62% / 60% 36% 64% 40%; opacity: 0.5; }
        .bp-blob-dot { position: absolute; width: 16px; height: 16px; border-radius: 9999px; }
        .bp-blob-dot-1 { top: -6px; right: 14%; background-color: #FF8A3D; }
        .bp-blob-dot-2 { bottom: 6%; left: -10px; background-color: #FFD166; }

        .bp-badge {
          display: inline-flex; align-self: flex-start; padding: 0.5rem 1.2rem; margin-bottom: 1rem;
          background-color: #FFEADB; color: #FF8A3D; border-radius: 9999px; font-size: 0.7rem;
          font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
        }
        .bp-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 2.1rem; line-height: 1.16; margin-bottom: 1rem; }
        .bp-title span { color: #FF8A3D; }
        .bp-description { font-weight: 600; font-size: 1rem; line-height: 1.75; color: #6B6480; margin-bottom: 1.5rem; max-width: 36rem; }

        .bp-cta-buttons { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .bp-cta-button {
          display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.85rem 1.6rem; border: none;
          color: #ffffff; font-weight: 700; font-size: 0.92rem; font-family: 'Quicksand', sans-serif;
          border-radius: 9999px; cursor: pointer; transition: transform 0.15s ease; box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }
        .bp-cta-button:hover { transform: translateY(-2px); }
        .bp-cta-button svg { width: 18px; height: 18px; stroke: #ffffff; stroke-width: 2.25; }
        .btn-call { background-color: #FF4D8D; }
        .btn-whatsapp { background-color: #34B36B; }

        @media (min-width: 1024px) {
          .bp-hero-inner { grid-template-columns: 0.85fr 1.15fr; gap: 3rem; padding: 3rem; }
          .bp-blob { max-width: 23rem; }
          .bp-title { font-size: 2.5rem; }
        }

        /* ---------- Section shell ---------- */
        .bp-section { max-width: 72rem; margin: 0 auto; padding: 3rem 1.25rem; }
        .bp-section-head { text-align: center; max-width: 40rem; margin: 0 auto 2.25rem; }
        .bp-section-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.9rem; margin-bottom: 0.6rem; }
        .bp-section-title span { color: #FF4D8D; }
        .bp-section-text { font-weight: 600; color: #6B6480; line-height: 1.6; }

        /* ---------- Why choose grid ---------- */
        .bp-choose-grid { display: grid; grid-template-columns: 1fr; gap: 0.75rem; }
        .bp-choose-item {
          display: flex; align-items: center; gap: 0.6rem; background-color: #ffffff;
          border-radius: 16px; padding: 0.9rem 1.1rem; box-shadow: 0 6px 16px rgba(63,58,82,0.05);
          font-weight: 700; font-size: 0.88rem;
        }
        .bp-choose-item svg { width: 18px; height: 18px; flex-shrink: 0; color: #FF4D8D; stroke-width: 2.5; }
        @media (min-width: 640px) { .bp-choose-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .bp-choose-grid { grid-template-columns: 1fr 1fr; } }

        /* ---------- Highlights ---------- */
        .bp-highlights { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        .bp-highlight-card { background-color: #ffffff; border-radius: 24px; padding: 1.75rem; box-shadow: 0 10px 24px rgba(63,58,82,0.06); }
        .bp-highlight-icon { width: 48px; height: 48px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        .bp-highlight-icon svg { width: 24px; height: 24px; stroke-width: 2.25; }
        .bp-highlight-title { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.5rem; }
        .bp-highlight-text { font-size: 0.88rem; font-weight: 600; color: #6B6480; line-height: 1.6; }
        @media (min-width: 640px) { .bp-highlights { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .bp-highlights { grid-template-columns: repeat(3, 1fr); } }

        /* ---------- Activities pills ---------- */
        .bp-activities { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; }
        .bp-activity-pill {
          display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.6rem 1.1rem 0.6rem 0.6rem;
          background-color: #ffffff; border: 1px solid #F0ECE2; border-radius: 9999px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }
        .bp-activity-icon { width: 30px; height: 30px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; background-color: #FFE6EF; flex-shrink: 0; }
        .bp-activity-icon svg { width: 15px; height: 15px; color: #FF4D8D; stroke-width: 2.25; }
        .bp-activity-pill span { font-size: 0.85rem; font-weight: 700; }

        /* ---------- Packages ---------- */
        .bp-packages { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        .bp-package-card {
          background-color: #ffffff; border-radius: 28px; padding: 2rem;
          box-shadow: 0 10px 26px rgba(63,58,82,0.06); position: relative; border: 2px solid transparent;
        }
        .bp-package-card.featured { border-color: #FF4D8D; }
        .bp-package-featured-tag {
          position: absolute; top: -0.75rem; left: 50%; transform: translateX(-50%);
          background-color: #FF4D8D; color: #ffffff; font-size: 0.68rem; font-weight: 700;
          padding: 0.3rem 0.9rem; border-radius: 9999px; letter-spacing: 0.04em; text-transform: uppercase;
        }
        .bp-package-icon { width: 52px; height: 52px; border-radius: 18px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.1rem; }
        .bp-package-icon svg { width: 26px; height: 26px; stroke-width: 2.25; }
        .bp-package-name { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: 1.25rem; margin-bottom: 0.4rem; }
        .bp-package-tagline { font-size: 0.85rem; font-weight: 600; color: #6B6480; margin-bottom: 1.3rem; line-height: 1.5; }
        .bp-package-includes { display: flex; flex-direction: column; gap: 0.55rem; }
        .bp-package-includes-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.86rem; font-weight: 700; color: #3F3A52; }
        .bp-package-includes-item svg { width: 17px; height: 17px; flex-shrink: 0; stroke-width: 2.5; }
        @media (min-width: 1024px) { .bp-packages { grid-template-columns: repeat(3, 1fr); } }

        /* ---------- Gallery ---------- */
        .bp-gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        .bp-gallery-item {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 1 / 1;
          box-shadow: 0 6px 16px rgba(63,58,82,0.08);
        }
        .bp-gallery-item.tall { aspect-ratio: 1 / 1.35; }
        .bp-gallery-item img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.3s ease;
        }
        .bp-gallery-item:hover img { transform: scale(1.06); }
        .bp-gallery-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(63,58,82,0.45), transparent 55%);
          opacity: 0; transition: opacity 0.2s ease;
          display: flex; align-items: flex-end; padding: 0.75rem;
        }
        .bp-gallery-item:hover .bp-gallery-overlay { opacity: 1; }
        .bp-gallery-overlay span { color: #ffffff; font-size: 0.75rem; font-weight: 700; }

        @media (min-width: 640px) {
          .bp-gallery-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .bp-gallery-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* ---------- Lightbox ---------- */
        .bp-lightbox {
          position: fixed; inset: 0; z-index: 100;
          background-color: rgba(63,58,82,0.85);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
        }
        .bp-lightbox-img { max-width: 90vw; max-height: 85vh; border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
        .bp-lightbox-close {
          position: absolute; top: 1.25rem; right: 1.25rem;
          width: 42px; height: 42px; border-radius: 9999px; background-color: #ffffff;
          display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;
        }
        .bp-lightbox-close svg { width: 20px; height: 20px; color: #3F3A52; stroke-width: 2.5; }

        /* ---------- CTA ---------- */
        .bp-cta { max-width: 56rem; margin: 0 auto; padding: 1rem 1.25rem 4.5rem; text-align: center; }
        .bp-cta-box { background-color: #ffffff; border-radius: 32px; padding: 2.75rem 2rem; box-shadow: 0 12px 30px rgba(63,58,82,0.07); }
        .bp-cta-title { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 1.6rem; margin-bottom: 0.6rem; }
        .bp-cta-text { font-weight: 600; color: #6B6480; margin-bottom: 1.6rem; }
        .bp-cta-buttons { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
      `}</style>

      <div className="bp-page">
        {/* Hero */}
        <section className="bp-hero">
          <div className="bp-hero-inner">
            <div className="bp-blob">
              <div className="bp-blob-ring" />
              <div className="bp-blob-shape">
                <img src="/birthdaycelebration.webp" alt="Birthday Party Celebrations at Phulwari"  loading="lazy" decoding="async" />
              </div>
              <span className="bp-blob-dot bp-blob-dot-1" />
              <span className="bp-blob-dot bp-blob-dot-2" />
            </div>

            <div>
              <span className="bp-badge">Birthday Party Celebrations</span>
              <h1 className="bp-title">
                Make Every Birthday <span>Magical &amp; Memorable</span>
              </h1>
              <p className="bp-description">
                From colorful decorations and exciting games to entertainment and fun activities,
                we take care of every detail so you can focus on celebrating your child&apos;s
                special day.
              </p>
             
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="bp-section">
          <div className="bp-section-head">
            <h2 className="bp-section-title">
              Why Celebrate <span>With Us?</span>
            </h2>
            <p className="bp-section-text">
              Birthdays are moments children remember for years. We create a fun-filled
              environment where they can laugh, play and celebrate with friends and family.
            </p>
          </div>
          <div className="bp-choose-grid">
            {whyChooseUs.map((item, i) => (
              <div className="bp-choose-item" key={i}>
                <CheckCircle2 />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="bp-section">
          <div className="bp-section-head">
            <h2 className="bp-section-title">
              Birthday Party <span>Highlights</span>
            </h2>
          </div>
          <div className="bp-highlights">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div className="bp-highlight-card" key={i}>
                  <div className="bp-highlight-icon" style={{ backgroundColor: h.bg }}>
                    <Icon style={{ color: h.color }} />
                  </div>
                  <h3 className="bp-highlight-title">{h.title}</h3>
                  <p className="bp-highlight-text">{h.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Packages */}
        <section className="bp-section">
          <div className="bp-section-head">
            <h2 className="bp-section-title">
              Party <span>Packages</span>
            </h2>
            <p className="bp-section-text">Choose the celebration that fits your vision.</p>
          </div>
          {packagesLoaded && packagesList.length === 0 && (
            <p className="bp-section-text" style={{ textAlign: 'center' }}>
              Our celebration packages are being updated. Please contact us for the latest party packages and pricing.
            </p>
          )}
          <div className="bp-packages">
            {packagesList.map((pkg, i) => (
              <div className={`bp-package-card ${pkg.featured ? 'featured' : ''}`} key={i}>
                {pkg.featured && <span className="bp-package-featured-tag">Most Popular</span>}
                <div className="bp-package-icon" style={{ backgroundColor: pkg.accentBg }}>
                  <Cake style={{ color: pkg.accentColor }} />
                </div>
                <h3 className="bp-package-name">{pkg.name}</h3>
                <p className="bp-package-tagline">{pkg.tagline}</p>
                {pkg.price && (
                  <div style={{ margin: '0.6rem 0', fontWeight: 800, fontSize: '1.05rem', color: pkg.accentColor, fontFamily: "'Baloo 2', sans-serif" }}>
                    {pkg.price}
                  </div>
                )}
                <div className="bp-package-includes">
                  {pkg.includes.map((inc, j) => (
                    <div className="bp-package-includes-item" key={j}>
                      <CheckCircle2 style={{ color: pkg.accentColor }} />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={`https://wa.me/916207368839?text=${encodeURIComponent(`Hi Phulwari, I want to enquire about the ${pkg.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    marginTop: '1.25rem',
                    padding: '0.75rem 1rem',
                    backgroundColor: pkg.accentColor,
                    color: '#ffffff',
                    fontWeight: 700,
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    fontSize: '0.85rem'
                  }}
                >
                  <span>Enquire / Book Package</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Activities */}
        <section className="bp-section">
          <div className="bp-section-head">
            <h2 className="bp-section-title">
              Activities for Kids <span>During Parties</span>
            </h2>
          </div>
          <div className="bp-activities">
            {kidsActivities.map((act, i) => {
              const Icon = act.icon;
              return (
                <div className="bp-activity-pill" key={i}>
                  <span className="bp-activity-icon">
                    <Icon />
                  </span>
                  <span>{act.text}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why parents love it */}
        <section className="bp-section">
          <div className="bp-section-head">
            <h2 className="bp-section-title">
              Why Parents Love <span>Our Celebrations</span>
            </h2>
          </div>
          <div className="bp-choose-grid">
            {parentFavorites.map((item, i) => (
              <div className="bp-choose-item" key={i}>
                <ShieldCheck />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        

      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="bp-lightbox" onClick={() => setLightboxImg(null)}>
          <button className="bp-lightbox-close" onClick={() => setLightboxImg(null)}>
            <X />
          </button>
          <img className="bp-lightbox-img" src={lightboxImg} alt="Birthday celebration"  loading="lazy" decoding="async" />
        </div>
      )}
    </>
  );
}