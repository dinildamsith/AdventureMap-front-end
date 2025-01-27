import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',  // This makes it accessible externally
    port: 2005,       // You can specify the port if needed
  },
  plugins: [react()],
})
