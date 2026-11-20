import React from 'react';
import { Laptop, Bike, Dumbbell, Activity } from 'lucide-react';
import { DAILY_PRACTICES } from '../services/bundlesData';

export default function DailyPracticeSection() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-5 h-5 stroke-[1.8] text-[#ede6dc]" />;
      case 'Bike': return <Bike className="w-5 h-5 stroke-[1.8] text-[#ede6dc]" />;
      case 'Dumbbell': return <Dumbbell className="w-5 h-5 stroke-[1.8] text-[#ede6dc]" />;
      default: return <Activity className="w-5 h-5 stroke-[1.8] text-[#ede6dc]" />;
    }
  };

  return (
    <section id="daily-practice" className="py-16 sm:py-24 bg-[#f6f1e8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[#615448] mb-3">
            THE DAILY PRACTICE
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#1e1711] font-normal leading-tight">
            One Ritual.{' '}
            <span className="relative inline-block">
              Many Ways to Use.
              <svg
                className="absolute left-0 -bottom-2.5 w-full h-3 text-[#445834] overflow-visible"
                viewBox="0 0 240 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9C60 2 170 2 238 8"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeOpacity="0.85"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {DAILY_PRACTICES.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-[#231b15] aspect-[3/4] flex flex-col justify-end"
            >
              {/* Full Background Card Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Dark Overlay at bottom for readable text */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120d09]/90 via-[#120d09]/30 to-transparent pointer-events-none" />

              {/* Top Left Tag (e.g. 01 / DESK) */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-white/90 drop-shadow-md">
                  {item.tag}
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 p-5 space-y-2 text-white">
                <div className="flex items-center gap-2.5">
                  <div className="p-1 rounded-lg bg-white/10 backdrop-blur-md">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal text-white">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-[13px] text-[#ded6cb] leading-relaxed font-normal">
                  {item.subtitle}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
