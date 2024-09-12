<script lang="ts">
	// import MarkdownToken from '$lib/markdown/MarkdownToken.svelte';
	import {
		MarkdownToken,
		type MarkdownOptions,
		type Renderers
	} from '@magidoc/plugin-svelte-marked';
	import type { Tokens } from 'marked';
	import type { ComponentProps } from 'svelte';
	import { List } from 'flowbite-svelte';

	// export let token: Tokens.List
	// export let options: MarkdownOptions
	// export let renderers: Renderers

	// let component: 'ol' | 'ul'
	// $: component = token.ordered ? 'ol' : 'ul'

	type ListType = 'ul' | 'ol' | 'dl';
	type ListStyle = 'disc' | 'none' | 'decimal';

	export let token: Tokens.List &
		ComponentProps<List> &
		Tokens.Generic & { level: number; nested: boolean };
	export let options: MarkdownOptions;
	export let renderers: Renderers;

	let tag: ListType = token.ordered ? 'ol' : 'ul';
	let className = token.nested ? 'ps-5 mt-2 space-y-1' : undefined;
</script>

<!-- <svelte:element this={component} start={token.start || 1}>
  {#each token.items as item}
    <MarkdownToken token={{ ...item }} {options} {renderers} />
  {/each}
</svelte:element> -->

<List bind:tag start={token.start} class={className}>
	{#each token.items as item}
		<MarkdownToken token={item} {options} {renderers} />
	{/each}
</List>
