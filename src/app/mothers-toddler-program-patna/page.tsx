import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Baby,
  Sparkles,
  Heart,
  Music,
  Smile,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Brain,
  Activity
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
import ToddlerGallery from './ToddlerGallery'
import ToddlerTrialForm from './ToddlerTrialForm'
import FaqAccordion from '../birthdays/FaqAccordion'

export const dynamic = 'force-dynamic'

export const metadata = buildMetadata({
  title: 'Best Mother and Toddler Program in Patna | Early Learning & Sensory Play | Phulwari',
  description:
    'Enroll in Patna’s premier mother and toddler program at Phulwari. Sensory play, music, movement, social skills, and bonding for ages 6 months to 3 years. Book a trial class!',
  path: '/mothers-toddler-program-patna',
  keywords: [
    'mother and toddler program Patna',
    'early learning centre Patna',
    'sensory play for toddlers Patna',
    'mom and baby classes Patna',
    'preschool prep Patna',
    'toddler activity centre Patna',
    'Phulwari toddler program',
    'infant sensory development Patna',
    'child bonding classes Patna',
  ],
})

const TODDLER_PATH = '/mothers-toddler-program-patna'

const breadcrumb = [
  { name: 'Home', path: '/' },
  { name: 'Mother & Toddler Program', path: TODDLER_PATH },
]

const modules = [
  {
    id: 1,
    title: '1. Sensory Exploration & Messy Play',
    desc: 'Engaging touch, sight, and sound through safe textured materials, food-grade edible dough, water tables, foam, and colors. Enhances neural connectivity and curious exploration.',
    icon: Sparkles,
    color: 'bg-pink-100 text-pink-700 border-pink-200'
  },
  {
    id: 2,
    title: '2. Musical Rhymes, Rhythm & Storytelling',
    desc: 'Interactive action rhymes, shaker eggs, tambourines, puppet shows, and illustrated stories that stimulate early language acquisition, rhythm perception, and speech milestones.',
    icon: Music,
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  },
  {
    id: 3,
    title: '3. Gross Motor & Balance Circuits',
    desc: 'Crawling tunnels, soft foam climbing ramps, balance beams, sensory stepping stones, and ball games that build muscle strength, vestibular balance, and physical confidence.',
    icon: Activity,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200'
  },
  {
    id: 4,
    title: '4. Social Interaction & Emotional Bonding',
    desc: 'Circle time routines, turn-taking games, and collaborative play that ease separation anxiety, cultivate gentle social skills, and strengthen emotional security between mother and child.',
    icon: Heart,
    color: 'bg-amber-100 text-amber-700 border-amber-200'
  }
]

const ageBatches = [
  {
    group: 'Infants & Crawlers',
    age: '6 to 12 Months',
    focus: 'Sensory discovery, gentle tummy time, visual tracking, soothing lullabies & parent touch.',
    schedule: 'Tue & Thu | 10:30 AM – 11:15 AM'
  },
  {
    group: 'Cruisers & First Walkers',
    age: '12 to 24 Months',
    focus: 'Balance obstacles, action songs, fine motor grasping, sensory bin sorting & peer imitation.',
    schedule: 'Mon, Wed, Fri | 10:30 AM – 11:30 AM'
  },
  {
    group: 'Curious Explorers (Preschool Prep)',
    age: '2 to 3 Years',
    focus: 'Speech expansion, creative crafts, group circle cooperation & smooth transition to preschool.',
    schedule: 'Mon to Sat | 11:45 AM – 12:45 PM & 4:30 PM – 5:30 PM'
  }
]

const faqs = [
  {
    question: 'What is the ideal age for a child to join the Mother and Toddler Program?',
    answer:
      'Our program is custom-crafted for little ones aged 6 months to 3 years. We divide children into developmentally tailored age cohorts (6–12 months, 12–24 months, and 2–3 years) to match their natural milestones.'
  },
  {
    question: 'Does a parent or caregiver have to attend every session?',
    answer:
      'Yes. This is an active parent-child bonding program. A mother, father, or primary guardian participates alongside the child in circle time, sensory stations, and movement games.'
  },
  {
    question: 'How does this program help prepare my child for formal preschool?',
    answer:
      'Children learn to follow gentle group routines, sit in circle time, share play items, and interact with peers in a comforting space with their mother present. This virtually eliminates preschool separation anxiety and tears when they enter formal school.'
  },
  {
    question: 'Are all sensory materials and toys safe and non-toxic?',
    answer:
      'Yes, 100%! We strictly use non-toxic, child-safe, BPA-free sensory items, organic food-grade paints, and sterilized soft-play equipment cleaned before every session.'
  },
  {
    question: 'What is the batch size for each session in Patna?',
    answer:
      'To ensure personalized attention, calm sensory stimulation, and ample room to move, we limit our batches to 6–8 mother-toddler pairs per session.'
  },
  {
    question: 'Can we book a trial session before enrolling for a full term?',
    answer:
      'Yes! We welcome every new parent to experience a free trial session. You can book directly using the form below or message us on WhatsApp at +91 62073 68839.'
  }
]

export default function MotherAndToddlerPage() {
  return (
    <>
      <JsonLd
        id="mother-toddler-schema"
        nodes={[
          webPageSchema({
            path: TODDLER_PATH,
            name: 'Best Mother and Toddler Program in Patna | Early Learning & Sensory Play | Phulwari',
            description:
              'Enroll in Patna’s premier mother and toddler program at Phulwari. Sensory play, music, movement, social skills, and bonding for ages 6 months to 3 years.',
            breadcrumb,
          }),
          breadcrumbSchema(TODDLER_PATH, breadcrumb),
          {
            ...serviceSchema({
              name: 'Mother and Toddler Early Learning Program in Patna',
              description:
                'Early childhood sensory play, music movement, gross motor development, and maternal bonding program for ages 6 months to 3 years at Phulwari Patna.',
              path: TODDLER_PATH,
              serviceType: 'Mother and Toddler Early Learning Program',
              audience: 'Mothers and toddlers aged 6 months to 3 years in Patna',
            }),
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Mother and Toddler Age Groups',
              itemListElement: ageBatches.map((b) =>
                offerSchema({
                  name: `${b.group} (${b.age})`,
                  description: b.focus,
                  price: 'Free Trial / Monthly & Term Enrollment',
                  path: TODDLER_PATH,
                })
              ),
            },
          },
          faqSchema(TODDLER_PATH, faqs),
        ]}
      />

      <div className="min-h-screen bg-[#FFFDFB] text-[#24364B] font-sans pt-28 pb-20 overflow-x-hidden">
        {/* Decorative background gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[620px] bg-gradient-to-b from-pink-100/60 via-purple-50/40 to-transparent -z-10 pointer-events-none rounded-full blur-3xl opacity-70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
            <Link href="/" className="hover:text-pink-600 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-pink-600 font-bold">Mother &amp; Toddler Program in Patna</span>
          </nav>

          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-16">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100/90 text-pink-700 font-extrabold text-xs mb-6 shadow-sm border border-pink-200">
                <Baby className="w-4 h-4 text-pink-600 animate-bounce" />
                <span>Patna’s Most Loved Early Childhood Sensory &amp; Bonding Program</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight mb-6">
                Mother and Toddler Program in Patna –{' '}
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Joyful Early Learning &amp; Bonding at Phulwari
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-8">
                The early years (6 months to 3 years) are the most critical foundation of a child&apos;s brain development,
                attachment security, and sensory curiosity. At Phulwari, our Mother &amp; Toddler Program offers a joyful,
                stimulating environment where mothers and little ones play, learn, sing, and blossom together.
              </p>

              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
                <a
                  href="#book-toddler-trial"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-extrabold text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Free Trial Class</span>
                </a>
                <a
                  href="https://wa.me/916207368839?text=Hi%20Phulwari!%20I%20would%20like%20to%20know%20more%20about%20the%20Mother%20and%20Toddler%20Program."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-full border-2 border-slate-200 shadow-sm transition"
                >
                  <MessageCircle className="w-4 h-4 text-pink-600" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Child-Safe Venue</p>
                    <p className="text-[11px] text-slate-500 font-medium">Soft padded floors</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Brain &amp; Sensory</p>
                    <p className="text-[11px] text-slate-500 font-medium">Milestone-focused</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Small Batches</p>
                    <p className="text-[11px] text-slate-500 font-medium">6–8 pairs per batch</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right: Dynamic Interactive Gallery */}
            <div className="lg:col-span-5 w-full">
              <ToddlerGallery />
            </div>
          </section>

          {/* Why Join a Mother & Toddler Program? */}
          <section className="py-16 border-t border-slate-100">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                Why Join Our Mother &amp; Toddler Program in Patna?
              </h2>
              <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                Before entering formal school, toddlers thrive when they can explore the world from the emotional
                security of their mother&apos;s side. Here is how our program nurtures lifelong benefits:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-7 rounded-3xl border border-pink-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-5">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Strengthen Maternal Bond</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  Dedicated, distraction-free screenless quality time to laugh, cuddle, play, and celebrate every new
                  discovery with your baby.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Sensory &amp; Speech Boost</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  Rich tactile, auditory, and visual stimulation enhances neural pathways, building vocabulary and
                  curiosity naturally.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-blue-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                  <Smile className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Preschool Readiness</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  Gentle introduction to circle time, listening to teachers, and sharing toys eases the transition to
                  playgroup with zero separation tears.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-amber-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Motor Skills &amp; Balance</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  Soft obstacles, balance ramps, crawl tunnels, and ball pits develop gross motor agility, posture, and spatial awareness.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Socializing with Peers</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  Toddlers watch, mimic, and play alongside same-age peers, fostering early empathy, sharing habits, and joyful friendships.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-rose-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Mom Support Circle</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  Connect with other mindful Patna mothers. Exchange parenting tips, feeding advice, and build a lasting village of support.
                </p>
              </div>
            </div>
          </section>

          {/* 4 Core Developmental Modules */}
          <section className="py-16 bg-gradient-to-r from-pink-50/50 via-purple-50/40 to-pink-50/50 rounded-3xl p-8 sm:p-12 mb-16 border border-pink-100">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-pink-700 font-bold text-xs mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Holistic Early Childhood Curriculum</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Our 4 Core Developmental Modules
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium mt-2">
                Every session integrates multiple sensory pathways to foster brain growth and curiosity:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {modules.map((m) => {
                const Icon = m.icon
                return (
                  <div
                    key={m.id}
                    className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-3">{m.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Sample Class Structure Routine */}
          <section className="py-16">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                A Day in Our Class – 60-Minute Structured Routine
              </h2>
              <p className="text-slate-600 font-medium text-sm sm:text-base">
                Predictable routines provide toddlers with a sense of security and enthusiasm:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { time: '10 Mins', title: 'Welcome Circle & Greeting Song', desc: 'Hello songs, name recognition, and group warmth.' },
                { time: '15 Mins', title: 'Sensory Station & Messy Play', desc: 'Texture trays, water play, soft clay & discovery boxes.' },
                { time: '15 Mins', title: 'Gross Motor Obstacle Circuit', desc: 'Tunnels, stepping stones, climbing blocks & slides.' },
                { time: '10 Mins', title: 'Action Rhymes & Musical Instruments', desc: 'Shakers, drums, movement dance & puppet stories.' },
                { time: '10 Mins', title: 'Bubble Time & Goodbye Hugs', desc: 'Gentle bubble play, calming breath & goodbye song.' },
              ].map((r, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <span className="text-xs font-black text-pink-600 bg-pink-50 px-3 py-1 rounded-full self-start mb-3">
                    {r.time}
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 mb-2">{r.title}</h3>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Age Batches & Schedule */}
          <section className="py-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm mb-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                Age Groups &amp; Batch Timings in Patna
              </h2>
              <p className="text-slate-600 font-medium text-sm sm:text-base">
                We maintain small, age-aligned groups so every child receives individualized attention:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ageBatches.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFF9FA] rounded-3xl p-7 border border-pink-100 shadow-sm flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    <span className="text-xs font-black text-pink-700 bg-pink-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      {b.age}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-4 mb-2">{b.group}</h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">{b.focus}</p>
                  </div>

                  <div className="pt-4 border-t border-pink-200/50">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mb-4">
                      <Clock className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>{b.schedule}</span>
                    </div>
                    <a
                      href="#book-toddler-trial"
                      className="w-full py-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-black text-xs uppercase tracking-wider block text-center shadow-sm transition"
                    >
                      Book Trial Class
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                What Patna Mothers Love About Phulwari
              </h2>
              <p className="text-slate-600 text-sm font-medium mt-2">
                Real feedback from moms who watched their babies flourish:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic font-medium mb-6">
                    &ldquo;My 18-month-old daughter was very shy and clung to me whenever anyone entered the room. After
                    just 4 weeks of the Mother &amp; Toddler sessions at Phulwari, she now runs to the rhyme circle,
                    claps, and plays happily with other children. The sensory trays are fantastic!&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center font-bold text-pink-700 text-xs">
                    MK
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Megha Kapoor</p>
                    <p className="text-[11px] text-slate-500 font-semibold">Mother of Anaya (18 mos), Patna</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic font-medium mb-6">
                    &ldquo;Finding a clean, sanitized, and purposeful early learning space in Patna was difficult until we
                    found Phulwari. The teachers are gentle and patient, and the messy play setups allow my son to explore
                    without worrying about home cleanups!&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-xs">
                    TJ
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Tanvi Jha</p>
                    <p className="text-[11px] text-slate-500 font-semibold">Mother of Kabir (2.5 yrs), Kankarbagh</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-12">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                Frequently Asked Questions (FAQs)
              </h2>
              <p className="text-slate-600 text-sm font-medium">
                Answers to common queries from parents about our early learning sessions:
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <FaqAccordion faqs={faqs} />
            </div>
          </section>

          {/* Lead Booking Form */}
          <section className="py-12">
            <ToddlerTrialForm />
          </section>
        </div>
      </div>
    </>
  )
}
