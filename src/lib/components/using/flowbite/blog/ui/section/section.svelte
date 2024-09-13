<script lang="ts">
	// import Link from '$lib/carta/components/link/Link.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import { BlogBodyWrapper, BlogHead, Section } from 'flowbite-svelte-blocks';
	import { onMount, type ComponentProps } from 'svelte';
	import { Article } from '$components/using/flowbite/blog/ui/article';
	import blogExample from '$lib/data/blog-example.json';
	import articlesExample from '$lib/data/articles-example.json';
	import {
		type Blog,
		type BlogPost,
		type ArticleAuthor,
		type Author,
		type ArticleBody,
		type ArticleHead,
		type Picture,
		ToArticleAuthor,
		type Article as IArticle
	} from '$lib/filtering/blog';
	import { VideoCameraSolid } from 'flowbite-svelte-icons';

	type $$Props = HTMLAttributes<HTMLParagraphElement> & {
		name?:
			| 'advancedTable'
			| 'blog'
			| 'comment'
			| 'cta'
			| 'ctawithimg'
			| 'contact'
			| 'content'
			| 'contentwithimg'
			| 'crudcreatedrawer'
			| 'crudcreateform'
			| 'crudreadsection'
			| 'default'
			| 'faq'
			| 'feature'
			| 'forgotpassword'
			| 'headingwithctabutton'
			| 'heroDefault'
			| 'heroVisual'
			| 'login'
			| 'logos'
			| 'maintenance'
			| 'newsletter'
			| 'none'
			| 'page500'
			| 'page404'
			| 'portfolio'
			| 'pricing'
			| 'register'
			| 'reset'
			| 'schedule'
			| 'social'
			| 'tableheader'
			| 'team'
			| 'testimonial'
			| undefined;
		sectionClass?: string;
		classDiv?: string;
		blogPost?: boolean;
		blog?: Blog | BlogPost;
	};
	export let blogPost: $$Props['blogPost'] = false;
	export let name: $$Props['name'] = blogPost === true ? 'blog' : undefined;
	export let blog: $$Props['blog'] =
		name === 'blog'
			? {
					...blogExample,
					asArticle: () => {
						return {
							head: {
								icon: VideoCameraSolid,
								when: new Date(blogExample.isoDate).getTime().toString(),
								iconLabel: 'Video Camera'
							} satisfies ArticleHead,
							body: {
								title: blogExample.title,
								lead: blogExample.lead
							} satisfies ArticleBody,
							author: ToArticleAuthor(blogExample.author as Author) satisfies ArticleAuthor
						};
					}
				}
			: undefined;
	$: console.log((blog as BlogPost).asArticle);
	let articles: IArticle[] = blog?.article ?? articlesExample;
	articles.map((article) => {
		article.author = ToArticleAuthor(article.author as Author);
	});
	export let sectionClass: $$Props['sectionClass'] =
		name === 'blog'
			? 'pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900'
			: name === 'comment'
				? 'not-format'
				: '';
	export let classDiv: $$Props['classDiv'] = name === 'comment' ? 'px-0' : '';

	let className: $$Props['class'] = undefined;
	export { className as class };

	onMount(() => {
		if (name === 'blog' && !blog && blogPost) {
			blog = blogExample;
		}
		// if (name === 'blog' && !blogPost) {
		// 	articlesExample.forEach((article) => {
		// 		articles = blog?.articles ?? [];
		// 		articles.push({
		// 			author: ToArticleAuthor(article.author),
		// 			head: { ...article.head, icon: VideoCameraSolid },
		// 			body: article.body
		// 		});
		// 	});
		// }
	});
	// export let href: string;
</script>

<Section bind:name bind:sectionClass bind:classDiv>
	{#if blogPost}
		<article
			class={cn(
				'format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full max-w-2xl',
				className
			)}
		>
			<slot />
		</article>
	{:else if name === 'blog' && blog}
		<BlogHead>
			<svelte:fragment slot="h2">{blog.title}</svelte:fragment>
			<svelte:fragment slot="paragraph">
				<p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
					{blog.lead}
				</p>
			</svelte:fragment>
		</BlogHead>
		<BlogBodyWrapper
			divClass={cn('grid gap-8 lg:grid-cols-2', 'grid-flow-row auto-rows-auto auto-cols-auto')}
		>
			{#if articles}
				{#each articles as article}
					<Article {...article} />
					<!-- <svelte:component this={Article} {...article} /> -->
				{/each}
			{/if}
			<!-- {#if $$slots.articles}
			{#each $$slots.articles as s}
				{s}
			{/each}
		{/if} -->
		</BlogBodyWrapper>
	{:else}
		<slot />
	{/if}
</Section>
