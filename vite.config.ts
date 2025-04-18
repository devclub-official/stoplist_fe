import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3300
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@api': resolve(__dirname, './src/api'),
      '@app': resolve(__dirname, './src/app'),
      '@asset': resolve(__dirname, './src/asset'),
      '@page': resolve(__dirname, './src/page'),
      '@style': resolve(__dirname, './src/style'),
      '@model': resolve(__dirname, './src/api/model'),
      '@service': resolve(__dirname, './src/api/service')
    }
  }
})