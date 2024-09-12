<script lang="ts">
	import type { Tokens } from 'marked';
	import type { MarkdownOptions, Renderers } from '../markedConfiguration';
	// import MarkdownParagraph from './MarkdownParagraph.svelte';

	export const token: Tokens.Em = undefined;
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;
</script>

<!--  -->

<em>
	<slot />
</em>
