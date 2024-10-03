<script lang="ts">
	import FileUpload from '$components/using/flowbite/fileUpload/FileUpload.svelte';
	import Gallery from '$components/using/flowbite/gallery/Gallery.svelte';
	import type { ImgType } from 'flowbite-svelte';
	import type { ComponentEvents } from 'svelte';
	import type { PageData } from './$types';
	// import { PageData } from '$types';
	export let data: PageData;
	let items: ImgType[] = data.items;
	//? Event method handler for uploaded files
	type UploadedEventType = ComponentEvents<FileUpload>['uploaded'];
	const handleUploaded = ({ detail }: UploadedEventType) => {
		console.log('handleUploaded (alt callback, using events)', detail);
		if (detail.fileObjectUrl) {
			items.push({ src: detail.fileObjectUrl!, alt: detail.file?.name });
		}
	};
	// export let data: PageData;
</script>

<main class="p-4">
	<FileUpload dropzone on:uploaded={handleUploaded} />
	{#key items}
		<Gallery bind:items />
	{/key}
</main>
