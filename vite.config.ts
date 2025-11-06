import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This makes process.env.API_KEY available in the client-side code
    // by replacing it with the value of VITE_API_KEY at build time.
    // In Vercel, you should set an environment variable named VITE_API_KEY.
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY),
  },
});
