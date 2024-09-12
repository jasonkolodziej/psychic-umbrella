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
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;

	let italic = token.emphasis ?? false;
	let weight: PweightType = token.strong ? 'bold' : 'normal';

	// $: console.log('Paragraph', { token });
</script>

<P bind:italic bind:weight>
	<slot />
</P>
