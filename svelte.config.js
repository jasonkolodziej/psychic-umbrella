import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	//? Refer to: https://mdsvex.pngwn.io/docs#use-it
	// extensions: ['.svelte', '.svx', '.md'],
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],

	kit: {
		alias: {
			$components: 'src/lib/components',
			$mdsvexPages: 'src/pages'
		},
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		// adapter: adapter()
		adapter: adapter()
		// {
		// 	// default options are shown
		// 	// out: 'build',
		// 	pages: 'build',
		// 	assets: 'build'
		// 	// workers: true,
		// }
	}
};

export default config;
