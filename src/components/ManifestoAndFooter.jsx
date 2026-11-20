import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ManifestoAndFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { applyCouponCode } = useShop();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      applyCouponCode('RITUAL15');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* 1. Upper Philosophy & Newsletter Section */}
      <section id="brand-manifesto" className="py-20 sm:py-28 bg-[#f6f1e8] relative text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          
          <div className="text-[12px] font-semibold tracking-[0.22em] uppercase text-[#615448] mb-3">
            THE PHILOSOPHY
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#1e1711] font-normal leading-tight mb-4">
            Slow Down. Tap In.{' '}
            <span className="relative inline-block">
              Restore.
              <svg
                className="absolute left-0 -bottom-2.5 w-full h-3 text-[#445834] overflow-visible"
                viewBox="0 0 160 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9C45 2 120 2 158 8"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeOpacity="0.85"
                />
              </svg>
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#524436] font-normal max-w-xl mx-auto mb-10">
            Ancient herbal wisdom crafted for modern stillness.
          </p>

          {/* Newsletter Input Pill Form */}
          <form
            onSubmit={handleSubscribe}
            className="max-w-xl mx-auto bg-[#faf7f2] border border-[#d8cfbe] rounded-full p-1.5 sm:p-2 shadow-sm flex items-center justify-between gap-2 focus-within:border-[#445834] transition-colors"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for 15% off your first ritual"
              className="flex-1 bg-transparent px-4 sm:px-6 py-2 text-xs sm:text-sm text-[#2c241c] placeholder:text-[#887869] focus:outline-none"
              required
            />
            <button
              type="submit"
              className="glow-btn-green text-white font-medium text-xs sm:text-sm px-5 sm:px-7 py-3 rounded-full flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{subscribed ? 'CODE: RITUAL15' : 'JOIN THE RITUAL'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {subscribed && (
            <p className="text-xs text-[#445834] font-semibold mt-3 flex items-center justify-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" /> Welcome to the ritual! 15% discount coupon RITUAL15 applied.
            </p>
          )}

        </div>
      </section>

      {/* 2. Footer Section (Deep Espresso Brown) */}
      <footer className="bg-[#1c1612] text-[#ded6cb] pt-16 sm:pt-20 pb-12 sm:pb-16 border-t border-[#2e231b] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-14">
          
          {/* Centered Brand Title */}
          <div className="text-center">
            <button
              onClick={scrollToTop}
              className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wider text-white hover:text-[#c4d6b6] transition-colors cursor-pointer"
            >
              MORA <span className="text-[#8ea77b]">&bull;</span> MORI<sup className="text-xs font-sans ml-1">&reg;</sup>
            </button>
          </div>

          {/* 4 Columns Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-xs sm:text-[13px] border-b border-[#2e231b] pb-14">
            
            {/* Column 1: SHOP */}
            <div className="space-y-3.5">
              <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/90">
                SHOP
              </h4>
              <ul className="space-y-2.5 text-[#b8ada0]">
                <li><a href="#curated-rituals" className="hover:text-white transition-colors">Mugwort Hammer</a></li>
                <li><a href="#curated-rituals" className="hover:text-white transition-colors">Ritual Sets</a></li>
                <li><a href="#curated-rituals" className="hover:text-white transition-colors">Body Oil</a></li>
                <li><a href="#curated-rituals" className="hover:text-white transition-colors">Gifting</a></li>
              </ul>
            </div>

            {/* Column 2: THE PRACTICE */}
            <div className="space-y-3.5">
              <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/90">
                THE PRACTICE
              </h4>
              <ul className="space-y-2.5 text-[#b8ada0]">
                <li><a href="#daily-practice" className="hover:text-white transition-colors">How to Use</a></li>
                <li><a href="#daily-practice" className="hover:text-white transition-colors">Benefits</a></li>
                <li><a href="#botanical-anatomy" className="hover:text-white transition-colors">The Anatomy</a></li>
                <li><a href="#botanical-anatomy" className="hover:text-white transition-colors">Meridian Tapping</a></li>
              </ul>
            </div>

            {/* Column 3: OUR CRAFT */}
            <div className="space-y-3.5">
              <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/90">
                OUR CRAFT
              </h4>
              <ul className="space-y-2.5 text-[#b8ada0]">
                <li><a href="#botanical-anatomy" className="hover:text-white transition-colors">The Mugwort Story</a></li>
                <li><a href="#botanical-anatomy" className="hover:text-white transition-colors">Natural Materials</a></li>
                <li><a href="#brand-manifesto" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#brand-manifesto" className="hover:text-white transition-colors">Studio Journal</a></li>
              </ul>
            </div>

            {/* Column 4: SUPPORT */}
            <div className="space-y-3.5 relative">
              <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/90">
                SUPPORT
              </h4>
              <ul className="space-y-2.5 text-[#b8ada0]">
                <li><a href="#voices-of-the-ritual" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#curated-rituals" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                <li><a href="#brand-manifesto" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#brand-manifesto" className="hover:text-white transition-colors">Accessibility</a></li>
              </ul>

              {/* Decorative 4-point star on the right */}
              <div className="absolute right-0 bottom-2 text-[#46392f]/60 pointer-events-none hidden md:block">
                <Sparkles className="w-10 h-10" />
              </div>
            </div>

          </div>

          {/* Sub-footer bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8a7d6f] pt-2">
            <p>&copy; 2026 MORA&middot;MORI. All rights reserved.</p>
            <p className="font-serif-luxury text-[13px] text-[#b3a89a] italic">
              A Traditional Tapper, Reimagined.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-[#ded6cb] transition-colors">Instagram</a>
              <span>&bull;</span>
              <a href="#" className="hover:text-[#ded6cb] transition-colors">Pinterest</a>
              <span>&bull;</span>
              <a href="#" className="hover:text-[#ded6cb] transition-colors">Journal</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
