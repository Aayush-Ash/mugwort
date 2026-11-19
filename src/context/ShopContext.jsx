import React, { createContext, useContext, useState, useEffect } from 'react';
import { BUNDLES } from '../services/bundlesData';
import { lookupPincode } from '../services/pincodeService';
import { shiprocket } from '../services/shiprocketService';
import { whatsapp } from '../services/whatsappService';
import confetti from 'canvas-confetti';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // 1. Bundle selection (Default: 2-Pack Most Popular)
  const [selectedBundleId, setSelectedBundleId] = useState(2);
  const selectedBundle = BUNDLES.find(b => b.id === selectedBundleId) || BUNDLES[1];

  // 2. Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code: 'RELIEF50', discount: 50, desc: 'Special ₹50 Cart Recovery Discount' }
  const [couponError, setCouponError] = useState('');

  // 3. Test Mode (₹1 Test Order for TSK-13 verification)
  const [isTestMode, setIsTestMode] = useState(false);

  // 4. Customer lead & address info
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '110001',
    city: 'New Delhi',
    state: 'Delhi',
    landmark: ''
  });
  const [pincodeInfo, setPincodeInfo] = useState({
    serviceable: true,
    city: 'New Delhi',
    state: 'Delhi',
    days: '1–2 Days',
    courier: 'BlueDart Express'
  });
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);

  // 5. Checkout UI state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('details'); // 'details' | 'upi' | 'cod_otp' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'cod'

  // 6. Placed order details
  const [currentOrder, setCurrentOrder] = useState(null);

  // 7. Modals & Drawers
  const [isWhatsAppDrawerOpen, setIsWhatsAppDrawerOpen] = useState(false);
  const [isShiprocketModalOpen, setIsShiprocketModalOpen] = useState(false);
  const [isEodConsoleOpen, setIsEodConsoleOpen] = useState(false);
  const [activeTrackingShipment, setActiveTrackingShipment] = useState(null);

  // 8. Device Viewport Mode ('desktop' | 'mobile')
  const [viewportMode, setViewportMode] = useState('desktop');

  // Load existing lead or coupon from URL parameters if any
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCoupon = params.get('coupon');
    if (urlCoupon && urlCoupon.toUpperCase() === 'RELIEF50') {
      applyCouponCode('RELIEF50');
    }
  }, []);

  // Update pincode whenever customer.pincode changes (6 digits)
  useEffect(() => {
    if (customer.pincode && customer.pincode.length === 6) {
      let isMounted = true;
      setIsPincodeLoading(true);
      lookupPincode(customer.pincode).then(info => {
        if (isMounted) {
          setPincodeInfo(info);
          if (info.serviceable) {
            setCustomer(prev => ({
              ...prev,
              city: info.city,
              state: info.state
            }));
          }
          setIsPincodeLoading(false);
        }
      });
      return () => { isMounted = false; };
    }
  }, [customer.pincode]);

  // Lead auto-save for WhatsApp abandoned cart recovery
  useEffect(() => {
    if (customer.phone && customer.phone.length >= 10) {
      whatsapp.saveLead(customer);
    }
  }, [customer.phone, customer.name]);

  // Pricing math calculations
  const calculatePricing = () => {
    const baseMrp = selectedBundle.mrp;
    const baseSalePrice = selectedBundle.salePrice;
    const baseSavings = baseMrp - baseSalePrice;

    // Shipping calculation
    const shipping = selectedBundle.freeShipping ? 0 : selectedBundle.shippingFee;

    // Coupon discount calculation
    let couponDiscount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.code === 'RELIEF50') {
        couponDiscount = 50;
      } else if (appliedCoupon.code === 'RELIEF10') {
        couponDiscount = Math.round(baseSalePrice * 0.10);
      }
    }

    // Prepaid UPI bonus discount (extra ₹30 off)
    const prepaidDiscount = paymentMethod === 'upi' ? 30 : 0;

    // Final total before test mode
    let calculatedTotal = Math.max(1, baseSalePrice + shipping - couponDiscount - prepaidDiscount);

    // If ₹1 test mode is toggled, override final amount to ₹1
    const finalAmount = isTestMode ? 1 : calculatedTotal;

    const totalSavings = (baseMrp - finalAmount);

    return {
      mrp: baseMrp,
      salePrice: baseSalePrice,
      baseSavings,
      shipping,
      couponDiscount,
      prepaidDiscount,
      finalAmount,
      totalSavings,
      pricePerPatch: (finalAmount / selectedBundle.patchesCount).toFixed(2),
      isTestOrder: isTestMode
    };
  };

  const pricing = calculatePricing();

  // Coupon handling
  const applyCouponCode = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError('');

    if (!code) {
      setCouponError('Please enter a coupon code');
      return false;
    }

    if (code === 'RELIEF50') {
      const couponObj = {
        code: 'RELIEF50',
        discount: 50,
        desc: 'Special ₹50 Recovery Discount applied!'
      };
      setAppliedCoupon(couponObj);
      setCouponCode('RELIEF50');
      return true;
    } else if (code === 'RELIEF10') {
      const couponObj = {
        code: 'RELIEF10',
        discountPercent: 10,
        desc: '10% Instant Discount applied!'
      };
      setAppliedCoupon(couponObj);
      setCouponCode('RELIEF10');
      return true;
    } else {
      setCouponError('Invalid coupon code. Try RELIEF50 or RELIEF10');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  // Open checkout with specific bundle
  const openCheckoutWithBundle = (bundleId) => {
    if (bundleId) setSelectedBundleId(bundleId);
    setCheckoutStep('details');
    setIsCheckoutOpen(true);
  };

  // Place order function (executed after UPI success or COD OTP verification)
  const placeOrder = async (method = paymentMethod) => {
    const orderId = `MUG-${Math.floor(100000 + Math.random() * 900000)}`;
    const currentPricing = calculatePricing();

    // 1. Sync with Shiprocket/NimbusPost Logistics engine
    const shipment = await shiprocket.createShipment({
      orderId,
      customer,
      items: [
        {
          name: selectedBundle.name,
          quantity: 1,
          patchesCount: selectedBundle.patchesCount,
          price: currentPricing.finalAmount
        }
      ],
      paymentMethod: method,
      totalAmount: currentPricing.finalAmount,
      pincodeDetails: pincodeInfo
    });

    const orderObj = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      customer: { ...customer },
      bundle: { ...selectedBundle },
      pricing: { ...currentPricing },
      paymentMethod: method,
      shipment,
      status: 'CONFIRMED'
    };

    setCurrentOrder(orderObj);
    setActiveTrackingShipment(shipment);

    // 2. Dispatch automated WhatsApp Order Confirmation trigger
    const waConfirmation = whatsapp.getTemplateOrderConfirmation({
      orderId,
      customer,
      bundle: selectedBundle,
      paymentMethod: method,
      awb: shipment.awb,
      courier: shipment.courierPartner,
      totalAmount: currentPricing.finalAmount
    });
    whatsapp.recordTrigger({
      ...waConfirmation,
      orderId,
      recipientPhone: customer.phone,
      recipientName: customer.name
    });

    // 3. Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    setCheckoutStep('success');
    return orderObj;
  };

  return (
    <ShopContext.Provider
      value={{
        bundles: BUNDLES,
        selectedBundleId,
        setSelectedBundleId,
        selectedBundle,
        couponCode,
        setCouponCode,
        appliedCoupon,
        couponError,
        applyCouponCode,
        removeCoupon,
        isTestMode,
        setIsTestMode,
        customer,
        setCustomer,
        pincodeInfo,
        isPincodeLoading,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutStep,
        setCheckoutStep,
        paymentMethod,
        setPaymentMethod,
        pricing,
        currentOrder,
        setCurrentOrder,
        openCheckoutWithBundle,
        placeOrder,
        isWhatsAppDrawerOpen,
        setIsWhatsAppDrawerOpen,
        isShiprocketModalOpen,
        setIsShiprocketModalOpen,
        isEodConsoleOpen,
        setIsEodConsoleOpen,
        activeTrackingShipment,
        setActiveTrackingShipment,
        viewportMode,
        setViewportMode
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
