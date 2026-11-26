import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import MoraNavbar from './components/MoraNavbar';
import MoraHero from './components/MoraHero';
import VideoShowcaseSection from './components/VideoShowcaseSection';
import ThreeColorsShowcaseSection from './components/ThreeColorsShowcaseSection';
import DailyPracticeSection from './components/DailyPracticeSection';
import BotanicalAnatomySection from './components/BotanicalAnatomySection';
import CuratedRitualsSection from './components/CuratedRitualsSection';
import VoicesAndPressSection from './components/VoicesAndPressSection';
import ManifestoAndFooter from './components/ManifestoAndFooter';
import StickyBuyBar from './components/StickyBuyBar';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import RitualVideoModal from './components/RitualVideoModal';
import IngredientsModal from './components/IngredientsModal';
import WhatsAppRecoverySimulator from './components/WhatsAppRecoverySimulator';
import ShiprocketLogisticsModal from './components/ShiprocketLogisticsModal';
import EodTestConsole from './components/EodTestConsole';

function StoreLayout() {
  const { viewportMode, setViewportMode } = useShop();

  const isMobileSim = viewportMode === 'mobile-iphone' || viewportMode === 'mobile-galaxy';
  const frameWidth = viewportMode === 'mobile-iphone' ? 'max-w-[410px]' : viewportMode === 'mobile-galaxy' ? 'max-w-[430px]' : 'w-full';

  return (
    <div className={`min-h-screen bg-[#f6f1e8] text-[#2c241c] ${isMobileSim ? 'py-8 px-2 flex flex-col items-center justify-center bg-[#1d1712]' : ''}`}>
      
      {/* Device Viewport Bar if Mobile Simulator is Active */}
      {isMobileSim && (
        <div className="mb-4 bg-[#281f18] border border-[#44372c] rounded-full px-5 py-2 flex items-center gap-3 text-xs shadow-2xl text-white">
          <span className="text-[#e2ad67] font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8ea77b] animate-ping" />
            Emulating {viewportMode === 'mobile-iphone' ? 'iPhone 15 Pro' : 'Galaxy S24'}
          </span>
          <button
            onClick={() => setViewportMode('desktop')}
            className="text-[#bbaea0] hover:text-white underline cursor-pointer text-[11px]"
          >
            Switch to Full Desktop
          </button>
        </div>
      )}

      {/* Main Container / Mobile Device Bezel Frame */}
      <div className={`w-full ${frameWidth} transition-all duration-300 relative ${
        isMobileSim ? 'border-4 border-[#3a2e24] rounded-[44px] overflow-hidden shadow-2xl bg-[#f6f1e8] ring-8 ring-[#221a14]' : ''
      }`}>
        
        {/* Section 01: Navbar & Hero Section */}
        <MoraNavbar />
        <MoraHero />

        {/* Section 01.5: Video Showcase (How & Why We Use This with Glass Effect Border) */}
        <VideoShowcaseSection />

        {/* Section 03: Available in 3 Colors (Interactive Touch & 1-Click Buy / Add to Cart) */}
        <ThreeColorsShowcaseSection />

        {/* Section 02: The Daily Practice (4 Ways to Use) */}
        <DailyPracticeSection />

        {/* Section 03: The Botanical Anatomy & The Ritual */}
        <BotanicalAnatomySection />

        {/* Section 04: Curated Rituals & Best Sellers */}
        <CuratedRitualsSection />

        {/* Section 05: Voices of the Ritual & Press */}
        <VoicesAndPressSection />

        {/* Section 06: Brand Manifesto & Footer */}
        <ManifestoAndFooter />

        {/* Sticky Buy & Action Bar */}
        <StickyBuyBar />

        {/* Modals & Tool Drawers */}
        <CheckoutModal />
        <OrderSuccessModal />
        <RitualVideoModal />
        <IngredientsModal />
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
