import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function StickyBuyBar() {
  const { products, selectedProductId, setSelectedProductId, selectedProduct, openCheckoutWithProduct, pricing, currency, selectedColor } = useShop();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#faf7f2]/95 backdrop-blur-md border-t border-[#e2d8c8] py-2.5 sm:py-3 px-4 sm:px-8 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Product Details & Variant Pill */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-10 h-10 rounded-xl overflow-hidden bg-[#efe9dd] border border-[#d6ccbb] shrink-0">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-luxury text-lg sm:text-xl font-medium text-[#1e1711]">
                {currency}{pricing.finalAmount}
              </span>
              <span className="text-xs text-[#8c7d6e] line-through">
                {currency}{pricing.mrp}
              </span>
              <span className="text-[10px] text-[#445834] font-semibold bg-[#efe9dd] px-2 py-0.5 rounded-full border border-[#dcd2c0]">
                Save {selectedProduct.savingsPercent}%
              </span>
            </div>
            <p className="text-[11px] text-[#55473a] font-normal truncate max-w-[200px] sm:max-w-none">
              {selectedProduct.name} &bull; {selectedColor} &bull; Free Global & Pan-India Courier
            </p>
          </div>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-2">
          {/* Quick Product Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-[#efe9dd] p-1 rounded-full border border-[#ded5c5]">
            {products.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedProductId === p.id
                    ? 'bg-[#445834] text-white shadow-sm'
                    : 'text-[#55473a] hover:text-[#221a13]'
                }`}
              >
                {p.name.split(' ')[1] || 'Set'}
              </button>
            ))}
          </div>

          <button
            onClick={() => openCheckoutWithProduct(selectedProductId)}
            className="glow-btn-green text-white font-medium text-xs sm:text-sm py-2.5 sm:py-3 px-5 sm:px-7 rounded-full flex items-center gap-2 cursor-pointer transition-all shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Begin Ritual</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
