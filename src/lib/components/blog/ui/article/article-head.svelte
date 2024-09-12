<script lang="ts">
	import { ArticleAuthor, ArticleBody, ArticleHead, ArticleWrapper } from 'flowbite-svelte-blocks';
	import { ArrowRightOutline, VideoCameraSolid } from 'flowbite-svelte-icons';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import type { HeadingLevel } from '$lib/components/blog/ui/card/index';

	type $$Props = HTMLAttributes<HTMLHeadingElement> & {
		tag?: HeadingLevel;
		when: string;
		whenClass?: string;
	};

	let className: $$Props['class'] = undefined;
	export let when: $$Props['when'] = '';
	let whenClass: $$Props['whenClass'] = 'text-sm';
	// export let tag: $$Props['tag'] = 'h3';
	export { className as class };
</script>

<ArticleHead>
	<span
		class={cn(
			'bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-800 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium',
			className
		)}
	>
		<VideoCameraSolid size="xs" class="mr-1" />
		Tutorial
	</span>
	<span class={cn(whenClass)}>{when}</span>
</ArticleHead>
