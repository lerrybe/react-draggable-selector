import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), dts(), libCss()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'react-draggable-selector',
      fileName: 'index',
      formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
