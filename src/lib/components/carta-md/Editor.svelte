<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { emoji } from '@cartamd/plugin-emoji';
	import { slash } from '@cartamd/plugin-slash';
	import { code } from '@cartamd/plugin-code';
	import DOMPurify from 'isomorphic-dompurify';

	import 'carta-md/default.css'; /* Default theme */
	import '../../../app.css';
	import { FlowbiteHeading } from '$components/flowbite/mappings';

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
			FlowbiteHeading
		],
		theme: {
			light: 'github-light',
			dark: 'github-dark'
		}
	});

	let value = '';
</script>

<MarkdownEditor bind:value bind:mode {carta} />
