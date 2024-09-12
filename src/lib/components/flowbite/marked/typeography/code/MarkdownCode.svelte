<script lang="ts">
	import type { Tokens } from 'marked';
	import {
		MarkdownTokens,
		type Renderers,
		type MarkdownOptions
	} from '@magidoc/plugin-svelte-marked';

	export let token: Tokens.Code;
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;
</script>

<pre><code class={`lang-${token.lang}`}>{token.text}</code></pre>
