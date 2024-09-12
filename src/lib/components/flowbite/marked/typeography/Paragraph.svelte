<script lang="ts">
	import type { Tokens } from 'marked';
	import {
		MarkdownTokens,
		type Renderers,
		type MarkdownOptions
	} from '@magidoc/plugin-svelte-marked';

	// export const token: Tokens.Paragraph = undefined
	import { P, type PweightType } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	export let token: Tokens.Paragraph &
		ComponentProps<P> &
		Tokens.Generic & {
			pretty?: boolean;
			emphasis?: boolean;
			strong?: boolean;
		};
	export let options: MarkdownOptions;
	export let renderers: Renderers;

	let italic = token.emphasis ?? false;
	let weight: PweightType = token.strong ? 'bold' : 'normal';

	// $: console.log('Paragraph', { token });
</script>

<P bind:italic bind:weight>
	<!-- ! Original don't delete -->
	<!-- <slot /> -->
	<MarkdownTokens tokens={token.tokens} {renderers} {options} />
</P>
