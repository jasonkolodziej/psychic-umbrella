<script lang="ts">
	import type { Tokens } from 'marked';
	import {
		MarkdownTokens,
		type Renderers,
		type MarkdownOptions
	} from '@magidoc/plugin-svelte-marked';

	export let token: Tokens.Codespan;
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;
	$: console.log('CodeSpan', token);
</script>

<!-- <code>{token.raw.slice(1, token.raw.length - 1)}</code> -->
<code>{token.text}</code>
