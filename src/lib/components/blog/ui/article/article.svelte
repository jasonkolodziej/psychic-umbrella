<script lang="ts">
	import {
		ArticleWrapper
		// ArticleAuthor, ArticleBody, ArticleHead,
	} from 'flowbite-svelte-blocks';
	import { ArrowRightOutline, VideoCameraSolid } from 'flowbite-svelte-icons';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import type { HeadingLevel } from '$lib/components/blog/ui/card/index';
	import type { ComponentProps, SvelteComponent } from 'svelte';
	import Head from './article-head.svelte';
	import Body from './article-body.svelte';
	import Author from './article-author.svelte';

	//TODO: review this https://flowbite-svelte.com/blocks/marketing/blog
	type $$Props = ComponentProps<ArticleWrapper> & {
		head?: ComponentProps<Head>;
		body?: ComponentProps<Body>;
		author?: ComponentProps<Author>;
		// when: string;
	};

	let className: $$Props['class'] = undefined;
	export let head: $$Props['head'] = {
		when: '14 days ago',
		icon: VideoCameraSolid,
		iconLabel: 'Tutorial',
		whenClass: 'text-sm'
	} as ComponentProps<Head>;
	export let body: $$Props['body'] = {
		title: 'How to quickly deploy a static website',
		bodyParagraph:
			'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers.'
	} as ComponentProps<Body>;
	export let author: $$Props['author'] = {
		title: 'Jese Leos',
		imgSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
		imgDescription: 'Jese Leos avatar',
		moreInfoHref: '/',
		moreInfoLabel: 'Read more'
	} as ComponentProps<Author>;
	// export let tag: $$Props['tag'] = 'h3';
	export { className as class };
</script>

<ArticleWrapper>
	<!-- <ArticleHead>
		<span
			class="bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-800 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium"
		>
			<VideoCameraSolid size="xs" class="mr-1" />
			Tutorial
		</span>
		<span class="text-sm">14 days ago</span>
	</ArticleHead>
	<ArticleBody>
		<svelte:fragment slot="h2"
			><a href="/">How to quickly deploy a static website</a></svelte:fragment
		>
		<svelte:fragment slot="paragraph">
			<p class="mb-5 font-light text-gray-500 dark:text-gray-400">
				Static websites are now used to bootstrap lots of websites and are becoming the basis for a
				variety of tools that even influence both web designers and developers influence both web
				designers and developers.
			</p>
		</svelte:fragment>
	</ArticleBody>
	<ArticleAuthor>
		<svelte:fragment slot="author">
			<img
				class="h-7 w-7 rounded-full"
				src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
				alt="Jese Leos avatar"
			/>
			<span class="font-medium dark:text-white"> Jese Leos </span>
		</svelte:fragment>
		<a
			href="/"
			class="text-primary-600 dark:text-primary-500 inline-flex items-center font-medium hover:underline"
		>
			Read more
			<ArrowRightOutline size="sm" class="ml-2" />
		</a>
	</ArticleAuthor> -->
	{#if $$slots.head}
		<slot name="head" />
	{:else if head}
		<Head {...head} />
	{/if}
	{#if $$slots.body}
		<slot name="body" />
	{:else if body}
		<Body {...body} />
	{/if}
	{#if $$slots.author}
		<slot name="author" />
	{:else if author}
		<Author {...author} />
	{/if}
</ArticleWrapper>
