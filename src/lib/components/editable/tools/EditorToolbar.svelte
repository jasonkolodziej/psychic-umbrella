<script lang="ts">
	import { isEditing } from '$lib/editable/stores';
</script>

{#if $isEditing}
	{#await import('$lib/components/editable/tools/EditorControls.svelte') then EditorToolbar}
		<EditorToolbar.default on:cancel on:save />
	{/await}
{/if}
