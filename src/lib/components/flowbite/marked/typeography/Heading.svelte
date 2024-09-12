<script lang="ts">
	// import { generatePathSegment } from '$lib/utils/url';

	import type { Tokens } from 'marked';
	import {
		MarkdownTokens,
		urlUtils,
		type MarkdownOptions,
		type Renderers
	} from '@magidoc/plugin-svelte-marked';
	import { Heading } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	import type { HeadingLevel } from '$components/blog/ui/card';

	export let token: Tokens.Heading & ComponentProps<Heading> & { level: number };

	// export let token: Tokens.Heading
	export let options: MarkdownOptions;
	export const renderers: Renderers = undefined;
	let tag: HeadingLevel = ('h' + token.depth) as HeadingLevel;
	let id: string | undefined;
	$: id = urlUtils.generatePathSegment(token.text, options.slugger);
</script>

<Heading bind:tag {id}>
	<!-- {token.text} -->
	<slot />
	<!-- <MarkdownTokens tokens={token.tokens} {renderers} {options} /> -->
</Heading>

<!-- <svelte:element this={`h${token.depth}`} {id}>
  <slot />
</svelte:element> -->
