import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import AnnouncementBar from './components/AnnouncementBar';
import HeroSection from './components/HeroSection';
import BundleSelector from './components/BundleSelector';
import BenefitBreakdown from './components/BenefitBreakdown';
import ProductAnatomy from './components/ProductAnatomy';
import TrustBadges from './components/TrustBadges';
import SocialProofAndReviews from './components/SocialProofAndReviews';
import StickyBuyBar from './components/StickyBuyBar';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import WhatsAppRecoverySimulator from './components/WhatsAppRecoverySimulator';
import ShiprocketLogisticsModal from './components/ShiprocketLogisticsModal';
import EodTestConsole from './components/EodTestConsole';
import { ShieldCheck, Phone, Mail, MapPin, Heart, Zap, MessageSquare, Truck } from 'lucide-react';

function StoreLayout() {
  const { 
    viewportMode, 
    setViewportMode,
    setIsWhatsAppDrawerOpen,
    setIsShiprocketModalOpen,
    setIsEodConsoleOpen
  } = useShop();

  const isMobileSim = viewportMode === 'mobile-iphone' || viewportMode === 'mobile-galaxy';
  const frameWidth = viewportMode === 'mobile-iphone' ? 'max-w-[400px]' : viewportMode === 'mobile-galaxy' ? 'max-w-[420px]' : 'w-full';

  return (
    <div className={`min-h-screen bg-neutral-950 text-neutral-100 ${isMobileSim ? 'py-8 px-2 flex flex-col items-center justify-center bg-neutral-900' : ''}`}>
      
      {/* Device Viewport Top Control Bar if Mobile Simulator is Active */}
      {isMobileSim && (
        <div className="mb-4 bg-neutral-950 border border-neutral-700 rounded-full px-4 py-1.5 flex items-center gap-3 text-xs shadow-xl">
          <span className="text-amber-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live Mobile Emulation: {viewportMode === 'mobile-iphone' ? 'iPhone 15 Pro' : 'Galaxy S24'}
          </span>
          <button
            onClick={() => setViewportMode('desktop')}
            className="text-neutral-400 hover:text-white underline cursor-pointer text-[11px]"
          >
            Switch to Full Desktop
          </button>
        </div>
      )}

      {/* Main Container / Mobile Device Bezel Frame */}
      <div className={`w-full ${frameWidth} transition-all duration-300 relative ${
        isMobileSim ? 'border-4 border-neutral-700 rounded-[44px] overflow-hidden shadow-2xl bg-neutral-950 ring-8 ring-neutral-800' : ''
      }`}>
        
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Hero Section */}
        <HeroSection />

        {/* Trust Badges Bar */}
        <TrustBadges />

        {/* 1/2/3-Pack Interactive Bundle Selector (TSK-10) */}
        <BundleSelector />

        {/* 3-Angle Benefit Breakdown (TSK-10) */}
        <BenefitBreakdown />

        {/* Product Anatomy Section (TSK-10) */}
        <ProductAnatomy />

        {/* Social Proof & Reviews & FAQs */}
        <SocialProofAndReviews />

        {/* Footer */}
        <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 pt-12 pb-28 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Brand Col */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌿</span>
                  <span className="text-white font-extrabold text-base font-heading">
                    MUGWORT™ HERBAL THERAPY
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Pioneering transdermal Ayurvedic moxibustion heating patches. Bringing natural, drug-free joint flexibility to households across India.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ayush Ministry Guidelines Compliant</span>
                </div>
              </div>

              {/* Quick Diagnostic Shortcuts */}
              <div>
                <h5 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                  Testing & Integrations
                </h5>
                <ul className="space-y-2 text-[11px]">
                  <li>
                    <button
                      onClick={() => setIsEodConsoleOpen(true)}
                      className="hover:text-amber-300 flex items-center gap-1.5 cursor-pointer text-amber-400 font-semibold"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" /> TSK-13 EOD Mobile Test Hub
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsWhatsAppDrawerOpen(true)}
                      className="hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer text-emerald-400"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> TSK-12 WhatsApp Recovery Triggers
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsShiprocketModalOpen(true)}
                      className="hover:text-blue-300 flex items-center gap-1.5 cursor-pointer text-blue-400"
                    >
                      <Truck className="w-3.5 h-3.5" /> TSK-12 Shiprocket Logistics Hub
                    </button>
                  </li>
                </ul>
              </div>

              {/* Fulfilment & Dispatch */}
              <div>
                <h5 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                  Warehousing & Dispatch
                </h5>
                <p className="text-[11px] leading-relaxed">
                  <strong>Central Hub:</strong> Plot 18, Udyog Vihar Phase 4, Gurugram, Haryana - 122015.
                </p>
                <p className="text-[11px] leading-relaxed mt-2">
                  <strong>South Hub:</strong> Peenya Industrial Area, Bengaluru, Karnataka - 560058.
                </p>
              </div>

              {/* Support */}
              <div>
                <h5 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                  Customer Care & Inquiries
                </h5>
                <p className="text-[11px]">Email: care@mugwortwellness.in</p>
                <p className="text-[11px] mt-1">Helpline: +91 98765 43210 (Mon–Sat 9AM–7PM)</p>
                <p className="text-[10px] text-neutral-500 mt-3">
                  Disclaimer: Mugwort patches are for external topical support. Consult your physician if severe chronic arthritis symptoms persist.
                </p>
              </div>

            </div>

            <div className="pt-8 border-t border-neutral-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
              <p>&copy; {new Date().getFullYear()} Mugwort Herbal Wellness India Pvt. Ltd. All rights reserved.</p>
              <p className="flex items-center gap-1">
                Proudly Formulated & Packaged in India <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
              </p>
            </div>
          </div>
        </footer>

        {/* Sticky Buy & Bundle Switcher Bar */}
        <StickyBuyBar />

        {/* Modals & Diagnostic Consoles */}
        <CheckoutModal />
        <OrderSuccessModal />
        <WhatsAppRecoverySimulator />
        <ShiprocketLogisticsModal />
        <EodTestConsole />

      </div>
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <StoreLayout />
    </ShopProvider>
  );
}
