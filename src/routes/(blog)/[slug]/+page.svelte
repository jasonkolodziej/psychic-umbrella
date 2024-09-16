<script lang="ts">
	// import { Section, BlogTemplate, Comment, CommentItem } from 'flowbite-svelte-blocks';
	import Post from '$components/using/flowbite/blog/ui/post/Post.svelte';
	import blog from '$lib/data/blog-example.json';
	import comments from '$lib/data/comments-example.json';

	// $: console.log(JSON.stringify(comments, null, 2));
</script>

<Post {blog} />

<!-- <Section name="blogTemplate" classSection="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
	<article
		class="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full max-w-2xl"
	>
		<BlogTemplate {blog} classArticle="dark:text-white" />

		<Section name="comment" classSection="not-format" classDiv="px-0">
			<Comment title="Discussion (20)">
				<form class="mb-6">
					<Label for="comment" class="sr-only">Your comment</Label>
					<Textarea id="comment" rows="6" class="mb-4" placeholder="Write a comment..." required
					></Textarea>
					<Button type="submit" class="px-4 text-xs font-medium">Post comment</Button>
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
		</Section>
	</article>
</Section> -->
