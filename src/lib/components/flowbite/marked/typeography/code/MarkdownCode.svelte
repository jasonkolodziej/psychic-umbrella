<script lang="ts">
	// import '../../../../../../app.pcss';
	import type { Tokens } from 'marked';
	import { type Renderers, type MarkdownOptions } from '@magidoc/plugin-svelte-marked';
	import WysiwygEditor from '$components/flowbite/WYSIWYGEditor.svelte';
	// import WysiwygEditor from '$components/flowbite/WYSIWYGEditor.svelte';
	// load all languages with "all" or common languages with "common"
	// import { lowlight } from 'lowlight/lib/core';
	// import type Lowlight from 'lowlight';
	export let token: Tokens.Code;
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;
</script>

<!-- <svelte:element this="div" bind:this={element} /> -->

<!-- <svelte:window on:click={toggleAnimation} /> -->

<WysiwygEditor value={token.raw} />

<!-- <pre><code class={`lang-${token.lang}`}>{token.text}</code></pre> -->
