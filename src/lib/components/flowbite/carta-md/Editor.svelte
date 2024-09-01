<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { emoji } from '@cartamd/plugin-emoji';
	import { slash } from '@cartamd/plugin-slash';
	import { code } from '@cartamd/plugin-code';
	import { component } from '@cartamd/plugin-component';
	import DOMPurify from 'isomorphic-dompurify';

	import 'carta-md/default.css'; /* Default theme */
	import '../../../app.css';
	import { mappedFlow, FlowbiteInitializer } from '$components/flowbite/mappings';
	import type { initializeComponents } from '@cartamd/plugin-component/svelte';

	export let mode: 'auto' | 'split' | 'tabs' = 'auto';

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
			// FlowbiteHeading,
			// FlowbiteParagraph
			component(mappedFlow, FlowbiteInitializer)
			// FlowbiteLink
		],
		theme: {
			light: 'github-light',
			dark: 'github-dark'
		}
	});

	let value = '';
</script>

<MarkdownEditor bind:value bind:mode {carta} />
