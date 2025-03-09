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
    outDir: "../../dist/frontend-challenges/projects/todo-app", // Ensure this is correct
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
