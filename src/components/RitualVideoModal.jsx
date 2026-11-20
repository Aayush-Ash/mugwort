import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function RitualVideoModal() {
  const { isRitualVideoOpen, setIsRitualVideoOpen, openCheckoutWithProduct, selectedProductId } = useShop();
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isRitualVideoOpen && isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => (prev >= 15 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRitualVideoOpen, isPlaying]);

  if (!isRitualVideoOpen) return null;

  const currentPhase = seconds < 5 
    ? { title: 'Phase 1: Center & Warm', desc: 'Hold the hammer gently. Apply a drop of Mugwort Oil to your shoulders and take one grounding breath.', target: 'Trapezius & Neck' }
    : seconds < 10
    ? { title: 'Phase 2: Rhythmic Meridian Tapping', desc: 'Let the flexible bamboo spine bounce naturally. Tap with light, steady percussions along the shoulder ridge.', target: 'Gallbladder Meridian GB21' }
    : { title: 'Phase 3: Exhale & Release', desc: 'Notice the soothing herbal warmth spreading deep through your muscles. Feel lighter and reset.', target: 'Full Body Relaxation' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#140e0a]/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#faf7f2] border border-[#d8cfbe] rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden my-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsRitualVideoOpen(false);
            setSeconds(0);
          }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#efe9dd] hover:bg-[#e4dcce] text-[#3e342a] flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#615448]">
            THE 15-SECOND DAILY PRACTICE
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1e1711] font-normal">
            Meridian Awakening Ritual
          </h3>
        </div>

        {/* Video Simulation Canvas */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#241a13] text-white flex flex-col justify-between p-6 shadow-inner">
          
          {/* Background image & pulse animation */}
          <img
            src="/assets/mora-mori/card_desk.png"
            alt="Ritual Guide"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140e0a] via-transparent to-[#140e0a]/70" />

          {/* Top Timer Bar */}
          <div className="relative z-10 flex items-center justify-between text-xs">
            <span className="font-mono bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md tracking-wider">
              00:{seconds < 10 ? `0${seconds}` : seconds} / 00:15
            </span>
            <span className="bg-[#445834] text-white px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase">
              {currentPhase.target}
            </span>
          </div>

          {/* Center Rhythmic Pulse Visual */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
            <div className={`w-16 h-16 rounded-full border-2 border-[#8ea77b] flex items-center justify-center transition-all ${
              isPlaying ? 'scale-110 shadow-[0_0_30px_rgba(142,167,123,0.5)]' : 'scale-100'
            }`}>
              <Sparkles className="w-8 h-8 text-[#a9c494] animate-pulse" />
            </div>
            <h4 className="font-serif-luxury text-xl sm:text-2xl mt-4 font-normal">
              {currentPhase.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#ded6cb] max-w-sm mt-1 leading-relaxed">
              {currentPhase.desc}
            </p>
          </div>

          {/* Bottom Progress Line */}
          <div className="relative z-10 space-y-2">
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#8ea77b] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(seconds / 15) * 100}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 text-white/80 hover:text-white cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={() => setSeconds(0)}
                className="flex items-center gap-1.5 text-white/80 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Bottom CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#e2d8c8]">
          <p className="text-xs text-[#5a4c3f] text-center sm:text-left">
            Ready to integrate this daily reset into your workspace?
          </p>
          <button
            onClick={() => {
              setIsRitualVideoOpen(false);
              openCheckoutWithProduct(selectedProductId);
            }}
            className="glow-btn-green text-white font-medium text-xs sm:text-sm py-3 px-6 rounded-full cursor-pointer whitespace-nowrap"
          >
            Claim Your Mugwort Hammer &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
