<script lang="ts">
	import { ArticleBody } from 'flowbite-svelte-blocks';
	import { ArrowRightOutline, VideoCameraSolid } from 'flowbite-svelte-icons';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ComponentProps, SvelteComponent } from 'svelte';
	import type { ArticleBody as Body } from '$lib/filtering/blog';
	import { P, A } from 'flowbite-svelte';

	type $$Props = ComponentProps<ArticleBody> & Body;

	let className: $$Props['class'] = undefined;
	// export let tag: $$Props['tag'] = 'h2';
	export let title: $$Props['title'] = '';
	export let titleHref: $$Props['titleHref'] = '/';
	export let lead: $$Props['lead'] = '';
	export { className as class };
</script>

<ArticleBody>
	<svelte:fragment slot="h2">
		<!-- <Link href={titleHref} class="text-3xl font-semibold leading-none tracking-tight">
			{title} -->
		<A href={titleHref}>{title}</A>
	</svelte:fragment>
	<svelte:fragment slot="paragraph">
		<P class="mb-5 font-light text-gray-500 dark:text-gray-400">
			{lead}
		</P>
	</svelte:fragment>
</ArticleBody>
