<script lang="ts">
	//? Editor
	import { Editor } from '@tiptap/core';
	// import { FloatingMenu } from '@tiptap/extension-floating-menu';
	// import { BubbleMenu } from '@tiptap/extension-bubble-menu';
	import {
		ButtonGroup,
		GradientButton,
		Button,
		Dropdown,
		DropdownItem,
		Tooltip
	} from 'flowbite-svelte';
	import {
		LetterBoldOutline,
		LetterItalicOutline,
		LetterUnderlineOutline,
		ChevronDownOutline,
		TableRowOutline,
		ArrowRightOutline,
		ArrowLeftOutline,
		CirclePlusOutline,
		CircleMinusOutline
	} from 'flowbite-svelte-icons';
	import {
		TextStrikethrough,
		TextScale,
		TextSubscript,
		TextSuperscript,
		Column,
		Delete,
		DirectionMerge,
		Split,
		IbmToolchain,
		TextHighlight,
		TextColor,
		Row
	} from 'carbon-icons-svelte';
	import { twMerge } from 'tailwind-merge';
	// determine if the user prefers dark mode
	export let isDark: boolean;
	export let tableActive: boolean = false;
	let openRowTools: boolean;
	let openColumnTools: boolean;
	export let editor: Editor;
	export let bubbleMenu: HTMLElement;
	let outline = true;
</script>

<svelte:element this="div" bind:this={bubbleMenu}>
	<!-- ? Example: class="bubble-menu" -->
	<!-- ? Example: class={editor.isActive('bold') ? 'is-active' : ''} -->
	{#if editor}
		<ButtonGroup class="space-x-px">
			<GradientButton
				size="xs"
				outline={editor.isActive('bold') ? false : true}
				color="purpleToBlue"
				on:click={(e) => editor.chain().focus().toggleBold().run()}
			>
				<LetterBoldOutline size="sm" />
			</GradientButton>
			<Tooltip>Toggle Bold</Tooltip>
			<GradientButton
				size="xs"
				outline={editor.isActive('italic') ? false : true}
				color="purpleToBlue"
				on:click={() => editor.chain().focus().toggleItalic().run()}
			>
				<LetterItalicOutline size="sm" />
			</GradientButton>
			<Tooltip>Toggle Italic</Tooltip>
			<GradientButton
				size="xs"
				outline={editor.isActive('strike') ? false : true}
				color="cyanToBlue"
				on:click={() => editor.chain().focus().toggleStrike().run()}
			>
				<TextStrikethrough />
			</GradientButton>
			<Tooltip>Toggle Strikethrough</Tooltip>
			<GradientButton
				size="xs"
				outline={editor.isActive('underline') ? false : true}
				color="cyanToBlue"
				on:click={() => editor.chain().focus().toggleUnderline().run()}
			>
				<LetterUnderlineOutline size="sm" />
			</GradientButton>
			<Tooltip>Toggle Underline</Tooltip>
			<GradientButton
				size="xs"
				outline={editor.isActive('subscript') ? false : true}
				color="greenToBlue"
				on:click={() => editor.chain().focus().toggleSubscript().run()}
			>
				<TextSubscript />
			</GradientButton>
			<Tooltip>Toggle Text Subscript</Tooltip>
			<GradientButton
				size="xs"
				outline={editor.isActive('superscript') ? false : true}
				color="greenToBlue"
				on:click={() => editor.chain().focus().toggleSuperscript().run()}
			>
				<TextSuperscript />
			</GradientButton>
			<Tooltip>Toggle Text Superscript</Tooltip>
			<!-- * Set text highlight color -->
			<Button size="xs" color="light">
				<TextHighlight />
				<input
					on:input={(event) =>
						editor.chain().focus().setHighlight({ color: event.target.value }).run()}
					value={editor.getAttributes('highlight').color}
					type="color"
					class={twMerge(
						// 'inline-flex w-full items-center justify-center !rounded-md !border-0 bg-white px-3 py-2 text-xs !text-gray-900 transition-all duration-75 ease-in first:rounded-s-lg last:rounded-e-lg focus-within:z-10 focus-within:ring-2 hover:bg-transparent hover:!text-inherit group-hover:!bg-opacity-0 group-hover:!text-inherit dark:bg-gray-900 dark:!text-white [&:not(:first-child)]:-ms-px',
						'h-4 w-5 cursor-pointer justify-center !rounded-md !border-0 bg-inherit px-0 py-0 text-xs hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50 group-hover:!bg-opacity-0 [&:not(:first-child)]:-ms-px'
					)}
				/>
			</Button>
			<Tooltip>Text Highlight</Tooltip>
			<!-- * Set Text Color -->
			<Button size="xs" color="light">
				<TextColor />
				<input
					on:input={(event) => editor.chain().focus().setColor(event.target.value).run()}
					value={editor.getAttributes('textStyle').color}
					type="color"
					class={twMerge(
						// 'inline-flex w-full items-center justify-center !rounded-md !border-0 bg-white px-3 py-2 text-xs !text-gray-900 transition-all duration-75 ease-in first:rounded-s-lg last:rounded-e-lg focus-within:z-10 focus-within:ring-2 hover:bg-transparent hover:!text-inherit group-hover:!bg-opacity-0 group-hover:!text-inherit dark:bg-gray-900 dark:!text-white [&:not(:first-child)]:-ms-px',
						'h-4 w-5 cursor-pointer justify-center !rounded-md !border-0 bg-inherit px-0 py-0 text-xs hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50 group-hover:!bg-opacity-0 [&:not(:first-child)]:-ms-px'
					)}
				/>
			</Button>
			<Tooltip>Text Color</Tooltip>
		</ButtonGroup>
		{#if tableActive}
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
	{/if}
</svelte:element>
