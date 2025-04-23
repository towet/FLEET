import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // Default jsx runtime configuration
    jsxRuntime: 'automatic'
  })],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Ensure proper module resolution in the build
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
