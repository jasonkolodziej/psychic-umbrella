<script lang="ts">
	import { List, Li } from 'flowbite-svelte';
	import type { ListSlots } from 'flowbite-svelte/List.svelte';
	import type { ComponentProps } from 'svelte';
	type ListType = 'ul' | 'ol' | 'dl';
	type ListStyle = 'disc' | 'none' | 'decimal';
	type $$Props = ComponentProps<List> & {
		tag?: ListType;
		style?: ListStyle;
		value?: string;
		listClass?: string;
		listItemClass?: string;
	};
	type $$Slots = ListSlots & { default: {} };
	export let value: $$Props['value'] = undefined;
	export let tag: $$Props['tag'] = undefined;
	export let style: $$Props['style'] = undefined;
	export let listClass: $$Props['listClass'] = undefined;
	export let listItemClass: $$Props['listItemClass'] = undefined;
</script>

<List bind:tag list={style} bind:class={listClass} {...$$restProps}>
	{#if value}
		{value}
	{:else}
		<slot></slot>
	{/if}
</List>
