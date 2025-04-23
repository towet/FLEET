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
    },
    rollupOptions: {
      // Explicitly mark @google/generative-ai as external
      external: ['@google/generative-ai'],
      output: {
        // Provide global variable name for the external package
        globals: {
          '@google/generative-ai': 'GoogleGenerativeAI'
        }
      }
    }
  }
});
