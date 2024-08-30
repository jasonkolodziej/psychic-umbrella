<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	onMount(() => {
		goto(`${base}/home`);
	});
</script>

<!-- <main class="p-4">
	<Sections title="Blog" description="Welcome to the blog">
		<Article>
			<ArticleAuthor />
			<ArticleHead />
			<ArticleBody />
		</Article>
	</Sections>
</main> -->
