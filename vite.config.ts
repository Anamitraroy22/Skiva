// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // Automatically resolves path aliases from tsconfig.json
    visualizer({
      open: true,         // Opens browser with bundle report
      filename: 'dist/stats.html', // Optional: change output file location
      template: 'treemap', // Other option: sunburst, network
    }),
  ],
  build: {
    chunkSizeWarningLimit: 2000, // Avoid warnings for large chunks
    sourcemap: false,            // Disable unless debugging
  },
  server: {
    fs: {
      strict: false, // Allows symlinks outside root
    },
  },
});
