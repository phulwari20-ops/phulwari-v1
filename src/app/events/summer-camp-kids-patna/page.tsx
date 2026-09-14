import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight,
  Sun,
  ShieldCheck,
  Award,
  Star,
  MessageCircle,
  Phone,
  PartyPopper,
  CheckCircle2,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  Zap,
} from 'lucide-react';
import { getActivityBySlug } from '@/lib/activities';
import { SummerCampClientView } from './SummerCampClientView';

export const revalidate = 60; // ISR revalidation every 60 seconds from Supabase

export default async function SummerCampKidsPatnaPage() {
  const activity = await getActivityBySlug('summer-camp-kids-patna');

  if (!activity) {
    notFound();
  }

  const color = activity.color || '#FF6B00';
  const bg = activity.bg || '#FFF3EB';
  const contentColor = activity.content_color;
  const ctaPhone = activity.cta?.phone || '+91 62073 68839';
  const ctaWhatsapp = activity.cta?.whatsapp || '+916207368839';
  const ctaAddress =
    activity.cta?.address ||
    'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001';

  const whatsappUrl = `https://wa.me/${ctaWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Phulwari! I would like to enroll my child in ${activity.h1}. Please share fee details and batch timings.`
  )}`;

  const galleryImages = activity.gallery_images && activity.gallery_images.length > 0
    ? activity.gallery_images
    : [activity.hero_image];

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-gray-900 pb-24 md:pb-12">
      {/* 1. BREADCRUMB */}
      <div className="border-b border-orange-100 bg-orange-50/50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-600 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/activities" className="hover:text-orange-600 transition">
            Activities & Camps
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-semibold text-gray-900">{activity.badge_text || 'Summer Camp'}</span>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24 bg-gradient-to-b from-orange-50/70 via-white to-[#FFFBF7]">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-yellow-200/50 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border shadow-xs"
                style={{ backgroundColor: bg, color: color, borderColor: `${color}40` }}
              >
                <Sun className="w-4 h-4" />
                <span>{activity.badge_text || "Patna's #1 Rated Children's Summer Camp 2026"}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-gray-900 tracking-tight leading-[1.15]">
                {activity.h1}
              </h1>

              <div
                className="space-y-3 text-base sm:text-lg text-gray-600 leading-relaxed font-normal"
                style={contentColor ? { color: contentColor } : undefined}
              >
                <p>{activity.intro_p1}</p>
                {activity.intro_p2 && <p>{activity.intro_p2}</p>}
              </div>

              {/* Camp Meta Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2">
                <div className="p-3.5 rounded-2xl bg-white border border-orange-100 shadow-xs">
                  <div className="text-xs text-gray-500 font-medium">Age Group</div>
                  <div className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">3 – 14 Years</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-orange-100 shadow-xs">
                  <div className="text-xs text-gray-500 font-medium">Daily Batches</div>
                  <div className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">Morning & Evening</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-orange-100 shadow-xs col-span-2 sm:col-span-1">
                  <div className="text-xs text-gray-500 font-medium">Campus Setup</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    100% AC Indoor
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-2xl text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  style={{ backgroundColor: color }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{activity.cta?.button_text || 'Enquire on WhatsApp'}</span>
                </a>

                <a
                  href={`tel:${ctaPhone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-2xl bg-white border-2 border-orange-200 text-gray-800 font-bold text-sm sm:text-base hover:bg-orange-50/50 hover:border-orange-300 shadow-xs active:scale-95 transition-all"
                >
                  <Phone className="w-5 h-5 text-orange-600" />
                  <span>Call Us</span>
                </a>
              </div>

              {/* Trust markers */}
              <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> CCTV Monitored
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-amber-500" /> Certified Coaches
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 4.9/5 Rating
                </span>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden p-2.5 bg-gradient-to-tr from-orange-400 via-pink-400 to-rose-400 shadow-2xl shadow-orange-500/20">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[1/1] bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activity.hero_image}
                    alt={activity.h1}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-xs uppercase font-bold tracking-wider text-yellow-300">
                      Live Admissions
                    </span>
                    <h3 className="text-lg sm:text-xl font-black mt-1">
                      {activity.badge_text}
                    </h3>
                    <p className="text-xs text-gray-200 mt-1">{ctaAddress}</p>
                  </div>
                </div>

                <div className="absolute -bottom-3 -left-3 bg-white py-2.5 px-4 rounded-2xl shadow-lg border border-orange-100 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <PartyPopper className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 font-medium">Limited Capacity</div>
                    <div className="text-xs font-bold text-gray-900">12 Kids Per Mentor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY IT MATTERS */}
      {activity.why_matters_content && (
        <section className="py-12 sm:py-16 bg-white border-y border-orange-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span
              className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block"
              style={{ backgroundColor: bg, color: color }}
            >
              Developmental Value
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
              {activity.why_matters_title}
            </h2>
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#FFFBF7] shadow-xs border border-orange-100 text-left">
              <div
                className="w-2 h-full absolute left-0 top-0 rounded-l-3xl"
                style={{ backgroundColor: color }}
              />
              <p
                className="text-base sm:text-lg text-gray-700 leading-relaxed pl-2 sm:pl-4"
                style={contentColor ? { color: contentColor } : undefined}
              >
                {activity.why_matters_content}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 4. KEY BENEFITS FROM DATABASE */}
      {activity.benefits && activity.benefits.length > 0 && (
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-10">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: bg, color: color }}
            >
              Holistic Growth
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
              {activity.benefits_title || 'Key Growth Pillars'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activity.benefits.map((b, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-orange-100 hover:border-orange-200 hover:shadow-md transition-all space-y-3"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
                  style={{ backgroundColor: bg, color: color }}
                >
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{b.title}</h3>
                <p
                  className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                  style={contentColor ? { color: contentColor } : undefined}
                >
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. AGE STREAMS & PROGRAMS FROM DATABASE */}
      {activity.programs && activity.programs.length > 0 && (
        <section className="py-14 sm:py-20 bg-white border-y border-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-12">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ backgroundColor: bg, color: color }}
              >
                Tailored Age Streams
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
                {activity.programs_title || 'Age-Wise Camp Streams'}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {activity.programs.map((prog, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFBF7] rounded-3xl p-7 border border-orange-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: bg, color: color }}
                      >
                        Track 0{idx + 1}
                      </span>
                      {prog.age_bracket && (
                        <span className="text-xs font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-full">
                          {prog.age_bracket}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-black text-gray-900">{prog.title}</h3>
                    <p
                      className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                      style={contentColor ? { color: contentColor } : undefined}
                    >
                      {prog.description}
                    </p>

                    {prog.points && prog.points.length > 0 && (
                      <div className="pt-2">
                        <div className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                          Daily Activities:
                        </div>
                        <ul className="space-y-2">
                          {prog.points.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                              <CheckCircle2
                                className="w-4 h-4 shrink-0 mt-0.5"
                                style={{ color }}
                              />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-orange-100">
                    <a
                      href={`https://wa.me/${ctaWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello Phulwari! I want to enroll my child in ${prog.title} (${prog.age_bracket || ''}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-2xl font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all hover:scale-[1.02] text-white shadow-sm"
                      style={{ backgroundColor: color }}
                    >
                      <span>Enroll in {prog.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. CLIENT INTERACTIVE GALLERY & FAQS (FROM DB DATA) */}
      <SummerCampClientView
        galleryImages={galleryImages}
        faqs={activity.faqs || []}
        title={activity.badge_text || activity.h1}
        color={color}
        bg={bg}
        contentColor={contentColor}
        whatsappUrl={whatsappUrl}
        phone={ctaPhone}
        address={ctaAddress}
        whyChooseTitle={activity.why_choose_title}
        whyChoosePoints={activity.why_choose_points || []}
      />
    </div>
  );
}
