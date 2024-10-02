<script lang="ts">
	import { GradientButton, Tooltip } from 'flowbite-svelte';
	import type { Editor } from 'svelte-tiptap';

	import { TableRowOutline } from 'flowbite-svelte-icons';
	import { ListChecked } from 'carbon-icons-svelte';

	export let editor: Editor;
	export let outline: boolean = true;
</script>

{#if editor}
	<GradientButton
		size="xs"
		on:click={() =>
			editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
		outline
		color="pinkToOrange"
	>
		<TableRowOutline size="sm" />
	</GradientButton>
	<Tooltip>Add Table</Tooltip>
{/if}
