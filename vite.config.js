import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' so the build runs from any static host without path config.
export default defineConfig({
  base: './',
  plugins: [react()],
})
