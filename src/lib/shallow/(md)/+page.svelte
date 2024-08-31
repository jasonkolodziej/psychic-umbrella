<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { SectionBlog } from '$components/blog/ui/section';
	import { Article, ArticleAuthor, ArticleBody, ArticleHead } from '$components/blog/ui/article';
	import { onMount } from 'svelte';
	onMount(() => {
		goto(`${base}/news/main`);
	});
</script>

<!-- <main class="p-4"> -->
<!-- <SectionBlog title="Blog" description="Welcome to the blog">
		<Article>
			<ArticleAuthor />
			<ArticleHead />
			<ArticleBody />
		</Article>
	</SectionBlog> -->
<!-- </main> -->
