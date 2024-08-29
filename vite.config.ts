import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
// import { extname } from 'node:path';
//? Import mdsvex and rehype plugins
// import { mdsvex } from 'mdsvex';
// import slug from 'rehype-slug';
// import link from 'rehype-autolink-headings';

// function mdsvex_transform() {
// 	return {
// 		async transform(code, id) {
// 			if (extname(id) !== '.svtext') return;

// 			const c = (
// 				await mdsvex({
// 					highlight: {
// 						alias: {
// 							ts: 'typescript',
// 							mdx: 'markdown',
// 							svelte: 'svelte',
// 							svx: 'mdx',
// 							mdsvex: 'svx',
// 							sig: 'ts'
// 						}
// 					},
// 					extension: '.svtext',
// 					rehypePlugins: [slug, link]
// 				}).markup({ content: code, filename: id })
// 			).code;
// 			return `export default \`${c.replace(/`/g, '\\`').trim()}\`;`;
// 		}
// 	};
// }

export default defineConfig({
	plugins: [
		// mdsvex_transform(),
		sveltekit()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
