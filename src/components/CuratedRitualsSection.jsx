import React, { useState } from 'react';
import { RITUAL_PRODUCTS } from '../services/bundlesData';
import { useShop } from '../context/ShopContext';
import { Check } from 'lucide-react';

export default function CuratedRitualsSection() {
  const { openCheckoutWithProduct, setSelectedProductId, currency, selectedColor, setSelectedColor } = useShop();

  return (
    <section id="curated-rituals" className="py-16 sm:py-24 bg-[#f6f1e8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[#615448] mb-3">
            CURATED RITUALS
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#1e1711] font-normal leading-tight">
            Begin Your{' '}
            <span className="relative inline-block">
              Daily Practice.
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

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {RITUAL_PRODUCTS.map((product) => {
            const isFeatured = product.featured;

            return (
              <div
                key={product.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 bg-[#faf7f2]/90 backdrop-blur-md border ${
                  isFeatured
                    ? 'glow-amber-box border-[#e0af69] transform md:-translate-y-2'
                    : 'border-[#e4dcce] hover:border-[#cfc4b2]'
                }`}
              >
                {/* Top Badge: MOST LOVED for card 2 */}
                {isFeatured ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-[#fcfaf7] border border-[#e0af69] text-[#2c231b] px-3.5 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-sm">
                      MOST LOVED
                    </span>
                  </div>
                ) : (
                  <div className="text-center mb-3">
                    <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#736456]">
                      {product.tag}
                    </span>
                  </div>
                )}

                {/* Product Image on Travertine Stone */}
                <div className="mt-2 mb-6 rounded-2xl overflow-hidden bg-[#efe9dd] aspect-[4/3] flex items-center justify-center border border-[#e2d8c8]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Title & Subtitle */}
                <div className="text-center space-y-1.5 mb-6">
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal text-[#1e1711]">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#5c4f42] font-normal">
                    {product.subtitle}
                  </p>

                  {/* Color Swatch Dots (for Product 1) */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex items-center justify-center gap-2 pt-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                            selectedColor === c.name ? 'ring-2 ring-[#445834] ring-offset-1 scale-110' : 'opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c.code }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom CTA Button */}
                <div>
                  <button
                    onClick={() => {
                      setSelectedProductId(product.id);
                      openCheckoutWithProduct(product.id);
                    }}
                    className={`w-full text-white font-medium text-xs sm:text-sm py-3.5 px-4 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      isFeatured ? 'glow-btn-green' : 'bg-[#445834] hover:bg-[#38482a]'
                    }`}
                  >
                    <span>
                      {isFeatured ? 'ADD SET' : 'ADD TO RITUAL'} — {currency}{product.price}
                    </span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
