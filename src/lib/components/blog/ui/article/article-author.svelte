<script lang="ts">
	import { ArticleAuthor, ArticleBody, ArticleHead, ArticleWrapper } from 'flowbite-svelte-blocks';
	import { ArrowRightOutline, VideoCameraSolid } from 'flowbite-svelte-icons';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import type { HeadingLevel } from '$lib/components/blog/ui/card/index';
	import Link from '$lib/carta/components/link/Link.svelte';

	type $$Props = HTMLAttributes<HTMLHeadingElement> & {
		tag?: HeadingLevel;
		title: string;
		titleClass?: string;
		moreInfoLabel?: string;
		moreInfoHref?: string;
		moreInfoClass?: string;
		imgClass?: string;
		imgSrc?: string;
		imgDescription?: string;
	};

	let className: $$Props['class'] = undefined;
	export let title: $$Props['title'] = 'Some title';
	export let titleClass: $$Props['titleClass'] = 'font-medium dark:text-white';
	export let imgClass: $$Props['imgClass'] = 'h-7 w-7 rounded-full';
	export let moreInfoClass: $$Props['moreInfoClass'] =
		'text-primary-600 dark:text-primary-500 inline-flex items-center font-medium hover:underline';
	export let moreInfoLabel: $$Props['moreInfoLabel'] = 'Read more';
	export let moreInfoHref: $$Props['moreInfoHref'] = '/';
	export let imgSrc: $$Props['imgSrc'] =
		'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png';
	export let imgDescription: $$Props['imgDescription'] = 'Jese Leos avatar';
	// export let tag: $$Props['tag'] = 'h3';
	export { className as class };
</script>

<ArticleAuthor>
	<svelte:fragment slot="author">
		<img class={cn(imgClass)} src={imgSrc} alt={imgDescription} />
		<span class={cn(titleClass)}>{title}</span>
	</svelte:fragment>
	<Link href={moreInfoHref} class={cn(moreInfoClass)}>
		{moreInfoLabel}
		<ArrowRightOutline size="sm" class="ml-2" />
	</Link>
	<!-- <a href="/" class="">
		Read more
		<ArrowRightOutline size="sm" class="ml-2" />
	</a> -->
</ArticleAuthor>
