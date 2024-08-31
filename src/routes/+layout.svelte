<script>
	import modeobserver from '$lib/utils/modeObserver';
	import { onMount } from 'svelte';
	import Runatics from '$lib/utils/Runatics.svelte';
	import '../app.css';

	// import { Section } from 'flowbite-svelte-blocks';
	// export let data;
	// const analyticsId = data.ANALYTICS_ID;

	onMount(modeobserver);
</script>

<!-- <Runatics {analyticsId} /> -->
<slot />
