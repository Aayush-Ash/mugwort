# 💳 Razorpay Payment Gateway — Setup & Handover Guide

This website is equipped with a zero-code plug-and-play **Razorpay Payment Gateway** integration. As the website owner, you can connect your own Razorpay account by adding your API keys to the `.env` file — **without modifying any application code**.

---

## ⚡ Quick 3-Step Setup

### Step 1: Generate Your API Keys from Razorpay Dashboard
1. Log in to your [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. In the left navigation, go to **Settings** → **API Keys** (or direct link: [https://dashboard.razorpay.com/app/keys](https://dashboard.razorpay.com/app/keys)).
3. Choose either **Test Mode** (for testing without real money) or **Live Mode** (to collect real payments):
   - Toggle the switch at the top to **Test** or **Live**.
   - Click **Generate Key** (or **Regenerate Key** if you already have one).
4. You will see:
   - **Key ID** (starts with `rzp_test_...` or `rzp_live_...`)
   - **Key Secret** (a confidential alphanumeric string)
5. Keep this window open or copy both values.

---

### Step 2: Add Keys to Your `.env` File
In your project root directory:

1. If you haven't created a `.env` file yet, copy `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *(On Windows PowerShell: `Copy-Item .env.example .env`)*

2. Open `.env` and paste your actual keys:
   ```env
   # Razorpay API Credentials
   RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID_HERE
   RAZORPAY_KEY_SECRET=YOUR_ACTUAL_KEY_SECRET_HERE

   # Server Port
   PORT=5000
   ```

> [!IMPORTANT]
> - Never commit your `.env` file to GitHub or share your `RAZORPAY_KEY_SECRET` publicly.
> - The `.env` file is already listed in `.gitignore` to protect your credentials.

---

### Step 3: Run the Application

To run the development server with live Razorpay endpoints:
```bash
npm run dev
```

Or to run both the standalone production API server and frontend concurrently:
```bash
npm run dev:all
```

When started, the terminal will indicate the Razorpay status:
```
=================================================
  MORA · MORI® Razorpay Server Running on :5000
=================================================
  ✓ Razorpay Mode: ACTIVE (Key: rzp_test_1...)
=================================================
```

---

## 🧪 Testing Your Payment Flow

### Using ₹1 Test Mode
1. In the checkout modal, under the payment options, you can toggle **"₹1 Live Payment Test Mode"** ON.
2. This temporarily sets the charge to ₹1.00 so you can verify the end-to-end payment without paying full product prices.

### Using Razorpay Test Cards & UPI (Test Mode)
In Test Mode (`rzp_test_...`), Razorpay does not charge real bank accounts. You can use any of the official test payment credentials:

| Payment Method | Test Detail |
| :--- | :--- |
| **Test Cards** | Card Number: `4111 1111 1111 1111`<br>Expiry: Any future date (e.g., `12/28`)<br>CVV: `123`<br>OTP: `123456` |
| **UPI** | Virtual Payment Address: `success@razorpay` |
| **NetBanking** | Select any bank (e.g. HDFC, SBI) and click **Success** on the mock bank authorization screen |

---

## 🔄 Moving from Test Mode to Live Payments

When your Razorpay KYC verification is approved and you are ready to accept real customer payments:

1. Switch your Razorpay Dashboard toggle to **Live Mode**.
2. Go to **Settings** → **API Keys** and generate **Live Keys**.
3. In your `.env` file, replace the test keys with your live keys:
   ```env
   RAZORPAY_KEY_ID=rzp_live_...
   RAZORPAY_KEY_SECRET=...
   ```
4. Restart your server. The website will immediately start processing real customer orders!

---

## 🛡️ Security Architecture

- **Zero Hardcoded Keys**: No API keys or secrets exist in the frontend source code.
- **Server-Side Order Creation**: Orders are created securely via `POST /api/create-order` in paise (`amount * 100`).
- **Cryptographic Signature Verification**: After payment, the frontend sends the response to `POST /api/verify-payment`. The backend computes the HMAC-SHA256 signature using `crypto.timingSafeEqual` to prevent replay and timing attacks.
- **Auto-Config Check**: If keys are missing or still set to placeholder values, the backend returns clear descriptive errors rather than failing silently.

---

## 📞 Support & Documentation
- [Razorpay Official Documentation](https://razorpay.com/docs/)
- [Razorpay Test Card Credentials](https://razorpay.com/docs/payments/payments/test-card-details/)
- [Razorpay Error Codes Reference](https://razorpay.com/docs/api/errors/)
