import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  ChevronRight,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Star,
  Users,
  Award,
  ArrowRight,
} from 'lucide-react';
import { getActivityBySlug, getAllActivities } from '@/lib/activities';
import {
  ActivityGallery,
  ActivityFaqAccordion,
  ActivityMobileStickyBar,
} from '@/components/activities/ActivityClientViews';
import { ActivityVideoGallery } from '@/components/activities/ActivityVideoGallery';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 60; // ISR revalidation every minute

export async function generateStaticParams() {
  const activities = await getAllActivities();
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);

  if (!activity) {
    return {
      title: 'Activity Not Found | Phulwari Activity Centre Patna',
    };
  }

  const canonicalUrl = `https://phulwari.co.in/activities/${activity.slug}`;

  return {
    title: activity.title_tag,
    description: activity.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: activity.title_tag,
      description: activity.meta_description,
      url: canonicalUrl,
      siteName: 'Phulwari Mother & Child Activity Centre',
      type: 'website',
      images: [
        {
          url: activity.hero_image?.startsWith('http')
            ? activity.hero_image
            : `https://phulwari.co.in${activity.hero_image || '/phulwari_logo.webp'}`,
          width: 1200,
          height: 630,
          alt: activity.h1,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: activity.title_tag,
      description: activity.meta_description,
      images: [
        activity.hero_image?.startsWith('http')
          ? activity.hero_image
          : `https://phulwari.co.in${activity.hero_image || '/phulwari_logo.webp'}`,
      ],
    },
  };
}

export default async function ActivityDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  // Redirect alias to canonical slug if requested slug is an alias
  if (activity.slug.toLowerCase() !== slug.toLowerCase()) {
    redirect(`/activities/${activity.slug}`);
  }

  const color = activity.color || '#FF4D8D';
  const bg = activity.bg || '#FFE6EF';
  const contentColor = activity.content_color;
  const ctaPhone = activity.cta?.phone || '+91 62073 68839';
  const ctaWhatsapp = activity.cta?.whatsapp || '+916207368839';
  const ctaAddress =
    activity.cta?.address ||
    'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001';

  const whatsappUrl = `https://wa.me/${ctaWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Phulwari! I would like to book a free trial / demo for ${activity.h1}. Please share batch timings and details.`
  )}`;

  // Combine hero image with gallery images if not already included
  const allGalleryImages = Array.from(
    new Set([activity.hero_image, ...(activity.gallery_images || [])].filter(Boolean) as string[])
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20 md:pb-0">
      {/* Schema JSON-LD */}
      {activity.schema_json && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(activity.schema_json) }}
        />
      )}

      {/* Breadcrumb Navigation */}
      <section className="border-b border-gray-100 bg-gray-50/70 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-gray-900 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Link href="/activities" className="hover:text-gray-900 transition">
            Activities
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="font-semibold text-gray-900">{activity.badge_text || activity.slug}</span>
        </div>
      </section>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-10 sm:py-16 lg:py-20">
        {/* Subtle Background Blobs */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: bg }}
        />
        <div
          className="absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: color }}
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-14 w-full">
            {/* Left Content */}
            <div className="w-full lg:w-[50%] min-w-0 flex-1 space-y-6">
              {/* Badge Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm"
                  style={{ backgroundColor: bg, color: color }}
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>{activity.badge_text || 'Premium Activity in Patna'}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Admissions Open 2026</span>
                </div>
              </div>

              {/* H1 Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-gray-900 leading-[1.18] w-full break-words">
                {activity.h1}
              </h1>

              {/* Intro Paragraphs */}
              <div
                className="space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed font-normal"
                style={contentColor ? { color: contentColor } : undefined}
              >
                <p>{activity.intro_p1}</p>
                {activity.intro_p2 && <p>{activity.intro_p2}</p>}
              </div>

              {/* Action Buttons (High Priority Above The Fold) */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-2xl text-white font-bold text-sm sm:text-base shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95"
                  style={{ backgroundColor: color }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Book Free Trial / Demo</span>
                </a>

                <a
                  href={`tel:${ctaPhone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-2xl border-2 border-gray-200 font-bold text-sm sm:text-base text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-xs"
                >
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <span>Call Us</span>
                </a>
              </div>

              {/* Quick Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                  <Award className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Certified Trainers</span>
                </div>
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-gray-100 shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">100% Child-Safe</span>
                </div>
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-gray-100 shadow-xs col-span-2 sm:col-span-1">
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Kidwaipuri, Patna</span>
                </div>
              </div>
            </div>

            {/* Right Gallery Showcase */}
            <div className="w-full lg:w-[50%] min-w-0 flex-1 lg:sticky lg:top-8">
              <ActivityGallery
                images={allGalleryImages}
                title={activity.badge_text || activity.h1}
                accentColor={color}
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS SECTION */}
      {activity.why_matters_content && (
        <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50/80 to-white border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span
              className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block"
              style={{ backgroundColor: bg, color: color }}
            >
              Developmental Value
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
              {activity.why_matters_title || 'Why This Program Matters'}
            </h2>
            <div className="relative p-6 sm:p-8 rounded-3xl bg-white shadow-sm border border-gray-100 text-left">
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

      {/* REAL ACTION VIDEOS & SESSIONS SECTION */}
      {activity.videos && activity.videos.length > 0 && (
        <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span
                className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                style={{ backgroundColor: bg, color: color }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Action in Session</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Experience Real Training & Movement
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Take a quick peek inside our live training sessions at Kidwaipuri Centre, Patna.
              </p>
            </div>

            <ActivityVideoGallery
              videos={activity.videos}
              title={activity.badge_text || activity.h1}
              accentColor={color}
              accentBg={bg}
            />
          </div>
        </section>
      )}

      {/* KEY BENEFITS */}
      {activity.benefits && activity.benefits.length > 0 && (
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span
              className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block"
              style={{ backgroundColor: bg, color: color }}
            >
              Transformative Growth
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
              {activity.benefits_title || 'Key Benefits for Your Child'}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Structured developmental milestones nurtured through personalized attention and fun-filled learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activity.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-3xl bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: bg, color: color }}
                  >
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-800">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {benefit.description}
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold" style={{ color: color }}>
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SPECIALIZED PROGRAMS & BATCHES */}
      {activity.programs && activity.programs.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-50/80 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span
                className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block"
                style={{ backgroundColor: bg, color: color }}
              >
                Tailored Age Streams
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
                {activity.programs_title || 'Our Specialized Programs & Curriculum'}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Carefully graded curricula tailored to each child&apos;s physical and cognitive stage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activity.programs.map((prog, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="space-y-4">
                    {prog.age_bracket && (
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                        {prog.age_bracket}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900">{prog.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">{prog.description}</p>

                    {prog.points && prog.points.length > 0 && (
                      <ul className="space-y-2 pt-2 border-t border-gray-50">
                        {prog.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-6">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                    >
                      <span>Inquire About This Batch</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE PHULWARI */}
      {activity.why_choose_points && activity.why_choose_points.length > 0 && (
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span
              className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block"
              style={{ backgroundColor: bg, color: color }}
            >
              The Phulwari Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
              {activity.why_choose_title || 'Why Choose Phulwari Mother & Child Activity Centre?'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activity.why_choose_points.map((pt, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-start gap-4 hover:border-gray-200 transition"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: bg, color: color }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-gray-900">{pt.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{pt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* HYPER-LOCAL SERVICE AREAS */}
      {activity.hyper_local_points && activity.hyper_local_points.length > 0 && (
        <section className="py-14 sm:py-18 bg-gray-50/90 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
              <span
                className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block"
                style={{ backgroundColor: bg, color: color }}
              >
                Patna Locations & Commute
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {activity.hyper_local_title || 'Conveniently Located for Families Across Patna'}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Centrally situated at Kidwaipuri, effortlessly accessible from key neighborhoods.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activity.hyper_local_points.map((loc, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2"
                >
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-base">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <h4>{loc.area}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">{loc.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PARENT TESTIMONIALS */}
      {activity.testimonials && activity.testimonials.length > 0 && (
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span
              className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block"
              style={{ backgroundColor: bg, color: color }}
            >
              Parent Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              What Patna Parents Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {activity.testimonials.map((test, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-gray-100 shadow-sm space-y-4 relative"
              >
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed">
                  &ldquo;{test.quote}&rdquo;
                </p>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-gray-900">{test.author}</span>
                  <span className="text-gray-500">{test.locality}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FREQUENTLY ASKED QUESTIONS */}
      {activity.faqs && activity.faqs.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-50/80 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
              <span
                className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block"
                style={{ backgroundColor: bg, color: color }}
              >
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Everything you need to know about our {activity.badge_text || 'activity'} batches and trial sessions.
              </p>
            </div>

            <ActivityFaqAccordion faqs={activity.faqs} accentColor={color} />
          </div>
        </section>
      )}

      {/* BOTTOM ACTION BANNER */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, #1F2937 120%)`,
          }}
        >
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md">
              Book A Free Demo Today
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Give Your Child the Best Guidance in Patna?
            </h2>
            <p className="text-white/90 text-sm sm:text-base">
              Visit our Kidwaipuri facility, meet certified mentors, and experience our joyful environment firsthand.
            </p>
            <p className="text-white/75 text-xs sm:text-sm flex items-center justify-center lg:justify-start gap-1.5 pt-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{ctaAddress}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-gray-900 font-bold text-base shadow-xl hover:bg-gray-100 transition active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span>Book Demo Class</span>
            </a>
            <a
              href={`tel:${ctaPhone.replace(/[^0-9+]/g, '')}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-black/25 hover:bg-black/35 border border-white/25 text-white font-bold text-base transition active:scale-95"
            >
              <Phone className="w-5 h-5" />
              <span>Call Mentor</span>
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bar */}
      <ActivityMobileStickyBar
        activityTitle={activity.h1}
        phone={ctaPhone}
        whatsapp={ctaWhatsapp}
        accentColor={color}
      />
    </div>
  );
}
