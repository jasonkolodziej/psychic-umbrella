<script lang="ts">
	import { A } from 'flowbite-svelte';
	import type { ASlots } from 'flowbite-svelte/A.svelte';
	import type { ComponentProps } from 'svelte';
	type $$Props = ComponentProps<A> & { value?: string };
	type $$RestProps = Omit<$$Props, 'value'>;
	type $$Slots = ASlots & { default: {} };
	export let value: $$Props['value'] = undefined;
</script>

<!-- <svelte:component this={maskedComponent}></svelte:component> -->

<A {...$$restProps}>
	{#if value}
		{value}
	{:else}
		<slot></slot>
	{/if}
</A>
