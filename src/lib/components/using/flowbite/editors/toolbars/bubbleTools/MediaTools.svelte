<script lang="ts">
	import { resizableMediaActions } from '$components/tiptap/extensions/resizableMedia/resizableMediaUtil';
	import { ButtonGroup, GradientButton, Button, Tooltip } from 'flowbite-svelte';
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
	<!-- <ButtonGroup>
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
	</ButtonGroup> -->

	<ButtonGroup class="image-actions-container">
		{#each resizableMediaActions as mediaAction, i}
			<!--                 key={i} v-tippy="{ content: mediaAction.tooltip, placement: 'top' }" -->
			<!-- 				on:click={() =>
					mediaAction.tooltip === 'Delete'
						? mediaAction.delete?.(deleteNode)
						: mediaAction.action?.(updateAttributes)}
			> -->
			<Button
				class="btn btn-sm btn-ghost image-action-button"
				on:click={() =>
					mediaAction.tooltip === 'Delete'
						? editor.chain().focus().deleteResizableMedia().run()
						: editor
								.chain()
								.focus()
								.updateAttributes('resizableMedia', mediaAction.attrsToUpdate)
								.run()}
			>
				<svelte:component this={mediaAction.icon} />
				<!-- <InlineSVG src={mediaAction.icon} /> -->
			</Button>
			<Tooltip>{mediaAction.tooltip}</Tooltip>
		{/each}
	</ButtonGroup>
{/if}
