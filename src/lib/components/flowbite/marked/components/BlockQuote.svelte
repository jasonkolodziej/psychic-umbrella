<script lang="ts">
	import type { Tokens } from 'marked';
	import type { MarkdownOptions, Renderers } from '../markedConfiguration';

	import { Blockquote } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import { MarkdownTokens } from '@magidoc/plugin-svelte-marked';

	export let token: Tokens.Blockquote &
		ComponentProps<Blockquote> &
		Tokens.Generic & { pretty: boolean };
	export let options: MarkdownOptions;
	export let renderers: Renderers;
	token.pretty = true;
	let bg = token.pretty ? true : false;
	let border = token.pretty ? true : false;
	let bqClass = token.pretty ? 'p-4 my-4' : undefined;
</script>

<!-- <blockquote>
  <slot />
</blockquote> -->

<Blockquote bind:border bind:bg class={twMerge(bqClass)}>
	<!-- <MarkdownTokens tokens={token.tokens} {renderers} {options} /> -->
	<slot />
</Blockquote>
