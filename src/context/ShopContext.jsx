import React, { createContext, useContext, useState, useEffect } from 'react';
import { RITUAL_PRODUCTS } from '../services/bundlesData';
import { lookupPincode } from '../services/pincodeService';
import { shiprocket } from '../services/shiprocketService';
import { whatsapp } from '../services/whatsappService';
import confetti from 'canvas-confetti';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // 1. Product selection (Default: The Complete Ritual Set - $78)
  const [selectedProductId, setSelectedProductId] = useState(2);
  const selectedProduct = RITUAL_PRODUCTS.find(p => p.id === selectedProductId) || RITUAL_PRODUCTS[1];

  // Selected Color variant
  const [selectedColor, setSelectedColor] = useState('Olive Green');

  // Currency Mode (Default '$' as in mockup; supports INR toggle)
  const [currency, setCurrency] = useState('$');

  // 2. Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // 3. Test Mode (₹1 or $1 Test Order for evaluation)
  const [isTestMode, setIsTestMode] = useState(false);

  // 4. Modals
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('details');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [isRitualVideoOpen, setIsRitualVideoOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const openVideoModal = (index = 0) => {
    setActiveVideoIndex(index);
    setIsRitualVideoOpen(true);
  };
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
  const [isWhatsAppDrawerOpen, setIsWhatsAppDrawerOpen] = useState(false);
  const [isShiprocketModalOpen, setIsShiprocketModalOpen] = useState(false);
  const [isEodConsoleOpen, setIsEodConsoleOpen] = useState(false);

  // 5. Customer info
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '110001',
    city: 'New Delhi',
    state: 'Delhi'
  });
  const [pincodeInfo, setPincodeInfo] = useState({
    serviceable: true,
    city: 'New Delhi',
    state: 'Delhi',
    days: '1–2 Days',
    courier: 'BlueDart Air Priority'
  });
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);

  // 6. Placed order
  const [currentOrder, setCurrentOrder] = useState(null);
  const [activeTrackingShipment, setActiveTrackingShipment] = useState(null);

  // 7. Device Viewport Mode ('desktop' | 'mobile-iphone' | 'mobile-galaxy')
  const [viewportMode, setViewportMode] = useState('desktop');

  // Check URL coupon parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCoupon = params.get('coupon');
    if (urlCoupon) {
      applyCouponCode(urlCoupon);
    }
  }, []);

  // Auto pincode detection
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

  // Pricing calculation
  const calculatePricing = () => {
    const baseMrp = selectedProduct.mrp;
    const basePrice = selectedProduct.price;
    const baseSavings = baseMrp - basePrice;

    // Shipping
    const shipping = 0; // Free worldwide & pan-India shipping for MORA·MORI rituals

    // Coupon discount
    let couponDiscount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.code === 'RELIEF50' || appliedCoupon.code === 'RITUAL15') {
        couponDiscount = currency === '$' ? 12 : 50;
      } else if (appliedCoupon.code === 'RELIEF10' || appliedCoupon.code === 'RITUAL10') {
        couponDiscount = Math.round(basePrice * 0.10);
      }
    }

    // Prepaid discount
    const prepaidDiscount = paymentMethod === 'upi' ? (currency === '$' ? 4 : 30) : 0;

    let calculatedTotal = Math.max(1, basePrice + shipping - couponDiscount - prepaidDiscount);
    const finalAmount = isTestMode ? (currency === '$' ? 1 : 1) : calculatedTotal;
    const totalSavings = baseMrp - finalAmount;

    return {
      mrp: baseMrp,
      salePrice: basePrice,
      baseSavings,
      shipping,
      couponDiscount,
      prepaidDiscount,
      finalAmount,
      totalSavings,
      currency,
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

    if (code === 'RELIEF50' || code === 'RITUAL15') {
      setAppliedCoupon({
        code,
        discount: currency === '$' ? 12 : 50,
        desc: '15% Welcome Ritual Discount Applied'
      });
      setCouponCode(code);
      return true;
    } else if (code === 'RELIEF10' || code === 'RITUAL10') {
      setAppliedCoupon({
        code,
        discountPercent: 10,
        desc: '10% Instant Ritual Discount Applied'
      });
      setCouponCode(code);
      return true;
    } else {
      setCouponError('Invalid code. Try RITUAL15 or RELIEF50');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  // Open checkout with specific product
  const openCheckoutWithProduct = (productId) => {
    if (productId) setSelectedProductId(productId);
    setCheckoutStep('details');
    setIsCheckoutOpen(true);
  };

  // Place order
  const placeOrder = async (method = paymentMethod) => {
    const orderId = `MORA-${Math.floor(100000 + Math.random() * 900000)}`;
    const currentPricing = calculatePricing();

    const shipment = await shiprocket.createShipment({
      orderId,
      customer,
      items: [
        {
          name: `${selectedProduct.name} (${selectedColor})`,
          quantity: 1,
          price: currentPricing.finalAmount
        }
      ],
      paymentMethod: method,
      totalAmount: currentPricing.finalAmount,
      pincodeDetails: pincodeInfo
    });

    const orderObj = {
      orderId,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      customer: { ...customer },
      product: { ...selectedProduct, selectedColor },
      pricing: { ...currentPricing },
      paymentMethod: method,
      shipment,
      status: 'CONFIRMED'
    };

    setCurrentOrder(orderObj);
    setActiveTrackingShipment(shipment);

    // Automated WhatsApp trigger
    const waConfirmation = whatsapp.getTemplateOrderConfirmation({
      orderId,
      customer,
      bundle: selectedProduct,
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

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setCheckoutStep('success');
    return orderObj;
  };

  return (
    <ShopContext.Provider
      value={{
        products: RITUAL_PRODUCTS,
        selectedProductId,
        setSelectedProductId,
        selectedProduct,
        selectedColor,
        setSelectedColor,
        currency,
        setCurrency,
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
        openCheckoutWithProduct,
        placeOrder,
        isRitualVideoOpen,
        setIsRitualVideoOpen,
        activeVideoIndex,
        setActiveVideoIndex,
        openVideoModal,
        isIngredientsOpen,
        setIsIngredientsOpen,
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
