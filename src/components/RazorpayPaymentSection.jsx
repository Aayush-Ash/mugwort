import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Zap, 
  ExternalLink 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

/**
 * Dynamically loads the Razorpay checkout.js script.
 */
function loadRazorpaySdk() {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function RazorpayPaymentSection({ onPaymentSuccess }) {
  const { 
    pricing, 
    selectedProduct, 
    selectedColor, 
    customer, 
    isTestMode, 
    setIsTestMode,
    currency 
  } = useShop();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [apiConfig, setApiConfig] = useState({ configured: null, message: '' });

  // Calculate amount in INR
  // If currency is $, convert $48 to ₹3,999, $78 to ₹6,499, $56 to ₹4,699, or proportional
  const getInrAmount = () => {
    if (isTestMode) return 1; // ₹1 Test Mode
    if (currency === '₹') return pricing.finalAmount;
    
    // In USD, calculate realistic INR conversion (approx ₹83.3 / $)
    const baseUsd = pricing.finalAmount;
    if (baseUsd === 48) return 3999;
    if (baseUsd === 78) return 6499;
    if (baseUsd === 56) return 4699;
    return Math.round(baseUsd * 83.3);
  };

  const inrAmount = getInrAmount();

  // Load SDK and check API configuration status on mount
  useEffect(() => {
    let isMounted = true;
    
    loadRazorpaySdk().then(loaded => {
      if (isMounted) setSdkLoaded(loaded);
    });

    // Check backend Razorpay key configuration
    fetch('/api/payment-config')
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setApiConfig(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setApiConfig({ configured: false, message: 'Server not reachable' });
        }
      });

    return () => { isMounted = false; };
  }, []);

  // Main payment handler
  const handlePayWithRazorpay = async () => {
    setErrorMessage('');
    setIsProcessing(true);

    // 1. Ensure SDK is loaded
    if (!sdkLoaded && !window.Razorpay) {
      const loaded = await loadRazorpaySdk();
      if (!loaded) {
        setIsProcessing(false);
        setErrorMessage('Failed to load Razorpay payment gateway. Please check your internet connection.');
        return;
      }
      setSdkLoaded(true);
    }

    try {
      // 2. Call backend /api/create-order
      const orderPayload = {
        amount: inrAmount,
        currency: 'INR',
        receipt: `mora_${Date.now()}`,
        notes: {
          customerName: customer.name || 'Ritual Guest',
          customerPhone: customer.phone || '',
          product: selectedProduct.name,
          color: selectedColor
        }
      };

      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const orderData = await orderRes.json();

      // If backend reports keys not configured
      if (!orderRes.ok || !orderData.success) {
        setIsProcessing(false);
        setErrorMessage(
          orderData.message || 
          'Razorpay API keys are not configured in your .env file. Please check RAZORPAY_SETUP.md.'
        );
        return;
      }

      // 3. Initialize Razorpay Checkout
      const options = {
        key: orderData.keyId, // Automatically provided by backend from .env
        amount: orderData.amount, // in paise
        currency: orderData.currency || 'INR',
        name: 'MORA · MORI®',
        description: `${selectedProduct.name} — ${selectedColor}`,
        image: '/assets/mora-mori/product_hammer_single.png',
        order_id: orderData.orderId,
        prefill: {
          name: customer.name || '',
          email: customer.email || `${customer.phone || 'guest'}@mora-mori.com`,
          contact: customer.phone || ''
        },
        notes: {
          color: selectedColor,
          pincode: customer.pincode
        },
        theme: {
          color: '#445834' // MORA · MORI brand olive green
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setErrorMessage('Payment window closed. You can retry whenever you are ready.');
          }
        },
        handler: async (response) => {
          try {
            setIsProcessing(true);

            // 4. Verify payment signature on backend
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              // Successfully verified!
              onPaymentSuccess('razorpay', {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id
              });
            } else {
              setIsProcessing(false);
              setErrorMessage(verifyData.message || 'Payment signature verification failed.');
            }
          } catch (err) {
            console.error('Error verifying payment:', err);
            setIsProcessing(false);
            setErrorMessage('Network error during payment verification. Please contact support.');
          }
        }
      };

      const rzpInstance = new window.Razorpay(options);

      rzpInstance.on('payment.failed', (response) => {
        setIsProcessing(false);
        setErrorMessage(
          `Payment Failed: ${response.error?.description || 'Your bank declined the transaction.'}`
        );
      });

      rzpInstance.open();

    } catch (err) {
      console.error('Razorpay initialization error:', err);
      setIsProcessing(false);
      setErrorMessage(err.message || 'An unexpected error occurred while initiating payment.');
    }
  };

  // Fallback simulation for owner testing when keys are not yet configured in .env
  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess('razorpay', {
        paymentId: `pay_sim_${Date.now()}`,
        orderId: `order_sim_${Date.now()}`,
        simulated: true
      });
    }, 1200);
  };

  return (
    <div className="space-y-5 text-[#2c241c]">

      {/* Test Mode Toggle Banner */}
      <div className="bg-[#ede7da] border border-[#d8cfbe] rounded-2xl p-3 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#445834]" />
          <div>
            <span className="text-xs font-bold text-[#1e1711] block">
              ₹1 Live Payment Test Mode
            </span>
            <span className="text-[11px] text-[#635547] block">
              Set order amount to ₹1.00 to verify live Razorpay UPI & card flow
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsTestMode(!isTestMode)}
          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            isTestMode
              ? 'bg-[#445834] text-white border-[#445834] shadow-sm'
              : 'bg-white text-[#55473a] border-[#d8cfbe] hover:bg-[#faf7f2]'
          }`}
        >
          {isTestMode ? 'ON (₹1 Mode)' : 'OFF (Full Price)'}
        </button>
      </div>

      {/* Warning Notice if Keys are Not Yet Configured in .env */}
      {apiConfig.configured === false && (
        <div className="bg-[#fff9ed] border border-[#e8c886] rounded-2xl p-3.5 space-y-2 shadow-sm">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#b8761e] shrink-0 mt-0.5" />
            <div className="text-xs text-[#6e4e1f]">
              <span className="font-bold block text-[#523812]">
                Razorpay API Keys Pending in .env
              </span>
              <span>
                To accept real customer payments, paste your <code>RAZORPAY_KEY_ID</code> and <code>RAZORPAY_KEY_SECRET</code> into <code>.env</code>.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#f2deb8] text-[11px]">
            <span className="text-[#876228]">Zero code changes needed:</span>
            <button
              type="button"
              onClick={handleSimulatePayment}
              className="text-[#445834] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              Test Success Flow (Simulator) &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Supported Payment Channels Grid */}
      <div className="p-4 rounded-2xl bg-white border border-[#ded5c5] shadow-sm space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#635547] block">
          Supported Instant Payment Channels:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          
          <div className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#e4dcce] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#efe8d8] flex items-center justify-center shrink-0">
              <Smartphone className="w-3.5 h-3.5 text-[#445834]" />
            </div>
            <div className="text-[11px]">
              <span className="font-bold block text-[#1e1711]">UPI</span>
              <span className="text-[10px] text-[#736456]">GPay, PhonePe</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#e4dcce] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#efe8d8] flex items-center justify-center shrink-0">
              <CreditCard className="w-3.5 h-3.5 text-[#445834]" />
            </div>
            <div className="text-[11px]">
              <span className="font-bold block text-[#1e1711]">Cards</span>
              <span className="text-[10px] text-[#736456]">Visa, MC, RuPay</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#e4dcce] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#efe8d8] flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5 text-[#445834]" />
            </div>
            <div className="text-[11px]">
              <span className="font-bold block text-[#1e1711]">NetBanking</span>
              <span className="text-[10px] text-[#736456]">50+ Banks</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#e4dcce] flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#efe8d8] flex items-center justify-center shrink-0">
              <Wallet className="w-3.5 h-3.5 text-[#445834]" />
            </div>
            <div className="text-[11px]">
              <span className="font-bold block text-[#1e1711]">Wallets / EMI</span>
              <span className="text-[10px] text-[#736456]">Paytm, Cred</span>
            </div>
          </div>

        </div>
      </div>

      {/* Error Message Box */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block">Payment Notice:</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Primary Pay Now Action Button */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={handlePayWithRazorpay}
          disabled={isProcessing}
          className={`w-full py-4 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer ${
            isProcessing
              ? 'bg-[#6d7f5e] text-white/80 cursor-wait'
              : 'glow-btn-green text-white hover:shadow-lg'
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Connecting to Razorpay...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 stroke-[2.2]" />
              <span>Pay with Razorpay &bull; ₹{inrAmount.toLocaleString('en-IN')}</span>
            </>
          )}
        </button>

        {/* Security & Regulatory Badges */}
        <div className="flex items-center justify-center gap-4 text-[11px] text-[#6d5e50]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#445834]" />
            256-Bit SSL Encryption
          </span>
          <span>&bull;</span>
          <span>RBI Authorized</span>
          <span>&bull;</span>
          <span>Instant Air Courier Dispatch</span>
        </div>
      </div>

    </div>
  );
}
