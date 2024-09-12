<!-- BackgroundColor.svelte -->
<script lang="ts">
	import {
		MarkdownTokens,
		type MarkdownOptions,
		type Renderers
	} from '@magidoc/plugin-svelte-marked';
	import type { Tokens, Token } from 'marked';

	export let token: Tokens.Generic & {
		type: 'background-color';
		color: string;
		raw: string;
		tokens: Token[];
	};

	export let renderers: Renderers;
	export let options: MarkdownOptions;
	$: console.log('BackgroundColor', { token });
</script>

<div style={`background-color: ${token.color}`}>
	<!-- This allows to render markdown recursively, in a way that the text inside your container can also be markdown! -->
	<MarkdownTokens tokens={token.tokens} {renderers} {options} />
</div>
