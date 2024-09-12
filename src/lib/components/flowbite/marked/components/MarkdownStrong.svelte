<script lang="ts">
	import type { Tokens } from 'marked';
	import type { MarkdownOptions, Renderers } from '../markedConfiguration';
	import MarkdownParagraph from './MarkdownParagraph.svelte';
	import { P, type PweightType } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	export let token: Tokens.Strong = undefined;
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;

	let weight: PweightType = token.type == 'strong' ? 'bold' : 'normal';
	$: console.log('Strong', { token });
</script>

<strong>
	<!-- <MarkdownParagraph
	token={{
		strong: true,
		text: token.text,
		tokens: token.tokens,
		type: 'paragraph',
		raw: token.raw
	}}
>
	<slot />
</MarkdownParagraph> -->
	<slot />
</strong>
