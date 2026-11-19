import React from 'react';
import { Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function StickyBuyBar() {
  const { bundles, selectedBundleId, setSelectedBundleId, selectedBundle, openCheckoutWithBundle, pricing } = useShop();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-3 sm:py-3.5 sm:px-6 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Bundle Switcher & Pricing Math */}
        <div className="flex items-center gap-3">
          {/* Quick pack switcher pills (hidden on very small mobile, visible on sm+) */}
          <div className="hidden sm:flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            {bundles.map(b => (
              <button
                key={b.id}
                onClick={() => setSelectedBundleId(b.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedBundleId === b.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {b.id}-Pack
              </button>
            ))}
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-white font-heading">
                ₹{pricing.finalAmount}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                ₹{pricing.mrp}
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.2 rounded">
                Save ₹{pricing.totalSavings}
              </span>
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold truncate max-w-[180px] sm:max-w-none">
              {selectedBundle.name} &bull; {selectedBundle.freeShipping ? 'Free Delivery' : '+₹49 Shipping'}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => openCheckoutWithBundle(selectedBundleId)}
            className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm sm:text-base py-3 px-5 sm:px-8 rounded-xl transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Zap className="w-4 h-4 fill-current text-amber-300" />
            <span>Order Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
