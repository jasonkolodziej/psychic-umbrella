<script lang="ts">
	import { P, type PweightType } from 'flowbite-svelte';
	import type { PSlots } from 'flowbite-svelte/P.svelte';
	import A from '$components/flowbite/typeography/A.svelte';
	import type { ComponentProps } from 'svelte';
	import { Slot } from '@cartamd/plugin-component/svelte';
	type $$Props = ComponentProps<P> & { value?: string };
	type $$RestProps = Omit<$$Props, 'value'>;
	type $$Slots = PSlots & { default: {} };
	export let value: $$Props['value'] = undefined;
	value = value?.replace('<p>', '"').replace('</p>', '"');
	let bold = value?.match(/<strong>(.*?)<\/strong>/g)?.at(0);
	let italic: boolean = value?.match(/<em>(.*?)<\/em>/g)?.at(0) ? true : false;
	let aLink: boolean = value?.match(/<a href="(.*?)">(.*?)<\/a>/g)?.at(0) ? true : false;
	value = bold ? value?.replace('<strong>', '').replace('</strong>', '') : value;
	value = italic ? value?.replace('<em>', '').replace('</em>', '') : value;
	let weight: PweightType = bold ? 'bold' : 'normal';
	//? is the value type `a`
</script>

<!-- <svelte:component this={maskedComponent}></svelte:component> -->

<P bind:weight bind:italic {...$$restProps}>
	<!-- {#if aLink}
		<A bind:value />
	{:else if value}
		{value}
	{:else}
		<Slot />
		 <slot></slot>
	{/if} -->
	{#if value}
		{value}
	{:else}
		<Slot />
	{/if}
</P>
