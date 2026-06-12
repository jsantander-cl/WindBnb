import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  // SOLUCIÓN PARA PRODUCCIÓN: Asegura que todos los archivos compilen con rutas relativas correctas
  base: './',
  plugins: [
    tailwindcss(),
    copy({
      targets: [
        // Asegúrate de que el archivo que copias coincida con el nombre real 'stays.json'
        { src: 'stays.json', dest: 'dist' }
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
