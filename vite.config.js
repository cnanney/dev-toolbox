import {sveltekit} from '@sveltejs/kit/vite'
import * as path from 'path'

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
    },
}

export default config
