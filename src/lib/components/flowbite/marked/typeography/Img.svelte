<!-- Img.svelte -->
<script lang="ts">
	import type { Tokens } from 'marked';
	import type { MarkdownOptions, Renderers } from '@magidoc/plugin-svelte-marked';

	export let token: Tokens.Image;
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;
</script>

<img src={token.href} title={token.title} alt={token.text} class="custom-image" />

<style>
	.custom-image {
		max-width: 50%;
	}
</style>
