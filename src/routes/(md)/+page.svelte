<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import Sections from '$components/blog/ui/sections/sections.svelte';
	import Article from '$components/blog/ui/article/article.svelte';
	import ArticleAuthor from '$components/blog/ui/article/article-author.svelte';
	import ArticleBody from '$components/blog/ui/article/article-body.svelte';
	import ArticleHead from '$components/blog/ui/article/article-head.svelte';
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
