import React, { useState } from 'react';
import { Flame, Leaf, ShieldCheck, CheckCircle2, XCircle, ArrowRight, Activity, Thermometer } from 'lucide-react';
import { THREE_ANGLE_BENEFITS } from '../services/bundlesData';
import { useShop } from '../context/ShopContext';

export default function BenefitBreakdown() {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const activeBenefit = THREE_ANGLE_BENEFITS[activeAngleIndex];
  const { openCheckoutWithBundle } = useShop();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Leaf': return <Leaf className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      default: return <Activity className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-neutral-950 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-950 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            Triple-Action Healing Technology
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading">
            Why Mugwort Moxa Outperforms <span className="text-emerald-400">Regular Balms</span>
          </h2>
          <p className="mt-3 text-neutral-300 text-sm sm:text-base">
            Explore the 3 therapeutic pillars engineered to restore your natural mobility and banish stiffness.
          </p>
        </div>

        {/* 3-Angle Switcher Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {THREE_ANGLE_BENEFITS.map((item, idx) => {
            const isActive = activeAngleIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveAngleIndex(idx)}
                className={`p-4 sm:p-5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-neutral-900 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                    : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                      {item.tag}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white block">
                      {item.title}
                    </span>
                  </div>
                </div>

                <div className={`text-xs font-mono font-bold px-2 py-1 rounded-lg ${
                  isActive ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {item.stat}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Angle Detailed Display Card */}
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Deep Dive */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {activeBenefit.angle}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  {activeBenefit.statLabel}: <strong className="text-amber-400">{activeBenefit.stat}</strong>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  {activeBenefit.title}
                </h3>
                <p className="text-emerald-400 font-medium text-sm mt-1">
                  {activeBenefit.subtitle}
                </p>
              </div>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {activeBenefit.summary}
              </p>

              {/* Key Medical Mechanism Points */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Targeted Mechanism of Action:
                </h4>
                {activeBenefit.keyPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 bg-neutral-950/70 p-3 rounded-xl border border-neutral-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-200">{point}</span>
                  </div>
                ))}
              </div>

              {/* Angle Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => openCheckoutWithBundle(2)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <span>Experience This Benefit in 2-Pack Bundle &rarr;</span>
                </button>
              </div>
            </div>

            {/* Right Column: Comparative Side-by-Side Visual */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-neutral-950 rounded-2xl p-5 border border-neutral-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Clinical Comparison Matrix
                </h4>

                {/* Regular Solution Flaw */}
                <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
                    <XCircle className="w-4 h-4" />
                    <span>Traditional Sprays / Ointments / NSAIDs</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {activeBenefit.comparison.regular}
                  </p>
                </div>

                {/* Mugwort Solution Superiority */}
                <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mugwort Moxibustion Therapy</span>
                  </div>
                  <p className="text-xs text-neutral-200 leading-relaxed font-medium">
                    {activeBenefit.comparison.mugwort}
                  </p>
                </div>

                {/* Thermal Metric Indicator */}
                <div className="pt-2 border-t border-neutral-800 text-xs flex items-center justify-between text-neutral-400">
                  <span>Therapeutic Duration:</span>
                  <span className="text-amber-400 font-bold font-mono">8 Full Hours (Active Moxa)</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
