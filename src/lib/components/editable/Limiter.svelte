<script lang="ts">
	import { classNames } from '$lib/editable/util';
	export let noPadding = false;
</script>

<div class={classNames('mx-auto max-w-lg', noPadding ? '' : 'px-4')}>
	<slot />
</div>
