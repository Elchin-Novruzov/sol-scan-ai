import { defineConfig } from 'vite';

export default defineConfig({
    optimizeDeps: {
        include: ['theblockchainapi'], // Add the package to optimize CommonJS support
    },
});
