<script lang="ts">
	import { ButtonGroup, GradientButton, Tooltip, Button } from 'flowbite-svelte';
	import type { Editor } from 'svelte-tiptap';
	import { twMerge } from 'tailwind-merge';

	import {
		LetterBoldOutline,
		LetterItalicOutline,
		LetterUnderlineOutline
	} from 'flowbite-svelte-icons';
	import {
		TextStrikethrough,
		TextSubscript,
		TextSuperscript,
		TextHighlight,
		TextColor
	} from 'carbon-icons-svelte';

	export let editor: Editor;
	export let outline: boolean = true;
</script>

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
		<Tooltip>Toggle Subscript</Tooltip>
		<GradientButton
			size="xs"
			outline={editor.isActive('superscript') ? false : true}
			color="greenToBlue"
			on:click={() => editor.chain().focus().toggleSuperscript().run()}
		>
			<TextSuperscript />
		</GradientButton>
		<Tooltip>Toggle Superscript</Tooltip>
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
{/if}
