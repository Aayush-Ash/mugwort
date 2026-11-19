// Shiprocket & NimbusPost Logistics Engine Integration

export const COURIER_PARTNERS = [
  { id: 'bluedart', name: 'Blue Dart Express (Air Priority)', rate: 68, rating: 4.8, etdDays: '1–2 Days', codSupport: true },
  { id: 'delhivery', name: 'Delhivery Surface Express', rate: 45, rating: 4.6, etdDays: '2–3 Days', codSupport: true },
  { id: 'xpressbees', name: 'Xpressbees Logistics', rate: 39, rating: 4.4, etdDays: '3–4 Days', codSupport: true },
  { id: 'shadowfax', name: 'Shadowfax Quick Delivery', rate: 42, rating: 4.5, etdDays: '2–3 Days', codSupport: true }
];

export class LogisticsService {
  constructor() {
    this.provider = 'shiprocket'; // 'shiprocket' | 'nimbuspost'
    this.apiKey = typeof localStorage !== 'undefined' ? (localStorage.getItem('logistics_api_key') || 'DEMO_SR_AUTH_TOKEN_SECURE') : 'DEMO_SR_AUTH_TOKEN_SECURE';
    this.isTestMode = true;
    this.inMemoryShipments = [];
  }

  setProvider(provider) {
    this.provider = provider;
  }

  // Create shipment with automatic AWB generation and courier allocation
  async createShipment({ orderId, customer, items, paymentMethod, totalAmount, pincodeDetails }) {
    // Generate realistic AWB
    const prefix = this.provider === 'shiprocket' ? 'SR' : 'NP';
    const courierCode = paymentMethod === 'upi' ? 'BLUEDART' : 'DELHIVERY';
    const randomSuffix = Math.floor(100000000 + Math.random() * 900000000);
    const awb = `${prefix}-${courierCode.substring(0, 3)}-${randomSuffix}`;
    const shipmentId = `SHP-${Math.floor(100000 + Math.random() * 900000)}`;

    const courier = paymentMethod === 'upi' 
      ? COURIER_PARTNERS[0] // Blue Dart Express priority for prepaid
      : COURIER_PARTNERS[1]; // Delhivery for COD

    const timestamp = new Date();
    const formattedDate = timestamp.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const shipmentData = {
      orderId,
      shipmentId,
      awb,
      courierPartner: courier.name,
      courierId: courier.id,
      provider: this.provider.toUpperCase(),
      status: 'MANIFESTED',
      statusLabel: 'Order Manifested & Courier Assigned',
      destination: `${pincodeDetails?.city || 'Gurugram'}, ${pincodeDetails?.state || 'Haryana'} - ${pincodeDetails?.pincode || '122001'}`,
      recipient: customer?.name || 'Customer',
      phone: customer?.phone || '9876543210',
      paymentMethod: (paymentMethod || 'UPI').toUpperCase(),
      codAmount: paymentMethod === 'cod' ? totalAmount : 0,
      weightKg: 0.35,
      pickupLocation: 'Mugwort India Central Warehouse, Sector 34, Gurugram Hub, Haryana - 122001',
      estimatedDelivery: pincodeDetails?.days || '2–3 Days',
      events: [
        {
          status: 'ORDER_PLACED',
          title: 'Order Placed & Payment Verified',
          desc: paymentMethod === 'upi' ? 'Prepaid UPI Confirmed. Priority Air Allocation.' : 'OTP-Verified COD Order Confirmed.',
          time: 'Just now',
          done: true
        },
        {
          status: 'MANIFEST_GENERATED',
          title: `AWB Generated via ${this.provider === 'shiprocket' ? 'Shiprocket' : 'NimbusPost'}`,
          desc: `AWB #${awb} allocated to ${courier.name}`,
          time: '1 min ago',
          done: true
        },
        {
          status: 'READY_FOR_PICKUP',
          title: 'Package Packed & Labeled at Central Warehouse',
          desc: 'Airtight heat-sealed pouch packed with quality seal.',
          time: 'Estimated within 4 hours',
          done: false
        },
        {
          status: 'IN_TRANSIT',
          title: 'Handed Over to Linehaul Hub',
          desc: `Moving towards ${pincodeDetails?.city || 'Destination Hub'}`,
          time: `Expected in ${pincodeDetails?.days?.split('–')[0] || '1'} days`,
          done: false
        },
        {
          status: 'DELIVERED',
          title: 'Delivered to Customer Doorstep',
          desc: `OTP confirmation upon physical handover at ${pincodeDetails?.pincode || '122001'}`,
          time: `Estimated ${pincodeDetails?.days || '2-3 Days'}`,
          done: false
        }
      ]
    };

    // Save in localStorage or memory
    if (typeof localStorage !== 'undefined') {
      try {
        const existingOrders = JSON.parse(localStorage.getItem('mugwort_shipments') || '[]');
        existingOrders.unshift(shipmentData);
        localStorage.setItem('mugwort_shipments', JSON.stringify(existingOrders.slice(0, 20)));
      } catch (e) {
        // safe fallback
      }
    } else {
      this.inMemoryShipments.unshift(shipmentData);
    }

    return shipmentData;
  }

  getShipmentByOrderId(orderId) {
    if (typeof localStorage !== 'undefined') {
      try {
        const existing = JSON.parse(localStorage.getItem('mugwort_shipments') || '[]');
        return existing.find(s => s.orderId === orderId) || null;
      } catch {
        return null;
      }
    }
    return this.inMemoryShipments.find(s => s.orderId === orderId) || null;
  }

  getAllShipments() {
    if (typeof localStorage !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem('mugwort_shipments') || '[]');
      } catch {
        return [];
      }
    }
    return this.inMemoryShipments;
  }
}

export const shiprocket = new LogisticsService();
