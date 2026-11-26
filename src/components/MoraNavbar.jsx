import React from 'react';
import { Search, ShoppingBag, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function MoraNavbar() {
  const { 
    openCheckoutWithProduct, 
    selectedProductId, 
    currency, 
    setCurrency, 
    cartItems, 
    cartToast 
  } = useShop();

  const totalCartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 1;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#f6f1e8]/90 backdrop-blur-md border-b border-[#e7e0d3] px-4 sm:px-8 py-3.5 sm:py-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center">
            <a href="#" className="font-serif-luxury text-2xl sm:text-3xl font-semibold tracking-wider text-[#241c14] hover:opacity-90 transition-opacity">
              MORA <span className="text-[#445834]">&bull;</span> MORI<sup className="text-[10px] font-sans ml-0.5">&reg;</sup>
            </a>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#332920]">
            <button 
              onClick={() => scrollToSection('video-showcase')} 
              className="hover:text-[#445834] transition-colors cursor-pointer text-[#445834] font-bold"
            >
              How & Why
            </button>
            <button 
              onClick={() => scrollToSection('colors-showcase')} 
              className="hover:text-[#445834] transition-colors cursor-pointer text-[#201913] hover:underline"
            >
              3 Colors
            </button>
            <button 
              onClick={() => scrollToSection('curated-rituals')} 
              className="hover:text-[#445834] transition-colors cursor-pointer"
            >
              Shop Categories
            </button>
            <button 
              onClick={() => scrollToSection('curated-rituals')} 
              className="hover:text-[#445834] transition-colors cursor-pointer"
            >
              Best Sellers
            </button>
            <button 
              onClick={() => scrollToSection('brand-manifesto')} 
              className="hover:text-[#445834] transition-colors cursor-pointer"
            >
              Our Story
            </button>
          </nav>

          {/* Right: Search, Currency & Cart */}
          <div className="flex items-center gap-4 sm:gap-6 text-[#2c231b]">
            
            {/* Currency Toggle ($ / ₹) */}
            <button
              onClick={() => setCurrency(currency === '$' ? '₹' : '$')}
              className="text-[11px] font-bold font-mono px-2 py-0.5 rounded border border-[#d8cfc0] bg-[#efe9dd] hover:bg-[#e4dcce] transition-colors cursor-pointer"
              title="Toggle Currency"
            >
              {currency}
            </button>

            <button 
              onClick={() => scrollToSection('colors-showcase')}
              className="p-1 text-[#3a2f26] hover:text-[#445834] transition-colors cursor-pointer" 
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            <button 
              onClick={() => openCheckoutWithProduct(selectedProductId)}
              className="relative p-1 text-[#3a2f26] hover:text-[#445834] transition-colors cursor-pointer flex items-center" 
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#445834] text-white text-[10px] font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Cart Toast Notification */}
      {cartToast && (
        <div className="fixed top-18 right-4 sm:right-8 z-50 bg-[#201813]/95 text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 backdrop-blur-md animate-fade-in">
          <div className="w-7 h-7 rounded-full bg-[#445834] flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white stroke-[2.5]" />
          </div>
          <div className="text-xs">
            <span className="font-semibold block text-white">{cartToast.message}</span>
            <span className="text-[#d8cfbe] text-[11px]">Free Worldwide Air Shipping</span>
          </div>
          <button 
            onClick={() => openCheckoutWithProduct(1, cartToast.color)}
            className="ml-2 text-xs font-bold text-[#e0af69] hover:underline cursor-pointer bg-white/10 px-2.5 py-1 rounded-full"
          >
            Checkout &rarr;
          </button>
        </div>
      )}
    </>
  );
}
