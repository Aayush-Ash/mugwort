import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Check, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const HAMMER_COLORS = [
  {
    id: 'olive-green',
    name: 'Olive Green',
    code: '#4f623b',
    borderCode: '#3c4d2c',
    bgLight: '#eef3ea',
    tag: 'MOST POPULAR',
    tagColor: '#445834',
    resonance: 'Mountain Artemisia • Everyday Vitality',
    desc: 'Crafted with wild Artemisia Argyi leaves slow-cured for 5 years. Renowned in oriental meridian practice for clearing stagnation, invigorating circulation, and relieving neck and shoulder stiffness.',
    hotspot: { x: '28%', y: '32%' }
  },
  {
    id: 'deep-plum',
    name: 'Deep Plum',
    code: '#4d2657',
    borderCode: '#391a42',
    bgLight: '#f6eff8',
    tag: 'RESTORATIVE',
    tagColor: '#5c2d69',
    resonance: 'Botanical Night Weave • Deep Calming',
    desc: 'Infused with soothing mountain botanicals in an organic violet linen weave. Designed for wind-down evening rituals, lower back decompression, and settling nervous exhaustion after high-stress days.',
    hotspot: { x: '48%', y: '24%' }
  },
  {
    id: 'earth-ochre',
    name: 'Earth Ochre',
    code: '#7b573e',
    borderCode: '#61432e',
    bgLight: '#fbf4ee',
    tag: 'GROUNDING',
    tagColor: '#6d4c35',
    resonance: 'Natural Linen & Bamboo • Fascia Reset',
    desc: 'Wrapped in unbleached organic linen with warm earthy tones that honor traditional herbal apothecaries. Provides calibrated acoustic and kinetic recoil for hip openers and hamstrings.',
    hotspot: { x: '68%', y: '23%' }
  }
];

export default function ThreeColorsShowcaseSection() {
  const { 
    selectedColor, 
    setSelectedColor, 
    openCheckoutWithProduct, 
    addToCart, 
    currency 
  } = useShop();

  // Local active color state initialized with context
  const [activeColorName, setActiveColorName] = useState(selectedColor || 'Olive Green');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [hoveredColor, setHoveredColor] = useState(null);

  const activeColorObj = HAMMER_COLORS.find(c => c.name === activeColorName) || HAMMER_COLORS[0];

  const handleSelectColor = (colorName) => {
    setActiveColorName(colorName);
    setSelectedColor(colorName);
  };

  const handleAddToCart = () => {
    addToCart(1, activeColorName);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2200);
  };

  const handleBuyNow = () => {
    openCheckoutWithProduct(1, activeColorName);
  };

  // Price calculations based on currency
  const priceDisplay = currency === '$' ? '$48' : '₹3,999';
  const mrpDisplay = currency === '$' ? '$60' : '₹4,999';

  return (
    <section id="colors-showcase" className="py-16 sm:py-24 bg-[#f6f1e8] relative overflow-hidden border-t border-[#e8dfd1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ede5d6] border border-[#d8cdb8] text-[11px] font-semibold tracking-[0.22em] uppercase text-[#544639] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#445834] animate-pulse" />
            03 / CEREMONIAL PALETTE
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#1e1711] font-normal leading-tight">
            Available in{' '}
            <span className="relative inline-block">
              3 Colors.
              <svg
                className="absolute left-0 -bottom-2.5 w-full h-3 text-[#445834] overflow-visible"
                viewBox="0 0 220 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9C55 2 155 2 218 8"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeOpacity="0.85"
                />
              </svg>
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#524538] leading-relaxed max-w-2xl mx-auto font-normal">
            A traditional meridian tool reimagined in three earth-inspired hues. Encased in organic linen, slow-cured wild mountain mugwort, and flexible bamboo. Touch any color to choose your daily ritual tool.
          </p>
        </div>

        {/* Main Grid: Interactive Image (Left) + Color Specs & Action Bar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Travertine Image Container with Interactive Hotspots */}
          <div className="lg:col-span-7 relative">
            
            {/* Ambient Backlight Glow matching active color */}
            <div 
              className="absolute -inset-2 rounded-[36px] opacity-25 blur-xl transition-all duration-700 pointer-events-none"
              style={{ backgroundColor: activeColorObj.code }}
            />

            {/* Travertine Slab Image Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#ded5c5] bg-[#ece4d5] group">
              
              {/* High-res Image of 3 Hammers */}
              <img
                src="/assets/mora-mori/hammer_three_colors.jpg"
                alt="MORA · MORI Muscle Tapper in 3 Colors: Olive Green, Deep Plum, and Earth Ochre"
                className="w-full h-auto object-cover transform transition-transform duration-700 select-none"
              />

              {/* Glass Frosted Overlay Hint at Top */}
              <div className="absolute top-4 left-4 z-20">
                <div className="px-3 py-1.5 rounded-full bg-[#1c1510]/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#e0af69]" />
                  <span>Touch any hammer to select color</span>
                </div>
              </div>

              {/* Hotspot 1: Olive Green (Left Hammer) */}
              <div 
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: HAMMER_COLORS[0].hotspot.x, top: HAMMER_COLORS[0].hotspot.y }}
                onClick={() => handleSelectColor('Olive Green')}
                onMouseEnter={() => setHoveredColor('Olive Green')}
                onMouseLeave={() => setHoveredColor(null)}
              >
                <div className="relative flex items-center justify-center">
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 shadow-xl ${
                    activeColorName === 'Olive Green' ? 'scale-110 ring-4 ring-[#4f623b]/60 bg-[#4f623b]' : 'bg-[#4f623b]/90 hover:scale-105'
                  }`}>
                    {activeColorName === 'Olive Green' ? (
                      <Check className="w-5 h-5 text-white stroke-[2.5]" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                  </div>
                  {/* Subtle Pulse Ripple */}
                  {activeColorName === 'Olive Green' && (
                    <span className="absolute -inset-1.5 rounded-full border border-white/80 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Floating Tooltip Pill */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-full bg-[#201813]/90 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold whitespace-nowrap shadow-lg transition-all ${
                  activeColorName === 'Olive Green' || hoveredColor === 'Olive Green' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}>
                  🌿 Olive Green
                </div>
              </div>

              {/* Hotspot 2: Deep Plum (Middle Hammer) */}
              <div 
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: HAMMER_COLORS[1].hotspot.x, top: HAMMER_COLORS[1].hotspot.y }}
                onClick={() => handleSelectColor('Deep Plum')}
                onMouseEnter={() => setHoveredColor('Deep Plum')}
                onMouseLeave={() => setHoveredColor(null)}
              >
                <div className="relative flex items-center justify-center">
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 shadow-xl ${
                    activeColorName === 'Deep Plum' ? 'scale-110 ring-4 ring-[#4d2657]/60 bg-[#4d2657]' : 'bg-[#4d2657]/90 hover:scale-105'
                  }`}>
                    {activeColorName === 'Deep Plum' ? (
                      <Check className="w-5 h-5 text-white stroke-[2.5]" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                  </div>
                  {activeColorName === 'Deep Plum' && (
                    <span className="absolute -inset-1.5 rounded-full border border-white/80 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Floating Tooltip Pill */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-full bg-[#201813]/90 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold whitespace-nowrap shadow-lg transition-all ${
                  activeColorName === 'Deep Plum' || hoveredColor === 'Deep Plum' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}>
                  🫐 Deep Plum
                </div>
              </div>

              {/* Hotspot 3: Earth Ochre (Right Hammer) */}
              <div 
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: HAMMER_COLORS[2].hotspot.x, top: HAMMER_COLORS[2].hotspot.y }}
                onClick={() => handleSelectColor('Earth Ochre')}
                onMouseEnter={() => setHoveredColor('Earth Ochre')}
                onMouseLeave={() => setHoveredColor(null)}
              >
                <div className="relative flex items-center justify-center">
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 shadow-xl ${
                    activeColorName === 'Earth Ochre' ? 'scale-110 ring-4 ring-[#7b573e]/60 bg-[#7b573e]' : 'bg-[#7b573e]/90 hover:scale-105'
                  }`}>
                    {activeColorName === 'Earth Ochre' ? (
                      <Check className="w-5 h-5 text-white stroke-[2.5]" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                  </div>
                  {activeColorName === 'Earth Ochre' && (
                    <span className="absolute -inset-1.5 rounded-full border border-white/80 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Floating Tooltip Pill */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded-full bg-[#201813]/90 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold whitespace-nowrap shadow-lg transition-all ${
                  activeColorName === 'Earth Ochre' || hoveredColor === 'Earth Ochre' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}>
                  🌰 Earth Ochre
                </div>
              </div>

            </div>

            {/* Quick Caption under image */}
            <div className="mt-3 flex items-center justify-between text-xs text-[#6e5f52] px-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#445834]" />
                100% Organic Linen Weave & Wild Bamboo Spine
              </span>
              <span className="font-medium text-[#445834]">
                Natural Cotton Drawstring Pouch Included
              </span>
            </div>

          </div>

          {/* Right Column: Tactile Color Selector & Instant Buy / Add to Cart Actions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Glass Container Card */}
            <div className="bg-[#faf7f2]/95 backdrop-blur-md border border-[#e2d8c9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Product Badge & Pricing Header */}
              <div className="flex items-start justify-between border-b border-[#ebdcca] pb-5">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#efe7d8] text-[#55473a] border border-[#ded4c3] mb-1.5">
                    HERBAL MERIDIAN HAMMER
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1e1711] font-normal">
                    The Muscle Tapper
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold text-[#55473a]">Color:</span>
                    <span className="text-xs font-bold text-[#1e1711] flex items-center gap-1.5">
                      <span 
                        className="w-3 h-3 rounded-full border border-black/20" 
                        style={{ backgroundColor: activeColorObj.code }} 
                      />
                      {activeColorObj.name}
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-right">
                  <div className="flex items-baseline gap-1.5 justify-end">
                    <span className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#1e1711]">
                      {priceDisplay}
                    </span>
                    <span className="text-xs sm:text-sm text-[#8c7e6f] line-through font-mono">
                      {mrpDisplay}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#445834] bg-[#edf2e8] px-2 py-0.5 rounded-full inline-block mt-1">
                    SAVE 20%
                  </span>
                </div>
              </div>

              {/* 3 Color Touch Selector Tiles */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#635547] mb-2.5">
                  Select Color to Add:
                </label>
                
                <div className="grid grid-cols-1 gap-2.5">
                  {HAMMER_COLORS.map((c) => {
                    const isSelected = activeColorName === c.name;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleSelectColor(c.name)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#ffffff] border-[#445834] shadow-md ring-1 ring-[#445834]'
                            : 'bg-[#faf7f2]/70 border-[#ded5c5] hover:bg-white hover:border-[#b8ab97]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Large Color Swatch Dot */}
                          <div 
                            className="w-7 h-7 rounded-full border-2 border-white shadow-sm flex items-center justify-center shrink-0"
                            style={{ backgroundColor: c.code }}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-[#1e1711]">
                                {c.name}
                              </span>
                              <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border" style={{ color: c.tagColor, borderColor: `${c.tagColor}30`, backgroundColor: `${c.tagColor}10` }}>
                                {c.tag}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#695b4e] block leading-tight mt-0.5">
                              {c.resonance}
                            </span>
                          </div>
                        </div>

                        {/* Radio Check Circle */}
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#445834] bg-[#445834]' : 'border-[#cfc4b3]'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Description for Selected Color */}
              <div className="p-3.5 rounded-2xl bg-[#f2ecde]/80 border border-[#ded5c5] text-xs text-[#4e4033] leading-relaxed">
                <span className="font-semibold text-[#1e1711] block mb-1">
                  Ritual Notes &bull; {activeColorObj.name}:
                </span>
                {activeColorObj.desc}
              </div>

              {/* ACTION BUTTONS: Add to Cart & Buy Now */}
              <div className="space-y-3 pt-2">
                
                {/* 1. Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 px-6 rounded-full font-medium text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer shadow-sm border ${
                    addedAnimation
                      ? 'bg-[#445834] text-white border-[#445834]'
                      : 'bg-white hover:bg-[#efe8d8] text-[#241c14] border-[#cfc4b3] hover:border-[#445834]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span className="font-bold">Added {activeColorObj.name} to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 stroke-[1.8] text-[#445834]" />
                      <span>Add to Cart &bull; {priceDisplay}</span>
                    </>
                  )}
                </button>

                {/* 2. Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full glow-btn-green text-white font-semibold text-xs sm:text-sm py-4 px-8 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md group"
                >
                  <span>BUY NOW &bull; 1-CLICK CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>

              {/* Guarantees Row */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#695a4d] border-t border-[#ebdcca]">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#445834] shrink-0" />
                  <span>Ships in 24h &bull; Free Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-[#445834] shrink-0" />
                  <span>30-Day Ritual Guarantee</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
