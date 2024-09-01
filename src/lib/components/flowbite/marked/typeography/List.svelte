<script lang="ts">
	import type { Token, Tokens } from 'marked';
	import {
		MarkdownToken,
		MarkdownTokens,
		type MarkdownOptions,
		type Renderers
	} from '@magidoc/plugin-svelte-marked';
	import { List } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	import type { HeadingLevel } from '$components/blog/ui/card';

	type ListType = 'ul' | 'ol' | 'dl';
	type ListStyle = 'disc' | 'none' | 'decimal';

	export let token: Tokens.List &
		ComponentProps<List> &
		Tokens.Generic & { level: number; nested: boolean };
	export let options: MarkdownOptions;
	export let renderers: Renderers;

	let tag: ListType = token.ordered ? 'ol' : 'ul';
	let className = token.nested ? 'ps-5 mt-2 space-y-1' : undefined;

	$: console.log('List', { token });
</script>

<List bind:tag start={token.start} class={className}>
	{#each token.items as item}
		<MarkdownToken token={item} {options} {renderers} />
	{/each}
</List>
