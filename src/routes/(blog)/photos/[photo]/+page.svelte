<script lang="ts">
	import { page } from '$app/stores';
	import type { RouteParams } from './$types';
	// import MediaItem from '$lib/components/media/MediaItem.svelte';
	import type { UploadedFile } from '$lib/media/fileUtils';

	export let media: UploadedFile;
	$: console.log($page.route, $page.data);
	$: console.log(media);
</script>

<!-- <MediaItem {media} /> -->
