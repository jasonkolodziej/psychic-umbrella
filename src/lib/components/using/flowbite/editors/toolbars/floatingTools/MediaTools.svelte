<script lang="ts">
	import { GradientButton, Tooltip } from 'flowbite-svelte';
	import type { Editor } from 'svelte-tiptap';

	import { ImageOutline } from 'flowbite-svelte-icons';
	import { ListChecked } from 'carbon-icons-svelte';

	export let editor: Editor;
	export let showUploader: boolean;
</script>

{#if editor}
	<GradientButton size="xs" on:click={() => (showUploader = true)} outline color="pinkToOrange">
		<ImageOutline size="sm" />
	</GradientButton>
	<Tooltip>Add Image(s)</Tooltip>
{/if}
