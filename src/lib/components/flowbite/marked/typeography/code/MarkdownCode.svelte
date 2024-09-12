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
	let toggle: boolean = false;

	const highlighter = createHighlighter({
		themes: ['nord'],
		langs: [token.lang as string]
	});
	let lang = token.lang as unknown as BundledLanguage;
	// function toggleAnimation() {
	// 	toggle = !toggle;
	// 	toggle ? (code = 'let bool = true;') : (code = 'let bool;');
	// }
	$: console.log('Code token', token);
</script>

<!-- <svelte:window on:click={toggleAnimation} /> -->
<!-- <WysiwygEditor value={token.text} /> -->
{#await highlighter then highlighter}
	<!-- <ShikiMagicMove
		lang="ts"
		theme="poimandres"
		options={{ duration: 600, stagger: 3 }}
		onStart={() => console.log('start')}
		onEnd={() => console.log('end')}
		{highlighter}
		{code}
	/> -->
	<!-- <pre bind:this={container} class="shiki-magic-move-container"> -->
	<pre>
		{#await highlighter.codeToHtml(token.text, { lang: lang, theme: 'nord' }) then html}
			{#if html}
				{@html html}
			{:else}
				<code class={`lang-${token.lang}`}>{token.text}</code>
			{/if}
		{/await}
		<!-- render initial tokens for SSR -->

	</pre>
{/await}

<!-- <pre><code class={`lang-${token.lang}`}>{token.text}</code></pre> -->
