import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Репозиторий публикуется на GitHub Pages как project site: /photo/
  base: '/photo/',
})
