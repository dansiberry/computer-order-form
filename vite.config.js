import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // Add base path for hosting on GitHub pages repo
    base: `/computer-order-form/`,
    build: {
        // Set output dir for GitHub pages config
        outDir: './docs'
    }
});
