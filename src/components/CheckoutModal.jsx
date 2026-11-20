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
  CreditCard 
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
    selectedProduct, 
    products, 
    setSelectedProductId, 
    selectedColor,
    setSelectedColor,
    pricing, 
    currency,
    couponCode, 
    setCouponCode, 
    appliedCoupon, 
    couponError, 
    applyCouponCode, 
    removeCoupon, 
    paymentMethod, 
    setPaymentMethod, 
    placeOrder,
    isTestMode
  } = useShop();

  const [formErrors, setFormErrors] = useState({});

  if (!isCheckoutOpen) return null;

  const validateAndProceed = () => {
    const errors = {};
    if (!customer.name?.trim()) errors.name = 'Please enter your full name';
    if (!customer.phone || customer.phone.length < 10) errors.phone = 'Valid 10-digit mobile number required for dispatch';
    if (!customer.address?.trim()) errors.address = 'Please enter your delivery street address';
    if (!customer.pincode || customer.pincode.length !== 6) errors.pincode = 'Valid 6-digit Indian PIN code required';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#140e0a]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#faf7f2] border border-[#d8cfbe] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#2c241c]">
        
        {/* Modal Header */}
        <div className="bg-[#f2ebd9] px-6 py-4 border-b border-[#ded5c3] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-xl font-bold tracking-wider text-[#221a13]">
              MORA &bull; MORI<sup className="text-[10px] font-sans ml-0.5">&reg;</sup>
            </span>
            <div className="hidden sm:block h-4 w-px bg-[#c8bead]" />
            <p className="hidden sm:block text-xs text-[#55473a]">
              Conscious Meridian Wellness &bull; Dispatched via Shiprocket
            </p>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-full bg-[#e8decb] hover:bg-[#ded2bd] text-[#3a2f26] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Form & Payment Step */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Step 1: Shipping Details */}
            {checkoutStep === 'details' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#e6dcce]">
                  <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#445834] flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> 1. Delivery & Contact Details
                  </h4>
                  <span className="text-xs text-[#776859]">Step 1 of 2</span>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#44382e] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Maya Rodriguez"
                    className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d6ccba] rounded-xl text-sm text-[#221913] focus:outline-none focus:border-[#445834]"
                  />
                  {formErrors.name && <p className="text-[11px] text-red-600 mt-1">{formErrors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[#44382e] mb-1">
                    Mobile Phone (for Courier SMS & WhatsApp Live Tracking) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-[#736456] text-sm font-semibold">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={customer.phone}
                      onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
                      placeholder="9876543210"
                      className="w-full pl-12 pr-4 py-2.5 bg-[#ffffff] border border-[#d6ccba] rounded-xl text-sm text-[#221913] focus:outline-none focus:border-[#445834] font-mono"
                    />
                  </div>
                  {formErrors.phone && <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>}
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-semibold text-[#44382e] mb-1">
                    Delivery Address (Apartment, House No, Street) *
                  </label>
                  <input
                    type="text"
                    value={customer.address}
                    onChange={(e) => setCustomer(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="e.g. 104, Jasmine Court, Sector 15"
                    className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d6ccba] rounded-xl text-sm text-[#221913] focus:outline-none focus:border-[#445834]"
                  />
                  {formErrors.address && <p className="text-[11px] text-red-600 mt-1">{formErrors.address}</p>}
                </div>

                {/* Pincode with Auto-detection */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#44382e] mb-1">
                      6-Digit PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={customer.pincode}
                      onChange={(e) => setCustomer(prev => ({ ...prev, pincode: e.target.value.replace(/\D/g, '') }))}
                      placeholder="110001"
                      className="w-full px-4 py-2.5 bg-[#ffffff] border border-[#d6ccba] rounded-xl text-sm text-[#221913] focus:outline-none focus:border-[#445834] font-mono font-bold"
                    />
                    {formErrors.pincode && <p className="text-[11px] text-red-600 mt-1">{formErrors.pincode}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#44382e] mb-1">
                      City & State (Auto)
                    </label>
                    <div className="px-3.5 py-2.5 bg-[#efe8d8] border border-[#ded5c3] rounded-xl text-xs text-[#44382e] truncate">
                      {isPincodeLoading ? (
                        <span className="text-[#a4763b] animate-pulse">Detecting...</span>
                      ) : (
                        <span>{customer.city}, {customer.state}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Shiprocket Delivery SLA Banner */}
                {pincodeInfo.serviceable && (
                  <div className="bg-[#ede5d3] border border-[#d8cdb8] rounded-xl p-3 flex items-center justify-between text-xs text-[#3a2f26]">
                    <span className="flex items-center gap-1.5 text-[#445834] font-semibold">
                      <Truck className="w-4 h-4" /> Shiprocket Priority ({pincodeInfo.days})
                    </span>
                    <span className="text-[#6b5d4f] text-[11px]">
                      Carrier: {pincodeInfo.courier}
                    </span>
                  </div>
                )}

                {/* Proceed Button */}
                <button
                  type="button"
                  onClick={validateAndProceed}
                  className="w-full glow-btn-green text-white font-medium text-sm py-3.5 px-6 rounded-full flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Payment Section */}
            {checkoutStep === 'payment' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#e6dcce]">
                  <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#445834] flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> 2. Complete Payment
                  </h4>
                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="text-xs text-[#55473a] hover:text-[#1e1711] underline cursor-pointer"
                  >
                    &larr; Edit Address
                  </button>
                </div>

                {/* Payment Mode Selector */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#efe8d8] rounded-2xl border border-[#ded5c3]">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'upi'
                        ? 'bg-[#445834] text-white shadow-md'
                        : 'text-[#55473a] hover:text-[#221a13]'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-current text-[#f4d187]" />
                      1-Click UPI &bull; Instant
                    </span>
                    <span className="text-[10px] text-white/80 font-normal">
                      Zero Fees &bull; Priority Air Courier
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'cod'
                        ? 'bg-[#445834] text-white shadow-md'
                        : 'text-[#55473a] hover:text-[#221a13]'
                    }`}
                  >
                    <span>Cash on Delivery</span>
                    <span className="text-[10px] text-white/80 font-normal">
                      OTP Verified &bull; Pan-India
                    </span>
                  </button>
                </div>

                {/* Tab content */}
                {paymentMethod === 'upi' ? (
                  <UpiPaymentSection onPaymentSuccess={handleSuccessfulPayment} />
                ) : (
                  <CodOtpSection onOtpVerified={handleSuccessfulPayment} />
                )}
              </div>
            )}

          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-5 bg-[#f4ece0] p-5 rounded-2xl border border-[#ded5c3] flex flex-col justify-between space-y-4">
            
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6b5d4f] mb-3">
                Ritual Selection
              </h4>

              {/* Product Card Inside Summary */}
              <div className="space-y-2 mb-4">
                {products.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                      selectedProduct.id === p.id
                        ? 'bg-[#ffffff] border-[#445834] shadow-sm'
                        : 'bg-[#faf7f2]/60 border-[#ded5c3] text-[#6b5d4f] hover:border-[#b8ab97]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover" />
                      <div>
                        <span className="font-serif-luxury font-medium block text-sm text-[#1e1711]">{p.name}</span>
                        <span className="text-[10px] text-[#445834]">{p.subtitle}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-[#1e1711] block">{currency}{p.price}</span>
                      <span className="text-[10px] text-[#8c7e6f] line-through">{currency}{p.mrp}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Color variant choice */}
              {selectedProduct.colors && (
                <div className="pt-2 pb-3 border-t border-[#ded5c3] text-xs">
                  <span className="text-[11px] font-semibold text-[#55473a] block mb-1.5">
                    Selected Color: <strong className="text-[#201913]">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {selectedProduct.colors.map(c => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                          selectedColor === c.name ? 'bg-[#445834] text-white border-[#445834]' : 'bg-white border-[#d8cdb8] text-[#55473a]'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Coupon Code Section */}
              <div className="pt-2 pb-3 border-t border-[#ded5c3]">
                <label className="block text-xs font-semibold text-[#44382e] mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#445834]" /> Ritual Promo Code
                </label>

                {appliedCoupon ? (
                  <div className="bg-[#ede5d3] border border-[#445834]/40 rounded-xl p-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#445834] block">
                        {appliedCoupon.code} APPLIED
                      </span>
                      <span className="text-[10px] text-[#55473a]">
                        {appliedCoupon.desc}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:text-red-700 cursor-pointer font-semibold"
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
                        placeholder="e.g. RITUAL15"
                        className="flex-1 px-3 py-2 bg-[#ffffff] border border-[#d6ccba] rounded-xl text-xs font-mono uppercase focus:outline-none focus:border-[#445834]"
                      />
                      <button
                        type="button"
                        onClick={() => applyCouponCode(couponCode)}
                        className="bg-[#445834] text-white text-xs font-medium px-4 py-2 rounded-xl cursor-pointer hover:bg-[#38482a]"
                      >
                        Apply
                      </button>
                    </div>

                    <div className="flex gap-2 text-[10px]">
                      <button
                        type="button"
                        onClick={() => applyCouponCode('RITUAL15')}
                        className="text-[#445834] hover:underline cursor-pointer"
                      >
                        Tap to apply: <strong>RITUAL15</strong> (15% OFF)
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-red-600">{couponError}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Price Line Items */}
              <div className="border-t border-[#ded5c3] pt-3 space-y-2 text-xs text-[#55473a]">
                <div className="flex justify-between">
                  <span>Regular MRP:</span>
                  <span className="line-through text-[#8c7e6f]">{currency}{pricing.mrp}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ritual Discount:</span>
                  <span className="text-[#445834] font-medium">-{currency}{pricing.baseSavings}</span>
                </div>
                {pricing.couponDiscount > 0 && (
                  <div className="flex justify-between text-[#8a5d2a] font-semibold">
                    <span>Coupon ({appliedCoupon?.code}):</span>
                    <span>-{currency}{pricing.couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Priority Courier:</span>
                  <span className="text-[#445834] font-bold">FREE</span>
                </div>

                <div className="border-t border-[#ded5c3] pt-3 flex items-baseline justify-between text-base font-serif-luxury text-[#1e1711]">
                  <span>Total Payable:</span>
                  <span className="text-2xl font-normal text-[#1e1711]">
                    {currency}{pricing.finalAmount}
                  </span>
                </div>

                {isTestMode && (
                  <p className="text-[11px] text-[#8a5d2a] bg-[#efe5d2] p-1.5 rounded border border-[#dfcdae] text-center font-bold">
                    ⚡ TSK-13 ₹1 / $1 Live Test Mode Active
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Security */}
            <div className="pt-3 border-t border-[#ded5c3] text-[11px] text-[#6b5d4f] space-y-1">
              <div className="flex items-center gap-1.5 text-[#445834] font-medium">
                <Lock className="w-3.5 h-3.5" /> 256-Bit Bank-Grade Checkout
              </div>
              <p>Natural Materials &bull; 100% Guaranteed Satisfaction</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
