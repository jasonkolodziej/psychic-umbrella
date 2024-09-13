<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import { BlogTemplate } from 'flowbite-svelte-blocks';
	// import BlogTemplate from '$components/using/flowbite/blog/ui/template/BlogTemplate.svelte';
	import { Section } from '$components/using/flowbite/blog/ui/section';
	import Comments from '$components/using/flowbite/blog/ui/comment/Comments.svelte';
	//? Editor
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { FloatingMenu } from '@tiptap/extension-floating-menu';
	import { BubbleMenu } from '@tiptap/extension-bubble-menu';
	import { TextStyle } from '@tiptap/extension-text-style';
	// * Types
	import { type Comment, type BlogPost } from '$lib/filtering/blog';
	//! example data
	import blogExample from '$lib/data/blog-example.json';
	import commentsExample from '$lib/data/comments-example.json';
	import { onDestroy, onMount, SvelteComponent, type ComponentType } from 'svelte';
	import { ButtonGroup, GradientButton, Button, DarkMode } from 'flowbite-svelte';

	type $$Props = HTMLAttributes<HTMLElement> & {
		blog: BlogPost;
		comments?: Array<Comment>;
		commentTitle?: string;
		classArticle?: string;
	};

	let blogPost = true;
	// determine if the user prefers dark mode
	let isDark: boolean;
	export let classArticle: $$Props['classArticle'] = 'dark:text-white';
	export let blog: $$Props['blog'] = blogExample;
	export let comments: $$Props['comments'] = undefined;
	export let commentTitle: $$Props['commentTitle'] = 'Discussion';
	comments = blog.comments ? comments : commentsExample;
	commentTitle = comments?.length ? commentTitle + ` (${comments.length})` : commentTitle;
	//? Editor
	let element: HTMLElement;
	let bubbleMenu: HTMLElement;
	// const bubbleMenu: ComponentType = ButtonGroup;
	let floatingMenu: HTMLElement;
	function usingDarkMode(
		whenEditorReturns: boolean,
		editorParams: { name: string; attributes?: {} },
		whenDark?: any,
		whenLight?: any
	) {
		if (editor) {
			const active = editor.isActive(editorParams);
			return active === whenEditorReturns && isDark ? whenDark : whenLight;
		}
	}
	let editor: Editor;
	// const lowlight = createLowlight(all);
	//? Reference: https://tiptap.dev/docs/editor/getting-started/style-editor#editor
	let editorClass: string =
		'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none';
	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				BubbleMenu.configure({
					element: bubbleMenu as HTMLElement,
					tippyOptions: {
						duration: 100
					}
				}),
				FloatingMenu.configure({
					element: floatingMenu,
					tippyOptions: {
						duration: 100
					}
				})
				// StarterKit.configure({
				// 	// options
				// })
				// CodeBlockLowlight.configure({
				// 	lowlight
				// })
			],
			content: blog.content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
		isDark = localStorage.getItem('color-theme') === 'dark';
		blog = { ...blog, content: '' };
	});
	// let isDark = localStorage.getItem('color-theme') === 'dark';
	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
	//? Exports
	let className: $$Props['class'] = undefined;
	export { className as class };

	// export let href: string;
</script>

<Section bind:blogPost>
	<!-- <BlogTemplate bind:blog bind:classArticle {...$$restProps} /> -->
	<!-- <BlogTemplate bind:classArticle bind:blog {...$$restProps} /> -->
	<!-- ? Example: class="floating-menu" -->
	<svelte:element this="div" bind:this={floatingMenu}>
		{#if editor}
			<!-- ? Example: class={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} -->
			<ButtonGroup>
				<!-- <Button
					size="xs"
					color={editor.isActive('heading', { level: 1 }) ? (isDark ? 'light' : 'dark') : 'light'}
					on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				>
					H1
				</Button> -->
				<GradientButton
					size="xs"
					outline={editor.isActive('heading', { level: 1 }) ? false : true}
					color="pinkToOrange"
					on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				>
					H1
				</GradientButton>
				<GradientButton
					size="xs"
					on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					outline={editor.isActive('heading', { level: 2 }) ? false : true}
					color="pinkToOrange"
				>
					H2
				</GradientButton>
				<GradientButton
					size="xs"
					on:click={() => editor.chain().focus().setParagraph().run()}
					outline={editor.isActive('paragraph') ? false : true}
					color="pinkToOrange"
				>
					P
				</GradientButton>
			</ButtonGroup>
		{/if}
	</svelte:element>
	<!-- ? Example: class="bubble-menu" -->
	<svelte:element this="div" bind:this={bubbleMenu}>
		{#if editor}
			<!-- ? Example: 					class={editor.isActive('bold') ? 'is-active' : ''} -->
			<ButtonGroup class="space-x-px">
				<GradientButton
					size="xs"
					outline={editor.isActive('bold') ? false : true}
					color="purpleToBlue"
					on:click={(e) => editor.chain().focus().toggleBold().run()}
				>
					Bold
				</GradientButton>
				<GradientButton
					size="xs"
					outline={editor.isActive('italic') ? false : true}
					color="cyanToBlue"
					on:click={() => editor.chain().focus().toggleItalic().run()}
					class={editor.isActive('italic') ? 'is-active' : ''}>Italic</GradientButton
				>
				<GradientButton
					size="xs"
					outline={editor.isActive('strike') ? false : true}
					color="greenToBlue"
					on:click={() => editor.chain().focus().toggleStrike().run()}
					class={editor.isActive('strike') ? 'is-active' : ''}>Strike</GradientButton
				>
			</ButtonGroup>
		{/if}
	</svelte:element>
	<svelte:element this="div" bind:this={element} />
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
