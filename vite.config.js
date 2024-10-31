import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion']
        }
      }
    },
    chunkSizeWarningLimit: 1500
  },
  server: {
    port: 3000,
    host: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'styled-components', 'framer-motion']
  }
})
