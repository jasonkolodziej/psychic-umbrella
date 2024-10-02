<script lang="ts">
	import { GradientButton, Tooltip } from 'flowbite-svelte';
	import type { Editor } from 'svelte-tiptap';

	import { ListOutline, OrderedListOutline } from 'flowbite-svelte-icons';
	import { ListChecked } from 'carbon-icons-svelte';

	export let editor: Editor;
	export let outline: boolean = true;
</script>

{#if editor}
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
	<Tooltip>Tasklist</Tooltip>
{/if}
