<script lang="ts">
	import { A } from 'flowbite-svelte';
	import type { ASlots } from 'flowbite-svelte/A.svelte';
	import type { ComponentProps } from 'svelte';
	type $$Props = ComponentProps<A> & { value?: string };
	type $$RestProps = Omit<$$Props, 'value'>;
	type $$Slots = ASlots & { default: {} };
	export let value: $$Props['value'] = undefined;
	let className: $$Props['aClass'] = undefined;
	export let href: $$Props['href'] = undefined;
	let aLink: boolean = value?.match(/<a (.*?)="(.*?)">(.*?)<\/a>/g)?.at(0) ? true : false;
	let matches = value?.match(/<a (.*?)="(.*?)">(.*?)<\/a>/g);
	className = className ?? 'font-medium hover:underline';
	// href = aLink ? value?.match(/(.*?)href="(.*?)"/g)?.[0] : href;
	value = aLink ? value?.replace(/<a(.*?)>/g, '').replace('</a>', '') : value;
	// $: console.log('A', value, matches, aLink, href);
</script>

<!-- <svelte:component this={maskedComponent}></svelte:component> -->

<A bind:href {...$$restProps} aClass={className}>
	{#if value}
		{value}
	{:else}
		<!-- <slot></slot> -->
		<Slot />
	{/if}
</A>
