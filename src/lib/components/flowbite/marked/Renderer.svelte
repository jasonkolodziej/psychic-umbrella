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

<div class="flex w-full">
	<div
		class="pb:12 mx-auto flex min-w-0 max-w-4xl flex-col divide-y divide-gray-200 px-4 pt-6 lg:px-8 lg:pb-16 lg:pt-8 xl:pb-24 dark:divide-gray-800"
	>
		<div class="pb-8">
			<h1
				class="mb-2 inline-block w-full text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
			>
				Svelte Bottom Navigation - Flowbite
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-400">
				Use the bottom navigation bar component to allow users to navigate through your website or
				create a control bar using a menu that is positioned at the bottom of the page
			</p>
		</div>
		<div id="mainContent" class="py-8">
			<Markdown bind:source {renderers} />
		</div>
	</div>
</div>
