import {fileURLToPath} from 'node:url'
import {mergeConfig} from 'vite'
import {configDefaults, defineConfig} from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      css:           true,
      environment:   'jsdom',
      exclude:       [...configDefaults.exclude],
      root:          fileURLToPath(new URL('./', import.meta.url)),
      setupFiles:    './src/test/setup.js',
      transformMode: {
        web: [/\.[jt]sx$/]
      }
    }
  })
)
