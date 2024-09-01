<script lang="ts">
	import { P, type PweightType } from 'flowbite-svelte';
	import type { PSlots } from 'flowbite-svelte/P.svelte';
	import type { ComponentProps } from 'svelte';
	type $$Props = ComponentProps<P> & { value?: string };
	type $$RestProps = Omit<$$Props, 'value'>;
	type $$Slots = PSlots & { default: {} };
	export let value: $$Props['value'] = undefined;
	value = value?.replace('<p>', '"').replace('</p>', '"');
	let bold = value?.match(/<strong>(.*?)<\/strong>/g)?.at(0);
	let italic: boolean = value?.match(/<em>(.*?)<\/em>/g)?.at(0) ? true : false;
	value = bold ? value?.replace('<strong>', '').replace('</strong>', '') : value;
	value = italic ? value?.replace('<em>', '').replace('</em>', '') : value;
	let weight: PweightType = bold ? 'bold' : 'normal';
</script>

<!-- <svelte:component this={maskedComponent}></svelte:component> -->

<P bind:weight bind:italic {...$$restProps}>
	{#if value}
		{value}
	{:else}
		<slot></slot>
	{/if}
</P>
