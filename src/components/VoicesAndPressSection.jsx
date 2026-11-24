import React from 'react';
import { Star, Check, Sparkles } from 'lucide-react';
import { PRESS_MENTIONS, TESTIMONIALS } from '../services/bundlesData';

export default function VoicesAndPressSection() {
  return (
    <section id="voices-of-the-ritual" className="py-16 sm:py-24 bg-[#f6f1e8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Top Press Logos Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 pb-12 sm:pb-16 mb-12 sm:mb-16 border-b border-[#e5ded1] text-[#332a22]">
          <span className="font-serif-luxury text-lg sm:text-xl font-bold tracking-widest">
            VOGUE
          </span>
          <span className="text-[#c8beaf] hidden sm:inline">|</span>
          <span className="font-serif-luxury text-xl sm:text-2xl font-bold lowercase tracking-tight">
            goop
          </span>
          <span className="text-[#c8beaf] hidden sm:inline">|</span>
          <span className="font-serif-luxury text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
            ARCHITECTURAL DIGEST
          </span>
          <span className="text-[#c8beaf] hidden sm:inline">|</span>
          <span className="font-serif-luxury text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
            WELL+GOOD
          </span>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[#615448] mb-3">
            VOICES OF THE RITUAL
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#1e1711] font-normal leading-tight">
            Trusted by Bodyworkers &{' '}
            <span className="relative inline-block">
              Everyday Movers.
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

        {/* 3 Review / Practitioner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: Verified Practitioner Photo */}
          <div className="rounded-3xl overflow-hidden relative shadow-sm border border-[#e4dcce] aspect-[4/5] md:aspect-auto flex flex-col justify-end">
            <img
              src="/assets/mora-mori/practitioner.png"
              alt="Elena Vass - Verified Bodywork Practitioner holding Muscle Tapper"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Bottom Tag */}
            <div className="relative z-10 p-5 text-center">
              <span className="bg-[#fcfaf7]/90 backdrop-blur-md border border-[#d6cbba] text-[#2c231b] px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase shadow-md inline-block">
                VERIFIED PRACTITIONER
              </span>
            </div>
          </div>

          {/* Card 2: Featured Glowing Review (Maya R.) */}
          <div className="rounded-3xl p-6 sm:p-8 flex flex-col justify-between glow-amber-box bg-[#faf7f2]/90 backdrop-blur-md border border-[#e0af69] shadow-lg">
            <div className="space-y-5 text-center">
              {/* 5 Gold Stars */}
              <div className="flex items-center justify-center gap-1 text-[#d6983b]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current stroke-none" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif-luxury text-lg sm:text-xl text-[#201913] leading-relaxed italic font-normal">
                “Five minutes at my desk melts away shoulder tension better than any percussion gun — and the warm mugwort scent resets my focus.”
              </p>

              {/* Author */}
              <p className="text-xs sm:text-[13px] text-[#55473a] font-normal">
                — Maya R., Creative Director
              </p>
            </div>

            {/* Bottom Pill */}
            <div className="text-center pt-6">
              <span className="bg-[#efe9dd] border border-[#ded5c5] text-[#3e342a] px-3.5 py-1 rounded-full text-[11px] font-semibold inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#445834]" /> Verified Daily User
              </span>
            </div>
          </div>

          {/* Card 3: Dr. Kenji Sato Review */}
          <div className="rounded-3xl p-6 sm:p-8 flex flex-col justify-between bg-[#faf7f2]/90 backdrop-blur-md border border-[#e4dcce] shadow-sm relative overflow-hidden">
            
            <div className="space-y-5 text-center">
              {/* 5 Gold Stars */}
              <div className="flex items-center justify-center gap-1 text-[#d6983b]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current stroke-none" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif-luxury text-lg sm:text-xl text-[#201913] leading-relaxed italic font-normal">
                “A timeless meridian tool reimagined with remarkable ergonomic balance. My clients reach for it daily.”
              </p>

              {/* Author */}
              <p className="text-xs sm:text-[13px] text-[#55473a] font-normal">
                — Dr. Kenji Sato, Acupuncturist
              </p>
            </div>

            {/* Bottom Pill */}
            <div className="text-center pt-6">
              <span className="bg-[#efe9dd] border border-[#ded5c5] text-[#3e342a] px-3.5 py-1 rounded-full text-[11px] font-semibold inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#445834]" /> Verified Health Partner
              </span>
            </div>

            {/* Subtle decorative 4-point star watermark */}
            <div className="absolute -bottom-2 -right-2 text-[#e5ddd0]/40 pointer-events-none">
              <Sparkles className="w-16 h-16" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
