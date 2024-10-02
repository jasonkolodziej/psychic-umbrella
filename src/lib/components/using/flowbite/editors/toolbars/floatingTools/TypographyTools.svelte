<script lang="ts">
	import { GradientButton, Tooltip, DropdownItem, Dropdown, P } from 'flowbite-svelte';
	import type { Editor } from 'svelte-tiptap';

	import { ChevronDownOutline, ParagraphOutline, QuoteOutline } from 'flowbite-svelte-icons';
	import { TextScale } from 'carbon-icons-svelte';
	import { defaultFlowbiteStarterkitOpts } from '$components/tiptap/starterkitOpts';

	export let editor: Editor;
	export let outline: boolean = true;
</script>

{#if editor}
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
				<P weight={editor.isActive('heading', { level: level }) ? 'extrabold' : 'normal'} size="xs"
					>Heading {level}</P
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
{/if}
