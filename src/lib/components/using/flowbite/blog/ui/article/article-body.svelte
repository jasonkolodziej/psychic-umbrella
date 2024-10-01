<script lang="ts">
	import { ArticleBody } from 'flowbite-svelte-blocks';
	import { ArrowRightOutline, VideoCameraSolid } from 'flowbite-svelte-icons';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ComponentProps, SvelteComponent } from 'svelte';
	import type { ArticleBody as Body } from '$lib/filtering/blog';
	import { A, P } from 'flowbite-svelte';
	import type { Review, ReviewCriteria } from '$lib/filtering/zach';
	import Score from '../rating/Score.svelte';

	type $$Props = ComponentProps<ArticleBody> & Body & { ratingScore?: Review };

	let className: $$Props['class'] = undefined;
	// export let tag: $$Props['tag'] = 'h2';
	export let title: $$Props['title'] = '';
	export let titleHref: $$Props['titleHref'] = '/';
	export let lead: $$Props['lead'] = '';
	export let ratingScore: $$Props['ratingScore'] = undefined;
	export { className as class };
</script>

<ArticleBody>
	<svelte:fragment slot="h2">
		<!-- <Link href={titleHref} class="text-3xl font-semibold leading-none tracking-tight">
			{title} -->
		<A href={titleHref}>{title}</A>
	</svelte:fragment>
	<svelte:fragment slot="paragraph">
		<div class="mb-5">
			<P class="font-light text-gray-500 dark:text-gray-400">
				{lead}
			</P>
			{#if ratingScore}
				<Score {...ratingScore} />
			{/if}
		</div>
	</svelte:fragment>
</ArticleBody>
