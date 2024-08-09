<script lang="ts">
	import BaseButton from '$lib/components/editable/BaseButton.svelte';
	export let disabled: boolean;
	export let type = 'button';
	export let size: 'sm' | 'md' = 'md';
	export let href: string;
</script>

<BaseButton
	{href}
	{type}
	{size}
	{disabled}
	styles="font-medium hover:bg-gray-100 focus:ring-gray-100 border-2 border-gray-100 bg-white"
	on:click
>
	<slot />
</BaseButton>
