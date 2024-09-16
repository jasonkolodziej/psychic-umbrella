import type { EditorOptions, Extension, Extensions } from '@tiptap/core';
import { StarterKit, type StarterKitOptions } from '@tiptap/starter-kit';
import { type FloatingMenuOptions, FloatingMenu } from '@tiptap/extension-floating-menu';
import { type BubbleMenuOptions, BubbleMenu } from '@tiptap/extension-bubble-menu';
import { Image } from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';
import { Highlight } from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import { Underline } from '@tiptap/extension-underline';
import { twMerge } from 'tailwind-merge';

//? Reference: https://tiptap.dev/docs/editor/getting-started/style-editor#editor
export const editorClass: string =
	'prose prose-sm sm:prose-sm lg:prose-lg xl:prose-2xl mx-auto focus:outline-none';

//? @tiptap/extension-starter-kit
export const defaultFlowbiteStarterkitOpts: Partial<StarterKitOptions> = {
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
};

export const extensionsWithNoOpts: Extensions = [
	StarterKit.configure(defaultFlowbiteStarterkitOpts),
	TextStyle,
	Subscript,
	Superscript,
	Color,
	Underline,
	Highlight.configure({ multicolor: true })
];

// ? "@tiptap/extension-floating-menu"
export const floatingMenuOpts = (
	element: HTMLElement,
	otherOpts?: FloatingMenuOptions
): Partial<FloatingMenuOptions> => {
	const defaultOptions: Partial<FloatingMenuOptions> = {
		tippyOptions: {
			duration: 100
		}
	};
	return { ...defaultOptions, ...otherOpts, element: element };
};
// ? "@tiptap/extension-bubble-menu"
export const bubbleMenuOpts = (
	element: HTMLElement,
	otherOpts?: BubbleMenuOptions
): Partial<BubbleMenuOptions> => {
	const defaultOptions: Partial<BubbleMenuOptions> = {
		tippyOptions: {
			duration: 100
		}
	};
	return { ...defaultOptions, ...otherOpts, element: element };
};

// @tiptap/extension-character-count
// "@tiptap/extension-code-block-lowlight"
// "@tiptap/extension-text-style"
export const editorOptions = (
	element: HTMLElement,
	editorOptions?: EditorOptions
): Partial<EditorOptions> => {
	return {
		element: element,
		editorProps: {
			attributes: {
				class: editorClass
			}
		},
		extensions: [
			Image,
			...extensionsWithNoOpts
			// BubbleMenu.configure(bubbleMenuOpts)
		],
		...editorOptions
	};
};
