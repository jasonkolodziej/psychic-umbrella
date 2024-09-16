<!-- ? Reference: https://flowbite-svelte.com/docs/forms/file-input -->
<script lang="ts">
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
	export let multiple = false;
	export let dropzone = true;
	export let label: string = multiple ? 'Upload files' : 'Upload file';
	let files: FileList; // FileList type
	let pendingFiles: Array<File> = [];
	let value: string;
	const dropHandle = (event: DragEvent) => {
		console.log('dropHandleEvent');
		// value = [];
		pendingFiles = [];
		event.preventDefault();
		if (event.dataTransfer.items) {
			[...event.dataTransfer.items].forEach((item, i) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					console.log('dropHandle file', file);
					pendingFiles.push(file);
					// value.push(file.name);
					// value = value;
				}
			});
		} else {
			[...event.dataTransfer.files].forEach((file, i) => {
				console.log('dropHandle file', file);
				pendingFiles.push(file);
				// value = file.name;
			});
		}
	};

	const handleChange = (event: Event) => {
		console.log('handleChangeEvent');
		const files = event.target.files;
		console.log('handleChange', files);
		if (files.length > 0) {
			pendingFiles = Array.from(files);
			// value.push(files[0].name);
			// value = value;
		}
	};

	const showFiles = (files: FileList): string => {
		console.log('showFiles', files);
		if (files.length === 1) return files[0].name;
		let concat = '';
		pendingFiles = Array.from(files);
		pendingFiles.map((file: File) => {
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
			{#each pendingFiles as pendingFile}
				<Progressbar progress="50" size="h-2.5" labelOutside={pendingFile.name} color="green" />
			{/each}

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
