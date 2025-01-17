import { defineConfig } from 'vite';

export default defineConfig({
    optimizeDeps: {
        include: ['theblockchainapi'],
        base: '/sol-scan-ai',// Add the package to optimize CommonJS support
    },
});
