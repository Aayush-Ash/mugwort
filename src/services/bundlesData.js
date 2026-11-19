// Data model for Mugwort Herbal Patches bundles, benefits, and anatomy

export const BUNDLES = [
  {
    id: 1,
    name: '1-Pack Starter Pack',
    badge: 'Starter Pack',
    badgeColor: 'bg-neutral-100 text-neutral-800 border-neutral-300',
    patchesCount: 12,
    mrp: 999,
    salePrice: 549,
    savingsPercent: 45,
    shippingFee: 49,
    freeShipping: false,
    durationText: '6-Day Supply (1 Knee or Alternate)',
    pricePerPatch: 45.75,
    freeGift: null,
    popular: false,
    bestValue: false,
    description: 'Perfect for first-time users testing the soothing herbal heat therapy.',
    bullets: [
      '12 Ergonomic Moxibustion Patches',
      '8-Hour Sustained Warming Relief',
      '₹49 Standard Express Shipping'
    ]
  },
  {
    id: 2,
    name: '2-Pack Dual Knee Relief',
    badge: '⭐ MOST POPULAR',
    badgeColor: 'bg-emerald-600 text-white font-bold shadow-sm',
    patchesCount: 24,
    mrp: 1998,
    salePrice: 899,
    savingsPercent: 55,
    shippingFee: 0,
    freeShipping: true,
    durationText: '12-Day Intensive Bilateral Care',
    pricePerPatch: 37.45,
    freeGift: 'Free Travel Storage Pouch',
    popular: true,
    bestValue: false,
    description: 'The golden choice: treats both knees simultaneously for full mobility.',
    bullets: [
      '24 Ergonomic Moxibustion Patches',
      'FREE Express Shipping Across India',
      'Bonus Waterproof Herb Pouch (₹149 Val)',
      'Saves ₹1,099 vs Individual MRP'
    ]
  },
  {
    id: 3,
    name: '3-Pack Ultimate Joint Restoration',
    badge: '🔥 BEST VALUE (60% OFF)',
    badgeColor: 'bg-amber-500 text-neutral-950 font-extrabold shadow-sm',
    patchesCount: 36,
    mrp: 2997,
    salePrice: 1199,
    savingsPercent: 60,
    shippingFee: 0,
    freeShipping: true,
    durationText: '18–24 Day Complete Restoration Cycle',
    pricePerPatch: 33.30,
    freeGift: 'FREE Ayurvedic Joint Oil (Worth ₹299)',
    popular: false,
    bestValue: true,
    description: 'Maximum clinical results: recommended for severe arthritis and chronic cartilage wear.',
    bullets: [
      '36 Ergonomic Moxibustion Patches',
      'FREE Express Priority Courier (Shiprocket)',
      'FREE Herbal Joint Massage Roll-on (₹299 Val)',
      'Lowest Price: Only ₹33.30 per patch'
    ]
  }
];

export const THREE_ANGLE_BENEFITS = [
  {
    angle: 'Angle 1: Biological Mechanism',
    title: '8-Hour Sustained Moxibustion Heat',
    subtitle: 'Deep Thermal Vasodilation',
    tag: 'Thermal Therapy',
    icon: 'Flame',
    color: 'from-amber-500 to-orange-600',
    stat: '42°C',
    statLabel: 'Optimal Healing Temperature',
    summary: 'Unlike chemical sprays that evaporate in 15 minutes, our activated thermal moxa matrix radiates gentle 40–44°C infrared warmth directly into deep joint capsules.',
    keyPoints: [
      'Stimulates Synovial Fluid production to lubricate stiff bone-on-bone friction',
      'Dilates constricted micro-vessels to rush oxygenated blood into worn cartilage',
      'Flushes out accumulated lactic acid and inflammatory cytokines that cause morning pain'
    ],
    comparison: {
      regular: 'Pain Balms: Burns skin surface for 10 mins, stains clothes, greasy residue, zero cartilage penetration.',
      mugwort: 'Mugwort Patch: 8 hours deep continuous thermal infusion, completely dry, discreet under trousers.'
    }
  },
  {
    angle: 'Angle 2: Herbal Alchemy',
    title: '5-Year Aged Artemisia Argyi Extract',
    subtitle: 'Ancient Himalayan Moxa Formulation',
    tag: '100% Botanical',
    icon: 'Leaf',
    color: 'from-emerald-600 to-teal-700',
    stat: '98.4%',
    statLabel: 'Bio-Active Purity',
    summary: 'Sourced from high-altitude wild mugwort harvested during the peak solar solstice, naturally aged 5 years to eliminate damp harshness while maximizing flavonoids.',
    keyPoints: [
      'Pure Artemisia Argyi Essential Oil — Natural anti-inflammatory terpene powerhouse',
      'Wild Sunthi (Dry Indian Ginger) — Accelerates transdermal herbal bio-absorption',
      'Camphor & Menthol Extract — Immediate topical cooling counter-irritant for instant nerve relief'
    ],
    comparison: {
      regular: 'NSAID Painkiller Pills: Temporary numbness that irritates stomach lining, liver, and kidneys.',
      mugwort: 'Transdermal Herbal Patch: Direct targeted topical absorption without passing through digestive tract.'
    }
  },
  {
    angle: 'Angle 3: Ergonomic Engineering',
    title: '360° Patella Butterfly Lock',
    subtitle: 'Zero-Slip Motion-Flex Technology',
    tag: 'Ergonomic Fit',
    icon: 'ShieldCheck',
    color: 'from-blue-600 to-indigo-700',
    stat: '360°',
    statLabel: 'Anatomical Joint Hug',
    summary: 'Crafted with a custom-engineered dual-wing contour that embraces the patella without restricting bending, flexing, or walking.',
    keyPoints: [
      'Laser-Perforated Breathable Non-Woven Fabric prevents sweat buildup in Indian humidity',
      'Medical-grade hypoallergenic water-based adhesive leaves zero sticky glue marks',
      'Flexes naturally during stair climbing, morning walks, driving, or sleeping'
    ],
    comparison: {
      regular: 'Standard Square Bandages: Peels off after 2 steps, restricts knee bending, pulls body hair on removal.',
      mugwort: 'Butterfly Joint-Lock: Stays firmly in place for 8+ hours, painless hair-free peeling.'
    }
  }
];

export const PRODUCT_ANATOMY_LAYERS = [
  {
    id: 1,
    layerNumber: '01',
    name: 'Laser-Perforated Breathable Outer Shell',
    subtitle: 'Hypoallergenic Medical Non-Woven Fabric',
    badge: 'Skin-Friendly',
    thickness: '0.15 mm',
    functionText: 'Allows continuous air circulation while trapping soothing warmth, preventing itchiness and irritation even in humid Indian weather.',
    features: [
      'Micro-porous weave for sweat evaporation',
      'Ultra-thin profile fits invisibly under jeans, leggings & sarees',
      'Flexible 4-way stretch that follows joint articulation'
    ]
  },
  {
    id: 2,
    layerNumber: '02',
    name: 'Concentrated Artemisia Argyi Moxa Matrix',
    subtitle: 'Cold-Pressed Herbal Essence Reservoir',
    badge: '100% Organic',
    thickness: '0.40 mm',
    functionText: 'Contains high-density standardized Mugwort extract, ginger root, and frankincense that permeate transdermally across the skin barrier.',
    features: [
      '5-Year aged Artemisia Argyi essential volatile oils',
      'Sustained nano-release mechanism across 8 full hours',
      'Ayush-certified herbal safety without toxic petrochemicals'
    ]
  },
  {
    id: 3,
    layerNumber: '03',
    name: 'Self-Regulating Exothermic Thermal Core',
    subtitle: 'Air-Activated Mineral Moxibustion Layer',
    badge: 'Controlled 42°C',
    thickness: '0.65 mm',
    functionText: 'Naturally reacts with ambient air when unsealed to generate therapeutic 40–44°C radiant infrared warmth without any wires or microwaves.',
    features: [
      'Auto-stabilizes at safe therapeutic joint temperature',
      'No risk of scalding or thermal burns',
      'Simulates traditional clinical Moxibustion acupoint stimulation'
    ]
  },
  {
    id: 4,
    layerNumber: '04',
    name: 'Quick-Release Split Protective Backing',
    subtitle: 'Precision Silicon Anti-Adhesion Film',
    badge: 'Easy 10s Application',
    thickness: '0.08 mm',
    functionText: 'Two-stage split peel backing allows smooth, wrinkle-free application on knees, elbows, shoulders, or lower back with one hand.',
    features: [
      'Clean split center seam for instant peel',
      'Preserves freshness until the exact moment of use',
      'Leaves medical adhesive sterile and dirt-free'
    ]
  }
];

export const FAQS = [
  {
    q: 'How fast will I feel relief after applying the patch?',
    a: 'Most customers experience a gentle, soothing herbal warmth within 10–15 minutes of application. As the Artemisia Argyi and ginger extracts permeate into the joint, stiffness and shooting pains begin easing, reaching peak thermal comfort within 30 minutes.'
  },
  {
    q: 'Can I wear the Mugwort patch while walking, exercising, or sleeping?',
    a: 'Yes, absolutely! The patch is engineered with a flexible 360° patella butterfly contour and skin-friendly medical adhesive. It flexes smoothly with your knee movement and stays firmly in place during morning walks, daily household chores, office work, or overnight sleep.'
  },
  {
    q: 'Is it safe for sensitive skin? Will it pull my hair when peeling?',
    a: 'Our patches use a gentle medical-grade water-soluble adhesive. To peel off painlessly, simply apply a damp warm cloth or dab a few drops of coconut/baby oil over the edges before gently removing. It will slide off smoothly without pulling skin or body hair.'
  },
  {
    q: 'Can I apply it on other joints besides knees?',
    a: 'Yes! While designed for the knee patella, thousands of customers successfully use it for lower back stiffness (lumbar spine), frozen shoulder, cervical neck tension, and wrist or elbow aches.'
  },
  {
    q: 'What payment options do you support? Is COD available?',
    a: 'We support all popular Indian payment methods: Instant 1-Click UPI (Google Pay, PhonePe, Paytm, CRED), Net Banking, and OTP-Verified Cash on Delivery (COD) across 19,000+ Indian pincodes.'
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Suresh Narayanan',
    location: 'Chennai, Tamil Nadu',
    verified: true,
    rating: 5,
    date: '2 days ago',
    title: 'Climbing temple stairs without walking stick after 3 years!',
    comment: 'I am 64 and have osteoarthritis in both knees. Doctors suggested knee replacement, but I wanted to try natural remedies first. Ordered the 3-pack bundle. The gentle warmth lasts from 8 AM to 4 PM. Today I climbed 30 steps easily. Highly recommended for senior citizens.',
    bundleBought: '3-Pack Ultimate Joint Restoration'
  },
  {
    id: 2,
    name: 'Meenakshi Sharma',
    location: 'Jaipur, Rajasthan',
    verified: true,
    rating: 5,
    date: '4 days ago',
    title: 'Way better than smelly ointments that ruin clothes',
    comment: 'I was tired of Volini and Moov making my clothes smell and burning my skin for just 15 minutes. Mugwort patch sticks firmly, gives a soothing 42°C heat, and leaves zero sticky residue. Ordered another 3-pack for my mother.',
    bundleBought: '2-Pack Dual Knee Relief'
  },
  {
    id: 3,
    name: 'Col. Vikramjit Sodhi (Retd.)',
    location: 'Chandigarh, Punjab',
    verified: true,
    rating: 5,
    date: '1 week ago',
    title: 'Solid relief for old army knee injury',
    comment: 'Old meniscus wear from parade drills. This patch gives continuous warmth that loosens up early morning stiffness. The butterfly design doesn’t fall off even during my 4 km morning walk. Great product, prompt Shiprocket delivery in 2 days.',
    bundleBought: '3-Pack Ultimate Joint Restoration'
  }
];
