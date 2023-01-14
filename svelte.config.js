//import adapter from '@sveltejs/adapter-auto';
import staticAdapter from '@sveltejs/adapter-static';
import chromeAdapter from 'sveltekit-adapter-chrome-extension';
import {vitePreprocess} from '@sveltejs/kit/vite';
import preprocess from "svelte-preprocess";

const gh = process.env.BUILD_MODE === 'gh';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: [
        vitePreprocess(),
        preprocess({
            postcss: true,
        })
    ],

    onwarn: (warning, handler) => {
        if (warning.code.startsWith('a11y-')) {
            return;
        }
        handler(warning);
    },

    kit: {
        paths: {
            base: gh ? '/wdt-svelte' : '',
        },
        adapter: staticAdapter(),
        appDir: 'app',
    }
};

export default config;
