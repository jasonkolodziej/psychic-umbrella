<script lang="ts">
	import { ArticleHead } from 'flowbite-svelte-blocks';
	import { VideoCameraSolid } from 'flowbite-svelte-icons';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import type { HeadingLevel } from '$components/using/flowbite/blog/ui/card/index';
	import type { ArticleHead as Head } from '$lib/filtering/blog';

	type $$Props = HTMLAttributes<HTMLHeadingElement> &
		Head & {
			tag?: HeadingLevel;
			whenClass?: string;
		};

	let className: $$Props['class'] = undefined;
	export let when: $$Props['when'] = '14 days ago';
	export let icon: $$Props['icon'] = VideoCameraSolid;
	export let iconLabel: $$Props['iconLabel'] = 'Tutorial';
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
		{#if icon}
			<svelte:component this={icon} size="xs" class="mr-1" />
		{/if}
		{#if iconLabel}
			{iconLabel}
		{/if}
		<!-- <VideoCameraSolid size="xs" class="mr-1" /> -->
		<!-- Tutorial -->
	</span>
	<span class={cn(whenClass)}>{when}</span>
</ArticleHead>
