<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { attachment } from '@cartamd/plugin-attachment';
	import { emoji } from '@cartamd/plugin-emoji';
	import { slash } from '@cartamd/plugin-slash';
	import { code } from '@cartamd/plugin-code';
	import DOMPurify from 'isomorphic-dompurify';
	import { component, type Initializer } from '@cartamd/plugin-component';
	import { svelte, svelteCustom, initializeComponents } from '@cartamd/plugin-component/svelte';
	import { initializeFlowbiteComponents } from '$components/flowbite/carta';
	import Heading from '$components/carta-md/Heading.svelte';
	import type * as hast from 'hast';
	// import PreRenderedHeader from './elements/PrerenderedHeader.svelte';
	// import Heading from './elements/Heading.svelte';
	// GitHub theme
	import '../../../app.css';
	// import PrerenderedHeader from './elements/PrerenderedHeader.svelte';

	// import '$lib/styles/github.scss';
	// import 'carta-md/default.css'; /* Default theme */

	export let mode: 'auto' | 'split' | 'tabs' = 'auto';
	// ? "h1", "h2", "h3", "h4", "h5", "h6", "p", "blockquote", "ul", "ol", "li", "hr", "table", "thead", "tbody", "tr", "th", "td", "pre", "code", "em", "strong", "del", "a", "img"
	const mapped = [
		svelte('h1', Heading),
		svelte('h2', Heading)
		// svelteCustom(
		// 	'custom-heading',
		// 	(node: hast.Element) => {
		// 		const tagName = node.tagName;
		// 		const elem = node;
		// 		node.properties = { tag: tagName };
		// 		console.log('using svelteCustom', { nodeTagName: tagName, hastNode: elem });
		// 		return true;
		// 	},
		// 	Heading
		// )
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
			component(mapped, initializeFlowbiteComponents)
		]
	});

	let value = '';
</script>

<MarkdownEditor bind:value bind:mode {carta} theme="github" />
