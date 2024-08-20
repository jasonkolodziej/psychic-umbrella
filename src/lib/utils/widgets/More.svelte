<script lang="ts">
	import { ChevronRightOutline } from 'flowbite-svelte-icons';
	import { twMerge } from 'tailwind-merge';
	import { SvelteComponent, type ComponentProps } from 'svelte';
	// import type { HTMLAttributes } from 'svelte/elements';
	// ? https://www.viget.com/articles/typing-components-in-svelte/
	// declare const __propDef: {
	// 	props: {
	// 		[x: string]: any;
	// 		title?: string | undefined;
	// 		href?: string | undefined;
	// 		flat?: boolean | undefined;
	// 	};
	// 	events: {
	// 		// click: MouseEvent;
	// 		// keydown: KeyboardEvent;
	// 		// keyup: KeyboardEvent;
	// 		// focus: FocusEvent;
	// 		// blur: FocusEvent;
	// 		// mouseenter: MouseEvent;
	// 		// mouseleave: MouseEvent;
	// 		// mouseover: MouseEvent;
	// 		// mouseout: MouseEvent;
	// 	} & {
	// 		[evt: string]: CustomEvent<any>;
	// 	};
	// 	slots: {};
	// };

	export class More extends SvelteComponent<{
		title?: string | undefined;
		href?: string | undefined;
		flat?: boolean | undefined;
	}> {}

	// interface $$Props extends ComponentProps<More> {
	// 	title?: string | undefined;
	// 	href?: string | undefined;
	// 	flat?: boolean | undefined;
	// }

	// export let title: string = '';
	// export let href: string = '#';
	// export let flat: boolean = false;

	$: aClass = twMerge(
		'inline-flex items-center text-xs font-medium text-primary-700 sm:text-sm dark:text-primary-500',
		($$props.flat ?? false)
			? ''
			: 'rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 uppercase'
	);
</script>

<div class="flex-shrink-0">
	<a href={$$props.href ?? '#'} class={aClass}>
		{$$props.title ?? ''}
		<ChevronRightOutline size="md" />
	</a>
</div>
