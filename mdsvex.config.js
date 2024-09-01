import { defineMDSveXConfig as defineConfig } from 'mdsvex';
// import { defineConfig } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// /** @type {import('mdsvex').MdsvexOptions} */

const config = defineConfig({
	//? extensions: string[];
	extensions: ['.svelte.md', '.md', '.svx'],
	//? smartypants: boolean | smartypantsOptions;
	//? layout: string | { [name: string]: string };
	//? remarkPlugins: Array<plugin> | Array<[plugin, plugin_options]>;
	//? rehypePlugins: Array<plugin> | Array<[plugin, plugin_options]>;
	//? highlight: { highlighter: Function, alias: { [alias]: lang } };
	//? frontmatter: { parse: Function; marker: string };
	// highlight: {
	// 	highlighter: async (code, lang = 'text') => {
	// 		const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
	// 		return `{@html \`${html}\` }`;
	// 	}
	// },
	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [],
	rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
});

export default config;
