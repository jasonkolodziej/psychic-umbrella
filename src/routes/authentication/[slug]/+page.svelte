<script lang="ts">
	import type { PageData } from '../../authentication copy/[slug]/$types';
	export let data: PageData;
</script>

<svelte:component this={data.content} />
