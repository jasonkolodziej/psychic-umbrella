<script lang="ts">
	// import Link from '$lib/carta/components/link/Link.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import { Comment, CommentItem } from 'flowbite-svelte-blocks';
	import { Section } from '$components/using/flowbite/blog/ui/section';
	// import Post from '$components/using/flowbite/blog/ui/post/Post.svelte';
	import { Button, Textarea, Label, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { DotsHorizontalOutline } from 'flowbite-svelte-icons';
	// import blogExample from '$lib/data/blog-example.json';
	import commentsExample from '$lib/data/comments-example.json';
	// import type { BlogPost } from '$lib/filtering/blog';

	type $$Props = HTMLAttributes<HTMLElement> & {
		// blog: BlogPost;
		classArticle?: string;
		commentTitle?: string;
		commentLabel?: string;
		commentPlaceholder?: string;
		commentButtonLabel?: string;
		comments: Array<Comment>;
	};

	export let commentTitle: $$Props['commentTitle'] = 'Comments';
	export let commentLabel: $$Props['commentLabel'] = 'Your comment';
	export let commentPlaceholder: $$Props['commentPlaceholder'] = 'Write a comment...';
	export let commentButtonLabel: $$Props['commentButtonLabel'] = 'Post Comment';
	export let classArticle: $$Props['classArticle'] = 'dark:text-white';
	export let comments: $$Props['comments'] = [];
	let className: $$Props['class'] = undefined;
	export { className as class };
	// export let href: string;
</script>

<Section name="comment" classDiv="px-0" sectionClass="not-format">
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
					<!-- TODO: add drop downs? -->
					<Dropdown triggeredBy=".dots-menu">
						<DropdownItem>Edit</DropdownItem>
						<DropdownItem>Remove</DropdownItem>
						<DropdownItem>Report</DropdownItem>
					</Dropdown>
				</svelte:fragment>
			</CommentItem>
		{/each}
	</Comment>
</Section>
