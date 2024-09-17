<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	//? Editor
	import { Editor } from '@tiptap/core';
	import { FloatingMenu } from '@tiptap/extension-floating-menu';
	import { BubbleMenu } from '@tiptap/extension-bubble-menu';
	import { extensionsWithNoOpts } from '$components/tiptap/starterkitOpts';
	import BubbleToolbar from './toolbars/BubbleToolbar.svelte';
	import FloatingToolbar from './toolbars/FloatingToolbar.svelte';
	export let content: any = undefined;
	export let afterMount: () => void = () => {};
	// determine if the user prefers dark mode
	let isDark: boolean;
	//? Editor
	let editor: Editor;
	let tableActive: boolean;
	let element: HTMLElement;
	let bubbleMenu: HTMLElement;
	let buttonSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'xs';
	// const bubbleMenu: ComponentType = ButtonGroup;
	let floatingMenu: HTMLElement;
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
				...extensionsWithNoOpts,
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
				// CodeBlockLowlight.configure({
				// 	lowlight
				// })
			],
			content: content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
				tableActive = editor.isActive('table');
				console.log('tableActive', tableActive);
			}
		});

		isDark = localStorage.getItem('color-theme') === 'dark';
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

<FloatingToolbar bind:editor bind:floatingMenu bind:isDark />

<BubbleToolbar bind:editor bind:bubbleMenu bind:isDark bind:tableActive />

<!-- * Editor Element -->
<svelte:element this="div" bind:this={element} />
