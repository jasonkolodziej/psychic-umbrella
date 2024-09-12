<script lang="ts">
	import type { Token, Tokens } from 'marked';
	import {
		MarkdownTokens,
		type MarkdownOptions,
		type Renderers
	} from '@magidoc/plugin-svelte-marked';
	import { A, type PweightType } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	export let token: Tokens.Link &
		ComponentProps<A> &
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
	let inline = 'underline hover:no-underline';

	// $: console.log('Link', { token });
</script>

<A href={token.href}>
	<MarkdownTokens tokens={token.tokens} {renderers} {options} />
</A>
