// vite.config.ts

import reactStack from 'hono-vite-react-stack'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'


export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    reactStack(),
    tailwindcss(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
  }
})
