'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';
import {
  Sun,
  Snowflake,
  Cake,
  Sparkles,
  PartyPopper,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Users,
  ShieldCheck,
  Award,
  Phone,
  MessageCircle,
  ArrowRight,
  Heart,
  Star,
  Flame,
  HelpCircle,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface EventItem {
  id: string;
  badge: string;
  badgeColor: string;
  badgeBg: string;
  title: string;
  titleAccent: string;
  accentColor: string;
  description: string;
  timing: string;
  ageGroup: string;
  season: string;
  highlights: string[];
  image: string;
  href: string;
  popular?: boolean;
}

const defaultEvents: EventItem[] = [
  {
    id: 'summer-camp-2026',
    badge: 'Summer Camp 2026',
    badgeColor: '#E8A621',
    badgeBg: '#FFF3D9',
    title: 'Super Fun & Skill-Building',
    titleAccent: 'Summer Bootcamp 2026',
    accentColor: '#E8A621',
    description:
      'Keep your kids active, sharp and inspired through our high-energy summer camp featuring multi-sports, gymnastics, skating, dance, creative arts, robotics workshops, and personality development.',
    timing: '8:00 AM – 12:00 PM (Morning Batches)',
    ageGroup: '3 to 14 Years',
    season: 'April – June 2026',
    highlights: [
      'Multi-Sports & Gymnastics Arena',
      'Art, Craft, Pottery & Origami',
      'Dance, Music & Stage Confidence',
      'Personality Development & Public Speaking',
      'Camp Certificate, Medals & Grand Finale',
    ],
    image: '/summer.webp',
    href: '/events/summer-camp-kids-patna',
    popular: true,
  },
  {
    id: 'winter-camp-2026',
    badge: 'Winter Camp 2026',
    badgeColor: '#3D8BFF',
    badgeBg: '#E5EFFF',
    title: 'Warm, Creative & Cozy',
    titleAccent: 'Winter Carnival & Camp 2026',
    accentColor: '#3D8BFF',
    description:
      'Transform chilly winter vacations into an extraordinary learning carnival! Featuring theatre workshops, festive art & craft, indoor yoga, chess mastery, and cozy winter story circles.',
    timing: '11:00 AM – 2:00 PM (Comfortable Winter Slots)',
    ageGroup: '2.5 to 12 Years',
    season: 'December 2026 – January 2027',
    highlights: [
      'Storytelling, Puppet Shows & Drama',
      'Holiday Crafting & DIY Lanterns',
      'Indoor Physical Fitness & Yoga',
      'Winter Talent Show & Parent Celebration Day',
      'All-inclusive materials and heated play areas',
    ],
    image: '/wintercamp.webp',
    href: '/events/winter',
    popular: false,
  },
  {
    id: 'birthday-parties',
    badge: 'Birthday Celebrations',
    badgeColor: '#FF4D8D',
    badgeBg: '#FFE6EF',
    title: 'Unforgettable VIP Kids',
    titleAccent: 'Birthday Party Celebrations',
    accentColor: '#FF4D8D',
    description:
      'Host a magical, hassle-free birthday for your child! Private access to our mega playzone, themed balloon decor, energetic party hosts, game coordinators, music, magic show, and delicious food arrangements.',
    timing: 'Flexible Weekend & Evening Slots',
    ageGroup: '1 to 12 Years',
    season: 'Available 365 Days',
    highlights: [
      'Private 2-3 Hour Playzone & Party Hall Access',
      'Customised Balloon & Mascot Theme Decor',
      'Dedicated Game Host & MC for Non-stop Fun',
      'Music, Mascot Entry, Cake Cutting & Return Gifts',
      'Complete safety monitoring & cleanliness',
    ],
    image: '/b1.webp',
    href: '/kids-and-child-birthday-party',
    popular: true,
  },
];

export default function EventsHubPage() {
  const [eventsList, setEventsList] = useState<EventItem[]>(defaultEvents);

  useEffect(() => {
    async function loadCmsEvents() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('activity_pages')
          .select('*')
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          // Clone default events as base so the 3 core items are always preserved
          const updatedEvents = [...defaultEvents];

          data.forEach((item: any) => {
            if (!item || !item.slug) return;
            const slugLower = (item.slug || '').toLowerCase();
            const badgeLower = (item.badge_text || '').toLowerCase();
            const h1Lower = (item.h1 || '').toLowerCase();

            const isCamp = slugLower.includes('camp') ||
                           slugLower.includes('event') ||
                           slugLower.includes('birthday') ||
                           slugLower.includes('party') ||
                           slugLower.includes('winter') ||
                           slugLower.includes('summer') ||
                           badgeLower.includes('camp') ||
                           badgeLower.includes('birthday') ||
                           h1Lower.includes('camp') ||
                           h1Lower.includes('birthday');

            if (!isCamp) return;

            // Safe parsing for benefits / highlights
            let safeHighlights: string[] = [];
            if (Array.isArray(item.benefits) && item.benefits.length > 0) {
              safeHighlights = item.benefits.map((b: any) => typeof b === 'string' ? b : (b?.title || String(b))).slice(0, 5);
            } else if (typeof item.benefits === 'string') {
              safeHighlights = item.benefits.split(',').map((s: string) => s.trim()).filter(Boolean).slice(0, 5);
            }

            if (safeHighlights.length === 0) {
              safeHighlights = ['Interactive Group Activities', 'Certified Trainers & Mentors', 'Safe & Hygienic Facilities', 'Certificates & Goodies'];
            }

            // Determine correct route
            let href = `/events/${item.slug}`;
            if (slugLower.includes('summer')) href = '/events/summer-camp-kids-patna';
            else if (slugLower.includes('winter')) href = '/events/winter';
            else if (slugLower.includes('birthday') || slugLower.includes('party')) href = '/kids-and-child-birthday-party';

            // Check if this item updates one of the core 3 defaults
            let targetDefaultIndex = -1;
            if (slugLower.includes('summer')) {
              targetDefaultIndex = updatedEvents.findIndex(e => e.id === 'summer-camp-2026');
            } else if (slugLower.includes('winter')) {
              targetDefaultIndex = updatedEvents.findIndex(e => e.id === 'winter-camp-2026');
            } else if (slugLower.includes('birthday') || slugLower.includes('party')) {
              targetDefaultIndex = updatedEvents.findIndex(e => e.id === 'birthday-parties');
            }

            const timingVal = (Array.isArray(item.overview_points) && item.overview_points[0]) || item.timing || 'Flexible Batch Timings';
            const ageVal = (Array.isArray(item.overview_points) && item.overview_points[1]) || item.age_group || '2 to 14 Years';

            const eventObj: EventItem = {
              id: item.slug || item.id,
              badge: item.badge_text || (slugLower.includes('winter') ? 'Winter Camp 2026' : (slugLower.includes('summer') ? 'Summer Camp 2026' : 'Special Event')),
              badgeColor: item.color || '#FF4D8D',
              badgeBg: item.bg || '#FFE6EF',
              title: item.h1 || 'Exciting Camp & Event',
              titleAccent: item.h1_highlight || 'at Phulwari',
              accentColor: item.color || '#3D8BFF',
              description: item.meta_desc || item.hero_desc || 'Join our engaging camp and event activities designed for maximum joy, creativity and holistic development.',
              timing: timingVal,
              ageGroup: ageVal,
              season: slugLower.includes('winter') ? 'Winter 2026' : (slugLower.includes('summer') ? 'Summer 2026' : 'Year-Round'),
              highlights: safeHighlights,
              image: item.hero_image || (slugLower.includes('winter') ? '/wintercamp.webp' : (slugLower.includes('summer') ? '/summer.webp' : '/b1.webp')),
              href,
              popular: slugLower.includes('summer') || slugLower.includes('birthday'),
            };

            if (targetDefaultIndex >= 0) {
              // Update existing default with DB values while retaining structure
              updatedEvents[targetDefaultIndex] = {
                ...updatedEvents[targetDefaultIndex],
                ...eventObj,
                id: updatedEvents[targetDefaultIndex].id,
                href: updatedEvents[targetDefaultIndex].href,
              };
            } else {
              // Append new custom camp/event
              const exists = updatedEvents.some(e => e.id === eventObj.id || e.href === eventObj.href);
              if (!exists) {
                updatedEvents.push(eventObj);
              }
            }
          });

          setEventsList(updatedEvents);
        }
      } catch (e) {
        console.warn('Events hub dynamic CMS fetch error handled gracefully:', e);
      }
    }

    loadCmsEvents();
  }, []);

  return (
    <>
      <JsonLd
        id="events-schema"
        nodes={[
          webPageSchema({
            path: '/events',
            name: 'Camps & Events in Patna 2026 | Summer Camp, Winter Camp & Birthday Parties',
            description:
              'Explore exciting camps, creative workshops, festive carnivals, and private birthday celebrations for kids and toddlers in Kidwaipuri, Patna at Phulwari.',
            primaryImage: '/summer.webp',
            breadcrumb: [
              { name: 'Home', path: '/' },
              { name: 'Camps & Events', path: '/events' },
            ],
          }),
          breadcrumbSchema('/events', [
            { name: 'Home', path: '/' },
            { name: 'Camps & Events', path: '/events' },
          ]),
        ]}
      />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-orange-500 selection:text-white pb-20">
        
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-orange-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-400/20 via-orange-400/20 to-pink-500/20 blur-[100px] rounded-full pointer-events-none -z-10" />
          
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 text-xs md:text-sm font-black uppercase tracking-wider shadow-xs">
              <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>Camps, Carnivals & Private Celebrations</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Exciting Camps & Festive Events for Kids in <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-pink-600 bg-clip-text text-transparent">Patna</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
              From high-energy <strong>Summer Bootcamps</strong> and cozy <strong>Winter Carnivals</strong> to magical <strong>Kids Birthday Celebrations</strong> — explore premium, safe, and joyful programs designed for lifelong memories.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <a
                href="https://wa.me/916207368839?text=Hello%20Phulwari!%20I%20want%20to%20inquire%20about%20upcoming%20Camps%20and%20Birthday%20Events."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Camp Inquiries</span>
              </a>

              <a
                href="tel:+916207368839"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white font-bold text-sm shadow-lg shadow-slate-900/10 flex items-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>Call: +91 62073 68839</span>
              </a>
            </div>
          </div>
        </section>

        {/* EVENTS LIST SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-12">
            {eventsList.map((event, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={event.id}
                  className={`group relative rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${
                    isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  }`}
                >
                  {/* Left/Right Visual Banner */}
                  <div className="lg:w-1/2 relative min-h-[300px] sm:min-h-[360px] lg:min-h-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/logo.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                    
                    {event.popular && (
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-lg uppercase tracking-wider">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        <span>Most Popular</span>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 lg:hidden text-white">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md">
                        {event.season}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="lg:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-xs"
                          style={{
                            color: event.badgeColor,
                            backgroundColor: event.badgeBg,
                            borderColor: `${event.badgeColor}33`,
                          }}
                        >
                          {event.badge}
                        </span>
                        <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                          <Calendar className="w-3.5 h-3.5 text-orange-500" />
                          <span>{event.season}</span>
                        </div>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                        {event.title}{' '}
                        <span style={{ color: event.accentColor }}>{event.titleAccent}</span>
                      </h2>

                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                          <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                          <span>{event.timing}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                          <Users className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Age: {event.ageGroup}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Program Highlights
                        </h4>
                        <ul className="grid grid-cols-1 gap-1.5">
                          {event.highlights.map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap items-center gap-3">
                      <Link
                        href={event.href}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-black shadow-md shadow-orange-600/20 flex items-center gap-2 transition transform hover:scale-[1.02]"
                      >
                        <span>View Details & Schedule</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={`https://wa.me/916207368839?text=Hello%20Phulwari!%20I%20want%20to%20register%20for%20${encodeURIComponent(event.badge)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-2"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Quick Book Slot</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* WHY CHOOSE PHULWARI FOR EVENTS & CAMPS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl space-y-4 mb-10">
              <span className="text-xs font-black uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                The Phulwari Advantage
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black">
                Why Parents & Schools Trust Phulwari for Camps & Events
              </h3>
              <p className="text-slate-300 text-sm sm:text-base">
                We combine structured pedagogical learning with joyful interactive play in a state-of-the-art air-conditioned facility in the heart of Patna.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: '100% Safe & Clean Arena',
                  desc: 'Soft-padded playzones, CCTV surveillance, and regular sanitation.',
                  color: '#34B36B',
                },
                {
                  icon: Award,
                  title: 'Certified Instructors',
                  desc: 'Trained gymnastics coaches, art mentors, and cheerful party anchors.',
                  color: '#E8A621',
                },
                {
                  icon: Sparkles,
                  title: 'Customized Experiences',
                  desc: 'Personalized birthday themes, flexible camp batches, and tailored schedules.',
                  color: '#FF4D8D',
                },
                {
                  icon: Heart,
                  title: 'Parent Involvement',
                  desc: 'Open interaction, progress showcases, and special mother wellness slots.',
                  color: '#3D8BFF',
                },
              ].map((adv, idx) => {
                const Icon = adv.icon;
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 backdrop-blur-xs">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10" style={{ color: adv.color }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white">{adv.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{adv.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  Opposite Children’s Park, Kidwaipuri, Patna, Bihar 800001
                </span>
              </div>

              <Link
                href="/contact"
                className="px-6 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs transition shadow-md shrink-0"
              >
                Visit Centre / Plan Event
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
