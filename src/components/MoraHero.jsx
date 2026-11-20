import React from 'react';
import { ArrowRight, Play, Leaf, Activity, RefreshCw, Laptop } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function MoraHero() {
  const { openCheckoutWithProduct, setIsRitualVideoOpen } = useShop();

  const scrollToRituals = () => {
    const el = document.getElementById('curated-rituals');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#f6f1e8] text-[#2c241c] pt-8 sm:pt-14 pb-0">
      
      {/* Subtle organic sunlight & shadow effect */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Hero Content & Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 z-10 py-4 sm:py-8">
            
            {/* Eyebrow */}
            <div className="text-[12px] sm:text-[13px] font-semibold tracking-[0.22em] uppercase text-[#615448]">
              MUGWORT HAMMER
            </div>

            {/* Headline with curved green brush underline */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#1e1711] font-normal leading-[1.12]">
              Tap for relief,<br />
              recovery and<br />
              <span className="relative inline-block">
                everyday vitality.
                {/* Organic hand-drawn brush SVG underline */}
                <svg
                  className="absolute left-0 -bottom-2.5 w-full h-3 text-[#445834] overflow-visible"
                  viewBox="0 0 260 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C68 2.5 185 2 257 8"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeOpacity="0.85"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#4f4337] leading-relaxed max-w-xl font-normal">
              A traditional tapper, reimagined for modern life. Daily tapping with the power of mugwort to ease muscle stiffness, support circulation, and help you feel lighter and more energized.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={scrollToRituals}
                className="glow-btn-green text-white font-medium text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-full flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>SHOP MUGWORT HAMMER</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsRitualVideoOpen(true)}
                className="text-xs sm:text-sm font-medium text-[#2d241d] hover:text-[#445834] transition-colors flex items-center gap-2 underline underline-offset-4 cursor-pointer"
              >
                <span>Watch the 15s Ritual</span>
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </button>
            </div>

          </div>

          {/* Right Column: Hero Photo with Interactive Hotspots */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            <div className="relative w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden shadow-sm group">
              <img
                src="/assets/mora-mori/hero_product.png"
                alt="MORA · MORI Mugwort Body Oil and Wellness Hammers on Travertine Stone"
                className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-700"
              />

              {/* Hotspot 1: INFUSED WITH MUGWORT (Green ball) */}
              <div className="absolute top-[28%] left-[22%] sm:left-[24%] z-20 flex items-center">
                <div className="bg-[#fcfaf7]/90 backdrop-blur-md border border-[#d6cbba] text-[#2c231b] px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <span>INFUSED WITH MUGWORT</span>
                </div>
                {/* Pointer dot */}
                <div className="relative flex items-center justify-center ml-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#445834] shadow-sm" />
                  <span className="absolute w-4 h-4 rounded-full bg-[#445834]/30 animate-ping" />
                </div>
              </div>

              {/* Hotspot 2: INFUSE WITH DEEP PLUM (Purple ball) */}
              <div className="absolute top-[29%] right-[12%] sm:right-[15%] z-20 flex items-center flex-row-reverse">
                <div className="bg-[#fcfaf7]/90 backdrop-blur-md border border-[#d6cbba] text-[#2c231b] px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <span>INFUSE WITH DEEP PLUM</span>
                </div>
                {/* Pointer dot */}
                <div className="relative flex items-center justify-center mr-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#4d2657] shadow-sm" />
                  <span className="absolute w-4 h-4 rounded-full bg-[#4d2657]/30 animate-ping" />
                </div>
              </div>

              {/* Hotspot 3: BAMBOO-CORE FLEX (Handle) */}
              <div className="absolute top-[48%] right-[8%] sm:right-[12%] z-20 flex items-center flex-row-reverse">
                <div className="bg-[#fcfaf7]/90 backdrop-blur-md border border-[#d6cbba] text-[#2c231b] px-2.5 py-1 rounded text-[10px] font-semibold tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <span>BAMBOO-CORE FLEX</span>
                </div>
                <div className="relative flex items-center justify-center mr-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#6b5d4f] shadow-sm" />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Hero Bottom Feature Strip (Deep Espresso Brown Bar) */}
      <div className="mt-12 bg-[#201813] text-[#ede6dc] border-t border-[#31261e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-4.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-[13px] font-normal">
            
            <div className="flex items-center gap-2.5 justify-center md:justify-start border-r border-[#382c23] pr-2 last:border-r-0">
              <Leaf className="w-4 h-4 text-[#8ea77b] shrink-0 stroke-[1.8]" />
              <span className="text-[#ded5c8]">Infused with mugwort</span>
            </div>

            <div className="flex items-center gap-2.5 justify-center md:justify-start border-r border-[#382c23] pr-2 last:border-r-0">
              <Activity className="w-4 h-4 text-[#8ea77b] shrink-0 stroke-[1.8]" />
              <span className="text-[#ded5c8]">Eases everyday muscle tension</span>
            </div>

            <div className="flex items-center gap-2.5 justify-center md:justify-start border-r border-[#382c23] pr-2 last:border-r-0">
              <RefreshCw className="w-4 h-4 text-[#8ea77b] shrink-0 stroke-[1.8]" />
              <span className="text-[#ded5c8]">Supports circulation & recovery</span>
            </div>

            <div className="flex items-center gap-2.5 justify-center md:justify-start">
              <Laptop className="w-4 h-4 text-[#8ea77b] shrink-0 stroke-[1.8]" />
              <span className="text-[#ded5c8]">Perfect for desk, travel & workouts</span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
