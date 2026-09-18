// Fallback database seeding and type definition for dynamic activity pages
// Used when Supabase table activity_pages is connecting or being migrated

export interface ActivityBenefit {
  title: string;
  description: string;
}

export interface ActivityProgram {
  title: string;
  age_bracket?: string;
  description: string;
  points?: string[];
}

export interface ActivityPoint {
  title: string;
  description: string;
}

export interface HyperLocalPoint {
  area: string;
  description: string;
}

export interface ActivityFaq {
  question: string;
  answer: string;
}

export interface ActivityVideo {
  id: string;
  title: string;
  description?: string;
  url: string;
  poster?: string;
  duration?: string;
  is_featured?: boolean;
  created_at?: string;
}

export interface ActivityPageData {
  id: string;
  slug: string;
  aliases: string[];
  badge_text: string;
  title_tag: string;
  meta_description: string;
  h1: string;
  intro_p1: string;
  intro_p2?: string;
  hero_image: string;
  gallery_images: string[];
  videos?: ActivityVideo[];
  color: string;
  bg: string;
  icon: string;
  why_matters_title: string;
  why_matters_content: string;
  benefits_title: string;
  benefits: ActivityBenefit[];
  programs_title: string;
  programs: ActivityProgram[];
  why_choose_title: string;
  why_choose_points: ActivityPoint[];
  hyper_local_title: string;
  hyper_local_points: HyperLocalPoint[];
  testimonials: Array<{ quote: string; author: string; locality: string }>;
  faqs: ActivityFaq[];
  schema_json: any;
  content_color?: string;
  cta?: {
    phone: string;
    whatsapp: string;
    address: string;
    button_text: string;
    content_color?: string;
  };
  order_index: number;
  is_active: boolean;
}

export const DEFAULT_ACTIVITIES: ActivityPageData[] = [
  {
    id: 'music-classes-patna',
    slug: 'music-classes-patna',
    aliases: ['music', 'music-classes', 'kids-music'],
    badge_text: 'Music Classes',
    title_tag: 'Best Kids Music Classes in Patna | Phulwari Activity Centre Kidwaipuri',
    meta_description: 'Enroll your child in the best kids music classes in Patna at Phulwari Activity Centre, Kidwaipuri. Discover toddler music classes, rhythm sessions, and vocal training designed to boost memory, focus, and creativity.',
    h1: 'Kids Music Classes in Patna: Nurturing Young Minds Through Rhythm & Melody',
    intro_p1: 'Welcome to Phulwari Mother & Child Activity Centre, your best option for comprehensive child development services in Patna. We bring together rhythm and movement to help kids express themselves, build a deep sense of self-confidence, and develop a lifelong love of the arts. Our specialized kids music classes in Patna are a fundamental component of early childhood development. Conveniently located in Sri Krishna Nagar, Kidwaipuri, we offer a welcoming environment where children and toddlers can explore the fascinating world of sound, melody, and rhythm.',
    intro_p2: 'In a world where finding engaging offline activities for children is becoming increasingly difficult, music offers a unique opportunity for self-expression and personal growth. Whether you\'re seeking toddler music classes Patna or a more structured approach to musical education, Phulwari is committed to nurturing the inner artist in every child.',
    hero_image: '/music/image.png',
    gallery_images: ['/music/image.png', '/music/image copy.png', '/music/image copy 2.png'],
    color: '#FF4D8D',
    bg: '#FFE6EF',
    icon: 'Music',
    why_matters_title: 'Early Childhood Music Education Matters',
    why_matters_content: 'Music is not only a source of pleasure! It turns out that music has a powerful effect on brain development. More precisely, music helps to develop language activity areas, intuition, and mathematical abilities. That is, those spheres of human activity that are directly related to intellectual abilities. Classes for toddlers Patna will ensure that your child receives powerful stimuli for brain activity.\n\nOur music teachers work with preschoolers and know exactly how to build the lesson so that the child achieves the most positive results. Music lessons open up new intellectual possibilities for kids: singing songs, playing rhythmic exercises, and much more. We strive not only to provide children with joy and teach them new skills but also to contribute to their mental development.',
    benefits_title: 'Key Benefits of Our Music Classes',
    benefits: [
      { title: 'Improves memory & concentration', description: 'Keeping a steady beat, learning lyrics, and identifying individual sound patterns help a child\'s brain to build new neural connections and increase memory retention.' },
      { title: 'Boosts creativity', description: 'Playing with sound helps kids get creative. They will think outside the box and come up with their own unique rhythms and melodies. Music also helps kids to grow a new way of thinking.' },
      { title: 'Develops listening skills', description: 'Listening is an important skill that serves well in all areas of life. We work on musical listening which helps kids intently focus on specific sounds.' },
      { title: 'Increases self-confidence', description: 'Group performances, learning new rhythms, and singing entire songs from memory significantly boost self-esteem and help overcome shyness.' }
    ],
    programs_title: 'Our Specialized Music Programs',
    programs: [
      { title: 'Music and Sensory Activities for Toddlers', age_bracket: 'Toddlers (1-3 Yrs)', description: 'Designed for young children who are just getting interested in music. The parent and their toddlers can explore soft shakers, hand bells, and rhythmic clapping during classes that emphasize parent-child interaction.' },
      { title: 'Foundation Classes: Rhythm & Melody for Kids', age_bracket: 'Kids (4-12 Yrs)', description: 'Teach children how to perform simple exercises, control their voice, and develop proper breathing. We also introduce kids to rhythm and melody classes with cultural, folk, and modern melodies.' }
    ],
    why_choose_title: 'Why Choose Phulwari Mother & Child Activity Centre?',
    why_choose_points: [
      { title: 'Experienced Instructors', description: 'Our faculty consists of patient and passionate teachers who understand child psychology and know how to engage them without forcing anything.' },
      { title: 'Safe & Child Friendly Infrastructure', description: 'Every inch of our center is built keeping in mind the safety and comfort of children.' },
      { title: 'Holistic Ecosystem', description: 'As a complete mother and child activity center, children can easily switch between music, craft, yoga, dance, and more.' }
    ],
    hyper_local_title: 'Hyper-Local Service Areas Across Patna',
    hyper_local_points: [
      { area: 'Kidwaipuri & Sri Krishna Nagar', description: 'M/32, Road No. 25, Main Road with stress-free drop-off.' },
      { area: 'Boring Road & Patliputra Colony', description: '3 to 5 minutes commute, avoiding heavy traffic.' },
      { area: 'Fraser Road & Bailey Road', description: 'Direct access from central arterial corridors.' }
    ],
    testimonials: [
      { quote: 'Phulwari\'s music classes have completely transformed my 4-year-old daughter. She sings along with rhythm and has become noticeably more confident!', author: 'Sneha R.', locality: 'Kidwaipuri, Patna' }
    ],
    faqs: [
      { question: 'At what age can my child join the music classes at Phulwari?', answer: 'We accept children starting from early toddlerhood through our specialized mother-toddler programs, extending up to older kids looking for dedicated hobby classes.' },
      { question: 'Do children need any prior musical experience or instruments to join?', answer: 'Not at all! Our classes are designed for absolute beginners. We introduce concepts progressively, and all necessary basic instruments and props are provided during the sessions at our center.' },
      { question: 'Where is Phulwari located in Patna?', answer: 'We are centrally located at M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001, making it highly convenient for families living near Boring Road and surrounding areas.' }
    ],
    schema_json: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          '@id': 'https://phulwari.co.in/#localbusiness',
          'name': 'Phulwari Mother & Child Activity Centre',
          'url': 'https://phulwari.co.in/',
          'logo': 'https://phulwari.co.in/phulwari_logo.webp',
          'telephone': '+91-6207368839',
          'email': 'phulwari02@gmail.com',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road',
            'addressLocality': 'Patna',
            'addressRegion': 'Bihar',
            'postalCode': '800001',
            'addressCountry': 'IN'
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 25.6093,
            'longitude': 85.1200
          }
        },
        {
          '@type': 'EducationalOrganization',
          '@id': 'https://phulwari.co.in/activities/music#organization',
          'name': 'Phulwari Music Classes for Kids',
          'url': 'https://phulwari.co.in/activities/music-classes-patna',
          'parentOrganization': {
            '@id': 'https://phulwari.co.in/#localbusiness'
          },
          'description': 'Specialized kids music classes, toddler music lessons, and rhythm training in Kidwaipuri, Patna.',
          'areaServed': {
            '@type': 'AdministrativeArea',
            'name': 'Patna, Bihar'
          }
        }
      ]
    },
    order_index: 1,
    is_active: true
  },
  {
    id: 'dance-classes-patna',
    slug: 'dance-classes-patna',
    aliases: ['dance', 'dance-classes', 'kids-dance'],
    badge_text: 'Dance Classes',
    title_tag: 'Best Kids Dance Classes in Patna | Phulwari Activity Centre Kidwaipuri',
    meta_description: 'Enroll your child in the top-rated kids dance classes in Patna at Phulwari Activity Centre, Kidwaipuri. Boost confidence, flexibility, and coordination through energetic routines.',
    h1: 'Kids Dance Classes in Patna – Move, Learn & Shine',
    intro_p1: 'Welcome to Phulwari Mother & Child Activity Centre, your ultimate guide to the best kids dance classes in Patna. Our dance classes offer quality dance sessions to the kids, helping them develop a sense of rhythm and lead a fit and active lifestyle. Dance is not only a means of self-expression but also a great way to improve emotional health and fitness.',
    intro_p2: 'So, if you are looking for the best dance classes for kids in Patna, you have come to the right place. Our dance school for kids Patna provides a vibrant and energetic environment to engage kids of all ages in the art of dance. We are located at M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001.',
    hero_image: '/dance/image.png',
    gallery_images: ['/dance/image.png', '/dance/image copy.png', '/dance/image copy 2.png', '/dance/image copy 3.png'],
    color: '#8B5CF6',
    bg: '#EFE7FE',
    icon: 'PersonStanding',
    why_matters_title: 'Why Choose Phulwari for Children Dance Classes in Patna?',
    why_matters_content: 'Finding the right platform to channel the boundless energy of your child can prove to be quite a challenge. At Phulwari, we bridge the gap between learning and plain fun. Our programs are designed and developed keeping in mind the various developmental stages of kids. Whenever parents look for a children dance academy Patna, they entrust us with their wards as we promise safe infrastructure, qualified mentors and child-centric teaching approaches.',
    benefits_title: 'The Holistic Benefits of Our Dance Programs',
    benefits: [
      { title: 'Improves Coordination', description: 'Moving to a beat requires synchronization of the hands, feet, and core, drastically enhancing motor skills.' },
      { title: 'Builds Confidence', description: 'Performing in a group and mastering new routines helps shy children break out of their shells, building lifelong self-assurance.' },
      { title: 'Enhances Flexibility', description: 'Regular stretching and movement routines keep young bodies agile, strong, and posture-conscious.' },
      { title: 'Encourages Creativity', description: 'We allow children to interpret beats and explore movement styles, fostering unique artistic expression.' }
    ],
    programs_title: 'Exploring Our Localized Dance Programs in Patna',
    programs: [
      { title: 'Toddlers and Young Beginners', age_bracket: 'Ages 2.5 - 5', description: 'Focus on basic rhythm, motor coordination, and letting loose to fun, kid-friendly tracks.' },
      { title: 'Older Children & Advanced Choreography', age_bracket: 'Ages 6 - 14', description: 'Focus on synchronization, stamina building, posture refinement, and learning structured choreography.' }
    ],
    why_choose_title: 'What Makes Us the Best Kids Activity Center in Patna?',
    why_choose_points: [
      { title: 'Experienced Instructors', description: 'Our choreographers and trainers specialize in working with children, ensuring patience, positive reinforcement, and individual attention.' },
      { title: 'Engaging Environment', description: 'We blend fun routines with disciplined learning so that kids look forward to every single session.' },
      { title: 'Community & Family Focus', description: 'As a dedicated mother and child center, we host regular events, seasonal camps, and celebratory programs.' }
    ],
    hyper_local_title: 'Neighborhood-Centric Convenience in Patna',
    hyper_local_points: [
      { area: 'Kidwaipuri & Sri Krishna Nagar', description: 'Direct center access with parking facilities.' },
      { area: 'Boring Road & Anandpuri', description: 'Just 5 minutes drive via main connecting roads.' },
      { area: 'Bailey Road & Fraser Road', description: 'Centrally placed for convenient after-school drop-offs.' }
    ],
    testimonials: [
      { quote: 'The dance trainers are phenomenal! My child eagerly waits for the dance batch every week.', author: 'Kavita M.', locality: 'Boring Road, Patna' }
    ],
    faqs: [
      { question: 'What age is ideal to start kids dance classes in Patna?', answer: 'Children as young as toddlers can start exploring basic movement and rhythm. We have customized batches suited for different age brackets to ensure age-appropriate learning curves.' },
      { question: 'Are these classes suitable for beginners with no prior experience?', answer: 'Absolutely! Our programs cater extensively to complete beginners. Our instructors patiently guide every child through foundational steps, ensuring they feel comfortable and confident.' },
      { question: 'How can I register my child for classes at Kidwaipuri?', answer: 'You can visit our center at M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, or reach out to us via phone or WhatsApp at +91 62073 68839 to book a trial session.' }
    ],
    schema_json: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Phulwari Mother & Child Activity Centre',
      'image': 'https://phulwari.co.in/phulwari_logo.webp',
      '@id': 'https://phulwari.co.in/#localbusiness',
      'url': 'https://phulwari.co.in/activities/dance-classes-patna',
      'telephone': '+916207368839',
      'email': 'phulwari02@gmail.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road',
        'addressLocality': 'Patna',
        'addressRegion': 'Bihar',
        'postalCode': '800001',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 25.6012,
        'longitude': 85.1223
      }
    },
    order_index: 2,
    is_active: true
  },
  {
    id: 'gymnastics-classes-for-kids-patna',
    slug: 'gymnastics-classes-for-kids-patna',
    aliases: ['gymnastics', 'gymnastics-classes', 'kids-gymnastics'],
    badge_text: 'Gymnastics Academy',
    title_tag: 'Best Gymnastics Classes for Kids in Patna | Phulwari Activity Centre',
    meta_description: 'Premier gymnastics training for kids near Income Tax Golamber & Veer Chand Patel Path, Patna. Build strength, flexibility & balance at Phulwari. Enroll today!',
    h1: 'Professional Kids Gymnastics Classes in Patna',
    intro_p1: 'Give wings to your child\'s physical potential with structured training at Phulwari Mother & Child Activity Centre, the preferred place for youth skill enhancement in Patna. Spread across the heart of Patna, we are at walking distance from Veer Chand Patel Path, Income Tax Office, and Income Tax Golamber. We bring to you expertly designed, fun-filled, and professional gymnastics coaching for kids and toddlers.',
    intro_p2: 'Whether you are looking for gymnastics classes in Patna or the best gymnastics academy in Patna or physical fitness programs for kids, we have the right program for you.',
    hero_image: '/Gymnastics/image.png',
    gallery_images: ['/Gymnastics/image.png', '/Gymnastics/image copy.png', '/Gymnastics/image copy 2.png', '/Gymnastics/image copy 3.png', '/Gymnastics/image copy 4.png'],
    videos: [
      {
        id: 'vid-gymnastics-1',
        title: 'Kids Gymnastics Training & Flexibility Drills',
        description: 'Somersaults, balance beam, and agility training in our padded safety facility.',
        url: '/videos/gymnastics.mov',
        poster: '/Gymnastics/image.png',
        duration: '0:30',
        is_featured: true,
      }
    ],
    color: '#E8A621',
    bg: '#FFF3D9',
    icon: 'Star',
    why_matters_title: 'Why Gymnastics is the Ultimate Physical Foundation for Children',
    why_matters_content: 'Gymnastics is a foundational sport that teaches a child essential physical attributes such as flexibility, core strength, body control, and coordination. Also, gymnastics helps build mental discipline, courage, and perseverance skills that serve children well both on and off the mat. Given that kids today tend to spend more time with digital screens and less time on active physical movement, training in gymnastics offers a significant health and developmental advantage.',
    benefits_title: 'Unparalleled Developmental Experiences',
    benefits: [
      { title: 'Flexibility & Balance', description: 'Improved flexibility, balance, and posture through progressive stretching and beam exercises.' },
      { title: 'Core Muscle Strength', description: 'Developed core muscle strength and body coordination across structured gymnastics floor routines.' },
      { title: 'Agility & Bodily Awareness', description: 'Enhanced agility, motor skills, and spatial body control in a secure padded environment.' },
      { title: 'Confidence & Resilience', description: 'Building confidence, discipline, and personal resilience to overcome physical challenges.' }
    ],
    programs_title: 'Our Structured Gymnastics Training Modules',
    programs: [
      { title: 'Beginner Level: Tiny Tumblers', age_bracket: 'Ages 3 – 6', description: 'Learning basic safety techniques, landings, stretching exercises, forward rolls, pencil rolls, and introduction to low balance beams and incline safety mats.' },
      { title: 'Intermediate Level: Young Champions', age_bracket: 'Ages 6 – 12', description: 'Cartwheels, handstands, bridge work, basic vaulting skills, challenging core conditioning, flexibility workouts, and agility courses.' }
    ],
    why_choose_title: 'Why Choose Phulwari Gymnastics Academy in Central Patna?',
    why_choose_points: [
      { title: 'Easy Access', description: 'Easily accessed from Veer Chand Patel Path, Income Tax Golamber, Kidwaipuri, and Boring Road.' },
      { title: 'Qualified & Caring Instructors', description: 'Experienced trainers guide children step by step with continuous spotting for total safety.' },
      { title: 'Small Class Sizes', description: 'Low student-to-coach ratio for one-on-one help and thorough evaluation of physical progress.' },
      { title: 'Safe & Hygienic Infrastructure', description: 'Padded safety mats, clean equipment and child-safe training areas designed to keep sessions injury-free.' }
    ],
    hyper_local_title: 'Hyper-Local Service Areas Across Patna',
    hyper_local_points: [
      { area: 'Income Tax Office & Golamber', description: 'Walking distance or under 2 minutes drive.' },
      { area: 'Veer Chand Patel Path', description: 'Directly accessible via main connecting boulevard.' },
      { area: 'Kidwaipuri & Boring Road', description: '3 to 5 minutes commute for central Patna families.' }
    ],
    testimonials: [
      { quote: 'Finding a safe and professional kids gymnastics class near Income Tax Golamber Patna was so important for us. Phulwari\'s instructors are super supportive with my 5-year-old daughter. Her posture, balance, and stamina have improved tremendously!', author: 'Anand K.', locality: 'Patna' },
      { quote: 'My son enrolled in the gymnastics track at Phulwari four months ago. He went from being super timid to easily doing cartwheels and handstands. The facility is extremely safe and well-equipped!', author: 'Megha S.', locality: 'Boring Road' }
    ],
    faqs: [
      { question: 'At what age can my child start gymnastics classes at Phulwari?', answer: 'Children can begin their gymnastics training as early as 3 years old in our Tiny Tumblers program, which uses fun and safe exercises suited for toddlers.' },
      { question: 'What should my child wear to gymnastics class?', answer: 'Children should wear comfortable, stretchable athletic clothing like t-shirts and track pants or leggings. Shoes are removed on the safety mats during class.' },
      { question: 'Is gymnastics safe for young children?', answer: 'Yes! Safety is our primary focus. All routines take place on cushioned impact-absorbing mats under constant one-on-one supervision by trained instructors.' },
      { question: 'Are there weekend batches available for school-going kids?', answer: 'Yes, we offer both weekday evening slots and flexible weekend morning batches to fit around school schedules.' }
    ],
    schema_json: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Phulwari Mother & Child Activity Centre',
      'image': 'https://phulwari.co.in/phulwari_logo.webp',
      '@id': 'https://phulwari.co.in/#localbusiness',
      'url': 'https://phulwari.co.in/activities/gymnastics-classes-for-kids-patna',
      'telephone': '+91 62073 68839',
      'email': 'phulwari02@gmail.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'M/32, Road Number 25, Main Rd, Sri Krishna Nagar, Kidwaipuri',
        'addressLocality': 'Patna',
        'addressRegion': 'Bihar',
        'postalCode': '800001',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 25.6012,
        'longitude': 85.1223
      }
    },
    order_index: 3,
    is_active: true
  },
  {
    id: 'mma-classes-patna',
    slug: 'mma-classes-patna',
    aliases: ['mma', 'mma-classes', 'kids-mma', 'self-defense'],
    badge_text: 'MMA & Self-Defense',
    title_tag: 'Best Kids MMA & Self-Defense Classes Near Income Tax Golamber, Patna',
    meta_description: 'Premier kids\' MMA training & self-defense near Veer Chand Patel Path & Income Tax Office, Patna. Professional coaching, safe environment, and discipline. Book a free trial!',
    h1: 'Kids MMA & Self-Defense Classes Near Income Tax Golamber, Patna',
    intro_p1: 'Welcome to Phulwari, the best activity center in Patna, offering the best kids\' Mixed Martial Arts (MMA) and self-defense experience. We are proud to present our high-quality fitness center providing top-notch training in youth MMA near popular places like Veer Chand Patel Path, Income Tax Office, and Income Tax Golamber.',
    intro_p2: 'At Phulwari, children get an opportunity to lead a healthy and fit lifestyle while learning to defend themselves with our special mixed martial arts programs. Kids get trained to the core learning MMA defensive movements, postures, footwork, and other techniques in a safe and friendly environment.',
    hero_image: '/MMA/image.png',
    gallery_images: ['/MMA/image.png'],
    color: '#FF8A3D',
    bg: '#FFEADB',
    icon: 'Shield',
    why_matters_title: 'Why MMA Training is Great for Your Kids',
    why_matters_content: 'In this day and age, it is more important than ever to get our children involved in structured martial arts. MMA provides a perfect blend of discipline, self-defense skills, cardiovascular endurance, and tactical thinking.',
    benefits_title: 'Key Benefits of Kids\' MMA Training',
    benefits: [
      { title: 'Real World Self-defense', description: 'Kids and teens learn real world self-defense, including proper response strategies in different situations.' },
      { title: 'Focus & Discipline', description: 'MMA classes teach important values such as discipline, respect, focus and determination.' },
      { title: 'Cardio & Stamina Fitness', description: 'Kids develop strength, core power, stamina and agility through high intensity and sport specific drills.' },
      { title: 'Confidence & Stress Relief', description: 'Kids learn techniques that empower them to defend themselves while enjoying a healthy outlet for stress.' }
    ],
    programs_title: 'Our Structured Kids\' MMA Programs',
    programs: [
      { title: 'Junior MMA & Self-Defense', age_bracket: 'Ages 6 – 9', description: 'Proper guard stances, protective movement, safe footwork, basic striking mechanics with boxing gloves on pads, and evasion techniques.' },
      { title: 'Youth MMA & Tactical Training', age_bracket: 'Ages 10 – 15', description: 'Combining styles like boxing, kickboxing, wrestling, and jiu-jitsu. Controlled combinations, body protection, distance management, takedown prevention, core strength, and agility.' }
    ],
    why_choose_title: 'What Makes Us the Best MMA Center for Kids in Patna?',
    why_choose_points: [
      { title: 'Experienced Child-Centric Coaches', description: 'Certified coaches experienced in youth martial arts who teach in an age-appropriate, encouraging manner.' },
      { title: 'Safety-First Environment', description: 'Padded impact floor mats, protective headgear/pads, and sanitized gear to prevent injuries.' },
      { title: 'Small Batches with Individual Guidance', description: 'Low student-to-coach ratio for continuous individual technique feedback.' },
      { title: 'Flexible Schedules', description: 'Convenient weekday evening and weekend morning batches.' }
    ],
    hyper_local_title: 'Hyper-Local Connectivity in Central Patna',
    hyper_local_points: [
      { area: 'Income Tax Office & Golamber', description: '3 to 5 minutes distance, highly convenient for working parents.' },
      { area: 'Veer Chand Patel Path', description: 'Direct arterial link for quick pickup and drop.' },
      { area: 'Kidwaipuri & Boring Road Hubs', description: 'Within 1 to 2 miles for after-school sessions.' }
    ],
    testimonials: [
      { quote: 'Finding a dedicated and safe MMA center for kids was tough until we found Phulwari near Income Tax Golamber. My 9-year-old son has been attending their MMA classes for 6 months, and his focus, stamina, and confidence have improved dramatically!', author: 'Priya S.', locality: 'Kidwaipuri, Patna' }
    ],
    faqs: [
      { question: 'Is MMA safe for young children?', answer: 'Yes! Our youth MMA program focuses strictly on self-defense, footwork, fitness, and safe pad-striking techniques. All drills take place under strict coach supervision using full protective gear in a controlled setting.' },
      { question: 'At what age can my child start MMA classes at Phulwari?', answer: 'Children can join our junior MMA and self-defense program starting from 6 years of age.' },
      { question: 'Where is your center located in Patna?', answer: 'Our center is located in Sri Krishna Nagar, Kidwaipuri Main Road, just a 3–5 minute drive from Income Tax Golamber and Veer Chand Patel Path.' },
      { question: 'Do you provide a free trial session?', answer: 'Yes! We offer a free trial class for new parents and students to experience our facility and coaching firsthand.' }
    ],
    schema_json: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['LocalBusiness', 'SportsActivityLocation', 'Organization'],
          '@id': 'https://phulwari.co.in/#organization',
          'name': 'Phulwari Mother & Child Activity Centre',
          'url': 'https://phulwari.co.in/',
          'telephone': '+916207368839',
          'email': 'phulwari02@gmail.com',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road',
            'addressLocality': 'Patna',
            'addressRegion': 'Bihar',
            'postalCode': '800001',
            'addressCountry': 'IN'
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 25.6133,
            'longitude': 85.1228
          }
        }
      ]
    },
    order_index: 4,
    is_active: true
  },
  {
    id: 'roller-skating',
    slug: 'roller-skating',
    aliases: ['skating', 'roller-skating-classes'],
    badge_text: 'Roller Skating',
    title_tag: 'Best Roller Skating Classes in Patna | Near Income Tax Golamber & Veer Chand Patel Path',
    meta_description: 'Looking for professional roller skating classes in Patna? Join Phulwari\'s top skating academy near Income Tax Office & Veer Chand Patel Path. Fun, safe, expert coaching for kids & adults!',
    h1: 'Top-Rated Roller Skating Classes in Patna',
    intro_p1: 'Are you searching for the best roller skating classes in Patna for your child? Come and join Phulwari for professional roller skating training near Income Tax and Veer Chand Patel Path Patna. Whether they are a novice or an expert, our certified roller skating coaches can lead them through the process of learning how to roller skate.',
    intro_p2: 'Find the best roller skating classes near Income Tax Golamber, Veer Chand Patel path, Fraser Road, and Bailey Road. The classes are suitable for kids, young people, and even adults from all around the city. Our skating instructors are professional and patient to get your kid involved in this sport.',
    hero_image: '/Roller_skating/image.png',
    gallery_images: ['/Roller_skating/image.png', '/Roller_skating/image copy.png', '/Roller_skating/image copy 2.png', '/Roller_skating/image copy 3.png', '/Roller_skating/image copy 4.png'],
    videos: [
      {
        id: 'vid-skating-1',
        title: 'Roller Skating Practice & Balance Training',
        description: 'Kids mastering speed, smooth turns, and balance on our professional smooth skating rink.',
        url: '/videos/skating.mov',
        poster: '/Roller_skating/image.png',
        duration: '0:42',
        is_featured: true,
      }
    ],
    color: '#3D8BFF',
    bg: '#E5EFFF',
    icon: 'Zap',
    why_matters_title: 'Why Learn Roller Skating at Phulwari?',
    why_matters_content: 'Roller skating promotes balance, cardiovascular endurance, lower body muscular strength, and spatial awareness. Skating on wheels teaches children courage, perseverance, and fast reflexes.',
    benefits_title: 'Benefits of Roller Skating',
    benefits: [
      { title: 'Balance & Motor Control', description: 'Mastering skates builds fine and gross motor balance and equilibrium.' },
      { title: 'Cardiovascular Health', description: 'High-energy calorie-burning aerobic workout that keeps children active and fit.' },
      { title: 'Core & Leg Strength', description: 'Strengthens quadriceps, calves, and stabilizing core muscles.' },
      { title: 'Confidence on Wheels', description: 'Overcoming the fear of falling instills self-assurance and grit.' }
    ],
    programs_title: 'Roller Skating Programs Offered',
    programs: [
      { title: 'Beginner Roller Skating', age_bracket: 'Ages 3+', description: 'Foundational stance, balancing on wheels, safe falling techniques, and smooth forward stride.' },
      { title: 'Quad & Inline Skating Coaching', age_bracket: 'Ages 5+', description: 'Technique refinement on Quad and Inline skates, turning, braking, and speed control.' },
      { title: 'Fitness & Fun Roller Skating', age_bracket: 'All Ages', description: 'High-stamina agility courses, slalom drills, and competitive speed tracks.' }
    ],
    why_choose_title: 'Why Choose Phulwari Skating Academy?',
    why_choose_points: [
      { title: 'Safe Dedicated Track', description: 'Smooth, obstacle-free skating surface built for safe gliding.' },
      { title: 'Full Protective Gear Protocol', description: 'Helmets, knee pads, elbow guards, and wrist guards are mandatory and checked.' },
      { title: 'Patient Mentorship', description: 'Trainers hold the child\'s hand until they gain balance and confidence to glide independently.' }
    ],
    hyper_local_title: 'Prime Patna Location',
    hyper_local_points: [
      { area: 'Income Tax Golamber', description: 'Walking distance from IT circle.' },
      { area: 'Veer Chand Patel Path', description: 'Convenient access from main central corridor.' },
      { area: 'Fraser Road & Bailey Road', description: 'Minutes away for after-school sessions.' }
    ],
    testimonials: [
      { quote: 'My daughter started skating without ever having worn skates before. In just 3 weeks, she was rolling across the rink independently!', author: 'Amit V.', locality: 'Patna' }
    ],
    faqs: [
      { question: 'What is the minimum age for roller skating?', answer: 'Children as young as 3.5 to 4 years old can start in our beginner balance batches.' },
      { question: 'Do you provide skates during the demo class?', answer: 'Yes, we provide skates and protective safety gear for initial demo sessions.' }
    ],
    schema_json: {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'SportsActivityLocation'],
      '@id': 'https://phulwari.co.in/#organization',
      'name': 'Phulwari Mother & Child Activity Centre',
      'url': 'https://phulwari.co.in/',
      'logo': 'https://phulwari.co.in/phulwari_logo.webp',
      'telephone': '+916207368839',
      'priceRange': '₹1500'
    },
    order_index: 5,
    is_active: true
  },
  {
    id: 'karate-classes-patna',
    slug: 'karate-classes-patna',
    aliases: ['karate', 'karate-classes', 'martial-arts'],
    badge_text: 'Karate Academy',
    title_tag: 'Best Karate & Martial Arts Classes for Kids in Patna | Phulwari',
    meta_description: 'Enroll your kids in fun & disciplined karate classes at Phulwari Activity Centre, Kidwaipuri, Patna. Build strength, focus, and self-defense skills. Book a free demo class today!',
    h1: 'Karate Training for Kids in Patna – Build Strength, Discipline & Confidence',
    intro_p1: 'Welcome to Phulwari Mother & Child Activity Centre, where children learn, play, grow, and mothers remain active and strong! If you are looking for the best karate academy for children in Patna, then you are in the right place. Kidwaipuri Main Road, Sri Krishna Nagar, Patna is a popular locality known for offering a holistic karate training center in Patna for kids.',
    intro_p2: 'We provide comprehensive karate training classes for kids in Patna, which aim to shape and develop young minds while strengthening their bodies in a 100% safe and secure environment.',
    hero_image: '/Karate/image.png',
    gallery_images: ['/Karate/image.png', '/Karate/image copy.png', '/Karate/image copy 2.png'],
    color: '#F43F5E',
    bg: '#FFE1E6',
    icon: 'Award',
    why_matters_title: 'Why Choose Phulwari for Karate Classes in Kidwaipuri Patna?',
    why_matters_content: 'Finding the right physical activity for your child can be challenging. Parents want an environment that balances safety, expert mentorship, and fun. Here is why families across Patna choose Phulwari for kids karate classes near Sri Krishna Nagar Patna:\n\n• Experienced Trainers: Certified professionals who handle children of different age groups with patience and firm guidance.\n• Holistic Development: Mental alertness, emotional control, and body coordination.\n• Safe Facility: Impact-absorbing flooring and well-ventilated spaces.\n• Family-Centric: While kids train, mothers join dedicated Mother Fitness Programs.',
    benefits_title: 'The Core Benefits of Martial Arts & Karate for Kids',
    benefits: [
      { title: 'Physical Fitness & Agility', description: 'Karate builds core strength, cardiovascular endurance, flexibility, and lightning-fast reflexes.' },
      { title: 'Focus & Concentration', description: 'Students learn to listen carefully, remember complex routines (kata), and execute them with precision.' },
      { title: 'Practical Self-Defense', description: 'Situational awareness and effective self-defense classes ensuring kids handle adverse situations calmly.' },
      { title: 'Confidence & Self-Esteem', description: 'Progressing through belt rankings instills a positive self-image and removes fear.' }
    ],
    programs_title: 'Tailored Martial Arts Programs for Every Age Group',
    programs: [
      { title: 'Early Starters', age_bracket: 'Ages 4 – 5', description: 'Focus heavily on coordination, balance, basic stretching, and playful martial arts games.' },
      { title: 'Junior Level', age_bracket: 'Ages 6 – 9', description: 'Introduction to formal stances, basic blocks, strikes, and foundational discipline.' },
      { title: 'Advanced Kids', age_bracket: 'Ages 10+', description: 'Deep dive into kata, advanced self-defense techniques, stamina building, and belt-grading.' }
    ],
    why_choose_title: 'Experience the Phulwari Advantage: More Than Just Karate',
    why_choose_points: [
      { title: 'Belt Progression System', description: 'Structured grading exams and formal belt certifications.' },
      { title: 'Mother Fitness Programs', description: 'Dedicated routines for mothers while their kids train.' },
      { title: 'Diverse Enrichment', description: 'Switch seamlessly between dance, gymnastics, chess, yoga, and art & craft.' }
    ],
    hyper_local_title: 'Hyper-Local Access in Patna',
    hyper_local_points: [
      { area: 'Kidwaipuri & Sri Krishna Nagar', description: 'M/32, Road No. 25, Main Road.' },
      { area: 'Boring Road Hub', description: 'Quick 5-minute commute.' },
      { area: 'Veer Chand Patel Path', description: 'Central connectivity from all government and private residential sectors.' }
    ],
    testimonials: [
      { quote: 'The discipline my son has acquired from Karate at Phulwari is remarkable. His posture and school concentration are so much better.', author: 'Ramesh P.', locality: 'Kidwaipuri, Patna' }
    ],
    faqs: [
      { question: 'Where is Phulwari Karate Training Center located in Patna?', answer: 'We are conveniently located at M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001.' },
      { question: 'What is the ideal starting age for kids\' karate classes?', answer: 'Children can start basic coordination and foundational movement classes as young as 4 years old. Structured karate training usually yields the best results for kids aged 5 and above.' },
      { question: 'Are your karate classes safe for young children?', answer: 'Absolutely. Safety is our utmost priority. Our trainers use age-appropriate, controlled methods under constant supervision on shock-absorbing safety mats.' },
      { question: 'How do I book a free demo class?', answer: 'You can easily book a free demo class by calling us at +91 62073 68839, messaging us on WhatsApp directly, or visiting our center.' }
    ],
    schema_json: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          '@id': 'https://phulwari.co.in/#business',
          'name': 'Phulwari Mother & Child Activity Centre',
          'url': 'https://phulwari.co.in/',
          'logo': 'https://phulwari.co.in/phulwari_logo.webp',
          'telephone': '+91-6207368839',
          'email': 'phulwari02@gmail.com',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road',
            'addressLocality': 'Patna',
            'addressRegion': 'Bihar',
            'postalCode': '800001',
            'addressCountry': 'IN'
          }
        }
      ]
    },
    order_index: 6,
    is_active: true
  },
  {
    id: 'art-craft',
    slug: 'art-craft',
    aliases: ['art-and-craft', 'drawing-classes', 'painting-classes'],
    badge_text: 'Art & Craft Studio',
    title_tag: 'Best Art & Craft Classes in Patna | Phulwari Mother & Child Activity Centre',
    meta_description: 'Discover top-rated kids art and craft classes near Income Tax Golamber & Veer Chand Patel Path, Patna. Join Phulwari for creative toddler workshops & mother-child activities. Call today!',
    h1: 'Creative Art & Craft Classes for Kids in Patna – Phulwari Activity Centre',
    intro_p1: 'Welcome to Phulwari Mother & Child Activity Centre for early childhood creativity, hands on experience and art exploration in Patna. Nestled in the heart of central Patna, just minutes walk from Veer Chand Patel Path, Income Tax Office, and Income Tax Golamber Phulwari, we offer young minds an opportunity to grow by engaging their creative expression through colors, and play.',
    intro_p2: 'Whether you’re searching for kids art and craft classes in Patna or toddler drawing & painting classes, or mother toddler art activities in Patna we would like to offer our experience and creativity to help your child explore and learn.',
    hero_image: '/Art_and_Craft/image.png',
    gallery_images: ['/Art_and_Craft/image.png', '/Art_and_Craft/image copy.png', '/Art_and_Craft/image copy 2.png', '/Art_and_Craft/image copy 3.png', '/Art_and_Craft/image copy 4.png'],
    color: '#34B36B',
    bg: '#E3F7EA',
    icon: 'Palette',
    why_matters_title: 'Why Early Art & Craft Education Matters for Your Child',
    why_matters_content: 'Art is much more than paint on paper; it is a fundamental pillar of early childhood development. During their formative years, children learn to communicate feelings, understand visual concepts, and experiment with spatial relationships.',
    benefits_title: 'Developmental Milestones Achieved',
    benefits: [
      { title: 'Fine Motor Skill Development', description: 'Handling brush handles, cutting paper with safe tools, sculpting clay, and gluing shapes strengthens tiny hand muscles and improves hand-eye coordination.' },
      { title: 'Cognitive & Problem-Solving Growth', description: 'Choosing colors, mixing paints, and building 3D crafts encourage critical thinking and spatial decision-making.' },
      { title: 'Emotional Expression & Confidence', description: 'Art gives children a non-verbal outlet to express joy, curiosity, and ideas, building self-esteem with every completed project.' },
      { title: 'Parent-Child Bonding', description: 'Interactive sessions allow parents to actively collaborate with toddlers, creating lasting memories together.' }
    ],
    programs_title: 'Our Creative Art & Craft Programs',
    programs: [
      { title: 'Mother & Toddler Creative Workshops', age_bracket: 'Ages 1.5 – 3 Years', description: 'Sensory finger painting with safe, non-toxic materials, texture-matching, basic shape collages, and guided interactive craft exercises.' },
      { title: 'Young Explorers Art & Craft Club', age_bracket: 'Ages 4 – 8 Years', description: 'Basic sketching, color wheel exploration, watercolor techniques, paper crafts, origami, 3D card making, recycled material crafts, clay sculpting, and texture painting.' }
    ],
    why_choose_title: 'What Makes Phulwari the Best Kids Activity Center in Central Patna?',
    why_choose_points: [
      { title: 'Centrally Located Hub', description: 'Near Veer Chand Patel Path and Income Tax Golamber, effortless for Kidwaipuri & Boring Road.' },
      { title: 'Child-Safe & Hygienic Environment', description: 'All paints, scissors, and materials are 100% non-toxic, child-safe, and sanitized daily.' },
      { title: 'Experienced Instructors', description: 'Teachers specialize in early childhood creative education with patience and positive reinforcement.' }
    ],
    hyper_local_title: 'Hyper-Local Connectivity in Patna',
    hyper_local_points: [
      { area: 'Income Tax Golamber', description: 'Walking distance from IT circle.' },
      { area: 'Veer Chand Patel Path', description: '1 to 2 minutes by car.' },
      { area: 'Kidwaipuri & Boring Road', description: 'Short 5-minute commute.' }
    ],
    testimonials: [
      { quote: 'Phulwari has been a wonderful experience for my 3-year-old. Finding quality art classes near Income Tax Golamber in Patna was tough until we found this center. The mother-child sessions helped my toddler open up and express her creativity!', author: 'Ananya S.', locality: 'Patna' }
    ],
    faqs: [
      { question: 'What age groups can participate in the art and craft programs at Phulwari?', answer: 'Our programs cater to early learners from 1.5 years up to 8 years of age, featuring specialized tracks like mother-toddler sessions and young explorer craft clubs.' },
      { question: 'Are the art materials provided by the activity center?', answer: 'Yes, all art supplies, including child-safe paints, papers, canvases, clay, and safety tools, are fully provided at our center.' },
      { question: 'Where is Phulwari located in Patna?', answer: 'We are located in central Patna at M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, easily accessible from Income Tax Golamber, Veer Chand Patel Path, and Boring Road.' },
      { question: 'Can parents sit with younger children during classes?', answer: 'Absolutely! We offer dedicated mother and child activity center sessions in Patna where parents participate directly alongside their toddlers.' }
    ],
    schema_json: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Phulwari Mother & Child Activity Centre',
      'image': 'https://phulwari.co.in/phulwari_logo.webp',
      'url': 'https://phulwari.co.in/activities/art-craft',
      'telephone': '+91 62073 68839'
    },
    order_index: 7,
    is_active: true
  },
  {
    id: 'yoga-classes-patna',
    slug: 'yoga-classes-patna',
    aliases: ['yoga', 'yoga-classes', 'kids-yoga'],
    badge_text: 'Yoga & Wellness',
    title_tag: 'Best Yoga Classes for Kids & Mothers in Patna | Phulwari Activity Centre',
    meta_description: 'Join Phulwari in Kidwaipuri, Patna for expert-led kids yoga classes, mother fitness programs, and fun child development activities. Book a free demo today!',
    h1: 'Nurturing Healthy Bodies and Calm Minds: The Ultimate Guide to Yoga at Phulwari Mother & Child Activity Centre, Patna',
    intro_p1: 'In today’s digital age, kids are exposed to screens, studies, and schedules from a very young age. Mothers have to balance between a million responsibilities, leaving them with little time to focus on their own well-being. How can you ensure that your child and your own self-development needs are both being taken care of?',
    intro_p2: 'Phulwari Mother & Child Activity Centre is a child care service situated in Patna at Kidwaipuri which facilitates women and children to come together and enjoy a happy, healthy environment. We believe that development can only happen in the lap of happiness. From children’s Yoga in Patna to Mother fitness programs, you can get it all at Phulwari.',
    hero_image: '/Yoga/image.png',
    gallery_images: ['/Yoga/image.png', '/Yoga/image copy.png', '/Yoga/image copy 2.png', '/Yoga/image copy 3.png', '/Yoga/image copy 4.png'],
    color: '#14B8A6',
    bg: '#DFF7F1',
    icon: 'HeartPulse',
    why_matters_title: 'Why Yoga Matters for Growing Children',
    why_matters_content: 'As parents, we constantly seek ways to improve our children\'s physical health, mental focus, and emotional resilience. Traditional sports are wonderful, but yoga offers a unique blend of physical conditioning and mindfulness that benefits children in profound ways.',
    benefits_title: 'Core Benefits of Yoga for Children & Mothers',
    benefits: [
      { title: 'Flexibility, Balance & Strength', description: 'Playful asanas like Tree Pose, Downward Dog, and Cobra Pose gently stretch and strengthen growing musculoskeletal systems.' },
      { title: 'Focus & Concentration', description: 'Breath control (pranayama) and mindful stillness improve attention spans and memory recall.' },
      { title: 'Emotional Balance & Stress Relief', description: 'Deep breathing and relaxation exercises help children calm their nervous systems when overwhelmed.' },
      { title: 'Postnatal Strength for Mothers', description: 'Gentle postnatal flows target weakened core muscles, pelvic floor recovery, and lower back tension relief.' }
    ],
    programs_title: 'Dedicated Programs at Phulwari',
    programs: [
      { title: 'Kids Yoga & Mindfulness', age_bracket: 'Ages 4+', description: 'Engaging asanas, breathing techniques, balance games, and emotional self-regulation in a playful setting.' },
      { title: 'Mother Fitness & Postnatal Yoga', age_bracket: 'Mothers', description: 'Specialized core recovery, postural alignment, stress management, and mental clarity alongside a supportive local community of mothers.' }
    ],
    why_choose_title: 'What Makes Phulwari\'s Yoga Program Unique in Patna?',
    why_choose_points: [
      { title: 'Certified Trainers', description: 'Instructors specialize in child-friendly methods and postnatal fitness anatomy.' },
      { title: 'Holistic Mother & Child Environment', description: 'Mothers workout while children explore parallel activities under the same roof.' },
      { title: 'Prime Location', description: 'Located in Sri Krishna Nagar, Kidwaipuri Main Road, easily accessible from Boring Road and Fraser Road.' }
    ],
    hyper_local_title: 'Hyper-Local Access in Patna',
    hyper_local_points: [
      { area: 'Kidwaipuri & Boring Road', description: 'Heart of central Patna, safe & serene ambiance.' },
      { area: 'Income Tax Golamber', description: '2 minutes drive from Veer Chand Patel Path.' }
    ],
    testimonials: [
      { quote: 'The yoga classes at Phulwari gave me my strength back after childbirth, and my 5-year-old loves attending the kids sessions right down the hall!', author: 'Sunita T.', locality: 'Patna' }
    ],
    faqs: [
      { question: 'What age can children start yoga classes at Phulwari?', answer: 'Our yoga and wellness programs for children generally begin at 4 years and above. For younger children (9 months to 4 years), we offer our Play Zone and Mother & Toddler Program.' },
      { question: 'Do I need prior yoga experience to join the Mother Fitness Program?', answer: 'Not at all! Whether you are an absolute beginner or someone returning after a long break, our trainers modify every session to match your fitness level.' },
      { question: 'Where is Phulwari located in Patna?', answer: 'Our center is centrally located at M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001.' },
      { question: 'How can I book a session or a free demo class?', answer: 'Call or message us on WhatsApp at +91 62073 68839 to book your Free Demo Class.' }
    ],
    schema_json: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Phulwari Mother & Child Activity Centre',
      'image': 'https://phulwari.co.in/phulwari_logo.webp',
      'url': 'https://phulwari.co.in/yoga-classes-patna',
      'telephone': '+91 62073 68839'
    },
    order_index: 8,
    is_active: true
  },
  {
    id: 'cricket-coaching-patna',
    slug: 'cricket-coaching-patna',
    aliases: ['cricket', 'cricket-coaching', 'kids-cricket'],
    badge_text: 'Cricket Academy',
    title_tag: 'Best Cricket Coaching Classes in Patna | Phulwari Activity Centre',
    meta_description: 'Enroll your child in expert-led cricket coaching classes in Kidwaipuri, Patna at Phulwari. Build teamwork, discipline, and sportsmanship. Book a free demo today!',
    h1: 'Master the Game: Expert Cricket Coaching Classes in Patna at Phulwari Activity Centre',
    intro_p1: 'Cricket is more than just a sport in India. It is an emotion, a culture, a medium of character building. For growing children, stepping onto the cricket pitch is more than just a game; it teaches discipline, focus, resilience, and the invaluable art of teamwork. If you are searching for the best cricket coaching classes in Patna to channel your child\'s energy into a productive and passionate pursuit, Phulwari Mother & Child Activity Centre is your ultimate destination.',
    intro_p2: 'Conveniently located in the heart of the city at Kidwaipuri, Phulwari is Patna\'s premier mother and child activity hub. Alongside our diverse developmental programs, our specialized cricket training academy provides a safe, structured, and highly encouraging environment for children to learn the fundamentals of the game, sharpen their reflexes, and grow into confident team players.',
    hero_image: '/Cricket/image.png',
    gallery_images: ['/Cricket/image.png', '/Cricket/image copy.png', '/Cricket/image copy 2.png', '/Cricket/image copy 3.png'],
    videos: [
      {
        id: 'vid-cricket-1',
        title: 'Junior Cricket Coaching & Net Practice',
        description: 'Batting, bowling, and fielding drills guided by certified cricket coaches in Patna.',
        url: '/videos/cricket.mov',
        poster: '/Cricket/image.png',
        duration: '0:28',
        is_featured: true,
      }
    ],
    color: '#0EA5E9',
    bg: '#E0F2FE',
    icon: 'Trophy',
    why_matters_title: 'Why Cricket Training is Essential for Child Development',
    why_matters_content: 'Enrolling children in team sports at an early age provides profound developmental advantages that extend far beyond the boundary ropes: physical conditioning, communication, mutual respect, and emotional maturity.',
    benefits_title: 'Pillars of Cricket Development',
    benefits: [
      { title: 'Hand-Eye Coordination & Fitness', description: 'Batting strokes, bowling delivery stride, and slip catching challenge motor skills, core strength, agility, and stamina.' },
      { title: 'Teamwork, Leadership & Social Skills', description: 'Children learn collaboration, supporting teammates, sharing responsibility, and celebrating collective victories.' },
      { title: 'Discipline & Mental Toughness', description: 'Understanding field placements, maintaining patience at the crease, and bouncing back stronger after setbacks.' }
    ],
    programs_title: 'Structured Junior Cricket Tracks',
    programs: [
      { title: 'Beginner Cricket Drills', age_bracket: 'Ages 5 – 8', description: 'Grip, stance, basic backlift, front-foot defense, basic bowling action, and fun fielding obstacle courses.' },
      { title: 'Intermediate Skill Mastery', age_bracket: 'Ages 9 – 14', description: 'Shot selection, cut/pull shots, line & length bowling, wicketkeeping drills, match simulation, and tactical captaincy.' }
    ],
    why_choose_title: 'What Makes Phulwari\'s Cricket Academy Stand Out in Patna?',
    why_choose_points: [
      { title: 'Experienced & Supportive Coaches', description: 'Focus on proper technique, safety, and sportsmanship over cutthroat competition.' },
      { title: 'Age-Appropriate Drills', description: 'Drills designed specifically for physical stages of young children.' },
      { title: 'Safe & Monitored Facility', description: 'Secure, supervised sports area located at Kidwaipuri Main Road.' }
    ],
    hyper_local_title: 'Hyper-Local Connectivity',
    hyper_local_points: [
      { area: 'Kidwaipuri & Boring Road', description: 'Under 5 minutes from boring road crossing.' },
      { area: 'Veer Chand Patel Path', description: 'Quick arterial connectivity for parents.' }
    ],
    testimonials: [
      { quote: 'My 7-year-old was glued to video games. Enrolling him in cricket coaching at Phulwari got him outdoors, active, and he has made wonderful new friends!', author: 'Vikram S.', locality: 'Patna' }
    ],
    faqs: [
      { question: 'What age group is eligible for the cricket coaching classes at Phulwari?', answer: 'Our cricket training program is tailored for children starting from 5 years and above, ensuring age-appropriate coaching.' },
      { question: 'Do children need to bring their own cricket gear?', answer: 'For absolute beginners, basic equipment is provided during introductory sessions at our center. Trainers guide parents on gear when the child progresses.' },
      { question: 'Where exactly is the cricket training conducted in Patna?', answer: 'Classes are held at our main facility at M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, Bihar – 800001.' },
      { question: 'How can I register my child or book a free demo class?', answer: 'Call or WhatsApp us at +91 62073 68839 to book a Free Demo Class.' }
    ],
    schema_json: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Phulwari Mother & Child Activity Centre',
      'url': 'https://phulwari.co.in/activities/cricket-coaching-patna',
      'telephone': '+91 62073 68839'
    },
    order_index: 9,
    is_active: true
  },
  {
    id: 'chess-classes-patna',
    slug: 'chess-classes-patna',
    aliases: ['chess', 'chess-classes', 'kids-chess'],
    badge_text: 'Chess Academy',
    title_tag: 'Best Kids Chess Academy in Patna | Phulwari Activity Centre Kidwaipuri',
    meta_description: 'Master the game of kings. Expert chess coaching for kids in Patna at Phulwari. Sharpen logical thinking, memory, concentration and tournament tactics. Enroll today!',
    h1: 'Strategic Chess Coaching for Kids in Patna – Think, Plan & Checkmate',
    intro_p1: 'Chess is universally recognized as the ultimate mind sport. At Phulwari Mother & Child Activity Centre, our dedicated chess academy teaches kids the art of analytical calculation, spatial planning, and strategic foresight in a friendly, intellectual environment.',
    intro_p2: 'Located in central Kidwaipuri, our coaches help children progress from the fundamental rules of piece movements to master-level openings, endgame calculations, and competitive tournament preparation.',
    hero_image: '/Chess/image.png',
    gallery_images: ['/Chess/image.png', '/Chess/image copy.png'],
    color: '#7C3AED',
    bg: '#EDE9FE',
    icon: 'Crown',
    why_matters_title: 'Why Chess is a Superpower for Young Brains',
    why_matters_content: 'Playing chess exercises both hemispheres of the brain. It drastically increases IQ, develops critical foresight, improves academic mathematical abilities, and teaches kids how to stay calm under pressure.',
    benefits_title: 'Cognitive Benefits of Chess',
    benefits: [
      { title: 'Logical Problem Solving', description: 'Children learn to evaluate multiple moves in advance and anticipate opponents\' reactions.' },
      { title: 'Memory Retention', description: 'Memorizing classic game patterns, openings, and endgame techniques drastically improves memory.' },
      { title: 'Patience & Impulse Control', description: 'Teaching children not to touch the first piece they see, encouraging measured deliberation.' }
    ],
    programs_title: 'Chess Training Modules',
    programs: [
      { title: 'Beginner: Pawn to King', age_bracket: 'Ages 5+', description: 'Piece movement, board coordinates, rules of check, checkmate, castling, and basic tactical motifs like forks and pins.' },
      { title: 'Intermediate: Tactical Mastery', age_bracket: 'Ages 7+', description: 'Opening principles, middle-game combinations, endgame king & pawn technique, and timed blitz/rapid clock training.' }
    ],
    why_choose_title: 'Why Choose Phulwari Chess Academy?',
    why_choose_points: [
      { title: 'FIDE-Standard Boards & Clocks', description: 'Professional tournament equipment for realistic competition practice.' },
      { title: 'Regular Center Tournaments', description: 'Internal championships and rated match opportunities.' },
      { title: 'Personal Game Analysis', description: 'Coaches analyze every played game with students to correct tactical mistakes.' }
    ],
    hyper_local_title: 'Central Patna Convenience',
    hyper_local_points: [
      { area: 'Kidwaipuri & Sri Krishna Nagar', description: 'Peaceful, air-conditioned, distraction-free study rooms.' },
      { area: 'Boring Road & Patliputra', description: 'Convenient after-school batches.' }
    ],
    testimonials: [
      { quote: 'My son won his school chess championship after just 5 months of coaching at Phulwari. The coaches are phenomenal!', author: 'Deepak K.', locality: 'Patna' }
    ],
    faqs: [
      { question: 'At what age can a child start learning chess?', answer: 'Children can start as early as 5 years old once they understand basic spatial concepts.' },
      { question: 'Are chess sets and clocks provided?', answer: 'Yes, all tournament-standard chess sets and digital clocks are provided in our academy.' }
    ],
    schema_json: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Phulwari Mother & Child Activity Centre',
      'url': 'https://phulwari.co.in/activities/chess-classes-patna'
    },
    order_index: 10,
    is_active: true
  },
  {
    id: 'play-zone',
    slug: 'play-zone',
    aliases: ['kids-play-zone', 'soft-play-area', 'playzone'],
    badge_text: 'Indoor Play Zone',
    title_tag: 'Safe Kids Play Zone & Indoor Activity Centre in Kidwaipuri, Patna | Near Income Tax Golamber - Phulwari',
    meta_description: 'Looking for a safe, indoor kids play zone in Patna? Located in Kidwaipuri near Income Tax Office & Veer Chand Patel Path. Perfect soft play area for toddlers and young children.',
    h1: 'Safe & Fun Kids Play Zone in Kidwaipuri, Patna | Phulwari Activity Centre',
    intro_p1: 'Phulwari Mother & Child Activity Centre is proud to present the best kids play zone in Kidwaipuri, Patna. Our modern soft indoor play area near Income Tax Office, Patna is a perfect place for infants, toddlers & young kids to play, learn and meet new friends.',
    intro_p2: 'A great option for mother and child activity center in Patna, our kids activity centre is located in central Patna city near Veer Chand Patel Path, Income Tax Golamber, Boring Road and other localities in and around Central Patna.',
    hero_image: '/Play_zone/image.png',
    gallery_images: ['/Play_zone/image.png', '/Play_zone/image copy.png', '/Play_zone/image copy 2.png'],
    color: '#FF8A3D',
    bg: '#FFEADB',
    icon: 'Gamepad2',
    why_matters_title: 'Why Choose Our Indoor Soft Play Area Near Income Tax Office, Patna?',
    why_matters_content: 'As a parent, finding a safe, clean and fun-filled environment for your little ones in Central Patna shouldn\'t be a task. At Phulwari, we have created the perfect interactive setting for kids to play indoors and explore new activities.',
    benefits_title: 'Key Features of Our Play Zone',
    benefits: [
      { title: 'Designed for Safety and Hygiene', description: 'Padded equipment, rounded edges and non-toxic materials with strict daily sanitization protocols in a 100% child-proof space.' },
      { title: 'Specially Curated Toddler Play Zone', description: 'Designed for 1 to 6 year olds focusing on motor skills development, hand-eye coordination, balance and spatial awareness.' },
      { title: 'The Giant Ball Pit', description: 'Sanitized colorful ball pit stimulating sensory exploration, color recognition and tactile learning.' },
      { title: 'Pretend Play & Story Blocks', description: 'Toy kitchens, mini-marketplaces and curated picture books encouraging imagination and social communication.' }
    ],
    programs_title: 'Interactive Offerings & Special Celebrations',
    programs: [
      { title: 'Open Play & Toddler Exploration', age_bracket: '6 Mos – 6 Yrs', description: 'Gentle foam slides, obstacle tunnels, and cushioned balance steps for developing gross motor skills safely.' },
      { title: 'Mother-Toddler Play Group', age_bracket: '1 – 3 Yrs', description: 'Structured sessions helping young mothers connect while introducing children to social play and movement.' },
      { title: 'Private Kids Birthday Parties', age_bracket: 'All Ages', description: 'Exclusive private hire of the indoor play park with customized themes, balloon decor, games host, and hygienic catering.' }
    ],
    why_choose_title: 'Easily Accessible Location in Central Patna',
    why_choose_points: [
      { title: 'From Income Tax Golamber', description: 'Less than a 2-minute drive.' },
      { title: 'From Veer Chand Patel Path', description: '1 to 2 minutes away.' },
      { title: 'From Boring Road / Anandpuri', description: '5 minutes drive via main connecting roads.' }
    ],
    hyper_local_title: 'Central Connectivity',
    hyper_local_points: [
      { area: 'Kidwaipuri Main Road', description: 'Road No. 25, Sri Krishna Nagar.' },
      { area: 'Income Tax Circle', description: 'Under 1-mile radius with stress-free drop-off.' }
    ],
    testimonials: [
      { quote: 'The cleanest and safest play area in Patna! My 2-year-old had a blast in the ball pit, and I could relax knowing everything is padded and sanitized.', author: 'Pooja V.', locality: 'Kidwaipuri, Patna' }
    ],
    faqs: [
      { question: 'What age group is the Phulwari Play Zone suitable for?', answer: 'Our indoor soft play area is specially customized for infants, toddlers and young kids aged 6 months up to 6 years.' },
      { question: 'Do I need to book a play session in advance?', answer: 'While walk-ins are welcome for daily open play hours, we recommend calling ahead or booking online to secure your slot, especially on weekends.' },
      { question: 'Is parents\' supervision required in the Play Zone?', answer: 'Yes, for toddlers and younger children, we encourage active parent involvement. Trained staff members are also on-site to assist and maintain safety.' },
      { question: 'How do you maintain hygiene and cleanliness in the soft play area?', answer: 'All soft play equipment, toys, ball pits and mats undergo deep cleaning and non-toxic sanitization every morning and between session breaks.' }
    ],
    schema_json: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Phulwari Mother & Child Activity Centre',
      'url': 'https://phulwari.co.in/activities/play-zone',
      'telephone': '+91 62073 68839'
    },
    order_index: 11,
    is_active: true
  },
  {
    id: 'mother-toddler-program',
    slug: 'mother-toddler-program',
    aliases: ['mother-toddler', 'toddler-program', 'mothers-and-toddlers'],
    badge_text: 'Mother & Toddler',
    title_tag: 'Best Mother & Toddler Program in Patna | Phulwari Activity Centre Kidwaipuri',
    meta_description: 'Enroll in Patna\'s premier Mother & Toddler program. Guided sensory play, cognitive bonding, music, and motor skill milestones in Kidwaipuri. Free trial session available!',
    h1: 'Mother & Toddler Program in Patna – Bonding, Learning & Early Milestones',
    intro_p1: 'The first three years of life are when 90% of brain development occurs. Phulwari Mother & Child Activity Centre offers Patna\'s pioneer Mother & Toddler Program, designed to foster deep emotional bonding between mother and child while gently stimulating early cognitive, sensory, and social milestones.',
    intro_p2: 'Conducted in a cheerful, hygienic environment at Sri Krishna Nagar, Kidwaipuri, our sessions blend music, tactile messy play, story circle, and motor activities guided by early childhood specialists.',
    hero_image: '/mothertod.webp',
    gallery_images: ['/mothertod.webp', '/motherhappy.webp'],
    color: '#FF4D8D',
    bg: '#FFE6EF',
    icon: 'Baby',
    why_matters_title: 'Why Early Mother & Child Bonding Matters',
    why_matters_content: 'Secure attachment in the toddler years builds emotional resilience, language fluency, and social confidence that last a lifetime.',
    benefits_title: 'Key Developmental Milestones',
    benefits: [
      { title: 'Sensory Stimulation', description: 'Safe tactile play with textures, colors, and soft musical shakers.' },
      { title: 'Language & Vocabulary', description: 'Rhythm rhymes and story circles expand communication before preschool.' },
      { title: 'Social Readiness', description: 'Toddlers learn parallel play, sharing, and interaction in a safe peer setting.' },
      { title: 'Mother Community Support', description: 'Mothers exchange parenting experiences and form lasting local friendships.' }
    ],
    programs_title: 'Program Modules & Batches',
    programs: [
      { title: 'Morning Sunshine Batch', age_bracket: '10:30 AM - 11:30 AM', description: 'Daily guided sensory, music, and motor bonding sessions Monday to Saturday for toddlers aged 1 to 3 years.' }
    ],
    why_choose_title: 'Why Choose Phulwari Mother & Toddler Program?',
    why_choose_points: [
      { title: 'Sanitized Safe Equipment', description: 'Non-toxic organic materials, soft padded floors, and daily UV sanitization.' },
      { title: 'Gentle Expert Guidance', description: 'Experienced facilitators who understand gentle parenting and toddler milestones.' }
    ],
    hyper_local_title: 'Local Neighborhood Convenience',
    hyper_local_points: [
      { area: 'Kidwaipuri & Boring Road', description: 'Centrally located for peaceful morning drop-ins.' }
    ],
    testimonials: [
      { quote: 'Attending the Mother-Toddler batch at Phulwari was the best decision of my maternity leave. My son blossomed socially and I found amazing mommy friends!', author: 'Shalini M.', locality: 'Patna' }
    ],
    faqs: [
      { question: 'What is the age requirement for the Mother & Toddler Program?', answer: 'The program is designed for toddlers aged 9 months to 3 years accompanied by their mother.' },
      { question: 'Can working mothers join weekend sessions?', answer: 'Yes, we have Saturday morning slots tailored for working parents.' }
    ],
    schema_json: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Phulwari Mother & Child Activity Centre',
      'url': 'https://phulwari.co.in/activities/mother-toddler-program'
    },
    order_index: 12,
    is_active: true
  },
  {
    id: 'mother-fitness-program',
    slug: 'mother-fitness-program',
    aliases: ['mother-fitness', 'fitness-for-mothers', 'postnatal-fitness'],
    badge_text: 'Mother Fitness',
    title_tag: 'Mother Fitness Program in Patna | Postnatal Yoga & Core Recovery - Phulwari',
    meta_description: 'Specialized fitness and wellness programs for mothers in Kidwaipuri, Patna. Reclaim energy, pelvic floor recovery, weight management and stress relief. Book a free demo today!',
    h1: 'Mother Fitness Program in Patna – Reclaim Your Strength, Energy & Peace',
    intro_p1: 'Motherhood is joyful but physically exhausting. Juggling daily duties often leaves moms with little time to care for their own bodies. At Phulwari Mother & Child Activity Centre, we believe a healthy, energetic mother is the foundation of a happy family.',
    intro_p2: 'Our dedicated Mother Fitness Program in Kidwaipuri is thoughtfully crafted for mothers at all stages—from postpartum recovery to long-term strength, postural correction, and mental tranquility.',
    hero_image: '/motherfit.webp',
    gallery_images: ['/motherfit.webp', '/yoga2.webp'],
    color: '#34B36B',
    bg: '#E3F7EA',
    icon: 'Dumbbell',
    why_matters_title: 'Why Mother Fitness Matters',
    why_matters_content: 'Safe, targeted fitness restores core integrity, relieves lower back tension from carrying children, boosts metabolism, and releases endorphins that elevate mood and reduce anxiety.',
    benefits_title: 'Holistic Pillars for Mothers',
    benefits: [
      { title: 'Core & Pelvic Floor Recovery', description: 'Gentle, non-straining exercises to heal diastasis recti and strengthen pelvic support.' },
      { title: 'Postural Correction & Back Relief', description: 'Counteracting hunched nursing posture and repetitive strain.' },
      { title: 'Cardiovascular Stamina & Toning', description: 'Low-impact cardio routines that boost daytime stamina and energy.' },
      { title: 'Mental Clarity & Stress Relief', description: 'Breathwork and quiet mindfulness to disconnect from daily chores and recharge.' }
    ],
    programs_title: 'Flexible Batches & Parallel Kids Activities',
    programs: [
      { title: 'Morning Wellness Flow', age_bracket: '10:30 AM - 11:30 AM', description: 'Gentle core recovery, yoga flow, and functional strength while toddlers are engaged in our play zone or activity batches.' }
    ],
    why_choose_title: 'Why Mothers Choose Phulwari',
    why_choose_points: [
      { title: 'Parallel Child Supervision', description: 'Your child is safely engaged in creative classes or soft play right in the same building.' },
      { title: 'Certified Women\'s Fitness Mentors', description: 'Trainers with deep understanding of women\'s physiology and postpartum recovery.' }
    ],
    hyper_local_title: 'Central Location',
    hyper_local_points: [
      { area: 'Kidwaipuri & Boring Road', description: 'Centrally situated on Sri Krishna Nagar Main Road.' }
    ],
    testimonials: [
      { quote: 'Phulwari is a sanctuary for mothers. I workout and socialize while my toddler is safely playing nearby. My back pain is gone!', author: 'Neelam G.', locality: 'Patna' }
    ],
    faqs: [
      { question: 'How soon after delivery can I start the Mother Fitness Program?', answer: 'We recommend starting 6 weeks after normal delivery or 10-12 weeks after a C-section, following clearance from your doctor.' },
      { question: 'What if I haven\'t worked out in years?', answer: 'All sessions are beginner-friendly with modifications to suit your comfort level.' }
    ],
    schema_json: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Phulwari Mother & Child Activity Centre',
      'url': 'https://phulwari.co.in/activities/mother-fitness-program'
    },
    order_index: 13,
    is_active: true
  }
];
