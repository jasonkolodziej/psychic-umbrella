<!-- ? Reference: https://flowbite-svelte.com/docs/forms/file-input -->
<script lang="ts">
	import { Fileupload, Label, Listgroup, ListgroupItem, Dropzone } from 'flowbite-svelte';
	export let multiple = false;
	export let dropzone = true;
	export let label: string = multiple ? 'Upload files' : 'Upload file';
	let files: FileList; // FileList type
	let filesArray: Array<File> = [];
	let value: string;
	const dropHandle = (event: DragEvent) => {
		console.log('dropHandleEvent');
		// value = [];
		filesArray = [];
		event.preventDefault();
		if (event.dataTransfer.items) {
			[...event.dataTransfer.items].forEach((item, i) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					console.log('dropHandle file', file);
					filesArray.push(file);
					// value.push(file.name);
					// value = value;
				}
			});
		} else {
			[...event.dataTransfer.files].forEach((file, i) => {
				console.log('dropHandle file', file);
				filesArray.push(file);
				// value = file.name;
			});
		}
	};

	const handleChange = (event: Event) => {
		console.log('handleChangeEvent');
		const files = event.target.files;
		console.log('handleChange', files);
		if (files.length > 0) {
			filesArray = Array.from(files);
			// value.push(files[0].name);
			// value = value;
		}
	};

	const showFiles = (files: FileList): string => {
		console.log('showFiles', files);
		if (files.length === 1) return files[0].name;
		let concat = '';
		filesArray = Array.from(files);
		filesArray.map((file: File) => {
			concat += file.name;
			concat += ',';
			concat += ' ';
		});

		if (concat.length > 40) concat = concat.slice(0, 40);
		concat += '...';
		return concat;
	};
</script>

{#if dropzone}
	<!-- <Dropzone bind:files>
		<Label>{label}</Label>
	</Dropzone> -->
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
		<svg
			aria-hidden="true"
			class="mb-3 h-10 w-10 text-gray-400"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
			/></svg
		>
		<!-- {#if value.length === 0} -->
		{#if filesArray.length === 0}
			<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
				<span class="font-semibold">Click to upload</span> or drag and drop
			</p>
			<p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
		{:else}
			<p>{showFiles(files)}</p>
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
