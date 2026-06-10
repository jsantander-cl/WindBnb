import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  // base: './', (posible solución para el error de las rutas relativas en producción)
  plugins: [
    tailwindcss(),
    copy({
      targets: [
        { src: 'data.json', dest: 'dist' }
      ],
      hook: 'writeBundle'
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})
