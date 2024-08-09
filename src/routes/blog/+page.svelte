<script>
	import { goto } from '$app/navigation';
	import PrimaryButton from '$lib/components/editable/PrimaryButton.svelte';
	import LoginMenu from '$lib/components/editable/LoginMenu.svelte';
	import ArticleTeaser from '$lib/components/editable/ArticleTeaser.svelte';
	import Footer from '$lib/components/editable/Footer.svelte';
	import EditableWebsiteTeaser from '$lib/components/editable/EditableWebsiteTeaser.svelte';
	import { currentUser } from '$lib/editable/stores';
	import WebsiteHeader from '$lib/components/editable/WebsiteHeader.svelte';

	export let data;
	let showUserMenu;
	$: {
		$currentUser = data.currentUser;
	}
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="What you always wanted to know about web development." />
</svelte:head>

<WebsiteHeader bind:showUserMenu>
	<div class="flex w-full flex-col space-y-4 p-4 sm:p-6">
		<PrimaryButton type="button" on:click={() => goto('/blog/new')}>New blog post</PrimaryButton>
		<LoginMenu />
	</div>
</WebsiteHeader>

<div class="pb-8">
	<div class="mx-auto max-w-screen-md px-6 pt-12 sm:pt-24">
		<div class="text-sm font-bold">LATEST ARTICLES</div>
		{#if data.articles.length === 0}
			<div class="py-4 md:text-xl">No blog posts have been published so far.</div>
		{/if}
	</div>

	{#each data.articles as article, i}
		<ArticleTeaser {article} firstEntry={i === 0} />
	{/each}
</div>

<EditableWebsiteTeaser />

<Footer counter="/blog" />
