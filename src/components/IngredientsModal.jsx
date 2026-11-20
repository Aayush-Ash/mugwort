import React from 'react';
import { X, Leaf, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function IngredientsModal() {
  const { isIngredientsOpen, setIsIngredientsOpen } = useShop();

  if (!isIngredientsOpen) return null;

  const ingredientsList = [
    {
      name: '5-Year Aged Wild Artemisia Argyi',
      origin: 'Himalayan Foothills (High Solstice Harvest)',
      function: 'Aromatic Moxibustion Core',
      desc: 'Naturally solar-dried for five full years. Aging mellows the plant moisture while concentrating volatile medicinal flavonoids that release deep restorative warmth upon rhythmic percussion.'
    },
    {
      name: 'Organic Unbleached Flax Linen',
      origin: 'Natural Certified European Flax Weave',
      function: 'Breathable Protective Wrapping',
      desc: 'Woven with zero toxic dyes or bleaches. Hypoallergenic and gentle on bare skin, softening further with every daily practice session.'
    },
    {
      name: 'Curved Moso Bamboo Core',
      origin: 'Sustainable Mountain Bamboo Groves',
      function: 'Calibrated Ergonomic Recoil Spine',
      desc: 'Steam-tempered to provide an intuitive natural rebound rhythm, minimizing wrist exertion and allowing effortless shoulder and back reach.'
    },
    {
      name: 'Cold-Pressed Botanical Body Oil (Set Exclusive)',
      origin: 'Artemisia Oil, Golden Jojoba & Sweet Almond',
      function: 'Transdermal Skin Preparation',
      desc: 'Silky, lightweight botanical blend that primes the dermal barrier, enhancing tactile glide and infusing a subtle herbaceous aroma that calms mental chatter.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#140e0a]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#faf7f2] border border-[#d8cfbe] rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setIsIngredientsOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#efe9dd] hover:bg-[#e4dcce] text-[#3e342a] flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#615448]">
            PURE BOTANICAL ALCHEMY
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1e1711] font-normal">
            Rooted in Conscious Craft
          </h3>
          <p className="text-xs text-[#5a4c3f]">
            100% Biodegradable &bull; Zero Synthetics &bull; Traditional Curing
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {ingredientsList.map((ing, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#f2ebd9] border border-[#ded5c3] space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-serif-luxury text-base sm:text-lg font-medium text-[#201913]">
                    {ing.name}
                  </h4>
                  <p className="text-[11px] text-[#445834] font-medium tracking-wide">
                    {ing.origin}
                  </p>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#faf7f2] text-[#55473a] px-2.5 py-1 rounded-md border border-[#d6ccbb] shrink-0">
                  {ing.function}
                </span>
              </div>
              <p className="text-xs text-[#4f4236] leading-relaxed">
                {ing.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-[#e2d8c8] flex items-center justify-between text-xs text-[#55473a]">
          <span className="flex items-center gap-1.5 text-[#445834] font-semibold">
            <ShieldCheck className="w-4 h-4" /> Cruelty-Free & Sustainably Harvested
          </span>
          <button
            onClick={() => setIsIngredientsOpen(false)}
            className="glow-btn-green text-white text-xs font-medium py-2.5 px-5 rounded-full cursor-pointer"
          >
            Close & Return
          </button>
        </div>

      </div>
    </div>
  );
}
