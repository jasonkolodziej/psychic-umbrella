<script lang="ts">
	//? Editor
	import { Editor } from '@tiptap/core';
	import { ButtonGroup, GradientButton, Tooltip, DropdownItem, Dropdown, P } from 'flowbite-svelte';
	import {
		TableRowOutline,
		ImageOutline,
		ListOutline,
		OrderedListOutline,
		ChevronDownOutline,
		ParagraphOutline,
		QuoteOutline
	} from 'flowbite-svelte-icons';
	import { ListChecked, TextScale } from 'carbon-icons-svelte';
	import { defaultFlowbiteStarterkitOpts } from '$components/tiptap/starterkitOpts';
	import FileUpload from '$components/using/flowbite/fileUpload/FileUpload.svelte';
	import type { UploadedFile } from '$lib/media/fileUtils';
	import type { ComponentEvents } from 'svelte';
	import TypographyTools from './floatingTools/TypographyTools.svelte';
	import ListTools from './floatingTools/ListTools.svelte';
	import MediaTools from './floatingTools/MediaTools.svelte';
	import TableTools from './floatingTools/TableTools.svelte';
	// determine if the user prefers dark mode
	export let isDark: boolean;
	// export let tableActive: boolean;
	export let editor: Editor;
	export let floatingMenu: HTMLElement;
	let showUploader: boolean = false;
	//? Event method handler for uploaded files
	type UploadedEventType = ComponentEvents<FileUpload>['uploaded'];
	const handleUploaded = ({ detail }: UploadedEventType) => {
		// dispatch('loaded', detail);
		console.log('handleUploaded (alt callback, using events)', detail);
		//? using image extension
		// editor.chain().focus().setImage({ src: detail.fileObjectUrl!, alt: detail.file?.name }).run();
		editor
			.chain()
			.focus()
			.setMedia({ 'media-type': 'img', src: detail.fileObjectUrl!, alt: detail.file?.name })
			.run();
		showUploader = false;
	};
	//? Alternative method to handle uploaded files using callback
	const uploadedCallback = (file: Partial<UploadedFile>) => {
		console.log('uploadedCallback', file);
		editor.chain().focus().setImage({ src: file.fileObjectUrl!, alt: file.file?.name }).run();
		showUploader = false;
	};
</script>

<!-- ? Example: class="floating-menu" -->
<svelte:element this="div" bind:this={floatingMenu}>
	{#if editor}
		<!-- ? Example: class={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} -->
		<!-- ? Example <Button size="xs" color={editor.isActive('heading', { level: 1 }) ? (isDark ? 'light' : 'dark') : 'light'} -->
		<!-- ? on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}> H1 </Button> -->
		<ButtonGroup>
			<!-- * Text tools -->
			<TypographyTools bind:editor />
			<!-- * List tools -->
			<ListTools bind:editor />
			<!-- * Image uploader -->
			<MediaTools bind:editor bind:showUploader />
			<!-- * Table creator -->
			<TableTools bind:editor />
		</ButtonGroup>
	{/if}

	{#if showUploader === true}
		<!-- <FileUpload
			dropzone
			on:uploaded={({ detail }) => {
				console.log('on:uploaded', detail);
				editor.chain().focus().setImage({ src: detail.file }).run();
				detail.revokeObjectUrl;
			}}
		/> -->
		<!-- <FileUpload dropzone {uploadedCallback} /> -->
		<FileUpload dropzone on:uploaded={handleUploaded} />
	{/if}
</svelte:element>
