import type { SvelteComponent } from 'svelte';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { BlogPost } from '$lib/filtering/blog';

export const load: PageServerLoad = async (event) => {
	const pages = import.meta.glob('../../../pages/**/*.svelte.md');
	// const pages = import.meta.glob('$mdsvexPages/**/*.svelte.md');
	const path = event.url.pathname.slice(base.length).slice(1);
	const match = pages[`../../../pages/${path}.svelte.md`];
	console.log('pages', pages, 'path', path, 'match', match);
	// const match = pages[`$mdsvexPages/${path}.svelte.md`];
	if (!match) throw error(404, 'Not found');

	const Markdown = (await match()) as {
		default: SvelteComponent;
		metadata: Record<string, unknown>;
	};

	const content = Markdown.default.render();
	const metadata = Markdown.metadata;
	if (path.includes('news')) {
		let blogPost: BlogPost = metadata;
		console.log('Blog post', blogPost);
		blogPost.content = content.html;
		return {
			content,
			metadata,
			blogPost
		};
	}
	console.log('Markdown metadata', metadata, 'Markdown content', content);

	return {
		content,
		metadata,
		blogPost: null
	};
};
