import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // Aceptar conexiones externas (necesario para Docker)
    port: 5173,       // Puerto fijo (debe coincidir con el mapeo en compose)
    strictPort: true, // Evita que Vite cambie el puerto si está ocupado
    watch: {
      usePolling: true // Necesario para detectar cambios en algunos sistemas
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})