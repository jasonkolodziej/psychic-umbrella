<script lang="ts">
	import type { Tokens } from 'marked';
	import {
		MarkdownTokens,
		type Renderers,
		type MarkdownOptions
	} from '@magidoc/plugin-svelte-marked';

	export let token: Tokens.HTML;
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;
</script>

{@html token.text}
