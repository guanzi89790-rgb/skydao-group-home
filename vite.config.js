import { copyFileSync, cpSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'

const sharedAssetPrefix = '/pages/shared/assets/'
const sharedAssetPattern = /\/pages\/shared\/assets\/([^"'`\s)?#]+?\.(?:png|jpe?g|webp|svg|mp4|ico))/gi

export default defineConfig({
  plugins: [
    {
      name: 'copy-independent-page-assets',
      writeBundle(options, bundle) {
        const outputDir = options.dir || resolve(import.meta.dirname, 'editable-dist')

        const referencedSharedAssets = new Set()
        for (const output of Object.values(bundle)) {
          const content = output.type === 'chunk'
            ? output.code
            : typeof output.source === 'string'
              ? output.source
              : output.source?.toString()

          if (!content?.includes(sharedAssetPrefix)) continue
          for (const match of content.matchAll(sharedAssetPattern)) {
            referencedSharedAssets.add(decodeURIComponent(match[1]))
          }
        }

        for (const relativePath of referencedSharedAssets) {
          if (relativePath.includes('..')) throw new Error(`Unsafe shared asset path: ${relativePath}`)

          const sourcePath = resolve(import.meta.dirname, 'pages', 'shared', 'assets', relativePath)
          if (!existsSync(sourcePath)) throw new Error(`Missing shared asset: ${relativePath}`)

          const targetPath = resolve(outputDir, 'pages', 'shared', 'assets', relativePath)
          mkdirSync(dirname(targetPath), { recursive: true })
          copyFileSync(sourcePath, targetPath)
        }

        cpSync(
          resolve(import.meta.dirname, 'pages', 'down', 'assets'),
          resolve(outputDir, 'pages', 'down', 'assets'),
          { recursive: true },
        )
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
