<script lang="ts">
	import type { HrSlots } from 'flowbite-svelte/Hr.svelte';
	import { Hr } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	type $$Props = ComponentProps<Hr> & { classHr?: string; value?: string; icon?: HTMLOrSVGElement };
	type $$Slots = HrSlots & { default: {} };
	export let icon: $$Props['icon'] = undefined;
	export let classHr: $$Props['classHr'] = 'w-48 h-1 mx-auto my-4 rounded md:my-10';
	export let value: $$Props['value'] = undefined;

	// export { classHr as class };
</script>

<Hr bind:classHr icon={icon ?? true}>
	{#if value}
		{value}
	{:else if icon}
		{icon}
	{:else}
		<slot></slot>
	{/if}
</Hr>
