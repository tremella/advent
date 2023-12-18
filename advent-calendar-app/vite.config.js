import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/advent/',
  plugins: [react()],
  build: {
    // Adjust the chunk size warning limit
    chunkSizeWarningLimit: 1000, // size in KB

    // Customize Rollup's output options
    rollupOptions: {
      output: {
        // Configure manual chunks to optimize chunking
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const directories = id.split('/');
            const name = directories[directories.lastIndexOf('node_modules') + 1];
            return `vendor_${name}`;
          }
        }
      }
    }
  }
})