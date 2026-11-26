import React from 'react';
import { 
  CheckCircle2, 
  Truck, 
  MessageSquare, 
  ExternalLink, 
  Package, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Copy, 
  X 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { whatsapp } from '../services/whatsappService';

export default function OrderSuccessModal() {
  const { 
    currentOrder, 
    setCurrentOrder, 
    checkoutStep, 
    setCheckoutStep, 
    setIsCheckoutOpen,
    setIsShiprocketModalOpen,
    setIsWhatsAppDrawerOpen
  } = useShop();

  if (checkoutStep !== 'success' || !currentOrder) return null;

  const handleClose = () => {
    setCheckoutStep('details');
    setIsCheckoutOpen(false);
  };

  const openLogistics = () => {
    setIsShiprocketModalOpen(true);
  };

  const openWhatsApp = () => {
    setIsWhatsAppDrawerOpen(true);
  };

  // WhatsApp confirmation text
  const waTemplate = whatsapp.getTemplateOrderConfirmation({
    orderId: currentOrder.orderId,
    customer: currentOrder.customer,
    bundle: currentOrder.product || currentOrder.bundle,
    product: currentOrder.product,
    paymentMethod: currentOrder.paymentMethod,
    awb: currentOrder.shipment?.awb,
    courier: currentOrder.shipment?.courierPartner,
    totalAmount: currentOrder.pricing.finalAmount
  });

  const directWaLink = whatsapp.createDirectWaLink(currentOrder.customer.phone, waTemplate.rawText);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-emerald-500/50 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden my-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white animate-bounce-short">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Order Confirmed! 🎉
          </h3>
          <p className="text-sm text-neutral-300 max-w-md mx-auto">
            Namaste <strong>{currentOrder.customer.name || 'Friend'}</strong>, your herbal healing journey begins! We have received your order.
          </p>
        </div>

        {/* Order Details & Logistics Pill */}
        <div className="bg-neutral-950 rounded-2xl p-4 sm:p-5 border border-neutral-800 space-y-4 mb-6">
          
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-800 text-xs">
            <div>
              <span className="text-neutral-400">Order ID: </span>
              <strong className="text-white font-mono">{currentOrder.orderId}</strong>
            </div>
            <div>
              <span className="text-neutral-400">Payment: </span>
              <span className="text-emerald-400 font-bold uppercase">
                {currentOrder.paymentMethod === 'razorpay' ? 'Razorpay (Paid Online)' : currentOrder.paymentMethod}
              </span>
              <span className="text-neutral-400 ml-1">({currentOrder.pricing?.currency || '₹'}{currentOrder.pricing.finalAmount})</span>
            </div>
            {currentOrder.paymentId && (
              <div className="w-full pt-1 text-[11px] text-neutral-400 font-mono flex items-center justify-between">
                <span>Razorpay Payment Ref:</span>
                <span className="text-emerald-400 font-semibold">{currentOrder.paymentId}</span>
              </div>
            )}
          </div>

          {/* Courier Sync Status */}
          <div className="flex items-start gap-3 bg-neutral-900/90 p-3.5 rounded-xl border border-neutral-800">
            <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">
                  Courier Assigned: {currentOrder.shipment?.courierPartner}
                </span>
                <span className="bg-emerald-950 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  AWB GENERATED
                </span>
              </div>
              <p className="text-neutral-400 font-mono text-[11px]">
                AWB Tracking #: <strong className="text-emerald-400">{currentOrder.shipment?.awb}</strong>
              </p>
              <p className="text-neutral-300 text-[11px]">
                Estimated Delivery: <strong className="text-amber-400">{currentOrder.shipment?.estimatedDelivery}</strong> to {currentOrder.customer.city || 'Destination'}
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">
              Deliver to: {currentOrder.customer.address}, {currentOrder.customer.city}, {currentOrder.customer.state} - {currentOrder.customer.pincode}
            </span>
          </div>

        </div>

        {/* 2 Action Buttons for TSK-12 & TSK-13 Verification */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={openLogistics}
            className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl border border-neutral-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Truck className="w-4 h-4 text-blue-400" />
            <span>Track Courier on Shiprocket &rarr;</span>
          </button>

          <a
            href={directWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open WhatsApp Confirmation</span>
          </a>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="w-full text-center text-xs text-neutral-400 hover:text-white py-2 cursor-pointer"
        >
          Close & Back to Store
        </button>

      </div>
    </div>
  );
}
