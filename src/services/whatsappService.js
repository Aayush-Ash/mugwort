// Automated WhatsApp Cart Recovery & Order Notification Service

export class WhatsAppService {
  constructor() {
    this.storageKey = 'mugwort_whatsapp_triggers';
    this.phoneKey = 'mugwort_lead_phone';
    this.inMemoryTriggers = [];
    this.inMemoryLead = null;
  }

  // Save lead phone / details as user types into checkout
  saveLead(lead) {
    if (!lead || !lead.phone) return;
    const payload = {
      ...lead,
      updatedAt: new Date().toISOString()
    };
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.phoneKey, JSON.stringify(payload));
      } catch (e) {}
    } else {
      this.inMemoryLead = payload;
    }
  }

  getLead() {
    if (typeof localStorage !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem(this.phoneKey) || 'null');
      } catch {
        return null;
      }
    }
    return this.inMemoryLead;
  }

  // Generate automated recovery messages
  getTemplate15MinReminder(customer, bundle) {
    const name = customer?.name?.trim() || 'Friend';
    const bundleName = bundle?.name || 'Mugwort Herbal Knee Relief Pack';
    return {
      type: '15_MIN_REMINDER',
      title: '15-Min Cart Abandonment Reminder',
      triggerCondition: 'Triggered 15 mins after cart abandoned without checkout',
      message: `Hi ${name}! 🌿 We noticed you left your *${bundleName}* in your cart.\n\nChronic knee stiffness and joint pain shouldn't wait. Our current Ayurvedic batch is running low due to high demand.\n\nTap the link below to resume your order and get *FREE Express Delivery* across India:\n👉 https://mugwort.in/checkout?ref=wa15m\n\nNeed help? Reply *HELP* to speak with our Ayurvedic wellness advisor!`,
      rawText: `Hi ${name}! 🌿 We noticed you left your ${bundleName} in your cart. Tap here to resume: https://mugwort.in/checkout?ref=wa15m`
    };
  }

  getTemplate4HourOffer(customer, bundle) {
    const name = customer?.name?.trim() || 'Friend';
    return {
      type: '4_HOUR_RELIEF50',
      title: '4-Hour Exclusive ₹50 OFF Coupon (RELIEF50)',
      triggerCondition: 'Triggered 4 hours after initial abandonment if still unpurchased',
      message: `Special ₹50 OFF for ${name}! 🎁\n\nWe really want you to experience pain-free walking and active knees again. Use VIP coupon code *RELIEF50* to claim an extra ₹50 instant discount on any bundle!\n\n✅ 1-Click UPI & Verified COD Available\n✅ 8-Hour Deep Moxibustion Heat\n✅ 7-Day Money-Back Comfort Guarantee\n\nClaim your ₹50 OFF now (Valid for next 2 hours only):\n👉 https://mugwort.in/checkout?coupon=RELIEF50&ref=wa4h`,
      rawText: `Special ₹50 OFF for ${name}! Use code RELIEF50 to claim your Mugwort Knee Relief Pack + Free Shipping: https://mugwort.in/checkout?coupon=RELIEF50&ref=wa4h`
    };
  }

  getTemplateOrderConfirmation(orderData) {
    const { orderId, customer, bundle, product, paymentMethod, awb, totalAmount } = orderData;
    const name = customer?.name?.trim() || 'Valued Customer';
    const productName = bundle?.name || product?.name || 'MORA · MORI® Muscle Tapper';
    return {
      type: 'ORDER_CONFIRMED',
      title: 'Order Confirmation & Courier Tracking',
      triggerCondition: 'Triggered immediately upon successful UPI or COD placement',
      message: `🎉 *Order Confirmed! # ${orderId}*\n\nNamaste ${name}! Your order for *${productName}* (Amount: ₹${totalAmount}) has been verified.\n\n📦 *Courier Partner:* ${orderData.courier || 'Blue Dart / Delhivery'}\n🚚 *AWB Tracking #:* ${awb || 'Generating'}\n📍 *Dispatch Hub:* Haryana Central Warehouse (Next 24 Hrs)\n\nTrack your live delivery status in real-time:\n👉 https://mugwort.in/track/${orderId}\n\nThank you for choosing Mugwort Herbal Therapy! 🌿`,
      rawText: `Order #${orderId} Confirmed! Amount: ₹${totalAmount}. Courier AWB: ${awb}. Track: https://mugwort.in/track/${orderId}`
    };
  }

  // Trigger and record a notification event
  recordTrigger(triggerData) {
    const existing = this.getTriggers();
    const event = {
      id: `WAT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      date: new Date().toLocaleDateString('en-IN'),
      status: 'SENT',
      ...triggerData
    };
    existing.unshift(event);
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(existing.slice(0, 30)));
      } catch (e) {}
    } else {
      this.inMemoryTriggers = existing.slice(0, 30);
    }
    return event;
  }

  getTriggers() {
    if (typeof localStorage !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      } catch {
        return [];
      }
    }
    return this.inMemoryTriggers;
  }

  clearTriggers() {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.removeItem(this.storageKey);
      } catch (e) {}
    }
    this.inMemoryTriggers = [];
  }

  // Create a real WhatsApp Web / App link for user mobile testing
  createDirectWaLink(phone, message) {
    const cleanPhone = String(phone || '').replace(/[^0-9]/g, '');
    const targetPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
  }
}

export const whatsapp = new WhatsAppService();
