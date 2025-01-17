import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Ensures relative paths for assets
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                analyze: './analyzeWallet.html',
                ranking: './ranking.html',
                achievements: './achievements.html',
            },
        },
    },
    optimizeDeps: {
        include: ['theblockchainapi'], // Add the package to optimize CommonJS support
    },
});
