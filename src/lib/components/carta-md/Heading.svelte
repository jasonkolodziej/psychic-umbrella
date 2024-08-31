<script lang="ts">
	import { Heading, P, A } from 'flowbite-svelte';
	import type { HTMLAttributes, SvelteHTMLElements } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import type { HeadingLevel } from '$lib/carta/components/ui/card/index';
	import {
		// onMount,
		type ComponentProps,
		type ComponentType,
		type ComponentConstructorOptions,
		type SvelteComponent,
		onMount
	} from 'svelte';
	import { initializeComponents, Slot, svelte } from '@cartamd/plugin-component/svelte';
	import type * as hast from 'hast';
	import type { $ } from 'vitest/dist/chunks/reporters.C_zwCd4j.js';

	let maskedComponent: ComponentType = Heading;

	type $$Props = ComponentProps<Heading> & {
		iconName: string;
		tag?: HeadingLevel;
	};
	//! Experimental
	// or define it as a type
	type $$Slots = {
		default: never;
		named: {};
		'[data-slot]': HTMLElement;
	};
	export let iconName: string;
	let tag: $$Props['tag'] = 'h1';
	export let dataSlot: $$Slots['[data-slot]'];
	// export let className: $$Props['class'] = undefined;

	// export { className as class };
	$: console.log({ tag }, dataSlot);
</script>

<!-- <svelte:component this={maskedComponent}></svelte:component> -->

<Heading bind:tag {...$$restProps}>
	<Slot />
</Heading>
