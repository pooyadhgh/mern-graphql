/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    watch: false,
    setupFiles: './src/setupTest.ts',
  },
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, './src/types.ts'),
      '@utils': path.resolve(__dirname, './src/utils/index.ts'),
      '@graphql': path.resolve(__dirname, './src/graphql'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
});
