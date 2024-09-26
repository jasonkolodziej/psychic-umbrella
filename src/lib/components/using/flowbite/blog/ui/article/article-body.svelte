<script lang="ts">
	import { ArticleBody } from 'flowbite-svelte-blocks';
	import { ArrowRightOutline, VideoCameraSolid } from 'flowbite-svelte-icons';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ComponentProps, SvelteComponent } from 'svelte';
	import type { ArticleBody as Body } from '$lib/filtering/blog';
	import Rating from '$components/using/flowbite/blog/ui/rating/Rating.svelte';
	import { A, P } from 'flowbite-svelte';
	import Score from '../rating/Score.svelte';
	import type { ReviewCriteria } from '$lib/filtering/zach';

	type $$Props = ComponentProps<ArticleBody> & Body;

	let className: $$Props['class'] = undefined;
	// export let tag: $$Props['tag'] = 'h2';
	export let title: $$Props['title'] = '';
	export let titleHref: $$Props['titleHref'] = '/';
	export let lead: $$Props['lead'] = '';
	export { className as class };
	let criteria: Array<ReviewCriteria> = [
		{ Value_For_Money: 3, Build_Experience: 3, Play_Experience: 2 }
	];
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
			<Score {criteria} />
		</div>
	</svelte:fragment>
</ArticleBody>
