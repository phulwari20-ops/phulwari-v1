import { createClient } from '@/utils/supabase/server'
import { ShieldCheck, Camera, PartyPopper, Gamepad2, Users, Sparkles, Droplets, Star, Quote, ChevronDown, CalendarHeart } from 'lucide-react'
import FaqAccordion from './FaqAccordion'
import LeadForm from './LeadForm'

// Define interfaces based on our schema
interface BirthdayPackage {
  id: number
  name: string
  description: string
  features: string[]
  ideal_for: string
  is_popular: boolean
  cta_text: string
}

export default async function LandingPage() {
  let packages: any[] | null = null
  let configRow: any = null

  try {
    const supabase = await createClient()

    // Fetch packages from Supabase
    const { data: pkgData } = await supabase
      .from('party_packages')
      .select('*')
      .eq('is_visible', true)
      .order('id', { ascending: true })
    packages = pkgData || [];
    
    console.log(`✅ Fetched ${packages.length} active party packages from DB`);
    try {
      const { appLog } = await import('@/lib/logger');
      appLog(`Fetched ${packages.length} active party packages from DB`);
    } catch (e) {
      // logger might not be available
    }

    // Fetch landing config from Supabase
    const { data: cfgData } = await supabase
      .from('birthday_landing_config')
      .select('*')
      .eq('id', 1)
      .single()
    configRow = cfgData
  } catch (err) {
    console.error('Failed to load birthday page data from Supabase:', err)
  }

  // Dynamic config with precise fallback values matching mockup
  const config = configRow || {
    hero_section: {
      pill_text: "🎉 Zero Stress, 100% Fun",
      headline_part1: "Give Your Little One an",
      headline_highlight: "Unforgettable",
      headline_part2: "1st to 5th Birthday",
      sub_headline: "— Zero Stress for You!",
      description: "Safe, spacious, and toddler-friendly party celebrations at Phulwari Activity Centre. Creative themes, soft-play fun, and complete end-to-end event management.",
      cta_text: "Check Date Availability & Get Free Quote",
      hero_image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop", 
      playzone_images: [
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400", 
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400", 
        "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400"  
      ]
    },
    trust_badges: [
      { icon: "ShieldCheck", title: "100% Safe &", subtitle: "Hygienic Environment" },
      { icon: "Camera", title: "24/7 CCTV", subtitle: "Monitored" },
      { icon: "PartyPopper", title: "100+ Happy", subtitle: "Birthdays Hosted" }
    ],
    pain_points_section: {
      title: "Planning a Toddler’s Birthday Party Shouldn't Leave You Exhausted.",
      description: "When your child is under 5, hosting a birthday party at home or in an adult banquet hall can be overwhelming:",
      points: [
        { icon: "ShieldAlert", title: "The Mess & Safety Risks", desc: "Sharp corners, fragile decor, and crowded spaces.", image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400" },
        { icon: "Frown", title: "Toddler Boredom", desc: "Traditional party venues don't keep 1–5-year-olds engaged.", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400" },
        { icon: "Frown", title: "Parent Exhaustion", desc: "You spend the whole party managing logistics instead of enjoying the moment.", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400" }
      ],
      advantage_title: "The Phulwari Advantage:",
      advantage_desc: "At Phulwari Mother & Child Activity Centre, we create child-centric celebrations where your little one can play freely in a safe, soft-padded environment while you relax and celebrate with guests.",
      advantage_image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600",
      advantage_logo: "https://api.dicebear.com/7.x/bottts/svg?seed=teddy"
    },
    features_section: {
      title: "Why Phulwari is Perfect for Ages 0–5",
      features: [
        { icon: "ShieldCheck", title: "Toddler-Proof Safety", desc: "Cushioned play areas, non-toxic materials, and rounded edges built specifically for early childhood safety." },
        { icon: "Gamepad2", title: "Interactive Play Zone Access", desc: "Keeps toddlers active with age-appropriate games, music, soft play, and creative art activities." },
        { icon: "Crown", title: "Magical Custom Themes", desc: "Cocomelon, Peppa Pig, Jungle Safari, Baby Shark, Princess, Superhero, and custom setups tailored to your kid's favorite world!" },
        { icon: "Droplets", title: "Sanitized & Hygienic Premises", desc: "Cleaned and disinfected before every event to keep little immune systems safe." },
        { icon: "Camera", title: "Picture-Perfect Backdrops", desc: "Beautiful, brightly lit theme setups designed for memory-making photo sessions." }
      ]
    },
    testimonials_section: {
      title: "What Parents Are Saying",
      reviews: [
        { text: "We hosted our son's 2nd birthday at Phulwari, and it was the best decision! The space was completely child-proof, so we didn't have to constantly chase him around. The theme setup was gorgeous!", author: "Priya & Amit S.", rating: 5, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Priya" },
        { text: "Usually, kids under 4 get bored in regular banquet halls. Here, the kids were busy in the activity zone the whole time. Stress-free event planning at its best!", author: "Ritu M.", rating: 5, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ritu" }
      ]
    },
    faq_section: {
      title: "Frequently Asked Questions",
      faqs: [
        { question: "Is the venue safe for 1 to 3-year-old toddlers?", answer: "Yes! Phulwari is designed as a Mother & Child Activity Centre. All play areas feature child-safe infrastructure, rounded edges, clean floors, and 24/7 CCTV surveillance." },
        { question: "Can we bring our own food or caterer?", answer: "Yes, we offer flexible party planning options so you can choose your preferred menu or let us assist you with catering recommendations." },
        { question: "How early should we book the venue?", answer: "Weekend slots fill up quickly. We recommend reserving your date at least 2–3 weeks in advance." }
      ],
      faq_image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600"
    }
  }

  const displayPackages: BirthdayPackage[] = (packages || []).map((pkg: any, idx: number) => {
    const featuresArray = pkg.includes 
      ? pkg.includes.split(',').map((f: string) => f.trim()).filter(Boolean)
      : [];
      
    const isPremium = pkg.name?.toLowerCase().includes('premium');
    
    let desc = pkg.tagline || pkg.description || '';
    if (pkg.price) {
      desc = `${desc} | Price: ${pkg.price}`;
    }
    
    return {
      id: pkg.id || idx + 1,
      name: pkg.name || 'Unnamed Package',
      description: desc,
      features: featuresArray,
      ideal_for: isPremium ? "for 2nd - 5th Birthdays" : "",
      is_popular: isPremium,
      cta_text: pkg.cta_text || (isPremium ? "Get Premium Package Quote" : pkg.name?.toLowerCase().includes('custom') ? "Customize My Party" : "Inquire About Package")
    };
  });

  const renderIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Camera': return <Camera className={className} />;
      case 'PartyPopper': return <PartyPopper className={className} />;
      case 'Gamepad2': return <Gamepad2 className={className} />;
      case 'Droplets': return <Droplets className={className} />;
      default: return <Sparkles className={className} />;
    }
  }

  const formatFeature = (feature: string, isPremium: boolean) => {
    if (feature.includes(' (')) {
      const [bold, normal] = feature.split(' (');
      return (
        <>
          <strong>{bold}</strong><br/>
          <span className="text-slate-500 text-xs">({normal}</span>
        </>
      );
    }
    
    if (isPremium) {
      if (feature.includes(' & ')) {
        const [bold, normal] = feature.split(' & ');
        return (
          <>
            <strong>{bold} &</strong><br/>
            <span className="text-slate-500 text-xs">{normal}</span>
          </>
        );
      }

      if (feature.includes(' and cake ')) {
        const [bold, normal] = feature.split(' and cake ');
        return (
          <>
            <strong>{bold} and cake</strong><br/>
            <span className="text-slate-500 text-xs">{normal}</span>
          </>
        );
      }
    } else {
      if (feature.startsWith('Custom Themes, Specialized ')) {
        return (
          <>
            <strong>Custom Themes, Specialized</strong><br/>
            <span className="text-slate-500 text-xs">Artists, Magicians, Tattoo Artists, or Character Mascots</span>
          </>
        );
      }

      if (feature.startsWith('Custom Activity Stations')) {
        return (
          <>
            <strong>Custom Activity Stations</strong><br/>
            <span className="text-slate-500 text-xs">(Art & Craft, Mini Disco, Toddler Gym (Upto 6 years))</span>
          </>
        );
      }
    }

    return <span>{feature}</span>;
  }

  return (
    <div 
      className="relative min-h-screen w-full bg-[#FFFBF9] text-[#344054] font-sans pt-24 pb-12 overflow-x-hidden" 
      style={{ 
        fontFamily: "'Quicksand', 'Poppins', -apple-system, sans-serif",
        backgroundColor: '#FFFDFB'
      }}
    >
      
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-[700px] bg-gradient-to-b from-[#FFF0EB] to-transparent -z-20"></div>
      <div className="absolute top-[10%] right-0 w-[300px] h-[300px] bg-[#E3F2FD] rounded-full blur-3xl opacity-40 -z-10 pointer-events-none"></div>
      <div className="absolute top-[35%] left-0 w-[400px] h-[400px] bg-[#FCE4EC] rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>

      {/* Centering Layout Wrapper */}
      <div className="w-full flex flex-col items-center">
        
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto px-6 pt-12 pb-20 flex flex-col lg:flex-row items-center gap-12 z-10">
          
          {/* Left Side: Headline, CTA & Trust Badges */}
          <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFEED4] text-[#855B14] font-extrabold text-xs mb-6 shadow-sm tracking-wide">
              <span>{config.hero_section.pill_text}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[3.8rem] font-extrabold text-[#24364B] tracking-tight mb-4 leading-[1.15]">
              {config.hero_section.headline_part1} <br/>
              <span className="bg-gradient-to-r from-[#FF4081] to-[#7C3AED] bg-clip-text text-transparent text-5xl md:text-6xl lg:text-[4.2rem] block my-2 font-black">
                {config.hero_section.headline_highlight}
              </span>
              {config.hero_section.headline_part2}
              <span className="block text-[#FF4081] mt-2 font-extrabold">— Zero Stress for You!</span>
            </h1>
            
            <p className="mt-4 text-slate-600 max-w-xl mb-8 font-semibold leading-relaxed text-sm md:text-base">
              {config.hero_section.description}
            </p>
            
            <a 
              href="#book-now" 
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4.5 bg-[#FF4081] hover:bg-[#E91E63] text-white font-extrabold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm tracking-widest uppercase mb-10"
            >
              {config.hero_section.cta_text} 
              <span className="ml-2.5 bg-white/20 p-1.5 rounded-lg"><CalendarHeart className="w-4 h-4" /></span>
            </a>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 w-full">
              {config.trust_badges.map((badge: any, i: number) => (
                <div key={i} className="flex items-center gap-3 bg-white px-5 py-3 rounded-[24px] shadow-sm border border-slate-100 min-w-[190px]">
                  <div className={`p-2.5 rounded-full shrink-0 ${i===0 ? 'bg-emerald-50 text-emerald-600' : i===1 ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                    {renderIcon(badge.icon, "w-5 h-5")}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black text-slate-800 leading-tight">{badge.title}</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-0.5">{badge.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Visual area (overlapping photos) */}
          <div className="flex-1 relative w-full max-w-[500px] lg:max-w-none h-[400px] lg:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FFF0F2] to-[#FFF9F6] rounded-[48px] -z-10 border border-slate-100"></div>

            {/* Large curved rectangle main photo */}
            <div className="w-[340px] h-[240px] lg:w-[420px] lg:h-[300px] bg-white p-2 shadow-2xl rounded-[32px] border-[8px] border-white z-10 rotate-[-4deg] overflow-hidden">
              <img 
                src={config.hero_section.playzone_images?.[0] || 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500'} 
                alt="Playzone play area" 
                className="w-full h-full object-cover rounded-[24px]"
              />
            </div>

            {/* 2 Smaller Overlapping Polaroid Photos */}
            <div className="absolute bottom-[2%] left-[5%] w-[150px] h-[110px] bg-white p-1.5 shadow-xl rounded-[16px] border border-slate-100 rotate-[-12deg] z-20 overflow-hidden">
              <img src={config.hero_section.playzone_images?.[1] || 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=300'} alt="Playzone 2" className="w-full h-full object-cover rounded-[10px]" />
            </div>

            <div className="absolute top-[5%] right-[5%] w-[150px] h-[110px] bg-white p-1.5 shadow-xl rounded-[16px] border border-slate-100 rotate-[10deg] z-20 overflow-hidden">
              <img src={config.hero_section.playzone_images?.[2] || 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300'} alt="Playzone 3" className="w-full h-full object-cover rounded-[10px]" />
            </div>

            <div className="absolute bottom-[40%] right-[-5%] text-pink-300 animate-bounce -z-10"><Sparkles className="w-12 h-12" /></div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="w-full max-w-7xl mx-auto py-20 px-6 bg-white relative">
          <div className="mb-12 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#24364B] mb-4">
              {config.pain_points_section.title}
            </h2>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              {config.pain_points_section.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {config.pain_points_section.points.map((point: any, i: number) => (
                <div key={i} className="bg-[#FFFBFB] p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col gap-4 text-center items-center justify-between">
                  <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 bg-rose-50 text-rose-500`}>
                    {renderIcon(point.icon, "w-8 h-8")}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-extrabold text-slate-800 mb-2 leading-tight">{point.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{point.desc}</p>
                  </div>
                  <div className="w-full h-24 bg-slate-100 rounded-[20px] overflow-hidden flex items-center justify-center">
                    {point.image ? (
                      <img src={point.image} alt={point.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold font-sans">Illustration</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="col-span-1 lg:col-span-5">
              <div className="bg-[#FFFDF0] rounded-[32px] p-8 md:p-10 border border-[#FEEA9B] shadow-sm relative h-full flex flex-col justify-center text-center lg:text-left">
                <div className="absolute top-6 right-6 text-[#FEEA9B]"><Sparkles className="w-8 h-8"/></div>
                <h3 className="text-2xl font-extrabold text-[#D4A017] mb-3 relative z-10">{config.pain_points_section.advantage_title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed relative z-10 mb-6 font-medium">
                  {config.pain_points_section.advantage_desc}
                </p>
                
                <div className="flex items-end justify-between mt-4 gap-4 relative z-10">
                  <div className="w-20 h-20 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="25" cy="25" r="12" fill="#BCAAA4" />
                      <circle cx="25" cy="25" r="6" fill="#8D6E63" />
                      <circle cx="75" cy="25" r="12" fill="#BCAAA4" />
                      <circle cx="75" cy="25" r="6" fill="#8D6E63" />
                      <circle cx="50" cy="55" r="30" fill="#A1887F" />
                      <ellipse cx="50" cy="58" rx="14" ry="10" fill="#D7CCC8" />
                      <circle cx="50" cy="54" r="3.5" fill="#3E2723" />
                      <circle cx="38" cy="45" r="4.5" fill="#3E2723" />
                      <circle cx="62" cy="45" r="4.5" fill="#3E2723" />
                      <path d="M42 64 Q50 70 58 64" stroke="#3E2723" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="w-full h-28 bg-slate-200 rounded-[20px] overflow-hidden shadow-sm border-2 border-white">
                    <img src={config.pain_points_section.advantage_image || "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400"} alt="Phulwari Centre Facility" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Phulwari Features */}
        <section className="w-full max-w-7xl mx-auto py-20 px-6 bg-[#FAFAFC]">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1B1464] flex items-center justify-center gap-3">
                <Sparkles className="text-[#FFC107] w-6 h-6" /> {config.features_section.title} <Sparkles className="text-[#FFC107] w-6 h-6" />
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {config.features_section.features.map((feat: any, i: number) => {
                const colors = [
                  {bg: 'bg-[#E0F2F1]', text: 'text-[#009688]'},
                  {bg: 'bg-[#E1F5FE]', text: 'text-[#03A9F4]'},
                  {bg: 'bg-[#FFF8E1]', text: 'text-[#FFC107]'},
                  {bg: 'bg-[#E0F7FA]', text: 'text-[#00BCD4]'},
                  {bg: 'bg-[#FCE4EC]', text: 'text-[#E91E63]'},
                ]
                const c = colors[i % colors.length]
                return (
                  <div key={i} className="flex flex-col items-center text-center group bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm col-span-1">
                    <div className={`w-16 h-16 ${c.bg} rounded-[20px] flex items-center justify-center mb-4 transition-transform duration-300 shadow-sm border border-white`}>
                      <div className={c.text}>{renderIcon(feat.icon, "w-7 h-7")}</div>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-800 mb-2 leading-tight">{feat.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{feat.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="w-full max-w-7xl mx-auto py-24 px-6 bg-[#F8F9FA] relative" id="packages">
          <div className="absolute top-10 left-10 text-[#FFC107]"><Sparkles className="w-8 h-8"/></div>
          <div className="absolute right-20 top-20 text-[#FF80AB]"><Sparkles className="w-6 h-6"/></div>

          <div className="max-w-6xl mx-auto relative z-10 w-full">
            {/* Sparkles from Stitch */}
            <div className="absolute -top-4 -left-6 text-[#FFD166]"><Sparkles className="w-8 h-8 animate-pulse"/></div>
            
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-[#2B2D42] inline-block relative">
                Explore Our Celebration Packages
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch w-full">
              {displayPackages.map((pkg) => {
                const isBasic = pkg.id === 1;
                const isPremium = pkg.id === 2;

                return (
                  <div 
                    key={pkg.id} 
                    className={
                      isPremium 
                        ? "bg-[#FFF0F5] border-4 border-[#FF477E] rounded-3xl p-8 flex flex-col justify-between h-full relative shadow-xl transform lg:-translate-y-4 z-10"
                        : isBasic 
                        ? "bg-[#E0F7FA]/50 border-2 border-[#00B4D8] rounded-3xl p-8 flex flex-col justify-between h-full relative mt-8 lg:mt-4" 
                        : "bg-[#F3E8FF]/50 border-2 border-[#8338EC] rounded-3xl p-8 flex flex-col justify-between h-full relative mt-8 lg:mt-4"
                    }
                  >
                    {isPremium && (
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#FF477E] text-white font-bold px-6 py-1 rounded-full text-sm shadow-md whitespace-nowrap">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="flex-grow">
                      <div className="mb-6 text-center">
                        <h3 
                          className={
                            isPremium 
                              ? "text-2xl font-black text-[#FF477E] mb-2 mt-2" 
                              : isBasic 
                              ? "text-2xl font-black text-[#00B4D8] mb-2 text-left" 
                              : "text-2xl font-black text-[#8338EC] mb-2 text-left"
                          }
                        >
                          {pkg.name}
                          {isPremium && pkg.ideal_for && (
                            <><br/><span className="text-lg font-bold">({pkg.ideal_for})</span></>
                          )}
                        </h3>
                        
                        <p className={`text-sm text-[#6C757D] leading-relaxed font-semibold ${isPremium ? 'text-center' : 'text-left'}`}>
                          {pkg.description}
                        </p>
                      </div>

                      <ul className="space-y-4 mb-8 flex-grow">
                        {pkg.features.map((feature, idx) => {
                          return (
                            <li key={idx} className="flex items-start gap-3">
                              <div className={
                                isPremium 
                                  ? "rounded-full p-1 shrink-0 text-white bg-[#FF477E] mt-0.5" 
                                  : isBasic 
                                  ? "rounded-full p-1 shrink-0 text-white bg-[#00B4D8] mt-0.5" 
                                  : "rounded-full p-1 shrink-0 text-white bg-[#8338EC] mt-0.5"
                              }>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="font-semibold text-sm text-[#2B2D42] text-left leading-snug">
                                {formatFeature(feature, isPremium)}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <a 
                      href="#book-now" 
                      className={
                        isPremium 
                          ? "w-full bg-[#FF477E] text-white font-bold py-4 rounded-full text-lg hover:bg-[#FF477E]/90 transition shadow-lg block text-center relative z-10"
                          : isBasic 
                          ? "w-full bg-[#00B4D8] text-white font-bold py-3 rounded-full hover:bg-[#00B4D8]/90 transition shadow-md block text-center relative z-10"
                          : "w-full bg-[#8338EC] text-white font-bold py-3 rounded-full hover:bg-[#8338EC]/90 transition shadow-md block text-center relative z-10"
                      }
                    >
                      {pkg.cta_text}
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="w-full max-w-7xl mx-auto py-20 px-6 bg-[#FFF9F9] rounded-[40px] border border-pink-100/50">
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#1B1464]">{config.testimonials_section.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 w-full">
              {config.testimonials_section.reviews.map((review: any, i: number) => {
                // Intercept broken relative assets and replace with high fidelity dicebear avatars
                const avatarUrl = !review.avatar || review.avatar.includes('parent1.jpg') || review.avatar.includes('parent2.jpg') || review.avatar.startsWith('/images/')
                  ? `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(review.author)}`
                  : review.avatar;

                return (
                  <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm relative border border-slate-100 flex flex-col justify-between gap-6 hover:shadow-md transition-all">
                    
                    {/* Stars and Quote Icon */}
                    <div className="flex items-center justify-between w-full">
                      <div className="flex gap-0.5 text-[#FFC107]">
                        {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                      </div>
                      <div className="text-[#FF80AB] opacity-20">
                        <Quote className="w-8 h-8 fill-current" />
                      </div>
                    </div>

                    <p className="text-sm text-slate-700 italic leading-relaxed font-semibold">
                      "{review.text}"
                    </p>

                    <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-[#FFF0F4] flex items-center justify-center">
                        <img src={avatarUrl} alt={review.author} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left">
                        <p className="font-extrabold text-sm text-slate-800">{review.author}</p>
                        <p className="text-[10px] text-pink-500 font-extrabold uppercase tracking-wider">Verified Parent</p>
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ & Form Section */}
        <section className="w-full max-w-7xl mx-auto py-20 px-6 bg-white relative flex flex-col items-center">
          <div className="w-full max-w-6xl mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-[#1B1464] flex items-center justify-center gap-2">
                 Frequently Asked Questions <Sparkles className="text-[#FF80AB] w-5 h-5"/>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
              
              {/* FAQ Accordions */}
              <div className="lg:col-span-7 w-full">
                <FaqAccordion faqs={config.faq_section.faqs} />
              </div>

              {/* Ball Pit Image */}
              <div className="lg:col-span-5 w-full max-w-md aspect-video bg-slate-200 rounded-[32px] overflow-hidden shadow-lg border-8 border-white mx-auto">
                <img src={config.faq_section.faq_image || "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500"} alt="Toddlers playing in ball pit" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Lead Form */}
          <LeadForm packages={displayPackages} />
        </section>

      </div>
    </div>
  )
}

