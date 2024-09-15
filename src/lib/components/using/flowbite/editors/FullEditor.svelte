<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';
	import { onDestroy, onMount, SvelteComponent, type ComponentType } from 'svelte';
	import { ButtonGroup, GradientButton, Button, Input, P } from 'flowbite-svelte';
	//? Editor
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { FloatingMenu } from '@tiptap/extension-floating-menu';
	import { BubbleMenu } from '@tiptap/extension-bubble-menu';
	import { TextStyle } from '@tiptap/extension-text-style';
	import { Underline } from '@tiptap/extension-underline';
	import { Color } from '@tiptap/extension-color';
	import { Image } from '@tiptap/extension-image';
	import { cn } from '$lib/carta/utils';
	import {
		LetterBoldOutline,
		LetterItalicOutline,
		LetterUnderlineOutline
	} from 'flowbite-svelte-icons';
	import { TextStrikethrough } from 'carbon-icons-svelte';
	export let content: any = undefined;
	export let afterMount: () => void = () => {};
	// determine if the user prefers dark mode
	let isDark = getContext('color-theme') === 'dark';
	//? Editor
	let element: HTMLElement;
	let colorInput: any;
	let bubbleMenu: HTMLElement;
	let buttonSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'xs';
	let iconButtonSize =
		buttonSize === 'xs' || buttonSize === 'sm'
			? 'w-4 h-4 me-2'
			: buttonSize === 'md' || buttonSize === 'lg'
				? 'w-5 h-5 me-2'
				: 'w-6 h-6 me-2';
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
		'prose prose-sm sm:prose-sm lg:prose-lg xl:prose-2xl mx-auto focus:outline-none';
	let colorInputClass: string =
		'block h-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white p-1';
	// <input
	// 			type="color"
	// 			class="cursor-pointer rounded-lg border disabled:pointer-events-none disabled:opacity-50"
	// 			id="hs-color-input"
	// 			value="#2563eb"
	// 			title="Choose your color"
	// 		/>
	let otherInputClass: string =
		'block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right p-2.5 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 text-sm first:rounded-s-lg last:rounded-e-lg [&:not(:first-child)]:-ms-px';
	// const addImage = useCallback(() => {
	// 	const url = window.prompt('URL');

	// 	if (url) {
	// 		editor.chain().focus().setImage({ src: url }).run();
	// 	}
	// }, [editor]);

	// if (!editor) {
	// 	return null;
	// }
	onMount(() => {
		editor = new Editor({
			element: element,
			editorProps: {
				attributes: {
					class: editorClass
				}
			},
			extensions: [
				Image,
				StarterKit.configure({
					// options
					heading: {
						HTMLAttributes: {
							class: 'text-base text-gray-900 dark:text-white'
						},
						levels: [1, 2, 3, 4, 5, 6]
					},
					paragraph: {
						HTMLAttributes: {
							class: 'text-base text-gray-900 dark:text-white'
						}
					},
					listItem: {
						HTMLAttributes: {
							class: 'text-base text-gray-900 dark:text-white'
						}
					},
					blockquote: {
						HTMLAttributes: {
							class: twMerge(
								'border-s-4 border-gray-300 dark:border-gray-500',
								'bg-gray-50 dark:bg-gray-800'
							)
						}
					},
					bold: {
						HTMLAttributes: {
							class: 'text-inherit'
						}
					}
				}),
				Underline,
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
				}),
				TextStyle,
				Color
				// CodeBlockLowlight.configure({
				// 	lowlight
				// })
			],
			content: content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
		// isDark = localStorage.getItem('color-theme') === 'dark';
		afterMount();
	});
	// let isDark = localStorage.getItem('color-theme') === 'dark';
	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<!-- ? Color input -->
<!-- <label for="hs-color-input" class="mb-2 block text-sm font-medium">Color picker</label>
<input
	type="color"
	class="block h-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white p-1 disabled:pointer-events-none disabled:opacity-50"
	id="hs-color-input"
	value="#2563eb"
	title="Choose your color"
/> -->

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
				<LetterBoldOutline size="sm" />
			</GradientButton>
			<GradientButton
				size="xs"
				outline={editor.isActive('italic') ? false : true}
				color="cyanToBlue"
				on:click={() => editor.chain().focus().toggleItalic().run()}
			>
				<LetterItalicOutline size="sm" />
			</GradientButton>
			<GradientButton
				size="xs"
				outline={editor.isActive('strike') ? false : true}
				color="greenToBlue"
				on:click={() => editor.chain().focus().toggleStrike().run()}
			>
				<TextStrikethrough />
			</GradientButton>
			<GradientButton
				size="xs"
				outline={editor.isActive('underline') ? false : true}
				color="greenToBlue"
				on:click={() => editor.chain().focus().toggleUnderline().run()}
			>
				<LetterUnderlineOutline size="sm" />
			</GradientButton>
			<!-- * Set Text Color -->
			<GradientButton size="xs" outline color="cyanToBlue">
				<input
					on:input={(event) => editor.chain().focus().setColor(event.target.value).run()}
					value={editor.getAttributes('textStyle').color}
					type="color"
					class={twMerge(
						// 'inline-flex w-full items-center justify-center !rounded-md !border-0 bg-white px-3 py-2 text-xs !text-gray-900 transition-all duration-75 ease-in first:rounded-s-lg last:rounded-e-lg focus-within:z-10 focus-within:ring-2 hover:bg-transparent hover:!text-inherit group-hover:!bg-opacity-0 group-hover:!text-inherit dark:bg-gray-900 dark:!text-white [&:not(:first-child)]:-ms-px',
						'h-4 w-5 cursor-pointer justify-center !rounded-md !border-0 bg-inherit px-0 py-0 text-xs hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50 group-hover:!bg-opacity-0 [&:not(:first-child)]:-ms-px'
					)}
				/>
			</GradientButton>
		</ButtonGroup>
	{/if}
</svelte:element>
<svelte:element this="div" bind:this={element} />
