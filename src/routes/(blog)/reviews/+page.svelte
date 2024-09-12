<script lang="ts">
	import Article from '$components/using/flowbite/blog/ui/article/article.svelte';
	import Post from '$components/using/flowbite/blog/ui/post/Post.svelte';
	import { SectionBlog } from '$components/using/flowbite/blog/ui/section';
	import type { ComponentProps } from 'svelte';
	import blog from '$lib/data/blog-example.json';
	import { VideoCameraSolid } from 'flowbite-svelte-icons';
	/**
		** Pages can break out of the current layout hierarchy on a route-by-route basis. 
		** Suppose we have an /item/[id]/embed route inside the (app) group from the previous example:
		src/routes/
		├ (app)/
		│ ├ item/
		│ │ ├ [id]/
		│ │ │ ├ embed/
	** +│ │ │ │ └ +page.svelte
		│ │ │ └ +layout.svelte
		│ │ └ +layout.svelte
		│ └ +layout.svelte
		└ +layout.svelte
		Ordinarily, this would inherit the root layout, the (app) layout, 
		the item layout and the [id] layout. We can reset to one of those layouts by appending @ followed 
		by the segment name — or, for the root layout, the empty string. In this example, we can choose from the following options:

	** +page@[id].svelte - inherits from src/routes/(app)/item/[id]/+layout.svelte
	** +page@item.svelte - inherits from src/routes/(app)/item/+layout.svelte
	** +page@(app).svelte - inherits from src/routes/(app)/+layout.svelte
	** +page@.svelte - inherits from src/routes/+layout.svelte
    */
	let articles: Array<ComponentProps<Article>> = [
		{
			head: { when: '14 days ago', icon: VideoCameraSolid, iconLabel: 'Tutorial' },
			body: {
				title: 'Review of the new iPhone 13',
				bodyParagraph: "The new iPhone 13 is here, and it's amazing!"
			},
			author: {
				title: 'Jese Leos',
				imgSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
				imgDescription: 'Jese Leos avatar',
				moreInfoHref: '/',
				moreInfoLabel: 'Read more'
			}
		},
		{
			head: { when: '14 days ago', icon: VideoCameraSolid, iconLabel: 'Tutorial' },
			body: {
				title: 'Review of the new iPhone 13',
				bodyParagraph: "The new iPhone 13 is here, and it's amazing!"
			},
			author: {
				title: 'Jese Leos',
				imgSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
				imgDescription: 'Jese Leos avatar',
				moreInfoHref: '/',
				moreInfoLabel: 'Read more'
			}
		}
	];
</script>

<main class="p-4">
	<SectionBlog title="Reviews" description="All the reviews so far..." bind:articles />
</main>
