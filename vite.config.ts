import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/horizon-collective/' : '/',
  plugins: [
    react(),
    {
      name: 'spa-404-fallback',
      closeBundle() {
        const index = resolve(__dirname, 'dist/index.html');
        const fallback = resolve(__dirname, 'dist/404.html');
        if (existsSync(index)) copyFileSync(index, fallback);
      },
    },
  ],
});
