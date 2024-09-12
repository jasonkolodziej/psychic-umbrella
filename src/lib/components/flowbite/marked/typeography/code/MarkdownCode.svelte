<script lang="ts">
	// import '../../../../../../app.pcss';
	import type { Tokens } from 'marked';
	import {
		MarkdownTokens,
		type Renderers,
		type MarkdownOptions
	} from '@magidoc/plugin-svelte-marked';
	import { get } from 'svelte/store';
	// import WysiwygEditor from '$components/flowbite/WYSIWYGEditor.svelte';
	// load all languages with "all" or common languages with "common"
	// import { lowlight } from 'lowlight/lib/core';
	import { Markdown } from 'tiptap-markdown';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { all, createLowlight } from 'lowlight';
	import CodeBlockLowlight, {
		type CodeBlockLowlightOptions
	} from '@tiptap/extension-code-block-lowlight';
	// import type Lowlight from 'lowlight';
	import { onDestroy, onMount } from 'svelte';
	export let token: Tokens.Code;
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;
	let element: HTMLElement;
	let editor: Editor;
	const lowlight = createLowlight(all);
	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Markdown.configure({
					html: true, // Allow HTML input/output
					tightLists: true, // No <p> inside <li> in markdown output
					tightListClass: 'tight', // Add class to <ul> allowing you to remove <p> margins when tight
					bulletListMarker: '-', // <li> prefix in markdown output
					linkify: false, // Create links from "https://..." text
					breaks: false, // New lines (\n) in markdown input are converted to <br>
					transformPastedText: false, // Allow to paste markdown text in the editor
					transformCopiedText: false // Copied text is transformed to markdown
				}),
				CodeBlockLowlight.configure({
					lowlight
				})
			],
			content: token.raw // `<pre><code class="language-${token.lang}">${token.text}</code></pre>`
		});

		// console.log('html', editor.storage.markdown);
		// editor.commands.setCodeBlock();
	});
	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
	// let code = $state('let bool;');
	// function toggleAnimation() {
	// 	toggle = !toggle;
	// 	toggle ? (code = 'let bool = true;') : (code = 'let bool;');
	// }
	// $: console.log('Code token', token);
</script>

<svelte:element this="div" bind:this={element} />

<!-- <svelte:window on:click={toggleAnimation} /> -->

<!-- <WysiwygEditor value={token.text} codeLang={token.lang} /> -->

<!-- <pre><code class={`lang-${token.lang}`}>{token.text}</code></pre> -->
