<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { attachment } from '@cartamd/plugin-attachment';
	import { emoji } from '@cartamd/plugin-emoji';
	import { slash } from '@cartamd/plugin-slash';
	import { code } from '@cartamd/plugin-code';
	import DOMPurify from 'isomorphic-dompurify';
	import { component } from '@cartamd/plugin-component';
	import { svelte, svelteCustom, initializeComponents } from '@cartamd/plugin-component/svelte';
	import { Heading } from 'flowbite-svelte';
	// import PreRenderedHeader from './elements/PrerenderedHeader.svelte';
	// import Heading from './elements/Heading.svelte';
	// GitHub theme
	import '../../../app.css';
	import { SvelteComponent } from 'svelte';
	// import PrerenderedHeader from './elements/PrerenderedHeader.svelte';

	// import '$lib/styles/github.scss';
	// import 'carta-md/default.css'; /* Default theme */

	export let mode: 'auto' | 'split' | 'tabs' = 'auto';
	// ? "h1", "h2", "h3", "h4", "h5", "h6", "p", "blockquote", "ul", "ol", "li", "hr", "table", "thead", "tbody", "tr", "th", "td", "pre", "code", "em", "strong", "del", "a", "img"
	const mapped = [
		svelte('h1', () => {
			return new Heading({ props: { tag: 'h1', color: undefined, customSize: undefined } });
		})
	];
	const carta = new Carta({
		sanitizer: DOMPurify.sanitize,
		// sanitizer: false,
		extensions: [
			// attachment({
			// 	async upload() {
			// 		return 'some-url-from-server.xyz';
			// 	}
			// }),
			emoji(),
			slash(),
			code(),
			component(mapped, initializeComponents)
		]
	});

	let value = '';
</script>

<MarkdownEditor bind:value bind:mode {carta} theme="github" />
