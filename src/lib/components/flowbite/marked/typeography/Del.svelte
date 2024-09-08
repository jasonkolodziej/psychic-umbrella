<script lang="ts">
	import type { Tokens } from 'marked';
	import {
		MarkdownTokens,
		type Renderers,
		type MarkdownOptions
	} from '@magidoc/plugin-svelte-marked';

	export const token: Tokens.Del = undefined;
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;
</script>

<del>
	<slot />
</del>
