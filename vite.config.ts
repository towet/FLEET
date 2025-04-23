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
    include: ['@google/generative-ai'] // Ensure Gemini API is pre-bundled
  },
  build: {
    // Ensure proper module resolution in the build
    commonjsOptions: {
      transformMixedEsModules: true
    },
    // Make sure we're not externalizing any modules that should be bundled
    rollupOptions: {
      external: []
    }
  },
  // Improve module resolution for npm packages
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  }
});
