<script lang="ts">
	import WebsiteNav from '$lib/components/editable/WebsiteNav.svelte';
	import Modal from '$lib/components/editable/Modal.svelte';
	import EditorToolbar from '$lib/components/editable/tools/EditorToolbar.svelte';
	import { createEventDispatcher } from 'svelte';

	export let showUserMenu: boolean = false;
	const dispatch = createEventDispatcher();
</script>

<EditorToolbar on:cancel={() => dispatch('cancel')} on:save={() => dispatch('save')} />
<WebsiteNav bind:showUserMenu />
{#if showUserMenu}
	<Modal on:close={() => (showUserMenu = false)}>
		<div class="flex w-full flex-col space-y-4 p-4 sm:p-6">
			<slot />
		</div>
	</Modal>
{/if}
