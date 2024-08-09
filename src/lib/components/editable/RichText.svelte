<script lang="ts">
	import { isEditing } from '$lib/editable/stores';

	export let content;
	export let multiLine = false;
</script>

{#if $isEditing}
	{#await import('./RichTextEditor.svelte')}
		{@html content}
	{:then RichTextEditor}
		<RichTextEditor.default {multiLine} bind:content />
	{/await}
{:else}
	<div>
		{@html content}
	</div>
{/if}
