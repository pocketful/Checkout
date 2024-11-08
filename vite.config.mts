import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        additionalData: `
          @use "src/styles/colors" as *;
          @use "src/styles/typography" as *;
          @use "src/styles/sizes" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
