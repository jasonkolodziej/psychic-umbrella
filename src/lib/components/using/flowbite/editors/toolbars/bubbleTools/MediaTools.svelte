<script lang="ts">
	import { ButtonGroup, GradientButton, Tooltip } from 'flowbite-svelte';
	import {
		BarsFromLeftOutline,
		AlignCenterOutline,
		BarsOutline,
		AngleRightOutline
	} from 'flowbite-svelte-icons';
	import type { Editor } from 'svelte-tiptap';

	export let editor: Editor;
	export let outline: boolean = true;
</script>

{#if editor}
	<!-- * for use with custom extension
 * on:click={() => editor.chain().focus().updateAttributes('image', { align: 'right' }).run()} -->
	<ButtonGroup>
		<GradientButton
			bind:outline
			color="pinkToOrange"
			on:click={() => editor.chain().focus().updateAttributes('image', { align: 'left' }).run()}
		>
			<BarsFromLeftOutline size="sm" />
		</GradientButton>
		<Tooltip>Align Left</Tooltip>
		<GradientButton
			bind:outline
			color="pinkToOrange"
			on:click={() => editor.chain().focus().updateAttributes('image', { align: 'center' }).run()}
		>
			<AlignCenterOutline size="sm" />
		</GradientButton>
		<Tooltip>Align Center</Tooltip>
		<GradientButton
			bind:outline
			color="pinkToOrange"
			on:click={() => editor.chain().focus().updateAttributes('image', { align: 'right' }).run()}
		>
			<BarsOutline size="sm" />
			<AngleRightOutline size="sm" />
		</GradientButton>
		<Tooltip>Align Right</Tooltip>
	</ButtonGroup>
{/if}
