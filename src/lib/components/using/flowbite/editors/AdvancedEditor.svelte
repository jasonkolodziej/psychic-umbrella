<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { getContext } from 'svelte';
	import Wrapper from '$components/using/flowbite/utils/Wrapper.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Markdown } from 'tiptap-markdown';
	import { all, createLowlight } from 'lowlight';
	import CodeBlockLowlight, {
		type CodeBlockLowlightOptions
	} from '@tiptap/extension-code-block-lowlight';
	import type { Token } from 'marked';
	const background = getContext('background');

	export let value: any = undefined;
	export let wrappedClass: string =
		'block w-full text-sm border-0 px-0 bg-inherit dark:bg-inherit focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50';
	export let unWrappedClass: string = //
		'p-2.5 text-sm focus:ring-primary-500 border-gray-300 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50';
	export let innerWrappedClass: string = 'p-0 bg-inherit'; // bg-white dark:bg-gray-800 py-2 px-4
	export let headerClass: string = '';
	export let footerClass: string = '';

	let element: HTMLElement;
	let editor: Editor;
	const lowlight = createLowlight(all);
	//? Reference: https://tiptap.dev/docs/editor/getting-started/style-editor#editor
	let editorClass: string =
		'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none';

	let wrapped: boolean;
	$: wrapped = $$slots.header || $$slots.footer;

	let wrapperClass: string;
	$: wrapperClass = twMerge(
		'w-full rounded-lg bg-gray-50',
		background ? 'dark:bg-gray-600' : 'dark:bg-gray-700',
		'text-gray-900 dark:placeholder-gray-400 dark:text-white',
		'border border-gray-200',
		background ? 'dark:border-gray-500' : 'dark:border-gray-600',
		$$props.class
	);

	let textareaClass: string;
	$: textareaClass = wrapped ? wrappedClass : twMerge(wrapperClass, unWrappedClass);

	const headerCls = (header: boolean) =>
		twMerge(
			header ? 'border-b' : 'border-t',
			'py-2 px-3 border-gray-200',
			background ? 'dark:border-gray-500' : 'dark:border-gray-600',
			header ? headerClass : footerClass
		);

	let innerWrapperClass: string;
	$: innerWrapperClass = twMerge(
		innerWrappedClass,
		$$slots.footer ? '' : 'rounded-b-lg',
		$$slots.header ? '' : 'rounded-t-lg'
	);
	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Markdown.configure({
					html: true, // Allow HTML input/output
					tightLists: true, // No <p> inside <li> in markdown output
					tightListClass: 'tight', // Add class to <ul> allowing you to remove <p> margins when tight
					bulletListMarker: '-', // <li> prefix in markdown output
					linkify: false, // Create links from "https://..." text
					breaks: false, // New lines (\n) in markdown input are converted to <br>
					transformPastedText: false, // Allow to paste markdown text in the editor
					transformCopiedText: false // Copied text is transformed to markdown
				}),
				CodeBlockLowlight.configure({
					lowlight
				})
			],
			content: value,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			editorProps: {
				attributes: {
					class: twMerge(
						textareaClass,
						editorClass,
						$$slots.footer ? 'rounded-b-none' : 'rounded-b-lg',
						$$slots.header ? 'rounded-t-none' : 'rounded-t-lg'
					)
				}
			}
		});
		// console.log('Editor attr', editor.options.editorProps.attributes);
		// editor.setOptions({
		//     editorProps: {
		//         attributes: {
		//             class: 'prose'
		//         }
		//     }
		// });
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
	// const markdownOutput = editor.storage.markdown.getMarkdown();
</script>

<Wrapper show={wrapped} class={wrapperClass} id="wrapperHeader">
	{#if $$slots.header}
		<div id="headerSlots" class={headerCls(true)}>
			<slot name="header"></slot>
		</div>
	{/if}
	<Wrapper show={wrapped} class={innerWrapperClass}>
		<!-- 			{...$$restProps} -->
		<!-- <div bind:this={element} /> -->
		<svelte:element this="div" bind:this={element} />
	</Wrapper>
	{#if $$slots.footer}
		<div id="footerSlots" class={headerCls(false)}>
			<slot name="footer"></slot>
		</div>
	{/if}
</Wrapper>

<!--
  @component
  [Go to docs](https://flowbite-svelte.com/)
  ## Props
  @prop export let value: any = undefined;
  @prop export let wrappedClass: string = 'block w-full text-sm border-0 px-0 bg-inherit dark:bg-inherit focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50';
  @prop export let unWrappedClass: string = 'p-2.5 text-sm focus:ring-primary-500 border-gray-300 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50';
  @prop export let innerWrappedClass: string = 'py-2 px-4 bg-white dark:bg-gray-800';
  @prop export let headerClass: string = ''
    export let footerClass: string = '';
  -->

<!-- <style lang="postcss">
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';
	@layer components {
		.tiptap {
			:first-child {
				margin-top: 0;
			}

			/* add pre and code here */
			pre {
				font-family: 'JetBrainsMono', monospace;
			}
			/* Code styling */
			.hljs-comment,
			.hljs-quote {
				color: #616161;
			}

			.hljs-variable,
			.hljs-template-variable,
			.hljs-attribute,
			.hljs-tag,
			.hljs-name,
			.hljs-regexp,
			.hljs-link,
			.hljs-name,
			.hljs-selector-id,
			.hljs-selector-class {
				color: #f98181;
			}

			.hljs-number,
			.hljs-meta,
			.hljs-built_in,
			.hljs-builtin-name,
			.hljs-literal,
			.hljs-type,
			.hljs-params {
				color: #fbbc88;
			}

			.hljs-string,
			.hljs-symbol,
			.hljs-bullet {
				color: #b9f18d;
			}

			.hljs-title,
			.hljs-section {
				color: #faf594;
			}

			.hljs-keyword,
			.hljs-selector-tag {
				color: #70cff8;
			}

			.hljs-emphasis {
				font-style: italic;
			}

			.hljs-strong {
				font-weight: 700;
			}
		}
	}
</style> -->
