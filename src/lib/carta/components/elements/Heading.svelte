<script lang="ts">
	import { Heading, P, A } from 'flowbite-svelte';
	import { Slot } from '@cartamd/plugin-component/svelte';
	// export let data;
	export let tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | undefined = undefined;
	$: console.log('Heading', $$props);

	// $: console.log('Heading', tagName, level);
</script>

<Heading bind:tag>
	<Slot />
</Heading>
