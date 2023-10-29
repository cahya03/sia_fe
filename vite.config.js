import { defineConfig, loadEnv } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  

  return defineConfig({
    define: {
      'process.env': process.env
    },
    css: {
      postcss,
    },
    plugins: [
      nodePolyfills({
        // To exclude specific polyfills, add them to this list. Note: if include is provided, this has no effect
        exclude: [],
        // Whether to polyfill specific globals.
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true,
        },
        overrides: {
          // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
       
        },
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true,
      }),
      react(),
    ],
    resolve: {
      alias: [
        {
          find: /^~.+/,
          replacement: (val) => {
            return val.replace(/^~/, "");
          },
        },
      ],
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      }
    }
  })
}