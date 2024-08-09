<script lang="ts">
	import PlainText from '$lib/components/editable/PlainText.svelte';
	import RichText from '$lib/components/editable/RichText.svelte';
	import { formatDate } from '$lib/editable/util';
	export let title;
	export let content;
	export let published_at = undefined;
</script>

<div>
	<div class="mx-auto max-w-screen-md px-6">
		<div class="pt-12 sm:pt-24">
			{#if !published_at}
				<div class="text-sm font-bold">DRAFT</div>
			{:else}
				<div class="text-sm font-bold">{formatDate(published_at)}</div>
			{/if}
		</div>
		<h1 class="pt-1 text-3xl font-bold md:text-5xl">
			<PlainText bind:content={title} />
		</h1>
	</div>
</div>

<div class="mx-auto max-w-screen-md px-6 pb-12 sm:pb-24">
	<div id="article_content" class="prose sm:prose-xl">
		<RichText multiLine bind:content />
	</div>
</div>
