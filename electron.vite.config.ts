import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/preload/main/preload.ts'),
          orelo: resolve(__dirname, 'src/preload/orelo/preload.ts'),
          tipa: resolve(__dirname, 'src/preload/tipa/preload.ts'),
          oreloView: resolve(__dirname, 'src/preload/orelo/orelo.ts'),
          tipaView: resolve(__dirname, 'src/preload/tipa/tipa.ts')
        }
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
