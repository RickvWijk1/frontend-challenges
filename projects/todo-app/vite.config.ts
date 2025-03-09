import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/frontend-challenges/projects/todo-app/',
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    })
  ],
  build: {
    outDir: "../../dist/todo-app",  // Ensure build output goes to dist/
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
