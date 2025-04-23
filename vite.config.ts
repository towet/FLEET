import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // Add this to ensure JSX Runtime is properly handled
    jsxRuntime: 'automatic',
    jsxImportSource: 'react'
  })],
  resolve: {
    alias: {
      // Use simple aliases that don't require path resolution
      'react': './node_modules/react',
      'react-dom': './node_modules/react-dom'
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    // Ensure Google Generative AI is included in optimization
    include: ['@google/generative-ai', 'react/jsx-runtime', 'react', 'react-dom']
  },
  build: {
    commonjsOptions: {
      // Add React and React DOM to the included packages
      include: [/node_modules\/(react|react-dom)\//],
    },
    rollupOptions: {
      // Explicitly include React and React DOM
      external: [],
    }
  }
});
