// MORA · MORI® Curated Rituals, Products, Practice and Anatomy Data Model

export const RITUAL_PRODUCTS = [
  {
    id: 1,
    tag: '01 / ESSENTIAL',
    name: 'The Muscle Tapper',
    subtitle: 'Aged Mugwort & Organic Linen',
    price: 48,
    currency: '$',
    mrp: 60,
    savingsPercent: 20,
    image: '/assets/mora-mori/product_hammer_single.png',
    colors: [
      { name: 'Olive Green', code: '#4f623b', inStock: true },
      { name: 'Deep Plum', code: '#4d2657', inStock: true },
      { name: 'Earth Ochre', code: '#7b573e', inStock: true }
    ],
    popular: false,
    featured: false,
    description: 'The foundational meridian tapping tool. Filled with slow-cured aged wild Artemisia Argyi and wrapped in breathable organic cotton weave on a flexible bamboo spine.',
    bullets: [
      'Slow-cured mountain mugwort aromatic core',
      'Flexible bamboo spine for effortless recoil',
      'Breathable organic linen weave head',
      'Includes natural cotton drawstring pouch'
    ]
  },
  {
    id: 2,
    tag: 'MOST LOVED',
    badge: 'MOST LOVED',
    name: 'The Complete Ritual Set',
    subtitle: 'Muscle Tapper + 50ml Infused Body Oil',
    price: 78,
    currency: '$',
    mrp: 98,
    savingsPercent: 20,
    image: '/assets/mora-mori/product_complete_set.png',
    colors: [
      { name: 'Olive Green', code: '#4f623b', inStock: true },
      { name: 'Deep Plum', code: '#4d2657', inStock: true }
    ],
    popular: true,
    featured: true,
    description: 'Our signature restorative pairing: The Muscle Tapper paired with cold-pressed 50ml Mugwort Botanical Body Oil for deep meridian penetration and sensory calmness.',
    bullets: [
      'The Muscle Tapper (Choice of Color)',
      '50ml Infused Mugwort Body Oil in Amber Dropper',
      'Handcrafted Travertine Display Block',
      'Guided 15-Second Meridian Ritual Card'
    ]
  },
  {
    id: 3,
    tag: '02 / TRAVEL',
    name: 'The On-the-Go Duo',
    subtitle: 'Travel Muscle Tapper & Linen Sleeve',
    price: 56,
    currency: '$',
    mrp: 70,
    savingsPercent: 20,
    image: '/assets/mora-mori/product_travel_duo.png',
    colors: [
      { name: 'Deep Plum', code: '#4d2657', inStock: true },
      { name: 'Olive Green', code: '#4f623b', inStock: true }
    ],
    popular: false,
    featured: false,
    description: 'Engineered for mobility: compact version of our muscle tapper with reinforced heavyweight linen travel sleeve. Carry meridian relief wherever life moves you.',
    bullets: [
      'Compact Ergonomic Travel Tapper',
      'Custom Heavyweight Organic Linen Travel Sleeve',
      'TSA & Carry-On Approved Dimensions',
      'Ideal for desk resets, long flights & race day'
    ]
  }
];

// 4 Ways to Use (The Daily Practice)
export const DAILY_PRACTICES = [
  {
    id: 'desk',
    tag: '01 / DESK',
    title: 'At Your Desk',
    subtitle: 'Ease stiffness, reset posture and stay focused.',
    image: '/assets/mora-mori/card_desk.png',
    icon: 'Laptop',
    quote: 'Releases neck tension after back-to-back Zoom calls.'
  },
  {
    id: 'bike',
    tag: '02 / BIKE',
    title: 'On the Bike',
    subtitle: 'A quick reset for long rides and tired muscles.',
    image: '/assets/mora-mori/card_bike.png',
    icon: 'Bike',
    quote: 'Unwinds lower back strain after 50km endurance rides.'
  },
  {
    id: 'gym',
    tag: '03 / RECOVERY',
    title: 'Post-Workout',
    subtitle: 'Support recovery, release muscle tension and feel refreshed.',
    image: '/assets/mora-mori/card_gym.png',
    icon: 'Dumbbell',
    quote: 'Gently flushes lactic acid from forearms and quads.'
  },
  {
    id: 'run',
    tag: '04 / RUN',
    title: 'For HYROX & Running',
    subtitle: 'A portable recovery partner for training, racing and active days.',
    image: '/assets/mora-mori/card_runner.png',
    icon: 'Activity',
    quote: 'Pre-race meridian wake-up and post-finish line reset.'
  }
];

// Botanical Anatomy Hotspots
export const ANATOMY_HOTSPOTS = [
  {
    id: 'core',
    number: '01',
    title: '01 / AGED MUGWORT CORE',
    desc: 'Slow-cured herbal blend for aromatic warmth & deep release',
    details: 'Wild Artemisia Argyi harvested at peak solar solstice, dried naturally for 5 years to enrich essential flavonoids without damp harshness.'
  },
  {
    id: 'linen',
    number: '02',
    title: '02 / WOVEN LINEN HEAD',
    desc: 'Breathable organic cotton weave that softens with every tap',
    details: 'Hand-wrapped in undyed natural linen that cushions the percussion impact, diffusing gentle pressure across acupoints.'
  },
  {
    id: 'spine',
    number: '03',
    title: '03 / FLEXIBLE BAMBOO SPINE',
    desc: 'Calibrated spring-back rhythm without wrist strain',
    details: 'Steam-curved mountain bamboo core provides a natural rhythmic rebound, doing 80% of the movement work effortlessly.'
  }
];

// The Ritual 3 Steps
export const RITUAL_STEPS = [
  {
    step: '01',
    title: '01. Warm with Mugwort Oil',
    desc: 'Lightly apply body oil to prep and soothe the skin.',
    icon: 'Leaf'
  },
  {
    step: '02',
    title: '02. Tap Along Meridians',
    desc: 'Daily tapping with the power of mugwort to ease muscle stiffness.',
    icon: 'Waves'
  },
  {
    step: '03',
    title: '03. Release & Breathe',
    desc: 'Feel lighter, more energized, and deeply refreshed.',
    icon: 'Wind'
  }
];

// Press & Voices of the Ritual
export const PRESS_MENTIONS = [
  { name: 'VOGUE', quote: '“The ancient wellness tool quietly taking over modern desks.”' },
  { name: 'goop', quote: '“A grounded, rhythmic daily ritual that melts away screen fatigue.”' },
  { name: 'ARCHITECTURAL DIGEST', quote: '“As sculptural as it is therapeutic. Beautiful on any travertine nightstand.”' },
  { name: 'WELL+GOOD', quote: '“Better than an aggressive massage gun for calming sensitive nervous systems.”' }
];

export const TESTIMONIALS = [
  {
    id: 1,
    type: 'practitioner',
    name: 'Elena Vass',
    role: 'Somatic Bodyworker & Yoga Lead',
    image: '/assets/mora-mori/practitioner.png',
    badge: 'VERIFIED PRACTITIONER',
    quote: 'A gentle, rhythmic reset that grounds the nervous system in minutes.'
  },
  {
    id: 2,
    type: 'quote',
    name: 'Maya R.',
    role: 'Creative Director',
    stars: 5,
    quote: '“Five minutes at my desk melts away shoulder tension better than any percussion gun — and the warm mugwort scent resets my focus.”',
    badge: '✓ Verified Daily User',
    featured: true
  },
  {
    id: 3,
    type: 'quote',
    name: 'Dr. Kenji Sato',
    role: 'Acupuncturist',
    stars: 5,
    quote: '“A timeless meridian tool reimagined with remarkable ergonomic balance. My clients reach for it daily.”',
    badge: '✓ Verified Health Partner',
    featured: false
  }
];

// Video Showcase: How & Why We Use This
export const RITUAL_VIDEOS = [
  {
    id: 'desk-reset',
    number: '01',
    category: 'DESK & FOCUS RESET',
    title: 'Screen Fatigue & Neck Relief',
    videoSrc: '/assets/mora-mori/gemini_generated_video_d7f29bc4.mp4',
    poster: '/assets/mora-mori/card_desk.png',
    runtime: '10s',
    badge: 'DAILY WORKSPACE RESET',
    acupoint: 'GB21 · Shoulder Well (Jianjing)',
    whyHeadline: 'Why We Use This at the Desk',
    whyText: 'Prolonged typing and screen focus lock the cervical trapezius and suboccipital muscles, constricting blood flow to the head and causing afternoon brain fog. Unlike harsh electric guns that jar the skull, the gentle botanical percussion resets muscle tone with zero vibration discomfort.',
    whyHighlights: [
      'Diffuses tech-neck and cervical stiffness',
      'Awakens stagnant meridian circulation',
      'Calms mental overstimulation in 60 seconds'
    ],
    howHeadline: 'How to Practice at Your Desk',
    howSteps: [
      { step: '1', title: 'Hold & Relax Spine', desc: 'Hold the bamboo spine with a relaxed grip. Let the natural spring do 80% of the movement work.' },
      { step: '2', title: 'Rhythmic Percussion', desc: 'Tap lightly along the ridge between neck and shoulder (GB21) for 30 seconds on each side.' },
      { step: '3', title: 'Exhale & Inhale', desc: 'Take one deep belly breath as the soothing herbal aroma of aged mugwort envelops your senses.' }
    ],
    targetProduct: 'The Muscle Tapper',
    targetProductId: 1
  },
  {
    id: 'runner-recovery',
    number: '02',
    category: 'POST-RUN & ENDURANCE',
    title: 'Legs, IT Band & Joint Ease',
    videoSrc: '/assets/mora-mori/gemini_generated_video_764c37b1.mp4',
    poster: '/assets/mora-mori/card_runner.png',
    runtime: '10s',
    badge: 'VERIFIED ATHLETE ROUTINE',
    acupoint: 'ST36 · Leg Three Miles (Zusanli)',
    whyHeadline: 'Why We Use This After Every Run',
    whyText: 'Impact sports like road running and HYROX cause cellular micro-trauma and lactic buildup throughout lower extremities. Artemisia Argyi (aged mugwort) has been cherished for centuries in traditional athletics for dispelling dampness and warming deep connective tissue.',
    whyHighlights: [
      'Accelerates lymphatic drainage & lactic clearance',
      'Cushioned cotton head protects shinbones & patella',
      'Reduces next-day DOMS and heavy leg fatigue'
    ],
    howHeadline: 'How to Practice Post-Run',
    howSteps: [
      { step: '1', title: 'Comfortable Seat', desc: 'Sit with legs relaxed. Start at the upper outer quad and follow the IT band downward.' },
      { step: '2', title: 'Calf & Achilles Tap', desc: 'Use brisk, gentle taps along the gastrocnemius (calf) to encourage venous return toward the heart.' },
      { step: '3', title: 'Oil Infusion', desc: 'Follow with 2 drops of Mugwort Body Oil for prolonged botanical thermal release.' }
    ],
    targetProduct: 'The Complete Ritual Set',
    targetProductId: 2
  },
  {
    id: 'yoga-mobility',
    number: '03',
    category: 'YOGA & JOINT MOBILITY',
    title: 'Mindful Asana & Hip Opening',
    videoSrc: '/assets/mora-mori/Woman_doing_yoga_and_tapping_67825e96_1080p.mp4',
    poster: '/assets/mora-mori/thumb_yoga.png',
    runtime: '10s',
    badge: 'SOMATIC MOBILITY PRACTICE',
    acupoint: 'GB30 & SP10 · Hip & Knee Meridians',
    whyHeadline: 'Why We Practice Tapping During Yoga',
    whyText: 'Tight hips, knees, and fascia restrict prana and range of motion during deep stretches. Combining somatic breathwork with rhythmic mugwort percussion softens tense connective tissue, lubricates joint capsules, and anchors mental stillness on the mat.',
    whyHighlights: [
      'Releases deep hip flexor & piriformis restriction',
      'Warms joint capsules before & after deep poses',
      'Combines traditional yogic stillness with meridian tapping'
    ],
    howHeadline: 'How to Practice on the Mat',
    howSteps: [
      { step: '1', title: 'Ground in Asana', desc: 'Settle into a seated twist, butterfly pose, or cross-legged posture with an elongated spine.' },
      { step: '2', title: 'Rhythmic Joint Percussion', desc: 'Gently tap outer hip, IT band, and around the knee joint for 45 seconds to open connective fascia.' },
      { step: '3', title: 'Deep Exhale', desc: 'Inhale the grounding herbal aroma of aged mugwort and feel tension dissolve into the mat.' }
    ],
    targetProduct: 'The Complete Ritual Set',
    targetProductId: 2
  },
  {
    id: 'gym-workout',
    number: '04',
    category: 'POST-WORKOUT & GYM BAG',
    title: 'Myofascial Release & Portability',
    videoSrc: '/assets/mora-mori/gemini_generated_video_9e3bb612.mp4',
    poster: '/assets/mora-mori/card_gym.png',
    runtime: '10s',
    badge: 'ON-THE-GO RECOVERY',
    acupoint: 'BL18–23 · Back Transporting Points',
    whyHeadline: 'Why We Pack This in the Gym Bag',
    whyText: 'Heavy resistance training tightens the fascia envelope around muscles. Heavy motorized guns can trigger defensive muscle guarding, whereas the organic resonance of mountain bamboo and dense herb cushion invites deep parasympathetic muscle release.',
    whyHighlights: [
      'Ultra-lightweight & packs effortlessly into any gym bag',
      'No charging, batteries, cords, or motorized noise',
      'Reaches hard-to-access mid-back and scapular zones'
    ],
    howHeadline: 'How to Practice After Training',
    howSteps: [
      { step: '1', title: 'Unpack & Unwind', desc: 'Pull the muscle tapper from your bag directly after your final cooldown or stretch.' },
      { step: '2', title: 'Mid-Back & Lats', desc: 'Reach over your shoulder or behind your back. The long bamboo spine easily taps between the shoulder blades.' },
      { step: '3', title: 'Chest & Clavicle', desc: 'Lightly tap the upper pectoral area to open posture collapsed by heavy pressing.' }
    ],
    targetProduct: 'The On-the-Go Duo',
    targetProductId: 3
  }
];
