import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@data': path.resolve(__dirname, './src/data'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@router': path.resolve(__dirname, './src/router'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@icons': path.resolve(__dirname, './src/icons'),
      '@service': path.resolve(__dirname, './src/service'),
    }
  },
})
