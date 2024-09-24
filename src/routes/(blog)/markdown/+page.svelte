<script lang="ts">
	import Renderer from '$components/using/flowbite/for/marked/Renderer.svelte';
	import { onMount } from 'svelte';
	const site =
		'https://gist.githubusercontent.com/allysonsilva/85fff14a22bbdf55485be947566cc09e/raw/fa8048a906ebed3c445d08b20c9173afd1b4a1e5/Full-Markdown.md';
	let classRef = 'w-full min-w-0 flex-auto lg:max-h-full lg:overflow-visible'; //"p-4"

	let src: string = undefined;

	onMount(() => {
		fetch(site)
			.then((response) => response.text())
			.then((text) => {
				src = text;
			});
	});
</script>

<main class={classRef}>
	{#key src}
		<Renderer source={src} />
	{/key}

	<!-- <Post {blog} /> -->
</main>
