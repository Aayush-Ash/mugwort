import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes, { checkRazorpayConfig } from './routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount Razorpay API routes under /api
app.use('/api', apiRoutes);

// Root health check endpoint
app.get('/health', (req, res) => {
  const config = checkRazorpayConfig();
  res.json({
    status: 'OK',
    server: 'MORA · MORI Payment Server',
    time: new Date().toISOString(),
    razorpayConfigured: config.configured
  });
});

app.listen(PORT, () => {
  const config = checkRazorpayConfig();
  console.log(`\n=================================================`);
  console.log(`  MORA · MORI® Razorpay Server Running on :${PORT}`);
  console.log(`=================================================`);
  if (config.configured) {
    console.log(`  ✓ Razorpay Mode: ACTIVE (Key: ${config.keyId.substring(0, 10)}...)`);
  } else {
    console.log(`  ⚠ Razorpay Mode: PENDING CONFIGURATION`);
    console.log(`    ${config.hint}`);
  }
  console.log(`=================================================\n`);
});

export default app;
