// MORA · MORI® Curated Rituals, Products, Practice and Anatomy Data Model

export const RITUAL_PRODUCTS = [
  {
    id: 1,
    tag: '01 / ESSENTIAL',
    name: 'The Mugwort Hammer',
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
    subtitle: 'Hammer + 50ml Infused Body Oil',
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
    description: 'Our signature restorative pairing: The Mugwort Hammer paired with cold-pressed 50ml Mugwort Botanical Body Oil for deep meridian penetration and sensory calmness.',
    bullets: [
      'The Mugwort Hammer (Choice of Color)',
      '50ml Infused Mugwort Body Oil in Amber Dropper',
      'Handcrafted Travertine Display Block',
      'Guided 15-Second Meridian Ritual Card'
    ]
  },
  {
    id: 3,
    tag: '02 / TRAVEL',
    name: 'The On-the-Go Duo',
    subtitle: 'Travel Hammer & Linen Sleeve',
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
    description: 'Engineered for mobility: compact version of our tapper with reinforced heavyweight linen travel sleeve. Carry meridian relief wherever life moves you.',
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
