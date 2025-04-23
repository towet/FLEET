import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    // Ensure Google Generative AI is included in optimization
    include: ['@google/generative-ai']
  },
  build: {
    rollupOptions: {
      // No longer making the package external
    }
  }
});
