<script lang="ts">
	import type { Token, Tokens } from 'marked';
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
	export let options: MarkdownOptions;
	export const renderers: Renderers = undefined;

	let tag: HeadingLevel = ('h' + token.depth) as HeadingLevel;
	let id: string | undefined;
	$: id = urlUtils.generatePathSegment(token.text, options.slugger);

	$: console.log({ token });
</script>

<Heading bind:tag {id}>
	{token.text}
	<!-- <MarkdownTokens tokens={token.tokens} {renderers} {options} /> -->
</Heading>
