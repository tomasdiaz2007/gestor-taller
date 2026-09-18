import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Incluye todos los assets del build en el precache
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'icons.svg'],
      manifest: {
        name: 'AutoWare - Gestión de Taller',
        short_name: 'AutoWare',
        description: 'Sistema de gestión para taller mecánico — vehículos, órdenes de trabajo, diagnóstico de daños y control de stock.',
        theme_color: '#536f7a',
        background_color: '#f4f5f6',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Estrategia de caché para la app shell (HTML, JS, CSS)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // Rutas que van a usar NetworkFirst (intentan red, caen a caché)
        runtimeCaching: [
          {
            // Peticiones a Firebase Firestore/Auth — NetworkFirst
            urlPattern: /^https:\/\/.*\.googleapis\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'firebase-api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 horas
              },
              networkTimeoutSeconds: 5,
            },
          },
          {
            // Peticiones a Firebase Storage
            urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'firebase-storage-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 días
              },
            },
          },
        ],
      },
      // Muestra el prompt de "nueva versión disponible" en devtools
      devOptions: {
        enabled: true,
      },
    }),
  ],
})

