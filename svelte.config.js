import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	//? Refer to: https://mdsvex.pngwn.io/docs#use-it
	extensions: ['.svelte', '.svx', '.md'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			// extensions: string[];
			extensions: ['.svx', '.md']
			// smartypants: boolean | smartypantsOptions;
			// layout: string | { [name: string]: string };
			// remarkPlugins: Array<plugin> | Array<[plugin, plugin_options]>;
			// rehypePlugins: Array<plugin> | Array<[plugin, plugin_options]>;
			// highlight: { highlighter: Function, alias: { [alias]: lang } };
			// frontmatter: { parse: Function; marker: string };
		})
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
