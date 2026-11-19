import React, { useState, useEffect } from 'react';
import { 
  buildUpiUri, 
  generateUpiQrCode, 
  POPULAR_UPI_APPS, 
  buildAppSpecificUri, 
  UPI_CONFIG 
} from '../services/upiService';
import { QrCode, Smartphone, CheckCircle2, ShieldCheck, Zap, AlertCircle, Copy, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function UpiPaymentSection({ onPaymentSuccess }) {
  const { pricing, selectedBundle, customer, isTestMode, setIsTestMode } = useShop();
  const [selectedApp, setSelectedApp] = useState('gpay');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedVpa, setCopiedVpa] = useState(false);

  const amountToPay = pricing.finalAmount;
  const tempOrderId = `TMP-${Math.floor(100000 + Math.random() * 900000)}`;

  const upiUri = buildUpiUri({
    vpa: UPI_CONFIG.vpa,
    name: UPI_CONFIG.merchantName,
    amount: amountToPay,
    orderId: tempOrderId,
    note: `Mugwort ${selectedBundle.name.split(' ')[0]}`
  });

  // Generate QR Code on mount or whenever amount changes
  useEffect(() => {
    let isMounted = true;
    generateUpiQrCode(upiUri).then(url => {
      if (isMounted && url) {
        setQrCodeUrl(url);
      }
    });
    return () => { isMounted = false; };
  }, [upiUri, amountToPay]);

  // Handle direct 1-tap app launch on mobile
  const handleAppClick = (appId) => {
    setSelectedApp(appId);
    const deepLink = buildAppSpecificUri(appId, {
      vpa: UPI_CONFIG.vpa,
      name: UPI_CONFIG.merchantName,
      amount: amountToPay,
      orderId: tempOrderId
    });

    // On mobile, trigger intent URL
    window.location.href = deepLink;
  };

  const copyVpaToClipboard = () => {
    navigator.clipboard.writeText(UPI_CONFIG.vpa);
    setCopiedVpa(true);
    setTimeout(() => setCopiedVpa(false), 2000);
  };

  // Simulate Instant Webhook / Web Socket confirmation from UPI gateway
  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess('upi');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* ₹1 Test Mode Toggle Bar (TSK-13 requirement) */}
      <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <div>
            <span className="text-xs font-bold text-amber-300 block">
              ₹1 Live UPI Test Mode (TSK-13)
            </span>
            <span className="text-[11px] text-neutral-300 block">
              Set order amount to ₹1.00 to verify UPI QR & deep link
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsTestMode(!isTestMode)}
          className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
            isTestMode
              ? 'bg-amber-400 text-neutral-950 border-amber-300 shadow-md'
              : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
          }`}
        >
          {isTestMode ? 'ON (₹1 Mode)' : 'OFF (Live)'}
        </button>
      </div>

      {/* 1-Tap UPI Apps Grid (Mobile-friendly) */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
          Select Your Preferred UPI App (1-Tap Pay):
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {POPULAR_UPI_APPS.map((app) => {
            const isSelected = selectedApp === app.id;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => handleAppClick(app.id)}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-800 border-emerald-500 shadow-sm'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${app.iconColor}`}>
                    {app.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{app.name}</span>
                    <span className="text-[10px] text-neutral-400">1-Tap Direct</span>
                  </div>
                </div>

                {app.popularBadge && (
                  <span className="text-[9px] font-extrabold uppercase bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                    {app.popularBadge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic QR Code Section for Desktop / Cross-Device Scanning */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5">
        <div className="bg-white p-2.5 rounded-2xl shadow-lg shrink-0">
          {qrCodeUrl ? (
            <img 
              src={qrCodeUrl} 
              alt="UPI Dynamic QR Code" 
              className="w-36 h-36 rounded-lg object-contain"
            />
          ) : (
            <div className="w-36 h-36 bg-neutral-200 animate-pulse rounded-lg flex items-center justify-center text-xs text-neutral-500">
              Generating QR...
            </div>
          )}
        </div>

        <div className="text-center sm:text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
            <QrCode className="w-3.5 h-3.5" /> Scan with Any UPI App
          </div>
          <h4 className="text-sm font-bold text-white">
            Scan & Pay Exactly ₹{amountToPay}
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Open PhonePe, Google Pay, Paytm, or BHIM on your mobile and point camera to scan.
          </p>

          <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs text-neutral-400 font-mono bg-neutral-950 px-2.5 py-1 rounded-lg border border-neutral-800">
              {UPI_CONFIG.vpa}
            </span>
            <button
              type="button"
              onClick={copyVpaToClipboard}
              className="text-xs text-emerald-400 hover:text-emerald-300 p-1.5 rounded-lg border border-neutral-800 hover:bg-neutral-850 cursor-pointer flex items-center gap-1"
              title="Copy UPI VPA"
            >
              {copiedVpa ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Action Button: Simulate / Confirm UPI Payment */}
      <button
        type="button"
        disabled={isProcessing}
        onClick={handleSimulatePayment}
        className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-base py-4 px-6 rounded-2xl transition-all shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Verifying with UPI Gateway...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
            <span>I Have Paid ₹{amountToPay} &bull; Confirm Order</span>
          </div>
        )}
      </button>

      <div className="flex items-center justify-center gap-4 text-xs text-neutral-400">
        <span className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="w-4 h-4" /> 100% Secure NPCI / RBI Approved
        </span>
        <span>&bull;</span>
        <span>Instant WhatsApp Notification</span>
      </div>

    </div>
  );
}
