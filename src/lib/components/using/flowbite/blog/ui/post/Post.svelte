<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import { BlogTemplate } from 'flowbite-svelte-blocks';
	// import BlogTemplate from '$components/using/flowbite/blog/ui/template/BlogTemplate.svelte';
	import { Section } from '$components/using/flowbite/blog/ui/section';
	import Comments from '$components/using/flowbite/blog/ui/comment/Comments.svelte';

	// * Types
	import { type Comment, type BlogPost } from '$lib/filtering/blog';
	import type { JSONContent } from '@tiptap/core';
	//! example data
	// import blogExample from '$lib/data/blog-example.json';
	// import commentsExample from '$lib/data/comments-example.json';
	// import { onDestroy, onMount, SvelteComponent, type ComponentType } from 'svelte';
	// import { ButtonGroup, GradientButton, Button, DarkMode } from 'flowbite-svelte';
	// import { twMerge } from 'tailwind-merge';
	import FullEditor from '$components/using/flowbite/editors/FullEditor.svelte';
	import { createEventDispatcher, type ComponentEvents } from 'svelte';

	const dispatch = createEventDispatcher<{
		// loaded: null;
		// clicked: number,
		updated: JSONContent;
	}>();
	type $$Props = HTMLAttributes<HTMLElement> & {
		blog: Partial<BlogPost>;
		comments?: Array<Comment>;
		commentTitle?: string;
		classArticle?: string;
	};
	type UpdateEventType = ComponentEvents<FullEditor>['update'];
	type LoadedEventType = ComponentEvents<FullEditor>['loaded'];

	let blogPost = true;

	export let classArticle: $$Props['classArticle'] = 'dark:text-white';
	export let blog: $$Props['blog'] = {}; //: blogExample;
	export let comments: $$Props['comments'] = undefined;
	export let commentTitle: $$Props['commentTitle'] = 'Discussion';
	blog =
		blog.id && blog.title && blog.content && blog.author
			? blog
			: { ...blog, title: 'New Title', content: 'This is space for new content', author: {} }; //: blogExample;
	comments = blog.comments ?? comments; //: commentsExample;
	commentTitle = comments?.length ? commentTitle + ` (${comments.length})` : commentTitle;

	//? Exports
	let className: $$Props['class'] = undefined;
	export { className as class };

	const handleUpdate = ({ detail }: UpdateEventType) => {
		dispatch('updated', detail);
	};
	const handleLoaded = ({ detail }: LoadedEventType) => {
		// dispatch('loaded', detail);
		blog = { ...blog, content: '' };
		// console.log('editor loaded');
	};
	// export let href: string;
</script>

<Section bind:blogPost>
	<!-- afterMount={() => {
		// console.log('editor mounted');
		blog = { ...blog, content: '' };
	}} -->
	<BlogTemplate bind:blog bind:classArticle {...$$restProps}>
		<FullEditor
			slot="default"
			content={blog.content}
			on:loaded={handleLoaded}
			on:update={handleUpdate}
		/>
	</BlogTemplate>
	<!-- <BlogTemplate bind:classArticle bind:blog {...$$restProps} /> -->

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
