import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { contentPlugin } from './src/utils/vite-plugin-content';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), contentPlugin()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'ui-components': ['react-masonry-css', 'react-markdown', 'react-helmet-async'],
          'utils': ['lodash', 'clsx', 'tailwind-merge'],
        }
      }
    }
  }
});
