<script lang="ts">
	import Renderer from '$components/using/flowbite/for/marked/Renderer.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Tiptap from '$components/tiptap/Tiptap.svelte';
	import Post from '$components/using/flowbite/blog/ui/post/Post.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Inbox from '$lib/utils/crud/Inbox.svelte';
	import Video from '$components/using/flowbite/media/video/Video.svelte';
	import SectionFeatured from '$components/using/flowbite/blog/ui/section/section-featured.svelte';
	import { SectionPricing } from '$components/using/flowbite/blog/ui/section';
	// import WysiwygEditor from '$components/flowbite/WYSIWYGEditor.svelte';
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
	export let data: PageData;
	// $: console.log(data);
	// let src = data.data;
	let classRef = 'w-full min-w-0 flex-auto lg:max-h-full lg:overflow-visible'; //"p-4"
	let { blog, comments } = data;
	//? this is for fetching the markdown file from a url
	// const site =
	// 	'https://gist.githubusercontent.com/allysonsilva/85fff14a22bbdf55485be947566cc09e/raw/fa8048a906ebed3c445d08b20c9173afd1b4a1e5/Full-Markdown.md';

	// let src: string = undefined;

	// onMount(() => {
	// 	fetch(site)
	// 		.then((response) => response.text())
	// 		.then((text) => {
	// 			src = text;
	// 		});
	// });
	// onMount(() => goto('/about'));
</script>

<main class={classRef}>
	<!-- <Inbox></Inbox> -->
	<!-- {#key src}
		<Renderer source={src} />
	{/key} -->

	<!-- <Post {blog} /> -->
	<!-- ? Huntdog llc -->
	<!-- <Video src="https://www.youtube.com/watch?v=JF0a5aoEGsw" /> -->
	<SectionFeatured />
	<SectionPricing />
</main>
