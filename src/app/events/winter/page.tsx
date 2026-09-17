'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  MessageCircle,
  Snowflake,
  Sparkles,
  ShieldCheck,
  Award,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Heart,
  Palette,
  Users2,
  BookOpen,
  Coffee,
  Flame,
  Star,
  Quote,
  ArrowRight,
  SunMedium,
  PartyPopper,
} from 'lucide-react';

const winterImages = [
  { src: '/winter_camp/image.png', alt: 'Winter Carnival and Kids Activities at Phulwari Patna' },
  { src: '/winter_camp/image copy.png', alt: 'Creative Winter Craft and Fun Activities' },
  { src: '/wintercamp.webp', alt: 'Winter Camp Celebration at Phulwari' },
];

const developmentBenefits = [
  {
    title: 'Boosts Immunity and Stamina',
    desc: 'Controlled physical games, outdoor movement, and active play in the pleasant winter sun help build stronger immunity and physical resilience.',
    icon: SunMedium,
    color: '#FF6B00',
    bg: '#FFF3EB',
  },
  {
    title: 'Enhances Socialization',
    desc: 'Winter festivals and group events provide children with natural opportunities to interact, share, make new friends, and build social confidence.',
    icon: Users2,
    color: '#3D8BFF',
    bg: '#E5EFFF',
  },
  {
    title: 'Fosters Creativity Through Themes',
    desc: 'Winter holidays, harvest festivals, and New Year celebrations serve as fantastic thematic foundations for arts, crafts, storytelling, and role-play.',
    icon: Palette,
    color: '#FF4D8D',
    bg: '#FFE6EF',
  },
  {
    title: 'Strengthens Family Bonding',
    desc: 'Many of our winter events are designed as parent-child interactive workshops, allowing busy parents to carve out dedicated, joyful moments with their little ones.',
    icon: Heart,
    color: '#34B36B',
    bg: '#E3F7EA',
  },
];

const calendarHighlights = [
  {
    num: '1',
    title: 'The Annual Phulwari Winter Carnival',
    desc: 'Our winter wonderland has a special treat for every child. The multi-day carnival featuring game stalls, puppet shows, magic performances, puppet making workshops and mini rides is a major hit with kids and parents in Patna. Kids get to flaunt their warm winter gear, participate in interactive talent shows and indulge in healthy winter desserts.',
    badge: 'Carnival Highlight',
    color: '#FF4D8D',
    bg: '#FFE6EF',
    icon: PartyPopper,
  },
  {
    num: '2',
    title: 'Creative Winter Art & Craft Workshops',
    desc: 'Winter is the perfect time to curl up inside and let your imagination run wild. Our kids art and crafts workshops in Patna during the winter keep little hands busy by creating snowflake cutouts, 3D winter landscape paintings, clay snowmen, and eco-friendly New Year wish cards. This will greatly help in improving fine motor skills, color coordination, and patience in children.',
    badge: 'Art & Craft',
    color: '#8B5CF6',
    bg: '#EFE7FE',
    icon: Palette,
  },
  {
    num: '3',
    title: 'Cultural Festivities and Harvest Celebrations',
    desc: 'January is a time of year in India when a host of vibrant festivals such as Makar Sankranti, Lohri, and Republic Day are celebrated. We do that by reiterating cultural stories, folk songs, and dances, as well as holding workshops on making kites and dressing up in traditional attires. It is an opportunity to engage children with their cultural heritages creatively and interactively.',
    badge: 'Cultural Traditions',
    color: '#E8A621',
    bg: '#FFF3D9',
    icon: Sparkles,
  },
  {
    num: '4',
    title: 'Storytelling Around the "Warm Hearth"',
    desc: 'There is nothing like a good captivating story on a cold afternoon. Our interactive story time sessions will take your child to a magical fantasy world! Using props, voices and puppets, our sessions encourage listening skills, build vocabulary and a lifetime love of reading.',
    badge: 'Puppetry & Stories',
    color: '#3D8BFF',
    bg: '#E5EFFF',
    icon: BookOpen,
  },
];

const specialFeatures = [
  {
    title: 'Child-friendly and heated areas',
    desc: 'Although we plan to have all our outdoor activities on a sunny patch of midday, all our indoor workshops are held in a climate-controlled, cozy, and child-proofed environment to protect the children from cold drafts.',
    icon: Flame,
    color: '#FF6B00',
    bg: '#FFF3EB',
  },
  {
    title: 'Qualified educators',
    desc: 'Every event and workshop is staffed with trained child educators, artists, and activity facilitators who care to make each child feel included, safe, and encouraged.',
    icon: Award,
    color: '#3D8BFF',
    bg: '#E5EFFF',
  },
  {
    title: 'Educational activities',
    desc: 'Although we strive to entertain our young guests, each activity is designed to have a subtle educational facet that engages a child’s cognitive, physical, or emotional development.',
    icon: Sparkles,
    color: '#8B5CF6',
    bg: '#EFE7FE',
  },
  {
    title: 'Maternal wellness corners',
    desc: 'Since the season is also a harsh one for many mothers, our event will include lounge and wellness areas where they can network or unwind.',
    icon: Coffee,
    color: '#FF4D8D',
    bg: '#FFE6EF',
  },
];

const weeklySchedule = [
  {
    day: 'Saturday Morning',
    activity: 'Little Chefs Winter Baking & Healthy Snack Making',
    ageGroup: '3 to 8 Years',
    badgeColor: '#E8A621',
    badgeBg: '#FFF3D9',
  },
  {
    day: 'Saturday Evening',
    activity: 'Winter Puppet Theatre & Interactive Storytelling',
    ageGroup: '2 to 6 Years',
    badgeColor: '#3D8BFF',
    badgeBg: '#E5EFFF',
  },
  {
    day: 'Sunday Morning',
    activity: 'Family Fun Games & Mother-Child Fitness Circuit',
    ageGroup: 'All Ages',
    badgeColor: '#34B36B',
    badgeBg: '#E3F7EA',
  },
  {
    day: 'Sunday Evening',
    activity: 'Winter Canvas Painting & Craft Masterclass',
    ageGroup: '4 to 10 Years',
    badgeColor: '#FF4D8D',
    badgeBg: '#FFE6EF',
  },
  {
    day: 'Mid-Week (Holidays)',
    activity: 'Special Thematic Workshops (Science Magic, Music & Movement)',
    ageGroup: '3 to 9 Years',
    badgeColor: '#8B5CF6',
    badgeBg: '#EFE7FE',
  },
];

const neighborhoods = [
  'Boring Road & Boring Canal Road',
  'Patliputra Colony',
  'Kankerbagh',
  'Bailey Road & Saguna More',
  'Rajendra Nagar & Kadamkuan',
  'Kidwaipuri & Fraser Road',
];

const testimonials = [
  {
    quote:
      'The winter carnival at Phulwari was the highlight of our daughter\'s vacation! The games were well-organized, the staff was exceptionally caring, and she loved the craft workshop. It is the best place for kids\' events in Patna.',
    author: 'Ankita Verma',
    locality: 'Patliputra Colony',
    rating: 5,
  },
  {
    quote:
      'I was looking for a productive winter camp where my son could learn something new instead of watching cartoons all day. Phulwari’s storytelling and art sessions completely transformed his winter break. Highly recommended for all Patna parents!',
    author: 'Rajesh Kumar',
    locality: 'Boring Road',
    rating: 5,
  },
];

export default function WinterEventsPage() {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const whatsappEnrollUrl = `https://wa.me/916207368839?text=${encodeURIComponent(
    'Hello Phulwari! I would like to enroll my child in the Winter Events & Kids Carnival in Patna. Please share schedule details and slot availability.'
  )}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'LocalBusiness',
                '@id': 'https://www.phulwari.co.in/#organization',
                name: 'Phulwari Mother & Child Activity Centre',
                description:
                  'Mother and child activity centre in Patna offering winter camps, kids carnivals, art workshops, and structured developmental activities.',
                url: 'https://www.phulwari.co.in/events/winter',
                telephone: '+91 62073 68839',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road',
                  addressLocality: 'Patna',
                  addressRegion: 'Bihar',
                  postalCode: '800001',
                  addressCountry: 'IN',
                },
                areaServed: [
                  'Boring Road',
                  'Patliputra Colony',
                  'Kankerbagh',
                  'Bailey Road',
                  'Saguna More',
                  'Rajendra Nagar',
                  'Kadamkuan',
                  'Kidwaipuri',
                  'Fraser Road',
                ],
                knowsAbout: [
                  'Child Development',
                  'Kids Carnivals',
                  'Art and Craft Workshops',
                  'Storytelling Sessions',
                  'Parent-Child Bonding Activities',
                ],
              },
              {
                '@type': 'EventSeries',
                name: 'Phulwari Winter Events & Kids Carnival',
                description:
                  'A seasonal winter calendar offering interactive workshops, cultural festivities, puppet shows, storytelling, and family bonding activities for children in Patna.',
                location: {
                  '@type': 'Place',
                  name: 'Phulwari Mother & Child Activity Centre',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road',
                    addressLocality: 'Patna',
                    addressRegion: 'Bihar',
                    postalCode: '800001',
                    addressCountry: 'IN',
                  },
                },
                organizer: {
                  '@type': 'Organization',
                  name: 'Phulwari Mother & Child Activity Centre',
                  url: 'https://www.phulwari.co.in',
                },
                audience: {
                  '@type': 'Audience',
                  audienceType: 'Toddlers, Kids, and Mothers',
                },
              },
              {
                '@type': 'Review',
                itemReviewed: {
                  '@id': 'https://www.phulwari.co.in/#organization',
                },
                author: {
                  '@type': 'Person',
                  name: 'Ankita Verma',
                },
                reviewBody:
                  'The winter carnival at Phulwari was the highlight of our daughter\'s vacation! The games were well-organized, the staff was exceptionally caring, and she loved the craft workshop.',
              },
              {
                '@type': 'Review',
                itemReviewed: {
                  '@id': 'https://www.phulwari.co.in/#organization',
                },
                author: {
                  '@type': 'Person',
                  name: 'Rajesh Kumar',
                },
                reviewBody:
                  'I was looking for a productive winter camp where my son could learn something new instead of watching cartoons all day. Phulwari’s storytelling and art sessions completely transformed his winter break.',
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-[#FDFBFA] text-[#2B2D42] font-sans">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-blue-100/60 bg-blue-50/40 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/events" className="hover:text-blue-600 transition">
              Camps & Events
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900">Winter Events & Carnival</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-10 pb-16 lg:py-20 bg-gradient-to-b from-blue-50/60 via-white to-[#FDFBFA]">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-cyan-100/40 blur-3xl pointer-events-none" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-pink-100/40 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Heading & Introduction */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs sm:text-sm font-black shadow-xs">
                  <Snowflake className="w-4 h-4 text-cyan-600 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Patna&apos;s Most Celebrated Winter Carnival &amp; Camp</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.18]">
                  Winter Wonderland &amp; Kids Events in Patna
                </h1>

                <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  <p>
                    Winter in Patna has brought out the spirit in the air and the season has transformed into a celebration of fun, frolic, creativity and family bonding. At Phulwari Mother &amp; Child Activity Centre, we offer winter events and kids carnival in Patna that engages little minds and leaves them stimulated, excited and beaming with joy.
                  </p>
                  <p>
                    As parents, you may sometimes struggle with finding meaningful activities that stimulate and engage your kids&apos; minds during the cold winter months. Phulwari makes it possible to create a magical space, where pre-schoolers, kids and moms can come together, get involved in exciting workshops and celebrate festivals with a community. Whether you are looking for a vibrant winter camp for kids in Patna or exciting family weekend events, our winter engagement programs offer a variety of options that will keep your children busy learning and exploring the world.
                  </p>
                </div>

                {/* Key badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-xs text-slate-500 font-bold">Ages Welcomed</div>
                    <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">2 to 12 Years</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-xs text-slate-500 font-bold">Batches</div>
                    <div className="text-sm sm:text-base font-black text-slate-900 mt-0.5">Morning &amp; Evening</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
                    <div className="text-xs text-slate-500 font-bold">Comfort &amp; Care</div>
                    <div className="text-sm sm:text-base font-black text-emerald-700 mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Heated &amp; Safe
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-3">
                  <a
                    href={whatsappEnrollUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[#FF4D8D] hover:bg-[#E03A76] text-white font-black text-sm sm:text-base shadow-lg shadow-pink-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Register for Winter Events</span>
                  </a>

                  <a
                    href="tel:+916207368839"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 font-bold text-sm sm:text-base hover:bg-slate-50 hover:border-slate-300 shadow-xs active:scale-95 transition-all"
                  >
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>Call +91 62073 68839</span>
                  </a>
                </div>

                {/* Trust markers */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 pt-2">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Child-Safe Infrastructure
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" /> Certified Facilitators
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 4.9/5 Parent Rating
                  </span>
                </div>
              </div>

              {/* Right Column: Dynamic Photo Carousel Showcase */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden p-2.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-pink-500 shadow-2xl shadow-blue-500/20">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={winterImages[activeImgIdx].src}
                      alt={winterImages[activeImgIdx].alt}
                      className="w-full h-full object-cover transition-all duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-300 flex items-center gap-1">
                        <Snowflake className="w-3.5 h-3.5" /> Phulwari Winter Showcase
                      </span>
                      <h3 className="text-base sm:text-lg font-black mt-1">
                        Fun, Warmth &amp; Child Creativity in Patna
                      </h3>
                      <p className="text-xs text-slate-200 mt-0.5">Kidwaipuri Main Road, Patna</p>
                    </div>
                  </div>
                </div>

                {/* Thumbnail selector */}
                <div className="flex items-center justify-center gap-3">
                  {winterImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIdx(idx)}
                      className={`relative rounded-xl overflow-hidden border-2 w-20 h-14 transition-all ${
                        activeImgIdx === idx ? 'border-pink-500 scale-105 shadow-md ring-2 ring-pink-400/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Why Winter is the Ideal Season for Child Development */}
        <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 inline-block">
                Seasonal Growth &amp; Well-being
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
                Why Winter is the Ideal Season for Child Development
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                The drop in temperature often tempts children to sit at home wrapped in blankets and spend time on their digital devices. However, pediatric experts say that winter is the best time for kids to indulge in physical and mental activities as the pleasant weather keeps fatigue away. Here are some of the benefits of including seasonal kids activities in Patna during the winter season:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {developmentBenefits.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-3xl bg-[#FFFDFB] border border-slate-200/80 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center font-black shadow-xs"
                        style={{ backgroundColor: item.bg, color: item.color }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-lg font-black text-slate-900 leading-snug">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section: Highlights of Our Winter Event Calendar */}
        <section className="py-16 sm:py-24 bg-[#FAFBFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-purple-100 text-purple-800 inline-block">
                Seasonal Event Lineup
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
                Highlights of Our Winter Event Calendar
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                Our winter event lineup is diverse, ensuring that every child finds something they love. From high-energy carnivals to peaceful storytelling corners, our seasonal offerings cover a wide spectrum of engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {calendarHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.num}
                    className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 space-y-4 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="px-3.5 py-1 rounded-full text-xs font-black"
                        style={{ backgroundColor: item.bg, color: item.color }}
                      >
                        {item.badge}
                      </span>
                      <span className="font-mono font-black text-slate-300 text-3xl">0{item.num}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section: What Makes Phulwari’s Winter Events Special? */}
        <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
              <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 inline-block">
                Uncompromising Quality &amp; Warmth
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
                What Makes Phulwari’s Winter Events Special?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                When parents search for the best winter camps and events for kids in Patna, they look for safety, organization, and genuine engagement. Phulwari stands out as a trusted community hub for several distinct reasons:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-[#FFFBF8] border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-3"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold"
                      style={{ backgroundColor: feat.bg, color: feat.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-black text-slate-900">{feat.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section: A Glimpse into Our Weekly Winter Schedule (Table) */}
        <section className="py-16 sm:py-24 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
              <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-800 inline-block">
                Structured Weekly Layout
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
                A Glimpse into Our Weekly Winter Schedule
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal">
                To ensure parents can plan their weekends and holidays efficiently, our winter programs follow a structured weekly layout:
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-extrabold uppercase text-xs tracking-wider">
                      <th className="py-4 px-6">Day of the Week</th>
                      <th className="py-4 px-6">Featured Winter Activity</th>
                      <th className="py-4 px-6 text-right">Age Group</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {weeklySchedule.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition">
                        <td className="py-4 px-6 font-black text-slate-900 whitespace-nowrap flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>{row.day}</span>
                        </td>
                        <td className="py-4 px-6 text-slate-700 font-semibold">{row.activity}</td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-extrabold"
                            style={{ backgroundColor: row.badgeBg, color: row.badgeColor }}
                          >
                            {row.ageGroup}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Neighborhoods Across Patna We Welcome */}
        <section className="py-16 sm:py-20 bg-white border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-3">
              <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-pink-100 text-pink-800 inline-block">
                Citywide Reach
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
                Neighborhoods Across Patna We Welcome
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal">
                Families travel from all corners of the city to participate in our seasonal gatherings. We regularly host children and parents from prominent Patna residential hubs:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
              {neighborhoods.map((area, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#FFFBF8] border border-slate-200 text-center font-bold text-xs sm:text-sm text-slate-800 shadow-xs hover:border-pink-300 hover:shadow-md transition"
                >
                  <MapPin className="w-4 h-4 text-pink-500 mx-auto mb-1.5" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Parent Testimonials: Winter Memories at Phulwari */}
        <section className="py-16 sm:py-24 bg-[#FFF9F6]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-14">
              <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 inline-block">
                Parent Experiences
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
                Parent Testimonials: Winter Memories at Phulwari
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm relative flex flex-col justify-between gap-6 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-pink-300 opacity-40" />
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed font-semibold">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-black text-sm">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{t.author}</h4>
                      <p className="text-xs text-slate-500 font-semibold">{t.locality}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Join the Celebration This Winter! (Bottom CTA) */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 text-cyan-300 border border-white/20 inline-block">
              Limited Seats Per Batch
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Join the Celebration This Winter!
            </h2>

            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
              Winter passes away, but the memories of winters are made of our childhood days. Do not let your child miss this season of life by being cooped up in the house. Let him/her explore his/her creativity, socialize with other kids or even play and have fun at Phulwari&apos;s winter events.
            </p>

            <p className="text-xs sm:text-sm text-amber-300 font-bold">
              Our special winter batches have limited seats so that we may provide children with a more personal and interactive experience. Call and enroll your kid(s) today!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href={whatsappEnrollUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl bg-[#FF4D8D] hover:bg-[#E03A76] text-white font-black text-base shadow-xl hover:scale-105 transition-all"
              >
                Enroll on WhatsApp
              </a>

              <a
                href="tel:+916207368839"
                className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-black text-base shadow-xl hover:bg-slate-100 transition-all"
              >
                Call +91 62073 68839
              </a>
            </div>

            <p className="text-xs text-slate-400 pt-4 font-mono">
              Center Address: M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001
            </p>
          </div>
        </section>
      </div>
    </>
  );
}