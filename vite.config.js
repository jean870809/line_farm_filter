import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/line_farm_filter/',
  server: {
    fs: {
      deny: [
        'src/assets/roles/myenv'
      ]
    }
  }
})
