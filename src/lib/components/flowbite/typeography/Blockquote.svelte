<script lang="ts">
	import type { HeadingLevel } from '$components/blog/ui/card';
	import { Blockquote } from 'flowbite-svelte';
	import P from '$components/flowbite/typeography/P.svelte';
	import type { BlockquoteSlots, BlockquoteProps } from 'flowbite-svelte/Blockquote.svelte';
	import type { ComponentProps } from 'svelte';
	type $$Props = ComponentProps<Blockquote> & { value?: string };
	type $$RestProps = Omit<$$Props, 'value'>;
	type $$Slots = BlockquoteSlots & { default: {} };
	export let value: $$Props['value'] = undefined;
	// value = value?.replace('<p>', '"').replace('</p>', '"');
	// let bold = value?.match(/<strong>(.*?)<\/strong>/g)?.at(0);
	// let italic: boolean = value?.match(/<em>(.*?)<\/em>/g)?.at(0) ? true : false;
	// value = bold ? value?.replace('<strong>', '').replace('</strong>', '') : value;
	// value = italic ? value?.replace('<em>', '').replace('</em>', '') : value;
	// let weight: PweightType = bold ? 'bold' : 'normal';
</script>

<!-- <svelte:component this={maskedComponent}></svelte:component> -->

<!-- <Blockquote ></Blockquote> -->

<Blockquote border bg class="my-4 p-4" {...$$restProps}>
	<P bind:value />
</Blockquote>
