// 1-Click UPI Deep Linking & Dynamic QR Code Engine for Indian D2C Checkout
import QRCode from 'qrcode';

export const UPI_CONFIG = {
  vpa: 'mugwortwellness@icici',
  merchantName: 'Mugwort Herbal Wellness India',
  currency: 'INR'
};

export const POPULAR_UPI_APPS = [
  {
    id: 'gpay',
    name: 'Google Pay',
    scheme: 'tez://upi/pay',
    fallback: 'upi://pay',
    iconColor: 'bg-white text-blue-600 border border-neutral-200',
    popularBadge: 'Popular'
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    scheme: 'phonepe://pay',
    fallback: 'upi://pay',
    iconColor: 'bg-purple-700 text-white',
    popularBadge: 'Most Used'
  },
  {
    id: 'paytm',
    name: 'Paytm UPI',
    scheme: 'paytmmp://pay',
    fallback: 'upi://pay',
    iconColor: 'bg-cyan-500 text-white'
  },
  {
    id: 'cred',
    name: 'CRED UPI',
    scheme: 'cred://pay',
    fallback: 'upi://pay',
    iconColor: 'bg-neutral-900 text-white',
    popularBadge: 'Cashback'
  },
  {
    id: 'bhim',
    name: 'BHIM UPI',
    scheme: 'upi://pay',
    fallback: 'upi://pay',
    iconColor: 'bg-amber-600 text-white'
  }
];

export function buildUpiUri({ vpa = UPI_CONFIG.vpa, name = UPI_CONFIG.merchantName, amount, orderId, note }) {
  const transactionNote = note || `Order_${orderId}`;
  const params = new URLSearchParams({
    pa: vpa,
    pn: name,
    am: Number(amount).toFixed(2),
    cu: 'INR',
    tn: transactionNote,
    tr: orderId
  });
  return `upi://pay?${params.toString()}`;
}

export function buildAppSpecificUri(appId, upiPayload) {
  const baseUri = buildUpiUri(upiPayload);
  const app = POPULAR_UPI_APPS.find(a => a.id === appId);
  if (!app) return baseUri;
  
  if (app.scheme.startsWith('upi://')) {
    return baseUri;
  }
  // Replace upi:// with app custom scheme
  return baseUri.replace('upi://', app.scheme.replace('/pay', '') + '/');
}

export async function generateUpiQrCode(upiUri) {
  try {
    const dataUrl = await QRCode.toDataURL(upiUri, {
      width: 280,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    });
    return dataUrl;
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return null;
  }
}
