<script lang="ts">
	export let currentUser;
</script>

{#await import('$lib/components/editable/EditorControls.svelte') then EditorToolbar}
	<EditorToolbar.default {currentUser} on:cancel on:save />
{/await}
