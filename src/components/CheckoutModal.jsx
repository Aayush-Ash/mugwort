import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  MapPin, 
  Zap, 
  Tag, 
  Truck, 
  Check, 
  ArrowRight, 
  Smartphone, 
  CreditCard, 
  AlertCircle 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import UpiPaymentSection from './UpiPaymentSection';
import CodOtpSection from './CodOtpSection';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    checkoutStep, 
    setCheckoutStep, 
    customer, 
    setCustomer, 
    pincodeInfo, 
    isPincodeLoading, 
    selectedBundle, 
    bundles, 
    setSelectedBundleId, 
    pricing, 
    couponCode, 
    setCouponCode, 
    appliedCoupon, 
    couponError, 
    applyCouponCode, 
    removeCoupon, 
    paymentMethod, 
    setPaymentMethod, 
    placeOrder,
    isTestMode,
    setIsTestMode
  } = useShop();

  const [formErrors, setFormErrors] = useState({});

  if (!isCheckoutOpen) return null;

  // Form validation before proceeding to payment
  const validateAndProceed = () => {
    const errors = {};
    if (!customer.name?.trim()) errors.name = 'Please enter your full name';
    if (!customer.phone || customer.phone.length < 10) errors.phone = 'Valid 10-digit mobile number required';
    if (!customer.address?.trim()) errors.address = 'Please enter your delivery street address';
    if (!customer.pincode || customer.pincode.length !== 6) errors.pincode = 'Valid 6-digit Indian PIN required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setCheckoutStep('payment');
  };

  const handleSuccessfulPayment = async (method) => {
    await placeOrder(method);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🌿</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Fast Frictionless Checkout
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono uppercase">
                  100% Encrypted
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Dispatched from Gurgaon Central Fulfillment Hub via Shiprocket
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: 2-Column Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Form & Payment Step */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Step 1: Customer & Delivery Address */}
            {checkoutStep === 'details' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> 1. Shipping & Contact Details
                  </h4>
                  <span className="text-xs text-neutral-400">Step 1 of 2</span>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {formErrors.name && <p className="text-[11px] text-red-400 mt-1">{formErrors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    WhatsApp Mobile Number (for Order Tracking) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-neutral-400 text-sm font-semibold">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={customer.phone}
                      onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                      placeholder="9876543210"
                      className="w-full pl-12 pr-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                  {formErrors.phone && <p className="text-[11px] text-red-400 mt-1">{formErrors.phone}</p>}
                </div>

                {/* Delivery Street Address */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    House / Flat No, Street, Landmark *
                  </label>
                  <input
                    type="text"
                    value={customer.address}
                    onChange={(e) => setCustomer(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="e.g. Flat 302, Green Acres Apt, Sector 42"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {formErrors.address && <p className="text-[11px] text-red-400 mt-1">{formErrors.address}</p>}
                </div>

                {/* Pincode with Auto-city & state */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      6-Digit PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={customer.pincode}
                      onChange={(e) => setCustomer(prev => ({ ...prev, pincode: e.target.value.replace(/\D/g, '') }))}
                      placeholder="110001"
                      className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 font-mono font-bold"
                    />
                    {formErrors.pincode && <p className="text-[11px] text-red-400 mt-1">{formErrors.pincode}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      City & State (Auto)
                    </label>
                    <div className="px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-300 truncate">
                      {isPincodeLoading ? (
                        <span className="text-amber-400 animate-pulse">Detecting...</span>
                      ) : (
                        <span>{customer.city}, {customer.state}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Courier Serviceability Callout */}
                {pincodeInfo.serviceable && (
                  <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-xs text-neutral-300">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <Truck className="w-4 h-4" /> Shiprocket Serviceable ({pincodeInfo.days})
                    </span>
                    <span className="text-neutral-400 text-[11px]">
                      Partner: {pincodeInfo.courier}
                    </span>
                  </div>
                )}

                {/* Proceed Button */}
                <button
                  type="button"
                  onClick={validateAndProceed}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-base py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Payment Section (UPI vs COD) */}
            {checkoutStep === 'payment' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> 2. Select Payment Method
                  </h4>
                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
                  >
                    &larr; Edit Address
                  </button>
                </div>

                {/* Payment Method Switcher Tabs */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-950 rounded-2xl border border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'upi'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                      1-Click UPI (Fastest)
                    </span>
                    <span className="text-[10px] text-amber-200 font-normal">
                      Extra ₹30 OFF &bull; Zero Fees
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'cod'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <span>Cash on Delivery</span>
                    <span className="text-[10px] text-neutral-300 font-normal">
                      OTP Verified &bull; Pan-India
                    </span>
                  </button>
                </div>

                {/* Tab Content */}
                {paymentMethod === 'upi' ? (
                  <UpiPaymentSection onPaymentSuccess={handleSuccessfulPayment} />
                ) : (
                  <CodOtpSection onOtpVerified={handleSuccessfulPayment} />
                )}
              </div>
            )}

          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-5 bg-neutral-950 p-5 rounded-2xl border border-neutral-800 flex flex-col justify-between space-y-4">
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                Order Summary
              </h4>

              {/* Bundle Switcher inside checkout */}
              <div className="space-y-2 mb-4">
                {bundles.map(b => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBundleId(b.id)}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                      selectedBundle.id === b.id
                        ? 'bg-neutral-900 border-emerald-500 text-white'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <span className="font-bold block text-white">{b.name}</span>
                      <span className="text-[10px] text-emerald-400">{b.durationText}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white block">₹{b.salePrice}</span>
                      <span className="text-[10px] text-neutral-500 line-through">₹{b.mrp}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Section */}
              <div className="pt-2 pb-3 border-t border-neutral-800">
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-400" /> Have a Coupon Code?
                </label>

                {appliedCoupon ? (
                  <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-black text-emerald-400 block">
                        {appliedCoupon.code} APPLIED
                      </span>
                      <span className="text-[10px] text-neutral-300">
                        {appliedCoupon.desc}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-red-400 hover:text-red-300 cursor-pointer font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="e.g. RELIEF50"
                        className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs font-mono uppercase focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => applyCouponCode(couponCode)}
                        className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold px-3 py-2 rounded-xl border border-neutral-700 cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Quick coupon tags */}
                    <div className="flex gap-2 text-[10px]">
                      <button
                        type="button"
                        onClick={() => applyCouponCode('RELIEF50')}
                        className="text-amber-400 hover:underline cursor-pointer"
                      >
                        Tap to apply: <strong>RELIEF50</strong> (₹50 OFF)
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-red-400">{couponError}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Price Line Items */}
              <div className="border-t border-neutral-800 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>Regular MRP:</span>
                  <span className="line-through text-neutral-500">₹{pricing.mrp}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Bundle Discount:</span>
                  <span className="text-emerald-400">-₹{pricing.baseSavings}</span>
                </div>
                {pricing.couponDiscount > 0 && (
                  <div className="flex justify-between text-amber-300 font-semibold">
                    <span>Coupon ({appliedCoupon?.code}):</span>
                    <span>-₹{pricing.couponDiscount}</span>
                  </div>
                )}
                {pricing.prepaidDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>1-Click UPI Prepaid Discount:</span>
                    <span>-₹{pricing.prepaidDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-300">
                  <span>Delivery Charges:</span>
                  <span>{pricing.shipping === 0 ? <strong className="text-emerald-400">FREE</strong> : `+₹${pricing.shipping}`}</span>
                </div>

                <div className="border-t border-neutral-800 pt-3 flex items-baseline justify-between text-sm sm:text-base font-extrabold text-white">
                  <span>Total Payable:</span>
                  <span className="text-2xl font-black font-heading text-emerald-400">
                    ₹{pricing.finalAmount}
                  </span>
                </div>

                {isTestMode && (
                  <p className="text-[11px] text-amber-400 bg-amber-950/50 p-1.5 rounded border border-amber-500/30 text-center font-bold">
                    ⚡ TSK-13 ₹1 Live UPI Test Mode Active
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Security Seals */}
            <div className="pt-3 border-t border-neutral-850 text-[11px] text-neutral-400 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Lock className="w-3.5 h-3.5" /> 256-Bit Bank-Grade Checkout
              </div>
              <p>7-Day Replacement &bull; 100% Herbal Authentic Batch</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
