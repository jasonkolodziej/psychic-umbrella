<script lang="ts">
	import { initializeComponents, svelte } from '@cartamd/plugin-component/svelte';
	import { PreRendered } from 'carta-md';
	import { Heading } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	// ...

	export let data;

	let container;

	// Needs access to the mapped components
	const mapped = [
		svelte('h1', Heading)
		// svelte('h2', new Heading({ tag: 'h2' }))
		// svelte('h3', Heading),
		// svelte('h4', Heading)
		// svelteCustom(
		// 	'heading-',
		// 	(node: any) => {
		// 		console.log(node);
		// 		// Do something with the node to determine whether to replace it
		// 		node.properties.level = node.tagName;
		// 		return true;
		// 	},
		// 	Heading
		// )
	];

	onMount(() => {
		initializeComponents(mapped, container);
		console.log('container', container);
		console.log('data', data);
	});
</script>

<div bind:this={container}>
	<PreRendered html={data.html} />
</div>
