import React, { useState } from 'react';
import { 
  Star, 
  Flame, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Leaf, 
  Sparkles,
  Zap,
  Truck,
  RotateCcw,
  BadgeCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function HeroSection() {
  const { openCheckoutWithBundle, setSelectedBundleId } = useShop();
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const mediaSlides = [
    {
      id: 'knee_patch',
      title: 'Ergonomic Knee Fit with 42°C Thermal Moxa Radiance',
      badge: 'Active Thermal Penetration',
      tag: 'Knee Patella Application',
      caption: 'Butterfly wing contour stays locked in place for 8 hours of soothing warmth.'
    },
    {
      id: 'packaging',
      title: 'Airtight Sealed 12-Patch Herbal Treatment Packs',
      badge: 'Sterile Foil Sachets',
      tag: 'Freshness Guaranteed',
      caption: 'Vacuum sealed to lock in volatile medicinal Artemisia argyi essential oils.'
    },
    {
      id: 'ingredients',
      title: '5-Year Aged Artemisia Argyi + Himalayan Sunthi',
      badge: '100% Herbal Alchemy',
      tag: 'Zero NSAID Chemicals',
      caption: 'Pure botanical moxibustion formula safe for daily senior citizen use.'
    },
    {
      id: 'multizone',
      title: 'Targeted Relief for Knees, Back, Shoulders & Neck',
      badge: 'Versatile Joint Care',
      tag: 'Full Body Mobility',
      caption: 'Flexible adhesive moves naturally with any joint without hair-pulling discomfort.'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-neutral-900 to-neutral-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-800">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header / Brand Row */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-neutral-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-black text-xl">
              🌿
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight font-heading text-white flex items-center gap-1.5">
                MUGWORT<span className="text-emerald-400 font-normal text-sm sm:text-base">THERAPY™</span>
              </span>
              <p className="text-[11px] text-emerald-400/90 font-medium tracking-wide uppercase">
                Ayurvedic Moxibustion Joint Science
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-700/60 rounded-full px-3 py-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-300 font-medium">1,248 Orders Delivered This Week</span>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('bundle-selector-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Bundles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headline, Trust & CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Social proof rating pill */}
            <div className="inline-flex items-center gap-2.5 bg-neutral-900/90 border border-emerald-500/30 rounded-full px-3.5 py-1.5 text-xs sm:text-sm shadow-inner">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-white">4.9/5</span>
              <span className="text-neutral-400">|</span>
              <span className="text-neutral-300">
                <strong className="text-emerald-400">18,429+</strong> Verified Buyers in India
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              End Chronic Knee & Joint Stiffness Naturally in{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                15 Minutes
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              Infused with <strong className="text-white">5-Year Aged Artemisia Argyi</strong> (Wild Mountain Mugwort) and calibrated <strong className="text-amber-300">42°C sustained moxibustion heat</strong>. Penetrates worn cartilage directly to melt away stiffness without chemical painkillers or greasy balms.
            </p>

            {/* Micro Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-neutral-200">
              <div className="flex items-center gap-2.5 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800">
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>8-Hour Deep Heat:</strong> Continuous soothing thermal penetration</span>
              </div>
              <div className="flex items-center gap-2.5 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800">
                <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>100% Herbal Moxa:</strong> Zero NSAID drugs or chemical steroids</span>
              </div>
              <div className="flex items-center gap-2.5 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span><strong>Butterfly Joint-Lock:</strong> 360° patella hug, won't slip on walk</span>
              </div>
              <div className="flex items-center gap-2.5 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800">
                <BadgeCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span><strong>Painless Removal:</strong> Leaves no sticky glue residue</span>
              </div>
            </div>

            {/* Hero CTA Block */}
            <div className="pt-4 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedBundleId(2);
                    openCheckoutWithBundle(2);
                  }}
                  className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-base sm:text-lg py-4 px-8 rounded-2xl transition-all transform hover:-translate-y-0.5 shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Zap className="w-5 h-5 fill-current text-amber-300" />
                  <span>Claim 2-Pack Offer &bull; ₹899</span>
                  <span className="bg-emerald-950/40 text-amber-300 text-xs font-bold px-2.5 py-1 rounded-full uppercase border border-amber-300/30">
                    Save 55%
                  </span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('bundle-selector-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border border-neutral-700 hover:border-neutral-500 bg-neutral-900/80 text-neutral-200 hover:text-white font-medium text-sm sm:text-base py-4 px-6 rounded-2xl transition-colors text-center cursor-pointer"
                >
                  Compare All 3 Bundles &darr;
                </button>
              </div>

              {/* Sub-CTA Trust Guarantees */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1-Click UPI & Verified COD
                </span>
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <Truck className="w-4 h-4 text-blue-400" /> Free Dispatch via Shiprocket
                </span>
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <RotateCcw className="w-4 h-4 text-amber-400" /> 7-Day Comfort Guarantee
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Product Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-900/90 border border-neutral-700/70 rounded-3xl p-5 sm:p-6 shadow-2xl relative">
              
              {/* Product Badge Pill */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-emerald-900/70 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {mediaSlides[activeMediaIndex].badge}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  View {activeMediaIndex + 1} of 4
                </span>
              </div>

              {/* Visual Display Screen */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center relative overflow-hidden group">
                
                {/* SVG Visual Graphic 1: Knee with Thermal Radiance */}
                {activeMediaIndex === 0 && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative">
                    {/* Concentric thermal waves */}
                    <div className="absolute w-56 h-56 rounded-full border border-amber-500/20 animate-ping opacity-25" />
                    <div className="absolute w-44 h-44 rounded-full border border-orange-500/30 animate-pulse" />
                    
                    {/* Stylized Knee Patch Graphic */}
                    <div className="relative z-10 w-44 h-40 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 rounded-[40px] border-2 border-amber-400/60 shadow-2xl flex flex-col items-center justify-center p-3 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                      <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center mb-1">
                        <Flame className="w-7 h-7 text-amber-300 animate-bounce" />
                      </div>
                      <span className="text-white font-black text-xs tracking-wider uppercase">MUGWORT KNEE-LOCK</span>
                      <span className="text-amber-200 text-[10px] font-mono">42°C Thermal Moxa Core</span>
                      <div className="mt-2 flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      </div>
                    </div>

                    <div className="mt-4 z-10">
                      <p className="text-xs font-semibold text-emerald-300">360° Patella Butterfly Contour</p>
                      <p className="text-[11px] text-neutral-400">Locked on knee &bull; 8-hr warming vasodilation</p>
                    </div>
                  </div>
                )}

                {/* SVG Visual Graphic 2: Packaging & Sachets */}
                {activeMediaIndex === 1 && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative">
                    <div className="w-48 h-36 bg-gradient-to-br from-emerald-900 via-neutral-900 to-emerald-950 border-2 border-emerald-500/40 rounded-2xl shadow-xl flex flex-col items-center justify-center p-4 relative">
                      <div className="absolute -top-3 right-3 bg-amber-400 text-neutral-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                        12 PATCHES
                      </div>
                      <span className="text-2xl mb-1">🌿</span>
                      <span className="text-white font-extrabold text-sm tracking-wide">MUGWORT™ HERBAL</span>
                      <span className="text-emerald-400 text-xs">Moxibustion Knee Plasters</span>
                      <span className="text-[10px] text-neutral-400 mt-2 border-t border-neutral-800 pt-1 w-full">
                        Hermetically Sealed Anti-Oxidation Foil
                      </span>
                    </div>
                    <p className="mt-4 text-xs font-semibold text-neutral-300">Airtight Individual Sachets for Travel & Home</p>
                  </div>
                )}

                {/* SVG Visual Graphic 3: Herbal Ingredients */}
                {activeMediaIndex === 2 && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
                      <div className="bg-neutral-900 border border-emerald-500/30 rounded-xl p-2.5 flex flex-col items-center">
                        <span className="text-2xl mb-1">🌱</span>
                        <span className="text-xs font-bold text-white">Mugwort</span>
                        <span className="text-[10px] text-emerald-400">Artemisia</span>
                      </div>
                      <div className="bg-neutral-900 border border-amber-500/30 rounded-xl p-2.5 flex flex-col items-center">
                        <span className="text-2xl mb-1">🫚</span>
                        <span className="text-xs font-bold text-white">Sunthi</span>
                        <span className="text-[10px] text-amber-400">Dry Ginger</span>
                      </div>
                      <div className="bg-neutral-900 border border-blue-500/30 rounded-xl p-2.5 flex flex-col items-center">
                        <span className="text-2xl mb-1">❄️</span>
                        <span className="text-xs font-bold text-white">Menthol</span>
                        <span className="text-[10px] text-blue-400">Counter-Cool</span>
                      </div>
                    </div>
                    <p className="mt-4 text-xs font-semibold text-emerald-300">Cold-Pressed Botanical Synergism</p>
                    <p className="text-[11px] text-neutral-400">No harmful chemical drugs, steroids, or parabens</p>
                  </div>
                )}

                {/* SVG Visual Graphic 4: Multi-Zone Application */}
                {activeMediaIndex === 3 && (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="grid grid-cols-2 gap-2.5 w-full max-w-xs text-xs">
                      <div className="bg-neutral-900/80 border border-neutral-700 rounded-lg p-2 flex items-center gap-2">
                        <span className="text-lg">🦵</span>
                        <div className="text-left">
                          <p className="font-bold text-white">Knees</p>
                          <p className="text-[10px] text-neutral-400">Patella Cartilage</p>
                        </div>
                      </div>
                      <div className="bg-neutral-900/80 border border-neutral-700 rounded-lg p-2 flex items-center gap-2">
                        <span className="text-lg">🧘</span>
                        <div className="text-left">
                          <p className="font-bold text-white">Lower Back</p>
                          <p className="text-[10px] text-neutral-400">Lumbar Disc</p>
                        </div>
                      </div>
                      <div className="bg-neutral-900/80 border border-neutral-700 rounded-lg p-2 flex items-center gap-2">
                        <span className="text-lg">💪</span>
                        <div className="text-left">
                          <p className="font-bold text-white">Shoulders</p>
                          <p className="text-[10px] text-neutral-400">Rotator Cuff</p>
                        </div>
                      </div>
                      <div className="bg-neutral-900/80 border border-neutral-700 rounded-lg p-2 flex items-center gap-2">
                        <span className="text-lg">🧣</span>
                        <div className="text-left">
                          <p className="font-bold text-white">Neck</p>
                          <p className="text-[10px] text-neutral-400">Cervical Strain</p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-xs font-semibold text-emerald-300">Ergonomic Multi-Joint Application</p>
                  </div>
                )}

              </div>

              {/* Slide Caption */}
              <div className="mt-3">
                <h4 className="text-sm font-bold text-white">{mediaSlides[activeMediaIndex].title}</h4>
                <p className="text-xs text-neutral-400">{mediaSlides[activeMediaIndex].caption}</p>
              </div>

              {/* Thumbnail Switcher */}
              <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-neutral-800">
                {mediaSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`p-2 rounded-xl text-[11px] font-medium transition-all text-center border cursor-pointer ${
                      activeMediaIndex === idx
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-sm'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <span>{idx === 0 ? '🦵 Knee Fit' : idx === 1 ? '📦 Pack' : idx === 2 ? '🌿 Herbs' : '🎯 Multi'}</span>
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
