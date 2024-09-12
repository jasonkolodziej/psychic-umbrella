<script lang="ts">
	import type { HeadingLevel } from '$components/blog/ui/card';
	import { Heading } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	type $$Props = ComponentProps<Heading> & { tag?: HeadingLevel; value?: string };
	export let value: $$Props['value'] = undefined;
	export let tag: $$Props['tag'] = undefined;
</script>

<!-- <svelte:component this={maskedComponent}></svelte:component> -->

<Heading bind:tag {...$$restProps}>
	{#if value}
		{value}
	{:else}
		<slot></slot>
	{/if}
</Heading>
