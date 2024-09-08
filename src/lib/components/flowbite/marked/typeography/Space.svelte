<script lang="ts">
	import type { Tokens } from 'marked';
	import {
		MarkdownTokens,
		type Renderers,
		type MarkdownOptions
	} from '@magidoc/plugin-svelte-marked';
	import Br from './Br.svelte';

	export const token: Tokens.Space = undefined;
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;
</script>

<!-- <Br /> -->
<slot />
