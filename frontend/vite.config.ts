import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Keep in sync with the paths entry in tsconfig.json.
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    // Listen on all interfaces so the DDEV router can reach the dev server;
    // the default 127.0.0.1 would only be reachable inside the container.
    host: '0.0.0.0',
    port: 5173,
    // Fail instead of silently switching ports, which the router does not know about.
    strictPort: true,
    allowedHosts: ['.ddev.site'],
    // Public URL of the dev server, used for generated asset URLs.
    origin: 'https://kingdom-prototype.ddev.site:5173',
    hmr: {
      // The browser talks to the router over TLS, so the HMR socket must use wss.
      protocol: 'wss',
      host: 'kingdom-prototype.ddev.site',
      clientPort: 5173,
    },
  },
})
