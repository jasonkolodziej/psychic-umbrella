<script lang="ts">
	import type { MarkdownOptions, Renderers } from '../../markedConfiguration';

	import type { Token, Tokens } from 'marked';
	import { Li } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	import { MarkdownTokens } from '@magidoc/plugin-svelte-marked';

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

	// export const token: Tokens.ListItem = undefined
	// export const options: MarkdownOptions = undefined
	// export const renderers: Renderers = undefined
</script>

<!-- <li><slot /></li> -->

<Li bind:tag>
	{token.text}
	<!-- <MarkdownTokens tokens={moreTokens} {renderers} {options} /> -->
	{#if isNested}
		<MarkdownTokens tokens={moreTokens} {renderers} {options} />
	{:else}
		{token.text}
	{/if}
	<!-- <slot /> -->
</Li>
