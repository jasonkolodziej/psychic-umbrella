<script lang="ts">
	import type { Token, Tokens } from 'marked';
	import {
		MarkdownTokens,
		type MarkdownOptions,
		type Renderers
	} from '@magidoc/plugin-svelte-marked';
	import { Li } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';

	type ListType = 'ul' | 'ol' | 'dl';
	type ListStyle = 'disc' | 'none' | 'decimal';

	export let token: Tokens.ListItem & ComponentProps<Li> & {};
	export let options: MarkdownOptions;
	export let renderers: Renderers;
	const isNested = token.tokens.some((t: Token) => t.type === 'list');
	let moreTokens = token.tokens.map((t: Token) => {
		if (t.type === 'list') {
			return { ...t, nested: true };
		}
	}) as Tokens.Generic[];
	let tag: ListType;

	$: console.log('ListItem', { isNested, token });
</script>

<Li bind:tag>
	{token.text}
	<!-- <MarkdownTokens tokens={moreTokens} {renderers} {options} /> -->
	{#if isNested}
		<MarkdownTokens tokens={moreTokens} {renderers} {options} />
	{:else}
		{token.text}
	{/if}
</Li>
