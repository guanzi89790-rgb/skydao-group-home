import { cpSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const pageNames = ['home', 'central-gate', 'physical-ai', 'wallet', 'about', 'down']

export default defineConfig({
  plugins: [
    {
      name: 'copy-independent-page-assets',
      writeBundle(options) {
        const outputDir = options.dir || resolve(import.meta.dirname, 'editable-dist')
        for (const page of pageNames) {
          cpSync(
            resolve(import.meta.dirname, 'pages', page, 'assets'),
            resolve(outputDir, 'pages', page, 'assets'),
            { recursive: true },
          )
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        centralGate: resolve(import.meta.dirname, 'central-gate/index.html'),
        physicalAI: resolve(import.meta.dirname, 'physical-ai/index.html'),
        wallet: resolve(import.meta.dirname, 'wallet/index.html'),
        about: resolve(import.meta.dirname, 'about/index.html'),
        down: resolve(import.meta.dirname, 'down/index.html'),
      },
    },
  },
})
