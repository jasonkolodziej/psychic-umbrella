<!-- Img.svelte -->
<script lang="ts">
	import type { Tokens } from 'marked';
	import type { MarkdownOptions, Renderers } from '@magidoc/plugin-svelte-marked';
	import { Img } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';

	export let token: Tokens.Image &
		Tokens.Generic &
		ComponentProps<Img> & { radiusBorder: boolean; retinaReady: boolean };
	export let options: MarkdownOptions;
	export let renderers: Renderers;
	const radiusBorder = token.radiusBorder ?? true;
	// let srcset
	let size = token.radiusBorder ? 'max-w-lg' : token.retinaReady ? 'w-full max-w-xl' : '';
	let imgClass = token.radiusBorder || token.retinaReady ? 'rounded-lg' : '';

	let caption: string = undefined;
</script>

<Img src={token.href} title={token.title} alt={token.text} bind:caption bind:size bind:imgClass />

<!-- <style>
	.custom-image {
		max-width: 50%;
	}
</style> -->
