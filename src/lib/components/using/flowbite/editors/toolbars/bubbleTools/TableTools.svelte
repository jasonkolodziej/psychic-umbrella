<script lang="ts">
	import {
		TextScale,
		Column,
		Delete,
		DirectionMerge,
		Split,
		IbmToolchain,
		Row
	} from 'carbon-icons-svelte';
	import { ButtonGroup, DropdownItem, Dropdown, GradientButton, Tooltip } from 'flowbite-svelte';
	import {
		TableRowOutline,
		ChevronDownOutline,
		CirclePlusOutline,
		ArrowLeftOutline,
		ArrowRightOutline,
		CircleMinusOutline
	} from 'flowbite-svelte-icons';
	import type { Editor } from 'svelte-tiptap';

	export let editor: Editor;
	export let outline: boolean = true;
</script>

{#if editor}
	<ButtonGroup>
		<GradientButton
			bind:outline
			color="pinkToOrange"
			on:click={() => editor.chain().focus().deleteTable().run()}
		>
			<Delete />
			<TableRowOutline size="sm" />
		</GradientButton>
		<Tooltip>Delete Table</Tooltip>

		<!-- * Row tools -->
		<GradientButton size="xs" bind:outline color="pinkToOrange">
			<Row />
			<ChevronDownOutline size="xs" />
		</GradientButton>
		<Dropdown>
			<DropdownItem on:click={() => editor.chain().focus().toggleHeaderRow().run()}>
				<TextScale />
			</DropdownItem>
			<Tooltip>Toggle Header Row</Tooltip>
			<DropdownItem on:click={() => editor.chain().focus().addRowBefore().run()}>
				<CirclePlusOutline size="sm" />
				<ArrowLeftOutline size="sm" />
			</DropdownItem>
			<Tooltip>Add Row Before</Tooltip>
			<DropdownItem on:click={() => editor.chain().focus().addRowAfter().run()}>
				<CirclePlusOutline size="sm" />
				<ArrowRightOutline size="sm" />
			</DropdownItem>
			<Tooltip>Add Row After</Tooltip>
			<DropdownItem on:click={() => editor.chain().focus().deleteRow().run()}>
				<CircleMinusOutline size="sm" />
			</DropdownItem>
			<Tooltip>Delete Row</Tooltip>
		</Dropdown>

		<!-- * Column tools -->
		<GradientButton size="xs" bind:outline color="pinkToOrange">
			<Column />
			<ChevronDownOutline size="xs" />
		</GradientButton>
		<Dropdown>
			<DropdownItem on:click={() => editor.chain().focus().toggleHeaderColumn().run()}>
				<TextScale />
			</DropdownItem>
			<Tooltip>Toggle Header Column</Tooltip>
			<DropdownItem on:click={() => editor.chain().focus().addColumnBefore().run()}>
				<CirclePlusOutline size="xs" />
				<ArrowLeftOutline size="xs" />
			</DropdownItem>
			<Tooltip>Add Column before</Tooltip>
			<DropdownItem on:click={() => editor.chain().focus().addColumnAfter().run()}>
				<CirclePlusOutline size="sm" />
				<ArrowRightOutline size="sm" />
			</DropdownItem>
			<Tooltip>Add Column after</Tooltip>
			<DropdownItem on:click={() => editor.chain().focus().deleteColumn().run()}>
				<CircleMinusOutline size="sm" />
			</DropdownItem>
			<Tooltip>Delete Column</Tooltip>
		</Dropdown>
		<GradientButton
			bind:outline
			color="pinkToOrange"
			on:click={() => editor.chain().focus().mergeCells().run()}
		>
			<DirectionMerge />
		</GradientButton>
		<Tooltip>Merge Cells</Tooltip>
		<GradientButton
			bind:outline
			color="pinkToOrange"
			on:click={() => editor.chain().focus().splitCell().run()}
		>
			<Split />
		</GradientButton>
		<Tooltip>Split Cells</Tooltip>
		<GradientButton
			bind:outline
			color="pinkToOrange"
			on:click={() => editor.chain().focus().fixTables().run()}
		>
			<IbmToolchain />
		</GradientButton>
		<Tooltip>Fix Table</Tooltip>
		<GradientButton
			bind:outline
			color="pinkToOrange"
			on:click={() => editor.chain().focus().toggleHeaderCell().run()}
		>
			<TextScale />
		</GradientButton>
		<Tooltip>Toggle Header Cell</Tooltip>
		<!-- <GradientButton
		color="pinkToOrange"
		on:click={() => editor.chain().focus().mergeOrSplit().run()}
		>Merge or split</GradientButton
	>
	<GradientButton
		color="pinkToOrange"
		on:click={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}
	>
		Set cell attribute
	</GradientButton> -->
		<!-- <GradientButton
		color="pinkToOrange"
		on:click={() => editor.chain().focus().goToNextCell().run()}
		>Go to next cell</GradientButton
	>
	<GradientButton
		color="pinkToOrange"
		on:click={() => editor.chain().focus().goToPreviousCell().run()}
	>
		Go to previous cell
	</GradientButton> -->
	</ButtonGroup>
{/if}
