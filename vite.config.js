import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import express from 'express';
import apiRoutes from './server/routes.js';

function razorpayApiDevPlugin() {
  const app = express();
  app.use(express.json());
  app.use('/api', apiRoutes);

  return {
    name: 'razorpay-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          app(req, res, next);
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    razorpayApiDevPlugin(),
  ],
  server: {
    port: 5173,
    host: true,
  },
});
