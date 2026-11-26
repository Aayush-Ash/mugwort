import express from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

/**
 * Checks if Razorpay keys are configured and not set to placeholder values.
 */
export function checkRazorpayConfig() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  const isInvalid = (val) => !val || val.includes('replace_with_your_key') || val.trim() === '';

  if (isInvalid(keyId) || isInvalid(keySecret)) {
    return {
      configured: false,
      message: 'Razorpay API credentials are not configured or still set to placeholder values in .env',
      hint: 'Please generate Test or Live keys in your Razorpay Dashboard (https://dashboard.razorpay.com/app/keys), add them to .env, and restart the server.',
      keyId: null
    };
  }

  return {
    configured: true,
    keyId: keyId.trim(),
    keySecret: keySecret.trim()
  };
}

/**
 * GET /api/payment-config
 * Checks whether Razorpay is configured so frontend can present setup status
 */
router.get('/payment-config', (req, res) => {
  const config = checkRazorpayConfig();
  res.json({
    configured: config.configured,
    keyId: config.configured ? config.keyId : null,
    message: config.message || 'Razorpay is active and configured'
  });
});

/**
 * POST /api/create-order
 * Creates a Razorpay Order in paise (INR)
 */
router.post('/create-order', async (req, res) => {
  try {
    const config = checkRazorpayConfig();

    if (!config.configured) {
      return res.status(503).json({
        success: false,
        error: 'RAZORPAY_KEYS_NOT_CONFIGURED',
        message: config.message,
        hint: config.hint
      });
    }

    const { amount, currency = 'INR', receipt, notes = {} } = req.body;

    // Validate amount
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_AMOUNT',
        message: 'A valid positive amount is required to create a payment order.'
      });
    }

    // Convert INR to Paise (e.g. ₹3999 -> 399900 paise)
    const amountInPaise = Math.round(numericAmount * 100);

    const razorpay = new Razorpay({
      key_id: config.keyId,
      key_secret: config.keySecret
    });

    const orderOptions = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: {
        platform: 'MORA_MORI_WEB',
        ...notes
      }
    };

    const order = await razorpay.orders.create(orderOptions);

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount, // in paise
      currency: order.currency,
      keyId: config.keyId, // directly returned so frontend has zero hardcoded keys
      receipt: order.receipt
    });
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    return res.status(500).json({
      success: false,
      error: 'ORDER_CREATION_FAILED',
      message: err.message || 'Failed to create Razorpay order'
    });
  }
});

/**
 * POST /api/verify-payment
 * Cryptographically verifies the HMAC-SHA256 signature using timingSafeEqual
 */
router.post('/verify-payment', (req, res) => {
  try {
    const config = checkRazorpayConfig();

    if (!config.configured) {
      return res.status(503).json({
        success: false,
        error: 'RAZORPAY_KEYS_NOT_CONFIGURED',
        message: config.message
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment verification parameters (razorpay_order_id, razorpay_payment_id, razorpay_signature).'
      });
    }

    // Generate expected HMAC-SHA256 signature
    const expectedSignature = crypto
      .createHmac('sha256', config.keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Secure timingSafeEqual comparison to prevent timing attacks
    const expectedBuffer = Buffer.from(expectedSignature, 'utf-8');
    const actualBuffer = Buffer.from(razorpay_signature, 'utf-8');

    if (
      expectedBuffer.length !== actualBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, actualBuffer)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Payment verified successfully
    return res.status(200).json({
      success: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      message: 'Payment verified successfully'
    });
  } catch (err) {
    console.error('Error verifying Razorpay payment:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify payment signature'
    });
  }
});

export default router;
