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
		CircleMinusOutline,
		BarsFromLeftOutline,
		AlignCenterOutline,
		BarsOutline,
		AngleRightOutline
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
	import MediaTools from './bubbleTools/MediaTools.svelte';
	import TableTools from './bubbleTools/TableTools.svelte';
	import TextTools from './bubbleTools/TextTools.svelte';
	// import Text from '../../for/marked/typeography/Text.svelte';
	// determine if the user prefers dark mode
	export let isDark: boolean;
	export let tableActive: boolean = false;
	export let imgActive: boolean = false;
	let openRowTools: boolean;
	let openColumnTools: boolean;
	export let editor: Editor;
	export let bubbleMenu: HTMLElement;
	let outline = true;
</script>

<svelte:element this="div" bind:this={bubbleMenu}>
	<!-- ? Example: class="bubble-menu" -->
	<!-- ? Example: class={editor.isActive('bold') ? 'is-active' : ''} -->
	<!-- {#if editor} -->
	<!-- * Text tools -->
	<TextTools bind:editor bind:outline />

	<!--* Image tools-->
	{#if imgActive}
		<MediaTools bind:editor bind:outline />
	{/if}

	<!-- * Table tools -->
	{#if tableActive}
		<TableTools bind:editor bind:outline />
	{/if}
	<!-- {/if} -->
</svelte:element>
