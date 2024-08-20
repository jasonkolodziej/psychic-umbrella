<script>
	import modeobserver from '$lib/utils/modeObserver';
	import { onMount } from 'svelte';
	import Runatics from '$lib/utils/Runatics.svelte';
	export let data;
	const analyticsId = data.ANALYTICS_ID;

	onMount(modeobserver);
</script>

<Runatics {analyticsId} />
<slot />
