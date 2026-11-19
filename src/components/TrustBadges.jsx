import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, Zap, Truck, RotateCcw, Lock, CheckCircle2 } from 'lucide-react';

const RECENT_PURCHASES = [
  { name: 'Dr. Ramesh K.', city: 'Bengaluru', pack: '3-Pack Ultimate Joint Restoration', time: 'Just now' },
  { name: 'Ananya Deshmukh', city: 'Pune', pack: '2-Pack Dual Knee Relief', time: '2 mins ago' },
  { name: 'Col. V. Sodhi', city: 'Chandigarh', pack: '3-Pack Ultimate Joint Restoration', time: '4 mins ago' },
  { name: 'Meenakshi S.', city: 'Jaipur', pack: '2-Pack Dual Knee Relief', time: '6 mins ago' },
  { name: 'Karthik Rao', city: 'Hyderabad', pack: '1-Pack Starter Pack', time: '9 mins ago' }
];

export default function TrustBadges() {
  const [currentSocialProof, setCurrentSocialProof] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => {
        setCurrentSocialProof(prev => (prev + 1) % RECENT_PURCHASES.length);
        setShowNotification(true);
      }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const trustPillars = [
    {
      icon: <Award className="w-6 h-6 text-emerald-400" />,
      title: 'Ayush Standard Compliant',
      desc: 'Formulated in GMP certified facility following classical Ayurvedic moxibustion texts.'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: '1-Click UPI & Verified COD',
      desc: 'Instant Google Pay, PhonePe, Paytm, or verified Cash on Delivery at your doorstep.'
    },
    {
      icon: <Truck className="w-6 h-6 text-blue-400" />,
      title: 'Shiprocket Express Dispatch',
      desc: 'Shipped within 24 hours from Haryana/Bangalore fulfillment hubs with live SMS & WhatsApp tracking.'
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-purple-400" />,
      title: '7-Day Comfort Guarantee',
      desc: 'Love the soothing warmth and joint flexibility, or get full assistance and replacement.'
    }
  ];

  const buyer = RECENT_PURCHASES[currentSocialProof];

  return (
    <section className="py-12 bg-neutral-950 border-b border-neutral-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges 4-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-5 flex items-start gap-4 hover:border-neutral-700 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Seals Strip */}
        <div className="mt-8 pt-6 border-t border-neutral-850 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>256-Bit Bank-Grade SSL Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Toxin-Free & Hypoallergenic</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Over 18,400+ Verified Deliveries</span>
          </div>
        </div>

      </div>

      {/* Floating Indian Social Proof Notification (Bottom Left) */}
      <div
        className={`fixed bottom-20 left-4 z-30 max-w-xs sm:max-w-sm transition-all duration-500 transform ${
          showNotification ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-neutral-900/95 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-3 shadow-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-lg shrink-0">
            🌿
          </div>
          <div className="text-xs">
            <p className="text-white font-semibold flex items-center gap-1.5">
              <span>{buyer.name}</span>
              <span className="text-[10px] text-neutral-400">({buyer.city})</span>
            </p>
            <p className="text-emerald-400 text-[11px] font-medium truncate max-w-[200px]">
              Purchased {buyer.pack}
            </p>
            <p className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Verified Indian Buyer &bull; {buyer.time}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
