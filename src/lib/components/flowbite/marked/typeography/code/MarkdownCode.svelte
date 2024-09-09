<script lang="ts">
	import type { Tokens } from 'marked';
	import {
		MarkdownTokens,
		type Renderers,
		type MarkdownOptions
	} from '@magidoc/plugin-svelte-marked';
	import {
		type BundledLanguage,
		type BundledTheme,
		codeToHtml,
		createHighlighter,
		type CodeToHastOptions
	} from 'shiki/bundle/web';
	import { get } from 'svelte/store';
	import WysiwygEditor from '$components/flowbite/WYSIWYGEditor.svelte';

	export let token: Tokens.Code;
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;

	// let code = $state('let bool;');
	// function toggleAnimation() {
	// 	toggle = !toggle;
	// 	toggle ? (code = 'let bool = true;') : (code = 'let bool;');
	// }
	$: console.log('Code token', token);
</script>

<!-- <svelte:window on:click={toggleAnimation} /> -->
<WysiwygEditor code={token} />

<!-- <pre><code class={`lang-${token.lang}`}>{token.text}</code></pre> -->
