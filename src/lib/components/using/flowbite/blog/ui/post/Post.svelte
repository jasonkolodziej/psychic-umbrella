<script lang="ts">
	// import Link from '$lib/carta/components/link/Link.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import { BlogTemplate } from 'flowbite-svelte-blocks';
	// import SectionBlogpost from '../section/section-blogpost.svelte';
	import { Section } from '$components/using/flowbite/blog/ui/section';
	import Comments from '$components/using/flowbite/blog/ui/comment/Comments.svelte';
	// import { Button, Textarea, Label, Dropdown, DropdownItem } from 'flowbite-svelte';
	// import { DotsHorizontalOutline } from 'flowbite-svelte-icons';
	import { type Comment } from '$lib/filtering/blog';
	import blogExample from '$lib/data/blog-example.json';
	import commentsExample from '$lib/data/comments-example.json';
	import type { BlogPost } from '$lib/filtering/blog';

	// import '../../../../../app.pcss';

	type $$Props = HTMLAttributes<HTMLElement> & {
		blog: BlogPost;
		comments?: Array<Comment>;
		classArticle?: string;
		// commentTitle?: string;
		// commentLabel?: string;
		// commentPlaceholder?: string;
		// commentButtonLabel?: string;
	};

	let className: $$Props['class'] = undefined;
	let blogPost = true;
	export let classArticle: $$Props['classArticle'] = 'dark:text-white';
	export let blog: $$Props['blog'] = blogExample;
	export let comments: $$Props['comments'] = undefined;
	comments = blog.comments ? comments : commentsExample;

	export { className as class };

	// export let href: string;
</script>

<Section bind:blogPost>
	<BlogTemplate bind:blog bind:classArticle {...$$restProps} />
	{#if comments}
		<Comments bind:comments />
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
