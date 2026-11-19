import React, { useState, useEffect } from 'react';
import { Zap, Clock, ShieldCheck, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function AnnouncementBar() {
  const { openCheckoutWithBundle } = useShop();

  // 15-minute countdown timer that ticks down realistically
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 42);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 15 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-neutral-950 text-white text-xs sm:text-sm py-2.5 px-3 border-b border-emerald-950/40 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Left: Urgency & Flash offer */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0 font-medium">
          <span className="flex items-center gap-1 bg-amber-400 text-neutral-950 px-2 py-0.5 rounded-full font-bold text-xs uppercase tracking-wider animate-pulse">
            <Zap className="w-3.5 h-3.5 fill-current" /> Flash Sale
          </span>
          <span className="hidden md:inline text-neutral-300">
            Flat 60% OFF + Free Express Shipping across India today!
          </span>
          <span className="md:hidden text-neutral-200">
            Up to 60% OFF + Free Shipping
          </span>
        </div>

        {/* Center: Live countdown */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0 font-mono text-xs bg-neutral-900/80 px-2.5 py-1 rounded-md border border-neutral-800">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-neutral-400">Offer ends in:</span>
          <span className="text-amber-400 font-bold">{formatTime(timeLeft)}</span>
        </div>

        {/* Right: Courier sync dispatch alert */}
        <div className="hidden lg:flex items-center gap-3 text-xs text-neutral-300 font-medium">
          <span className="flex items-center gap-1 text-emerald-400">
            <Truck className="w-3.5 h-3.5" /> Same-Day Dispatch from Haryana Hub
          </span>
          <span className="text-neutral-600">|</span>
          <button
            onClick={() => openCheckoutWithBundle(2)}
            className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
          >
            Claim 2-Pack Deal &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
