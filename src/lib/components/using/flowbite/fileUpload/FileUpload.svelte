<!-- ? Reference: https://flowbite-svelte.com/docs/forms/file-input -->
<script lang="ts">
	import { uploadFile, type UploadedFile } from '$lib/media/fileUtils';
	// import { Editor } from '@tiptap/core';
	import { createEventDispatcher } from 'svelte';
	import {
		Fileupload,
		Label,
		Listgroup,
		ListgroupItem,
		Dropzone,
		P,
		Helper,
		Progressbar
	} from 'flowbite-svelte';
	import { CloudArrowUpOutline } from 'flowbite-svelte-icons';
	// To use on events
	const dispatch = createEventDispatcher<{
		uploaded: Partial<UploadedFile>;
		drop: null;
		change: null;
		// clicked: number,
		// update: JSONContent;
	}>();
	// export let uploadedCallback: (file: Partial<UploadedFile>) => void;
	export let multiple = false;
	export let dropzone = true;
	export let label: string = multiple ? 'Upload files' : 'Upload file';
	// export let editor: Editor;
	let files: FileList; // FileList type
	let pendingFiles: Array<File | Promise<Partial<UploadedFile>>> = [];
	let value: string;
	const dropHandle = (event: DragEvent) => {
		console.log('dropHandleEvent');
		// value = [];
		pendingFiles = [];
		event.preventDefault();
		const items = event.dataTransfer?.items ?? event.dataTransfer?.files;
		if (items) {
			const itemsArray = Array.from(items as Iterable<File>);
			console.log('dropHandle itemsArray', itemsArray);
			itemsArray.forEach((item) => {
				if (item instanceof File) {
					console.log('adding pending file', item.name);
					pendingFiles.push(item);
				}
			});
			// if (items instanceof DataTransferItemList) {
			// }
		}

		// if (event.dataTransfer.items) {
		// 	[...event.dataTransfer.items].forEach((item, i) => {
		// 		if (item.kind === 'file') {
		// 			const file = item.getAsFile();
		// 			console.log('dropHandle file', file);
		// 			pendingFiles.push(file);
		// 			// value.push(file.name);
		// 			// value = value;
		// 		}
		// 	});
		// } else {
		// 	[...event.dataTransfer.files].forEach((file, i) => {
		// 		console.log('dropHandle file', file);
		// 		pendingFiles.push(file);
		// 		// value = file.name;
		// 	});
		// }
		pendingFiles.map((file) => {
			if (file instanceof File) {
				console.log('dropHandle uploading file', file);
				return uploadFile(file).then((uploadedFile) => {
					if (uploadedFile.fileObjectUrl) {
						console.log('uploadedFile using fileObjectUrl', uploadedFile);
						// editor.chain().focus().setImage({ src: uploadedFile.fileObjectUrl }).run();
						// we just have to dispatch an event somewhere and the parent component
						// will already know that this Component dispatches a 'loaded' CustomEvent
						dispatch('uploaded', uploadedFile);
						// uploadedCallback(uploadedFile);
					}
				});
			}
		});
	};

	const handleChange = (event: Event) => {
		console.log('handleChangeEvent');
		const files = event.target.files;
		if (files.length > 0) {
			pendingFiles = Array.from(files);
			pendingFiles.forEach((file) => {
				if (file instanceof File) {
					console.log('handleChangeEvent uploading file', file);
					return uploadFile(file).then((uploadedFile) => {
						if (uploadedFile.fileObjectUrl) {
							console.log('uploadedFile using fileObjectUrl', uploadedFile);
							// editor.chain().focus().setImage({ src: uploadedFile.fileObjectUrl }).run();
							// uploadedCallback(uploadedFile);
							dispatch('uploaded', uploadedFile);
							// dispatch('uploaded', { detail: uploadedFile });
						}
					});
				}
			});
			// value.push(files[0].name);
			// value = value;
		}
	};

	const showFiles = (files: FileList): string => {
		console.log('showFiles', files);
		if (files.length === 1) return files[0].name;
		let concat = '';
		pendingFiles = Array.from(files);
		pendingFiles.map((file) => {
			if (file instanceof File) {
				concat += file.name;
				concat += ',';
				concat += ' ';
			}
		});

		if (concat.length > 40) concat = concat.slice(0, 40);
		concat += '...';
		return concat;
	};
</script>

{#if dropzone}
	<Dropzone
		multiple
		id="dropzone"
		on:drop={dropHandle}
		on:dragover={(event) => {
			event.preventDefault();
		}}
		on:change={handleChange}
		bind:files
	>
		<CloudArrowUpOutline class="mb-3 h-10 w-10 text-gray-400" />
		<!-- {#if value.length === 0} -->
		{#if pendingFiles.length === 0}
			<P class="mb-2 text-sm text-gray-500 dark:text-gray-400">
				<span class="font-semibold">Click to upload</span> or drag and drop
			</P>
			<Helper class="text-xs text-gray-500 dark:text-gray-400"
				>SVG, PNG, JPG or GIF (MAX. 800x400px)</Helper
			>
		{:else}
			<!-- {#each pendingFiles as pendingFile}
				{#if pendingFile instanceof File}
					<Progressbar progress="50" size="h-2.5" labelOutside={pendingFile.name} color="green" />
				{/if}
			{/each} -->

			<!-- <P>{showFiles(files)}</P> -->
		{/if}
	</Dropzone>
{:else}
	<Label class="pb-2" for={multiple ? 'multiple_files' : undefined}>{label}</Label>
	<Fileupload id={multiple ? 'multiple_files' : undefined} bind:multiple bind:files bind:value />
	{#if multiple}
		<Listgroup items={files} let:item class="mt-2">
			{#if item}
				{item.name}
			{:else}
				<ListgroupItem>No files</ListgroupItem>
			{/if}
		</Listgroup>
	{:else}
		<Label>File: {value}</Label>
	{/if}
	<!-- <Fileupload bind:files {multiple}>
		<Label>{label}</Label>
	</Fileupload> -->
{/if}

<!-- {#if files}
	<Listgroup>
		{#each Array.from(files) as file}
			<ListgroupItem>{file.name}</ListgroupItem>
		{/each}
	</Listgroup>
{/if} -->
