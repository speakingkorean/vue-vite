import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/vue-vite/', // https://youtu.be/yo2bMGnIKE8?t=95
  plugins: [vue()],
})
