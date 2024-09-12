<script lang="ts">
	import type { Tokens } from 'marked';
	import {
		MarkdownTokens,
		type MarkdownOptions,
		type Renderers
	} from '@magidoc/plugin-svelte-marked';
	import { Blockquote } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	export let token: Tokens.Blockquote &
		ComponentProps<Blockquote> &
		Tokens.Generic & { pretty: boolean };
	export let options: MarkdownOptions;
	export let renderers: Renderers;
	token.pretty = true;
	let bg = token.pretty ? true : false;
	let border = token.pretty ? true : false;
	let bqClass = token.pretty ? 'p-4 my-4' : undefined;

	// $: console.log('BlockQuote', { token });
</script>

<Blockquote bind:border bind:bg class={twMerge(bqClass)}>
	<MarkdownTokens tokens={token.tokens} {renderers} {options} />
</Blockquote>
