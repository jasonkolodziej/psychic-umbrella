<script lang="ts">
	// import Link from '$lib/carta/components/link/Link.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import { Section, BlogTemplate, Comment, CommentItem } from 'flowbite-svelte-blocks';
	import { Button, Textarea, Label, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { DotsHorizontalOutline } from 'flowbite-svelte-icons';
	import example from '$lib/shallow/(blog)/[slug]/blog-example.json';
	import type { BlogPost } from '$lib/filtering/blog';
	const comments = [
		{
			id: 'comment1',
			commenter: {
				name: 'Michael Gough',
				profilePicture: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg'
			},
			date: 'Feb. 8, 2022',
			content:
				'Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.',
			replies: [
				{
					id: 'reply1',
					commenter: {
						name: 'Jese Leos',
						profilePicture: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
					},
					date: 'Feb. 12, 2022',
					content: 'Much appreciated! Glad you liked it ☺️'
				}
			]
		},
		{
			id: 'comment2',
			commenter: {
				name: 'Bonnie Green',
				profilePicture: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg'
			},
			date: 'Mar. 12, 2022',
			content:
				'The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.',
			replies: []
		},
		{
			id: 'comment3',
			commenter: {
				name: 'Helene Engels',
				profilePicture: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg'
			},
			date: 'Jun. 23, 2022',
			content:
				'Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.',
			replies: []
		}
	];

	type $$Props = HTMLAttributes<HTMLParagraphElement> & {};

	let className: $$Props['class'] = undefined;

	export { className as class };
	// export let href: string;
</script>

<Section name="blog">
	<article
		class="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full max-w-2xl"
	>
		<slot />
	</article>
</Section>
