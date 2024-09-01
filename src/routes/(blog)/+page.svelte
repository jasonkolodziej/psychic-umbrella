<script lang="ts">
	import Renderer from '$components/flowbite/marked/Renderer.svelte';

	// import Editor from '$components/carta-md/Editor.svelte';
	// import AceEditor from '$components/ace/editor.svelte';

	/**
		** Pages can break out of the current layout hierarchy on a route-by-route basis. 
		** Suppose we have an /item/[id]/embed route inside the (app) group from the previous example:
		src/routes/
		├ (app)/
		│ ├ item/
		│ │ ├ [id]/
		│ │ │ ├ embed/
	** +│ │ │ │ └ +page.svelte
		│ │ │ └ +layout.svelte
		│ │ └ +layout.svelte
		│ └ +layout.svelte
		└ +layout.svelte
		Ordinarily, this would inherit the root layout, the (app) layout, 
		the item layout and the [id] layout. We can reset to one of those layouts by appending @ followed 
		by the segment name — or, for the root layout, the empty string. In this example, we can choose from the following options:

	** +page@[id].svelte - inherits from src/routes/(app)/item/[id]/+layout.svelte
	** +page@item.svelte - inherits from src/routes/(app)/item/+layout.svelte
	** +page@(app).svelte - inherits from src/routes/(app)/+layout.svelte
	** +page@.svelte - inherits from src/routes/+layout.svelte
    */

	// import Editor from '$lib/components/carta/Editor.svelte';
	// import Playground from 'mdsvex-playground';
	// import Playground from '$lib/components/mdsvex/Playground.svelte';
</script>

<main class="p-4">
	<!-- <Playground /> -->
	<!-- <Sections /> -->
	<Renderer />
	<!-- <Editor /> -->
</main>
