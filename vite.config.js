import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: {
    port: 5173,
    strictPort: false, // let Vite pick another free port if 5173 is busy
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
