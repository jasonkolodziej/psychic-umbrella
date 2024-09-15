<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import { BlogTemplate } from 'flowbite-svelte-blocks';
	// import BlogTemplate from '$components/using/flowbite/blog/ui/template/BlogTemplate.svelte';
	import { Section } from '$components/using/flowbite/blog/ui/section';
	import Comments from '$components/using/flowbite/blog/ui/comment/Comments.svelte';

	// * Types
	import { type Comment, type BlogPost } from '$lib/filtering/blog';
	//! example data
	import blogExample from '$lib/data/blog-example.json';
	import commentsExample from '$lib/data/comments-example.json';
	import { onDestroy, onMount, SvelteComponent, type ComponentType } from 'svelte';
	import { ButtonGroup, GradientButton, Button, DarkMode } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import FullEditor from '$components/using/flowbite/editors/FullEditor.svelte';

	type $$Props = HTMLAttributes<HTMLElement> & {
		blog: BlogPost;
		comments?: Array<Comment>;
		commentTitle?: string;
		classArticle?: string;
	};

	let blogPost = true;

	export let classArticle: $$Props['classArticle'] = 'dark:text-white';
	export let blog: $$Props['blog'] = blogExample;
	export let comments: $$Props['comments'] = undefined;
	export let commentTitle: $$Props['commentTitle'] = 'Discussion';
	comments = blog.comments ? comments : commentsExample;
	commentTitle = comments?.length ? commentTitle + ` (${comments.length})` : commentTitle;

	//? Exports
	let className: $$Props['class'] = undefined;
	export { className as class };

	// export let href: string;
</script>

<Section bind:blogPost>
	<!-- <BlogTemplate bind:blog bind:classArticle {...$$restProps} /> -->
	<!-- <BlogTemplate bind:classArticle bind:blog {...$$restProps} /> -->
	<FullEditor
		content={blog.content}
		afterMount={() => {
			// console.log('editor mounted');
			blog = { ...blog, content: '' };
		}}
	/>
	{#if comments}
		<Comments bind:commentTitle bind:comments />
	{/if}

	<!-- <Section name="comment">
		<Comment title={commentTitle}>
			<form class="mb-6">
				<Label for="comment" class="sr-only">{commentLabel}</Label>
				<Textarea id="comment" rows="6" class="mb-4" placeholder={commentPlaceholder} required
				></Textarea>
				<Button type="submit" class="px-4 text-xs font-medium">{commentButtonLabel}</Button>
			</form>
			{#each comments as comment, i}
				<CommentItem {comment} articleClass={i !== 0 ? 'border-t' : ''}>
					<svelte:fragment slot="dropdownMenu">
						<DotsHorizontalOutline class="dots-menu dark:text-white" />
						<Dropdown triggeredBy=".dots-menu">
							<DropdownItem>Edit</DropdownItem>
							<DropdownItem>Remove</DropdownItem>
							<DropdownItem>Report</DropdownItem>
						</Dropdown>
					</svelte:fragment>
				</CommentItem>
			{/each}
		</Comment>
	</Section> -->
</Section>
