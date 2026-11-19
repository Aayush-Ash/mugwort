import React, { useState, useEffect } from 'react';
import { ShieldCheck, Smartphone, CheckCircle2, AlertTriangle, Zap, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CodOtpSection({ onOtpVerified }) {
  const { customer, setCustomer, pricing, setPaymentMethod } = useShop();
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Send OTP
  const handleSendOtp = () => {
    if (!customer.phone || customer.phone.length < 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setError('');
    // Generate 4-digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    setTimer(60);
  };

  // 60-second countdown timer
  useEffect(() => {
    let interval = null;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // Verify OTP
  const handleVerifyOtp = () => {
    if (userOtp !== generatedOtp) {
      setError('Invalid OTP entered. Please check the code.');
      return;
    }
    setError('');
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onOtpVerified('cod');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Prepaid Upsell Nudge (Indian D2C Conversion Booster) */}
      <div className="bg-gradient-to-r from-emerald-950/70 to-teal-950/70 border border-emerald-500/40 rounded-2xl p-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Zap className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs">
            <span className="font-extrabold text-white block">
              ⚡ Switch to 1-Click UPI & Save Extra ₹30!
            </span>
            <span className="text-neutral-300 block">
              Prepaid orders dispatch in 12 hours via Blue Dart Air Priority.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPaymentMethod('upi')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shrink-0 cursor-pointer shadow-md"
        >
          Pay UPI
        </button>
      </div>

      {/* OTP Delivery Simulator Notification Pill */}
      {otpSent && (
        <div className="bg-neutral-800 border-2 border-amber-400/80 rounded-2xl p-4 shadow-xl animate-bounce-short">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                SMS OTP Delivered to +91 {customer.phone}
              </span>
            </div>
            <span className="text-xs font-mono font-black bg-neutral-950 text-amber-400 px-2.5 py-1 rounded-md border border-neutral-700">
              {generatedOtp}
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <p className="text-[11px] text-neutral-300">
              Use code <strong className="text-white font-mono">{generatedOtp}</strong> to confirm your Cash on Delivery order.
            </p>
            <button
              type="button"
              onClick={() => setUserOtp(generatedOtp)}
              className="bg-amber-400 hover:bg-amber-300 text-neutral-950 text-[11px] font-black px-2.5 py-1 rounded-lg cursor-pointer"
            >
              Auto-Fill
            </button>
          </div>
        </div>
      )}

      {/* Phone number and OTP form */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
            Registered Mobile Number (for Delivery OTP & Updates)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-3.5 text-neutral-400 text-sm font-semibold">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={customer.phone}
                onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                placeholder="9876543210"
                className="w-full pl-12 pr-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <button
              type="button"
              onClick={handleSendOtp}
              className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold px-4 rounded-xl border border-neutral-700 transition-colors cursor-pointer"
            >
              {otpSent ? 'Resend' : 'Send Code'}
            </button>
          </div>
        </div>

        {otpSent && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Enter 4-Digit Verification Code
            </label>
            <input
              type="text"
              maxLength={4}
              value={userOtp}
              onChange={(e) => setUserOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-center text-lg font-mono tracking-widest focus:outline-none focus:border-emerald-500"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
              <span>{timer > 0 ? `Resend OTP in ${timer}s` : 'Code expired'}</span>
              {timer === 0 && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-emerald-400 hover:underline cursor-pointer font-semibold"
                >
                  Request New Code
                </button>
              )}
            </div>
          </div>
        )}

        {error && (
          <p className="text-xs text-red-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>

      {/* Submit / Confirm COD Order */}
      <button
        type="button"
        disabled={isVerifying || !otpSent || userOtp.length !== 4}
        onClick={handleVerifyOtp}
        className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-base py-4 px-6 rounded-2xl transition-all shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-40"
      >
        {isVerifying ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Verifying OTP & Assigning Courier...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
            <span>Verify OTP & Place COD Order &bull; ₹{pricing.finalAmount}</span>
          </div>
        )}
      </button>

      {/* Anti-RTO Warning Pill */}
      <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <span>
          <strong>Anti-RTO Protection:</strong> We verify every phone number via OTP to keep inventory genuine. Please keep cash or UPI ready at the time of delivery.
        </span>
      </div>

    </div>
  );
}
