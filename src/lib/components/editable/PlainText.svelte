<script lang="ts">
	import { isEditing } from '$lib/editable/stores';

	export let content;
	export let multiLine = false;
</script>

{#if $isEditing}
	{#await import('./PlainTextEditor.svelte')}
		{@html content}
	{:then PlainTextEditor}
		<PlainTextEditor.default {multiLine} bind:content />
	{/await}
{:else}
	{@html content}
{/if}
