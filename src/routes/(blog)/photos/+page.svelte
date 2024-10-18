<script lang="ts">
	import FileUpload from '$components/using/flowbite/fileUpload/FileUpload.svelte';
	import Gallery from '$components/using/flowbite/media/gallery/Gallery.svelte';
	import type { ImgType } from 'flowbite-svelte';
	import { onMount, type ComponentEvents } from 'svelte';
	import type { PageData } from './$types';
	import { getObjectFromUrl, type ExtendedImgType } from '$lib/media/fileUtils';
	import { writableGallery } from '$components/using/flowbite/media/gallery/store';
	// import { PageData } from '$types';
	export let data: PageData;
	// let items: ExtendedImgType[] = data.items;
	//? Event method handler for uploaded files
	const mediaStore = writableGallery();
	type UploadedEventType = ComponentEvents<FileUpload>['uploaded'];
	const handleUploaded = ({ detail }: UploadedEventType) => {
		console.log('handleUploaded (alt callback, using events)');
		// if (detail.fileObjectUrl) {
		mediaStore.update((value) => {
			value.push({
				src: detail.fileObjectUrl!,
				alt: 'kk',
				onload: () => {
					console.log('Image loaded');
					URL.revokeObjectURL(detail.fileObjectUrl!);
				}
			});
			return value;
		});
		// items.push({
		// 	src: detail.fileObjectUrl!,
		// 	alt: 'kk'
		// 	// onload: () => {
		// 	// 	console.log('Image loaded');
		// 	// 	URL.revokeObjectURL(detail.fileObjectUrl!);
		// 	// }
		// });
		// console.log('items are now:', items);

		// }
	};
	onMount(() => mediaStore.set(data.items));
</script>

<main class="p-4">
	<FileUpload dropzone on:uploaded={handleUploaded} />

	<Gallery />
</main>
