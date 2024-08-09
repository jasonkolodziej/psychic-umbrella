<script lang="ts">
	import { classNames } from '$lib/editable/util';
	import { isEditing } from '$lib/editable/stores';
</script>

<div class={classNames($isEditing ? 'relative cursor-not-allowed opacity-25' : '')}>
	{#if $isEditing}
		<div class="absolute inset-0 z-50" />
	{/if}
	<slot />
</div>
