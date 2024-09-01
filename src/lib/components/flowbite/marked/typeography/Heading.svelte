<script lang="ts">
	import type { Token, Tokens } from 'marked';
	import type { MarkdownOptions, Renderers } from '@magidoc/plugin-svelte-marked';
	import { Heading } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	import type { HeadingLevel } from '$components/blog/ui/card';

	export let token: Tokens.Heading & ComponentProps<Heading> & { level: number };
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;

	let tag: HeadingLevel = ('h' + token.depth) as HeadingLevel;

	$: console.log({ token });
</script>

<Heading bind:tag>
	{token.text}
</Heading>
