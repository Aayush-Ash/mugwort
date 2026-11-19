import React from 'react';
import { Check, Zap, Sparkles, Gift, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function BundleSelector() {
  const { bundles, selectedBundleId, setSelectedBundleId, openCheckoutWithBundle } = useShop();

  return (
    <section id="bundle-selector-section" className="py-16 sm:py-20 bg-neutral-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Limited Festive Batch &bull; Select Your Treatment Course
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-heading">
            Choose Your <span className="text-emerald-400">Mugwort Bundle</span>
          </h2>
          <p className="mt-3 text-neutral-300 text-sm sm:text-base">
            94% of our customers choose the <strong>2-Pack</strong> or <strong>3-Pack</strong> for both knees to achieve lasting cartilage relief and maximum savings.
          </p>
        </div>

        {/* 3 Bundle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {bundles.map((bundle) => {
            const isSelected = selectedBundleId === bundle.id;

            return (
              <div
                key={bundle.id}
                onClick={() => setSelectedBundleId(bundle.id)}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer border-2 ${
                  isSelected
                    ? 'bg-gradient-to-b from-neutral-800 to-neutral-900 border-emerald-500 shadow-2xl shadow-emerald-600/20 ring-4 ring-emerald-500/20 transform -translate-y-1'
                    : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}
              >
                {/* Floating Top Badge */}
                {bundle.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                    MOST POPULAR &bull; DUAL KNEE
                  </div>
                )}

                {bundle.bestValue && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    BEST VALUE &bull; SAVE 60%
                  </div>
                )}

                {/* Card Header & Radio */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4 pt-1">
                    <div>
                      <h3 className="text-xl font-extrabold text-white font-heading">
                        {bundle.name}
                      </h3>
                      <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                        {bundle.durationText}
                      </p>
                    </div>

                    {/* Radio Check Circle */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-neutral-700 bg-neutral-900 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  {/* Pricing Breakdown Box */}
                  <div className="bg-neutral-900/90 rounded-2xl p-4 border border-neutral-800/80 mb-5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl sm:text-4xl font-black text-white font-heading">
                        ₹{bundle.salePrice}
                      </span>
                      <span className="text-sm text-neutral-400 line-through">
                        ₹{bundle.mrp}
                      </span>
                      <span className="text-xs font-extrabold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md">
                        Save {bundle.savingsPercent}%
                      </span>
                    </div>

                    {/* Per-patch math */}
                    <div className="mt-2.5 pt-2.5 border-t border-neutral-800 flex items-center justify-between text-xs">
                      <span className="text-neutral-400">
                        {bundle.patchesCount} Patches total:
                      </span>
                      <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                        ₹{bundle.pricePerPatch} / patch
                      </span>
                    </div>
                  </div>

                  {/* Free Gift or Shipping Callout */}
                  <div className="space-y-2 mb-6">
                    {bundle.freeShipping ? (
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                        <Truck className="w-4 h-4 shrink-0" />
                        <span>FREE Express Courier via Shiprocket</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <Truck className="w-4 h-4 shrink-0" />
                        <span>₹49 Standard Express Shipping</span>
                      </div>
                    )}

                    {bundle.freeGift && (
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 p-2 rounded-xl">
                        <Gift className="w-4 h-4 shrink-0 text-amber-400" />
                        <span>{bundle.freeGift}</span>
                      </div>
                    )}
                  </div>

                  {/* Feature Bullets */}
                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 mb-6">
                    {bundle.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBundleId(bundle.id);
                    openCheckoutWithBundle(bundle.id);
                  }}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isSelected
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                  }`}
                >
                  <span>Select {bundle.name.split(' ')[0]} &bull; ₹{bundle.salePrice}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            );
          })}
        </div>

        {/* Transparent Bundle Comparison Summary Strip */}
        <div className="mt-12 bg-neutral-950/80 border border-neutral-800 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                All Bundles Covered by 7-Day "Walk Without Fear" Comfort Guarantee
              </p>
              <p className="text-xs text-neutral-400">
                If you don't feel soothing heat and joint ease within 7 days, get an instant replacement or support.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => openCheckoutWithBundle(selectedBundleId)}
              className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Instant Checkout &rarr;</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
