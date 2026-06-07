// ============================================
// PROSTRUCTURE ENGINEERING LTD
// vite.config.js — path aliases for clean imports
// ============================================
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@':          path.resolve(__dirname, './src'),
      '@assets':    path.resolve(__dirname, './src/assets'),
      '@components':path.resolve(__dirname, './src/components'),
      '@sections':  path.resolve(__dirname, './src/sections'),
      '@hooks':     path.resolve(__dirname, './src/hooks'),
      '@data':      path.resolve(__dirname, './src/data'),
      '@styles':    path.resolve(__dirname, './src/styles'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@utils':     path.resolve(__dirname, './src/utils'),
      '@context':   path.resolve(__dirname, './src/context'),
    },
  },
})
