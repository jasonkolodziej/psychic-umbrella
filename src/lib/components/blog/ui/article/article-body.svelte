<script lang="ts">
	import { ArticleBody } from 'flowbite-svelte-blocks';
	import { ArrowRightOutline, VideoCameraSolid } from 'flowbite-svelte-icons';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ComponentProps, SvelteComponent } from 'svelte';
	import { cn } from '$lib/carta/utils';
	import type { HeadingLevel } from '$lib/components/blog/ui/card/index';
	import Link from '$lib/carta/components/link/Link.svelte';

	type $$Props = SvelteComponent<ArticleBody> & {
		// tag?: HeadingLevel;
		title?: string;
		titleHref?: string;
		bodyParagraph?: string;
	};

	let className: $$Props['class'] = undefined;
	// export let tag: $$Props['tag'] = 'h2';
	export let title: $$Props['title'] = '';
	export let titleHref: $$Props['titleHref'] = '/';
	export let bodyParagraph: $$Props['bodyParagraph'] = '';
	export { className as class };
</script>

<ArticleBody>
	<svelte:fragment slot="h2">
		<!-- <Link href={titleHref} class="text-3xl font-semibold leading-none tracking-tight">
			{title} -->
		<a href={titleHref}>{title}</a>
	</svelte:fragment>
	<svelte:fragment slot="paragraph">
		<p class="mb-5 font-light text-gray-500 dark:text-gray-400">
			{bodyParagraph}
		</p>
	</svelte:fragment>
</ArticleBody>
