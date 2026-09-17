import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  ShieldCheck,
  PartyPopper,
  Gamepad2,
  Camera,
  Utensils,
  Gift,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  CalendarHeart,
  PhoneCall,
  HeartHandshake,
  HelpCircle,
  Award,
  Users
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
import BirthdayGallery from './BirthdayGallery'
import LeadForm from '../birthdays/LeadForm'
import FaqAccordion from '../birthdays/FaqAccordion'

export const dynamic = 'force-dynamic'

export const metadata = buildMetadata({
  title: 'Best Kids & Child Birthday Party Planner in Patna | Venue & Decoration | Phulwari',
  description:
    'Looking for the best kids birthday party planner in Patna? Phulwari offers indoor party venues, customized themes, games, decor, and entertainment for an unforgettable celebration!',
  path: '/kids-and-child-birthday-party',
  keywords: [
    'kids birthday party planner Patna',
    'best kids birthday party venue Patna',
    'child birthday party decoration Patna',
    'toddler birthday party Patna',
    'first birthday celebration venue Patna',
    'indoor birthday party place Patna',
    'birthday event management Patna',
    'kids party themes Patna',
    'Phulwari birthday party Patna',
  ],
})

const BIRTHDAY_PATH = '/kids-and-child-birthday-party'

const breadcrumb = [
  { name: 'Home', path: '/' },
  { name: 'Birthday Party Celebrations', path: BIRTHDAY_PATH },
]

const packagesList = [
  {
    id: 1,
    name: 'Mini Bash for Toddlers (1–3 Years)',
    description: 'Perfect for first birthdays and intimate toddler gatherings with soft-play focus.',
    price: 'Custom Quote / Best Value',
    features: [
      'Full indoor safe soft-play zone access',
      'Themed balloon arch & backdrop decor',
      'Age-appropriate toddler sensory & music games',
      'Dedicated party coordinator & safety supervisor',
      'Sanitized premises with child-safe toys',
      'Cake cutting table setup with themed props'
    ],
    cta_text: 'Book Mini Bash',
    is_popular: false
  },
  {
    id: 2,
    name: 'Grand Theme Extravaganza (3–8 Years)',
    description: 'Our most popular comprehensive celebration package with high-energy games and full theme styling.',
    price: 'Most Popular / Premium',
    features: [
      'Full venue styling with bespoke 3D theme setup',
      'Professional anchor & fun party host',
      'Interactive magic show / puppet show / mascot visit',
      'Mini disco, dance floor & musical chairs',
      'Creative art & craft or tattoo station',
      'Customized welcome board and photo-op backdrops',
      'Complete end-to-end event day management'
    ],
    cta_text: 'Book Grand Extravaganza',
    is_popular: true
  },
  {
    id: 3,
    name: 'Custom / Bespoke Celebration',
    description: 'Tailored specifically to your vision, guest count, and specific entertainment preferences.',
    price: 'Tailored Packages',
    features: [
      'Personalized theme & stage design concepts',
      'Custom catering coordination & kids snack box menu',
      'Professional photographer & videographer coordination',
      'Curated personalized return gifts for young guests',
      'Flexible guest capacity & extended playtime slots',
      'VIP lounge seating for parents & guests'
    ],
    cta_text: 'Design Custom Party',
    is_popular: false
  }
]

const faqs = [
  {
    question: 'What is the best age group for birthday parties at Phulwari?',
    answer:
      'Phulwari is custom-designed for children aged 1 to 8 years old. Our indoor space features rounded edges, padded flooring, and non-toxic toys, making it particularly ideal for 1st, 2nd, 3rd, 4th, and 5th birthday milestones.'
  },
  {
    question: 'How far in advance should we book a birthday party at Phulwari?',
    answer:
      'Because we host private and exclusive slots to ensure your family gets 100% undivided attention and privacy, we recommend reserving your date at least 2 to 4 weeks in advance, especially for weekend afternoon and evening slots.'
  },
  {
    question: 'Can we choose a custom theme not listed on your website?',
    answer:
      'Absolutely! We specialize in customized themes. Whether your child loves Space Explorers, Peppa Pig, Jungle Safari, Unicorns, Little Singham, Baby Shark, or Marvel Superheroes, our design team can bring it to life with bespoke backdrops and props.'
  },
  {
    question: 'Do you provide catering services or can we bring our own food?',
    answer:
      'We offer complete flexibility! We can coordinate hygienic, kid-friendly catering and snacks (mini pizzas, french fries, pasta, fresh juices, cupcakes), or you can arrange your own preferred food and caterers at our venue.'
  },
  {
    question: 'What safety measures are in place at the venue?',
    answer:
      'Safety and hygiene are our #1 priority. Our venue is thoroughly sanitized before and after every single event. All play equipment has child-safe foam padding, non-slip flooring, zero sharp edges, and the entire facility is monitored by 24/7 CCTV cameras with attentive staff.'
  },
  {
    question: 'How do I book a birthday party at Phulwari in Patna?',
    answer:
      'You can check date availability and get an instant quote by submitting the booking form below, or by contacting our party coordinator directly via WhatsApp or phone call at +91 62073 68839.'
  }
]

export default function KidsBirthdayPartyPage() {
  return (
    <>
      <JsonLd
        id="birthday-schema"
        nodes={[
          webPageSchema({
            path: BIRTHDAY_PATH,
            name: 'Best Kids & Child Birthday Party Planner in Patna | Venue & Decoration | Phulwari',
            description:
              'Looking for the best kids birthday party planner in Patna? Phulwari offers indoor party venues, customized themes, games, decor, and entertainment.',
            breadcrumb,
          }),
          breadcrumbSchema(BIRTHDAY_PATH, breadcrumb),
          {
            ...serviceSchema({
              name: 'Kids Birthday Party Planner & Venue in Patna',
              description:
                'Themed birthday party celebrations for children aged 1 to 8 at Phulwari Patna, with safe soft-play zone, decoration, games, food coordination, and end-to-end party planning.',
              path: BIRTHDAY_PATH,
              serviceType: 'Kids Birthday Party Planner and Venue',
              audience: 'Parents and families with kids aged 1-8 in Patna',
            }),
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Kids Birthday Party Packages',
              itemListElement: packagesList.map((pkg) =>
                offerSchema({
                  name: pkg.name,
                  description: pkg.description,
                  price: pkg.price,
                  path: BIRTHDAY_PATH,
                })
              ),
            },
          },
          faqSchema(BIRTHDAY_PATH, faqs),
        ]}
      />

      <div className="min-h-screen bg-[#FFFDFB] text-[#24364B] font-sans pt-28 pb-20 overflow-x-hidden">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-pink-100/60 via-purple-50/40 to-transparent -z-10 pointer-events-none rounded-full blur-3xl opacity-70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
            <Link href="/" className="hover:text-pink-600 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-pink-600 font-bold">Kids Birthday Party Planner in Patna</span>
          </nav>

          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-16">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100/90 text-pink-700 font-extrabold text-xs mb-6 shadow-sm border border-pink-200">
                <PartyPopper className="w-4 h-4 text-pink-600 animate-bounce" />
                <span>Patna’s #1 Child-Safe Birthday Party Venue & Planner</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.2] tracking-tight mb-6">
                Kids Birthday Party Planner & Venue in Patna –{' '}
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Phulwari
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-8">
                Hosting your child&apos;s birthday is one of the most heartwarming milestones of early parenthood.
                At Phulwari Mother & Child Activity Centre, we turn birthdays into magical, stress-free
                wonderlands filled with laughter, colorful themes, soft play, exciting games, and joyful memories!
              </p>

              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
                <a
                  href="#book-now"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-extrabold text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <CalendarHeart className="w-4 h-4" />
                  <span>Check Availability & Get Quote</span>
                </a>
                <a
                  href="tel:+916207368839"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-full border-2 border-slate-200 shadow-sm transition"
                >
                  <PhoneCall className="w-4 h-4 text-pink-600" />
                  <span>Call +91 62073 68839</span>
                </a>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">100% Child-Safe</p>
                    <p className="text-[11px] text-slate-500 font-medium">Soft padded floors</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Custom Themes</p>
                    <p className="text-[11px] text-slate-500 font-medium">Over 20+ themes</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">100+ Birthdays</p>
                    <p className="text-[11px] text-slate-500 font-medium">Celebrated happily</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right: Interactive Gallery Preview */}
            <div className="lg:col-span-5 w-full">
              <BirthdayGallery />
            </div>
          </section>

          {/* Why Choose Section */}
          <section className="py-16 border-t border-slate-100">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                Why Choose Phulwari for Your Kids Birthday Party in Patna?
              </h2>
              <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                Hosting a toddler or young child’s birthday party at home or in an adult banquet hall can be
                exhausting and stressful. Phulwari gives you an all-in-one child-centric wonderland where kids play freely and parents relax.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-7 rounded-3xl border border-pink-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Child-Safe Indoor Venue</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Air-conditioned, soft-padded flooring, rounded furniture, clean ball pits, and zero sharp
                  corners make our space completely hazard-free for ages 1 to 8.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Customized Theme Decor</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  From Jungle Safari and Cocomelon to Superhero adventures and Fairy Tale castles, our creative decor
                  artists transform the venue into your child’s dream world.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-blue-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">End-to-End Event Management</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  We take care of sound, lighting, host coordination, game schedules, stage setup, and cleaning so you
                  can enjoy the celebration with your loved ones.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-amber-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Dedicated Entertainment & Games</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Trained party anchors keep every child engaged with musical chairs, sensory games, puppet shows,
                  balloon twisters, and fun dance routines.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Food & Catering Coordination</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Delicious, freshly prepared, kid-friendly snack boxes and buffet options tailored for young appetites
                  and adult guests alike.
                </p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-rose-100 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-5">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Return Gifts & Memory Books</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Personalized return gifts, photo props, and professional photography assistance to ensure your
                  family captures timeless memories.
                </p>
              </div>
            </div>
          </section>

          {/* Unique Themes Section */}
          <section className="py-16 bg-gradient-to-r from-pink-50/50 via-purple-50/50 to-pink-50/50 rounded-3xl p-8 sm:p-12 mb-16 border border-pink-100">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-bold text-xs mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Imaginative Themes</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Unique Birthday Party Themes We Offer in Patna
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium mt-2">
                Every child has their favorite world. We bring their imagination to reality with custom decorations:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: '🦁 Jungle Safari & Wild Kingdom',
                  desc: 'Lush greenery, animal cutouts, safari hats, and adventure game stations for active toddlers.',
                  color: 'bg-emerald-50 text-emerald-900 border-emerald-200',
                },
                {
                  title: '🦸 Superhero Squad & Marvel Adventure',
                  desc: 'Cape giveaways, power-punch obstacles, superhero backdrops, and action-packed music.',
                  color: 'bg-blue-50 text-blue-900 border-blue-200',
                },
                {
                  title: '👑 Princess & Fairy Tale Magic',
                  desc: 'Pastel balloon castles, tiaras, fairy lights, magical wand stations, and royal carpet walks.',
                  color: 'bg-pink-50 text-pink-900 border-pink-200',
                },
                {
                  title: '🎨 Cartoon & Anime Wonderland',
                  desc: 'Peppa Pig, Cocomelon, Baby Shark, Chhota Bheem, or Doraemon themed setups with mascot visits.',
                  color: 'bg-amber-50 text-amber-900 border-amber-200',
                },
                {
                  title: '🧜‍♀️ Under the Sea & Mermaid Splash',
                  desc: 'Aquatic ocean balloon arches, shell props, blue lighting, and underwater treasure hunts.',
                  color: 'bg-cyan-50 text-cyan-900 border-cyan-200',
                },
                {
                  title: '🚀 Space & Science Explorer',
                  desc: 'Rockets, galaxy stars, glowing elements, and interactive sensory science experiments.',
                  color: 'bg-purple-50 text-purple-900 border-purple-200',
                },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border ${t.color} shadow-sm hover:scale-[1.02] transition-transform`}
                >
                  <h3 className="text-base font-black mb-2">{t.title}</h3>
                  <p className="text-xs sm:text-sm opacity-90 leading-relaxed font-medium">{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Planning Process Step by Step */}
          <section className="py-16">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
                Our 4-Step Birthday Party Planning Process
              </h2>
              <p className="text-slate-600 font-medium text-sm sm:text-base">
                How we turn your celebration idea into an unforgettable, hassle-free reality:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {[
                {
                  step: '01',
                  title: 'Consultation & Theme Choice',
                  desc: 'We discuss your child’s age, favorite theme, guest count, and date preferences.',
                },
                {
                  step: '02',
                  title: 'Custom Package & Menu',
                  desc: 'You select the package, food menu, entertainment acts, and custom decor elements.',
                },
                {
                  step: '03',
                  title: 'Venue Setup & Disinfection',
                  desc: 'Our team crafts the theme setup, sanitizes the play area, and tests the audiovisual gear.',
                },
                {
                  step: '04',
                  title: 'Seamless Event Day Hosting',
                  desc: 'You arrive and celebrate! Our party anchors and safety managers coordinate every moment.',
                },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative flex flex-col justify-between"
                >
                  <div className="text-3xl font-black text-pink-500/30 mb-4">{s.step}</div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Packages Section */}
          <section className="py-16" id="packages">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 font-bold text-xs mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Transparent & Value-Packed</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Birthday Celebration Packages Available
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium mt-2">
                Choose the package that best fits your family’s celebration style:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {packagesList.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.is_popular
                      ? 'bg-gradient-to-b from-pink-50 via-white to-pink-50/30 border-2 border-pink-500 shadow-xl lg:-translate-y-2'
                      : 'bg-white border border-slate-200 shadow-md hover:shadow-lg'
                  }`}
                >
                  {pkg.is_popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black text-xs px-4 py-1 rounded-full shadow-md uppercase tracking-wider">
                      Most Popular Choice
                    </div>
                  )}

                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-black text-slate-900 mb-2">{pkg.name}</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{pkg.description}</p>
                      <div className="mt-4 inline-block px-3 py-1.5 rounded-xl bg-pink-100/70 text-pink-800 font-black text-xs">
                        {pkg.price}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#book-now"
                    className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-center transition-all ${
                      pkg.is_popular
                        ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {pkg.cta_text}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm mb-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                What Parents in Patna Are Saying About Our Birthday Parties
              </h2>
              <p className="text-slate-600 text-sm font-medium mt-2">
                Real feedback from moms and dads who hosted milestone birthdays at Phulwari:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-pink-50/40 p-8 rounded-3xl border border-pink-100 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic font-medium mb-6">
                    &ldquo;We celebrated our daughter’s 2nd birthday at Phulwari with the Cocomelon theme. The soft-play
                    zone was a lifesaver—all the toddlers played happily without a single scrape or cry, and we didn’t
                    have to run after them constantly. The staff handled the cake cutting and games effortlessly!&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-pink-200/60">
                  <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center font-bold text-pink-700 text-xs">
                    PS
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Pooja &amp; Saurabh Singh</p>
                    <p className="text-[11px] text-slate-500 font-semibold">Boring Road, Patna</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50/40 p-8 rounded-3xl border border-purple-100 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic font-medium mb-6">
                    &ldquo;Best decision we made for our son’s 4th birthday. The Jungle Safari decor looked straight out
                    of a magazine, and the game host kept all 25 kids thoroughly entertained for 2 solid hours. Every
                    parent asked us where we found this venue!&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-purple-200/60">
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700 text-xs">
                    AK
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">Ananya &amp; Kunal Verma</p>
                    <p className="text-[11px] text-slate-500 font-semibold">Kankarbagh, Patna</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Planning Tips Section */}
          <section className="py-12 bg-amber-50/60 rounded-3xl p-8 border border-amber-200 mb-16">
            <h3 className="text-xl font-black text-amber-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Helpful Tips for Planning a Stress-Free Kids Birthday Party in Patna</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-amber-950 font-medium">
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-700">1.</span>
                <span><strong>Keep party length under 2.5 hours:</strong> Young toddlers get overwhelmed and overtired quickly; 2 hours of play, cake, and snacks is the golden rule.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-700">2.</span>
                <span><strong>Schedule around nap times:</strong> For 1–3 year olds, late afternoon slots (4:00 PM to 6:30 PM) post-afternoon nap offer the best cheerful moods.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-700">3.</span>
                <span><strong>Opt for bite-sized finger foods:</strong> Mini sandwiches, cut fruits, french fries, and cupcakes allow kids to snack comfortably while playing.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-700">4.</span>
                <span><strong>Prioritize child safety:</strong> Select an enclosed, sanitized venue with soft floor mats so parents can converse without panic.</span>
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
                Got questions about party bookings, decorations, and safety? Here are answers to common queries:
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <FaqAccordion faqs={faqs} />
            </div>
          </section>

          {/* Lead Booking Form */}
          <section className="py-12" id="book-now">
            <LeadForm packages={packagesList} />
          </section>
        </div>
      </div>
    </>
  )
}
