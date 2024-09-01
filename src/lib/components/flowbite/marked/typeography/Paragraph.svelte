<script lang="ts">
	import type { Token, Tokens } from 'marked';
	import {
		MarkdownTokens,
		type MarkdownOptions,
		type Renderers
	} from '@magidoc/plugin-svelte-marked';
	import { P, type PweightType } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	export let token: Tokens.Paragraph &
		ComponentProps<P> &
		Tokens.Generic & {
			pretty: boolean;
			emphasis?: boolean;
			strong?: boolean;
		};

	export let options: MarkdownOptions;
	export let renderers: Renderers;
	token = {
		...token,
		emphasis: token.tokens.some((t: Token) => t.type === 'em'),
		strong: token.tokens.some((t: Token) => t.type === 'strong')
	};
	let italic = token.emphasis ?? true;
	let weight: PweightType = token.strong ? 'bold' : 'normal';
	// let bg = token.pretty ? true : false;
	// let border = token.pretty ? true : false;
	// let bqClass = token.pretty ? 'p-4 my-4' : undefined;

	$: console.log('Paragraph', { token });
</script>

<P bind:italic bind:weight>
	<MarkdownTokens tokens={token.tokens} {renderers} {options} />
</P>
