<script>
	import { extractTeaser, fetchJSON } from '$lib/editable/util';
	import PrimaryButton from '$lib/components/editable/PrimaryButton.svelte';
	import WebsiteNav from '$lib/components/editable/WebsiteNav.svelte';
	import Modal from '$lib/components/editable/Modal.svelte';
	import LoginMenu from '$lib/components/editable/LoginMenu.svelte';
	import { goto } from '$app/navigation';
	import Footer from '$lib/components/editable/Footer.svelte';
	import ArticleTeaser from '$lib/components/editable/ArticleTeaser.svelte';
	import EditableWebsiteTeaser from '$lib/components/editable/EditableWebsiteTeaser.svelte';
	import Article from '$lib/components/editable/Article.svelte';
	import NotEditable from '$lib/components/editable/NotEditable.svelte';
	import EditorToolbar from '$lib/components/editable/tools/EditorToolbar.svelte';
	import { currentUser, isEditing } from '$lib/editable/stores';

	export let data;

	let showUserMenu = false;
	let title, teaser, content, published_at, updatedAt;

	$: {
		$currentUser = data.currentUser;
		initOrReset();
	}

	function initOrReset() {
		title = data.title;
		teaser = data.teaser;
		content = data.content;
		published_at = data.published_at;
		updatedAt = data.updatedAt;
		$isEditing = false;
	}

	function toggleEdit() {
		$isEditing = true;
		showUserMenu = false;
	}

	async function deleteArticle() {
		if (!$currentUser) return alert('Sorry, you are not authorized.');
		try {
			fetchJSON('POST', '/api/delete-article', {
				slug: data.slug
			});
			goto('/blog');
		} catch (err) {
			console.error(err);
			alert('Error deleting the article. Try again.');
			window.location.reload();
		}
	}

	async function saveArticle() {
		if (!$currentUser) return alert('Sorry, you are not authorized.');
		const teaser = extractTeaser(document.getElementById('article_content'));
		try {
			const result = await fetchJSON('POST', '/api/update-article', {
				slug: data.slug,
				title,
				content,
				teaser
			});
			updatedAt = result.updatedAt;
			$isEditing = false;
		} catch (err) {
			console.error(err);
			alert(
				'There was an error. You can try again, but before that, please just copy and paste your article into a safe place.'
			);
		}
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={teaser} />
</svelte:head>

<EditorToolbar on:cancel={initOrReset} on:save={saveArticle} />
<WebsiteNav bind:showUserMenu />
{#if showUserMenu}
	<Modal on:close={() => (showUserMenu = false)}>
		<form class="block w-full" method="POST">
			<div class="flex w-full flex-col space-y-4 p-4 sm:p-6">
				<PrimaryButton on:click={toggleEdit}>Edit post</PrimaryButton>
				<PrimaryButton type="button" on:click={deleteArticle}>Delete post</PrimaryButton>
				<LoginMenu />
			</div>
		</form>
	</Modal>
{/if}

<Article bind:title bind:content bind:published_at />

{#if data.articles.length > 0}
	<NotEditable>
		<div class="border-t-2 border-gray-100">
			<div class="mx-auto max-w-screen-md px-6 pt-8 sm:pt-12">
				<div class="text-sm font-bold">READ NEXT</div>
			</div>
			{#each data.articles as article, i}
				<ArticleTeaser {article} firstEntry={i === 0} />
			{/each}
		</div>
	</NotEditable>
{/if}

<NotEditable>
	<EditableWebsiteTeaser />
</NotEditable>

<Footer counter={`/blog/${data.slug}`} />
