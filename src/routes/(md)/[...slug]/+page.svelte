<script lang="ts">
	import type { PageData } from './$types';
	import { onMount, type SvelteComponent } from 'svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import Post from '$components/blog/ui/post/Post.svelte';

	// import '$lib/styles/markdown.scss';
	// import '$lib/styles/coldark.scss';
	import '../../../app.pcss';
	export let data: PageData;

	let mounted = false;
	let clientSideComponent: typeof SvelteComponent | null = null;
	async function renderClientSideComponent() {
		// Load a reactive version of the page to keep reactivity
		const pages = import.meta.glob('../../../pages/**/*.svelte.md');
		const path = $page.url.pathname.slice(base.length).slice(1);
		const match = pages[`../../../pages/${path}.svelte.md`];
		clientSideComponent = ((await match()) as { default: typeof SvelteComponent }).default;
	}

	onMount(() => {
		mounted = true;
		renderClientSideComponent();
	});

	$: if (mounted) {
		$page.url;
		clientSideComponent = null;
		renderClientSideComponent();
		console.log('rendered', data);
	}
</script>

<svelte:head>
	<title>{data.metadata['title']}</title>
</svelte:head>

<!-- <h3 class="mb-2 font-semibold text-sky-300">{data.metadata['section']}</h3>

<h1 class="mb-4 text-5xl font-bold text-white">{data.metadata['title']}</h1> -->

<!-- <main class="p-4">

</main> -->

<div class="markdown">
	{#if data.blogPost}
		<Post blog={data.blogPost} />
	{:else if clientSideComponent}
		<svelte:component this={clientSideComponent} />
	{:else}
		{#key $page.url}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html data.content.html}
		{/key}
	{/if}
</div>
<!-- </main> -->
