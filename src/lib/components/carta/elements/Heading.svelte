<script lang="ts">
	import { Heading, P, A } from 'flowbite-svelte';
	import { Slot } from '@cartamd/plugin-component/svelte';

	export let tagName: any;

	$: console.log('Heading', tagName);
</script>

<Heading>
	<Slot />
</Heading>
