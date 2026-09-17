import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Heart,
  Dumbbell,
  Sparkles,
  Flame,
  CheckCircle2,
  Clock,
  Calendar,
  Users,
  Smile,
  ShieldCheck,
  Star,
  Activity,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Award,
  Zap
} from 'lucide-react'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/lib/seo/JsonLd'
import {
  breadcrumbSchema,
  faqSchema,
  offerSchema,
  serviceSchema,
  webPageSchema,
} from '@/lib/seo/schema'
import FitnessGallery from './FitnessGallery'
import FitnessTrialForm from './FitnessTrialForm'
import FaqAccordion from '../birthdays/FaqAccordion'

export const dynamic = 'force-dynamic'

export const metadata = buildMetadata({
  title: 'Mothers Fitness & Zumba Classes in Patna | Postnatal Yoga & Wellness | Phulwari',
  description:
    'Join top-rated mothers fitness and Zumba classes in Patna at Phulwari. Postnatal yoga, dance workouts, strength training & holistic wellness for moms. Free trial available!',
  path: '/mothers-fitness-zumba-patna',
  keywords: [
    'mothers fitness Patna',
    'zumba classes for moms Patna',
    'postnatal yoga Patna',
    'postpartum fitness Patna',
    'ladies gym and dance workout Patna',
    'female fitness trainer Patna',
    'mom and toddler fitness centre Patna',
    'Phulwari mothers fitness Patna',
    'post pregnancy workout Patna',
  ],
})

const FITNESS_PATH = '/mothers-fitness-zumba-patna'

const breadcrumb = [
  { name: 'Home', path: '/' },
  { name: 'Mothers Fitness & Zumba', path: FITNESS_PATH },
]

const programs = [
  {
    id: 1,
    title: '1. Postnatal Yoga & Core Rehab',
    subtitle: 'Safe, gentle rebuilding of pelvic floor & core stability',
    badge: 'Gentle & Healing',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description:
      'Specially designed for postpartum recovery, diastasis recti healing, pelvic floor strengthening, and gentle spine decompression. Certified instructors guide you through safe breathing and mindful movement.',
    highlights: [
      'Diastasis recti safe core reactivation',
      'Pelvic floor toning & strengthening',
      'Relief from chronic back, neck, and shoulder strain',
      'Guided pranayama & nervous system reset'
    ],
    schedule: 'Mon, Wed, Fri | 7:30 AM – 8:30 AM & 10:00 AM – 11:00 AM'
  },
  {
    id: 2,
    title: '2. High-Energy Zumba & Dance Cardio',
    subtitle: 'Calorie burning, stamina boosting, stress-busting fun',
    badge: 'High Energy & Fun',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
    description:
      'Ditch the workout and join the party! Upbeat Latin, Bollywood, and pop rhythms paired with easy-to-follow dance routines that torch calories, boost endorphins, and leave you feeling invigorated.',
    highlights: [
      'Fun cardio dance routines for all fitness levels',
      'Boosts cardiovascular stamina and lung capacity',
      'Natural release of feel-good endorphins',
      'Upbeat mom-friendly group atmosphere'
    ],
    schedule: 'Tue, Thu, Sat | 7:30 AM – 8:30 AM & 5:00 PM – 6:00 PM'
  },
  {
    id: 3,
    title: '3. Mom-Strength & Functional Conditioning',
    subtitle: 'Bodyweight & light resistance for real-life maternal strength',
    badge: 'Strength & Tone',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    description:
      'Lifting, carrying, and bending all day requires real physical resilience. Our functional strength circuits build lean muscle, tone arms and glutes, and improve overall metabolic health.',
    highlights: [
      'Resistance band and light dumbbell training',
      'Posture correction for nursing and holding toddlers',
      'Joint mobility, flexibility, and balance drills',
      'Fat loss and long-term metabolic health'
    ],
    schedule: 'Mon to Fri | 10:00 AM – 11:00 AM & 5:00 PM – 6:00 PM'
  }
]

const faqs = [
  {
    question: 'How soon after delivery can I start attending fitness classes at Phulwari?',
    answer:
      'For normal vaginal deliveries, mothers can typically begin gentle postnatal yoga after 6 weeks, provided they have doctor approval. For C-section deliveries, we recommend waiting 8 to 12 weeks and obtaining clearance from your obstetrician before starting core or cardio routines.'
  },
  {
    question: 'Can I bring my baby or toddler along while I work out?',
    answer:
      'Yes! That is the core beauty of Phulwari Mother & Child Activity Centre. While you work out in our dedicated fitness studio, your toddler can play safely in our adjacent, supervised soft-play zone under the watchful care of our staff.'
  },
  {
    question: 'I haven’t worked out in months or years. Are these classes beginner-friendly?',
    answer:
      '100% yes! Our classes are specifically designed for mothers at all stages of fitness. Our female trainers provide low-impact modifications for every single movement so you can progress comfortably at your own pace.'
  },
  {
    question: 'What should I wear and bring to class?',
    answer:
      'Wear comfortable workout clothing (stretchy leggings/t-shirt or track pants) and clean sports shoes or grip socks. Bring a personal water bottle and a small sweat towel. We provide sanitized yoga mats and resistance equipment.'
  },
  {
    question: 'Are the instructors certified in female and postnatal fitness?',
    answer:
      'Yes. Our female trainers are certified in postnatal biomechanics, pelvic health awareness, and group cardio instruction, ensuring every exercise is safe, supportive, and effective.'
  },
  {
    question: 'How do I book a free trial class in Patna?',
    answer:
      'You can book your trial session instantly by submitting the form below or messaging our fitness desk on WhatsApp at +91 62073 68839. We will confirm your preferred timing immediately.'
  }
]

export default function MothersFitnessPage() {
  return (
    <>
      <JsonLd
        id="mothers-fitness-schema"
        nodes={[
          webPageSchema({
            path: FITNESS_PATH,
            name: 'Mothers Fitness & Zumba Classes in Patna | Postnatal Yoga & Wellness | Phulwari',
            description:
              'Join top-rated mothers fitness and Zumba classes in Patna at Phulwari. Postnatal yoga, dance workouts, strength training & holistic wellness for moms.',
            breadcrumb,
          }),
          breadcrumbSchema(FITNESS_PATH, breadcrumb),
          {
            ...serviceSchema({
              name: 'Mothers Fitness & Zumba Classes in Patna',
              description:
                'Dedicated postnatal yoga, high-energy Zumba, and functional strength fitness classes for mothers with adjacent supervised toddler play area at Phulwari Patna.',
              path: FITNESS_PATH,
              serviceType: 'Mothers Fitness, Zumba, and Postnatal Wellness',
              audience: 'Mothers and women in Patna',
            }),
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Mothers Fitness Programs',
              itemListElement: programs.map((p) =>
                offerSchema({
                  name: p.title,
                  description: p.description,
                  price: 'Free Trial / Monthly & Quarterly Membership Plans',
                  path: FITNESS_PATH,
                })
              ),
            },
          },
          faqSchema(FITNESS_PATH, faqs),
        ]}
      />

      <div className="min-h-screen bg-[#FDFBF7] text-[#24364B] font-sans pt-28 pb-20 overflow-x-hidden">
        {/* Decorative background aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-emerald-100/50 via-teal-50/40 to-transparent -z-10 pointer-events-none rounded-full blur-3xl opacity-60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
            <Link href="/" className="hover:text-emerald-700 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-emerald-700 font-bold">Mothers Fitness &amp; Zumba in Patna</span>
          </nav>

          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-16">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/90 text-emerald-800 font-extrabold text-xs mb-6 shadow-sm border border-emerald-200">
                <Heart className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>Patna’s Exclusive Fitness &amp; Wellness Sanctuary for Mothers</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight mb-6">
                Mothers Fitness &amp; Zumba in Patna –{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Reclaim Your Health, Strength &amp; Joy
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-8">
                Motherhood is a transformative, beautiful journey, but it also places tremendous physical and emotional
                demands on your body. At Phulwari, we offer dedicated mothers fitness and Zumba sessions in Patna
                designed to rebuild your core, recharge your energy, and nurture your wellbeing in a warm, empowering mom community.
              </p>

              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
                <a
                  href="#book-trial"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Free Trial Class</span>
                </a>
                <a
                  href="https://wa.me/916207368839?text=Hi%20Phulwari!%20I%20am%20interested%20in%20the%20Mothers%20Fitness%20%26%20Zumba%20Classes."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-full border-2 border-slate-200 shadow-sm transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Female Instructors</p>
                    <p className="text-[11px] text-slate-500 font-medium">Certified &amp; supportive</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                    <Smile className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Childcare Friendly</p>
                    <p className="text-[11px] text-slate-500 font-medium">Adjacent play zone</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Mom Community</p>
                    <p className="text-[11px] text-slate-500 font-medium">Judgment-free zone</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right: 8-Image Dynamic Fitness Gallery */}
            <div className="lg:col-span-5 w-full">
              <FitnessGallery />
            </div>
          </section>

          {/* Why Moms Need Dedicated Fitness */}
          <section className="py-16 border-t border-slate-100">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                Why Patna Mothers Need a Dedicated Fitness Program
              </h2>
              <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                Standard commercial gyms often lack postnatal expertise and feel intimidating or impractical for busy mothers.
                Phulwari is created exclusively to solve every mom’s fitness challenge:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">Postpartum Recovery</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  Safely rehabilitate stretched abdominal muscles, improve pelvic stability, and prevent long-term back ache.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center mb-4">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">Mental Stress Relief</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  Zumba and rhythmic workouts release endorphins, reduce parental burnout, and elevate your daily mood.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-teal-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">Supportive Mom Tribe</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  Work out alongside women going through the same phase of life. Share experiences, friendships, and encouragement.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                  <Smile className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">Toddler Playzone Nearby</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  No need to arrange a babysitter! Your toddler can enjoy supervised activities in our soft play area while you exercise.
                </p>
              </div>
            </div>
          </section>

          {/* 3 Core Fitness Programs */}
          <section className="py-16 bg-gradient-to-r from-emerald-50/60 via-teal-50/40 to-emerald-50/60 rounded-3xl p-8 sm:p-12 mb-16 border border-emerald-100">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs mb-3">
                <Dumbbell className="w-3.5 h-3.5" />
                <span>Tailored Formats for Every Mother</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Our 3 Core Fitness Programs for Mothers in Patna
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium mt-2">
                Choose the focus that matches your body&apos;s current needs, or combine them all:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {programs.map((prog) => (
                <div
                  key={prog.id}
                  className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-xl transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${prog.badgeColor}`}>
                        {prog.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-1">{prog.title}</h3>
                    <p className="text-xs font-bold text-emerald-700 mb-3">{prog.subtitle}</p>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
                      {prog.description}
                    </p>

                    <div className="space-y-2.5 mb-6">
                      <p className="text-xs font-black text-slate-800 uppercase tracking-wider">Key Benefits:</p>
                      {prog.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 mb-4">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{prog.schedule}</span>
                    </div>
                    <a
                      href="#book-trial"
                      className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider block text-center shadow-sm transition"
                    >
                      Join Free Trial
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Schedule & Batch Timings Table */}
          <section className="py-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                Weekly Class Schedule &amp; Batch Timings
              </h2>
              <p className="text-slate-600 font-medium text-sm sm:text-base">
                We offer convenient morning and evening batches designed around school runs and nap schedules:
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-emerald-50/80 text-emerald-900 font-black border-b border-emerald-100 uppercase text-[11px]">
                    <tr>
                      <th className="px-6 py-4">Batch</th>
                      <th className="px-6 py-4">Timing</th>
                      <th className="px-6 py-4">Days</th>
                      <th className="px-6 py-4">Focus Area</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    <tr className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4 font-black text-slate-900">🌅 Morning Energizer</td>
                      <td className="px-6 py-4 text-emerald-700 font-bold">7:30 AM – 8:30 AM</td>
                      <td className="px-6 py-4">Mon to Sat</td>
                      <td className="px-6 py-4">Postnatal Yoga &amp; Dance Cardio</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4 font-black text-slate-900">☀️ Mid-Morning Mom Club</td>
                      <td className="px-6 py-4 text-emerald-700 font-bold">10:00 AM – 11:00 AM</td>
                      <td className="px-6 py-4">Mon to Fri</td>
                      <td className="px-6 py-4">Core Rehab &amp; Light Resistance</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4 font-black text-slate-900">🌆 Evening Power Hour</td>
                      <td className="px-6 py-4 text-emerald-700 font-bold">5:00 PM – 6:00 PM</td>
                      <td className="px-6 py-4">Mon to Sat</td>
                      <td className="px-6 py-4">High-Energy Zumba &amp; Body Toning</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition bg-emerald-50/30">
                      <td className="px-6 py-4 font-black text-slate-900">🌟 Weekend Special</td>
                      <td className="px-6 py-4 text-emerald-700 font-bold">8:30 AM – 9:45 AM</td>
                      <td className="px-6 py-4">Sat &amp; Sun</td>
                      <td className="px-6 py-4">Mom &amp; Toddler Fun Movement Circuit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm mb-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Real Stories From Patna Mothers
              </h2>
              <p className="text-slate-600 text-sm font-medium mt-2">
                Hear how our fitness and Zumba sessions transformed their energy, posture, and wellness:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-50/40 p-8 rounded-3xl border border-emerald-100 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic font-medium mb-6">
                    &ldquo;After having my second child, I was suffering from constant lower back pain and low energy.
                    Phulwari&apos;s postnatal yoga restored my core strength completely. Best of all, my toddler plays
                    safely in the soft play area while I enjoy my 1 hour of me-time!&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-emerald-200/60">
                  <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center font-bold text-emerald-800 text-xs">
                    SS
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Sneha Srivastava</p>
                    <p className="text-[11px] text-slate-500 font-semibold">Mother of two, Boring Road</p>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50/40 p-8 rounded-3xl border border-teal-100 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic font-medium mb-6">
                    &ldquo;The Zumba sessions here are absolute magic! I look forward to 5:00 PM every weekday. The
                    female trainers are so encouraging, and the music makes you forget you&apos;re even exercising. I&apos;ve
                    lost 6 kgs and made great mom friends.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-teal-200/60">
                  <div className="w-10 h-10 rounded-full bg-teal-200 flex items-center justify-center font-bold text-teal-800 text-xs">
                    RG
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Ritu Gupta</p>
                    <p className="text-[11px] text-slate-500 font-semibold">Mother of 3-year-old, Bailey Road</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="py-12">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                Frequently Asked Questions (FAQs)
              </h2>
              <p className="text-slate-600 text-sm font-medium">
                Everything you need to know before your first fitness or Zumba session at Phulwari:
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <FaqAccordion faqs={faqs} />
            </div>
          </section>

          {/* Lead Booking Form */}
          <section className="py-12">
            <FitnessTrialForm />
          </section>
        </div>
      </div>
    </>
  )
}
