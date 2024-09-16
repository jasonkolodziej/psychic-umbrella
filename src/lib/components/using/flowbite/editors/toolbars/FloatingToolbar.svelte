<script lang="ts">
	//? Editor
	import { Editor } from '@tiptap/core';
	import { defaultFlowbiteStarterkitOpts } from '$components/tiptap/starterkitOpts';
	import {
		ButtonGroup,
		GradientButton,
		Button,
		Dropdown,
		DropdownItem,
		Modal,
		Indicator,
		P,
		Tooltip
	} from 'flowbite-svelte';
	import {
		LetterBoldOutline,
		LetterItalicOutline,
		LetterUnderlineOutline,
		ParagraphOutline,
		ChevronDownOutline,
		OrderedListOutline,
		ListOutline,
		TableRowOutline,
		QuoteOutline,
		ImageOutline
	} from 'flowbite-svelte-icons';
	import {
		TextStrikethrough,
		TextScale,
		TextSubscript,
		TextSuperscript,
		ListChecked,
		// ? Row Icons
		RowExpand,
		RowCollapse,
		RowDelete,
		RowInsert,
		ColumnDelete,
		ColumnInsert,
		Column,
		Add,
		Delete,
		DirectionMerge,
		Split,
		IbmToolchain,
		ArrowUp,
		ArrowDown,
		Row
	} from 'carbon-icons-svelte';
	import { twMerge } from 'tailwind-merge';
	// determine if the user prefers dark mode
	export let isDark: boolean;
	// export let tableActive: boolean;
	export let editor: Editor;
	export let floatingMenu: HTMLElement;
	let showUploader: boolean = false;
</script>

<!-- ? Example: class="floating-menu" -->
<svelte:element this="div" bind:this={floatingMenu}>
	{#if editor}
		<!-- ? Example: class={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} -->
		<!-- ? Example <Button size="xs" color={editor.isActive('heading', { level: 1 }) ? (isDark ? 'light' : 'dark') : 'light'} -->
		<!-- ? on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}> H1 </Button> -->
		<ButtonGroup>
			<GradientButton size="xs" outline color="pinkToOrange">
				<TextScale />
				<ChevronDownOutline size="xs" />
			</GradientButton>
			<Dropdown>
				{#each defaultFlowbiteStarterkitOpts.heading.levels as level}
					<DropdownItem
						active={editor.isActive('heading', { level: level })}
						on:click={() => editor.chain().focus().toggleHeading({ level: level }).run()}
					>
						<P
							weight={editor.isActive('heading', { level: level }) ? 'extrabold' : 'normal'}
							size="xs">Heading {level}</P
						>
						<!-- H{level} -->
					</DropdownItem>
				{/each}
			</Dropdown>
			<GradientButton
				size="xs"
				on:click={() => editor.chain().focus().setParagraph().run()}
				outline={editor.isActive('paragraph') ? false : true}
				color="pinkToOrange"
			>
				<ParagraphOutline size="sm" />
			</GradientButton>
			<Tooltip>Paragraph</Tooltip>
			<GradientButton
				size="xs"
				on:click={() => editor.chain().focus().toggleBlockquote().run()}
				outline={editor.isActive('blockquote') ? false : true}
				color="pinkToOrange"
			>
				<QuoteOutline size="sm" />
			</GradientButton>
			<Tooltip>Blockquote</Tooltip>
			<GradientButton
				size="xs"
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				outline={editor.isActive('bulletList') ? false : true}
				color="pinkToOrange"
			>
				<ListOutline size="sm" />
			</GradientButton>
			<Tooltip>Bullet List</Tooltip>
			<!-- ? Ordered List -->
			<GradientButton
				size="xs"
				on:click={() => editor.chain().focus().toggleOrderedList().run()}
				outline={editor.isActive('orderedList') ? false : true}
				color="pinkToOrange"
			>
				<OrderedListOutline size="sm" />
			</GradientButton>
			<Tooltip>Ordered List</Tooltip>
			<!-- ? Task List -->
			<GradientButton
				size="xs"
				on:click={() => editor.chain().focus().toggleTaskList().run()}
				outline={editor.isActive('taskList') ? false : true}
				color="pinkToOrange"
			>
				<ListChecked />
			</GradientButton>
			<!-- ? Image uploader -->
			<GradientButton size="xs" on:click={() => (showUploader = true)} color="pinkToOrange">
				<ImageOutline size="sm" />
			</GradientButton>
			<!-- ? Table -->
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
		</ButtonGroup>
	{/if}
</svelte:element>
