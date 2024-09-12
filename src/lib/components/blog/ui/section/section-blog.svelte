<script lang="ts">
	// import Link from '$lib/carta/components/link/Link.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import { BlogBodyWrapper, BlogHead, Section } from 'flowbite-svelte-blocks';
	import type { ComponentProps, SvelteComponent } from 'svelte';
	import Article from '../article/article.svelte';

	type $$Props = HTMLAttributes<HTMLParagraphElement> & {
		title: string;
		description: string;
		sectionClass?: string;
		articles?: Array<ComponentProps<Article>>;
	};

	// type $$Slots = {
	// 	// default: {};
	// 	articles: Array<SvelteComponent<Article>>;
	// };

	let className: $$Props['class'] = undefined;
	// export let name: $$Props['name'] = undefined;
	let name = 'blog';
	export let sectionClass: $$Props['sectionClass'] =
		name === 'blog' ? 'pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900' : '';
	export let title: $$Props['title'] = '';
	export let description: $$Props['description'] = '';
	export let articles: $$Props['articles'] = [];

	export { className as class };
	// export let href: string;
</script>

<Section name="blog" bind:sectionClass>
	<BlogHead>
		<svelte:fragment slot="h2">{title}</svelte:fragment>
		<svelte:fragment slot="paragraph">
			<p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
				{description}
			</p>
		</svelte:fragment>
	</BlogHead>
	<BlogBodyWrapper>
		{#if articles}
			{#each articles as article}
				<Article {...article} />
				<!-- <svelte:component this={Article} {...article} /> -->
			{/each}
		{/if}
		<!-- {#if $$slots.articles}
			{#each $$slots.articles as s}
				{s}
			{/each}
		{/if} -->
	</BlogBodyWrapper>
</Section>
