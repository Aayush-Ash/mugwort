import React from 'react';
import { ArrowRight, Leaf, Waves, Wind } from 'lucide-react';
import { RITUAL_STEPS, ANATOMY_HOTSPOTS } from '../services/bundlesData';
import { useShop } from '../context/ShopContext';

export default function BotanicalAnatomySection() {
  const { setIsIngredientsOpen } = useShop();

  const getStepIcon = (iconName) => {
    switch (iconName) {
      case 'Leaf': return <Leaf className="w-5 h-5 stroke-[1.8] text-[#445834]" />;
      case 'Waves': return <Waves className="w-5 h-5 stroke-[1.8] text-[#445834]" />;
      default: return <Wind className="w-5 h-5 stroke-[1.8] text-[#445834]" />;
    }
  };

  return (
    <section id="botanical-anatomy" className="py-16 sm:py-24 bg-[#f6f1e8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[#615448] mb-3">
            THE BOTANICAL ANATOMY
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#1e1711] font-normal leading-tight">
            Rooted in Tradition.{' '}
            <span className="relative inline-block">
              Engineered for Today.
              <svg
                className="absolute left-0 -bottom-2.5 w-full h-3 text-[#445834] overflow-visible"
                viewBox="0 0 260 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9C70 2 190 2 258 8"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeOpacity="0.85"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Interactive Anatomy Photo & Hotspot Callouts */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden relative shadow-sm border border-[#e4dcce] bg-[#efe9dd]">
            <img
              src="/assets/mora-mori/anatomy_card.png"
              alt="Mugwort Anatomy Cross Section and Construction"
              className="w-full h-full object-cover min-h-[380px] sm:min-h-[460px]"
            />
          </div>

          {/* Right Column: The Ritual Glass Card */}
          <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-[#faf7f2]/90 backdrop-blur-md border border-[#e2d8c9] shadow-sm flex flex-col justify-between space-y-6">
            
            <div>
              <div className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#65574a] mb-6">
                THE RITUAL
              </div>

              {/* 3 Ritual Steps */}
              <div className="space-y-6">
                {RITUAL_STEPS.map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#efe9dd] border border-[#ded5c5] flex items-center justify-center shrink-0">
                      {getStepIcon(step.icon)}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif-luxury text-base sm:text-lg font-medium text-[#201913]">
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-[#55473a] leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-[#e8dfd1]">
              <button
                onClick={() => setIsIngredientsOpen(true)}
                className="w-full glow-btn-green text-white font-medium text-xs sm:text-sm py-3.5 px-6 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>EXPLORE THE INGREDIENTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
