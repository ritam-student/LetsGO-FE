import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tailwindcss()],
  base: "/LetsGO-FE/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          react: ['react', 'react-dom'],
          swiper: ['swiper'],
        },
      },
    },
  },
})
