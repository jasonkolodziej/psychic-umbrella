<script lang="ts">
	import Markdown, { type Renderers } from '@magidoc/plugin-svelte-marked';
	import { marked } from 'marked';
	// ? Step 1, import our custom extension
	// import BackgroundColor from '$components/flowbite/marked/extensions/BackgroundColor.svelte';
	import {
		customOptions,
		mappedRenderers as renderers
	} from '$components/flowbite/marked/configuration';

	//? Step 2, register our custom extension
	marked.use(customOptions);
	export let source: string = '';
</script>

<Markdown bind:source {renderers} />
