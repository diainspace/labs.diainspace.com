import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  base: '/assets/build/',
  build: {
    outDir: '../assets/build',
    emptyOutDir: true,
    manifest: true,
    rolldownOptions: { input: fileURLToPath(new URL('./src/main.tsx', import.meta.url)) },
  },
})
