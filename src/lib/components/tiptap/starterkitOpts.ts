import {
	Extension,
	getAttributes,
	mergeAttributes,
	type EditorOptions,
	type Extensions
} from '@tiptap/core';
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
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem as CustomTaskListItem } from './taskItem';
// import { TaskItem } from '@tiptap/extension-task-item';
import { twMerge } from 'tailwind-merge';
// import type { HTMLAttributes } from 'svelte/elements';

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
	orderedList: {
		//? Decides whether to keep the marks from a previous line after
		//? toggling the list either using inputRule or using the button
		keepMarks: true,
		//? Decides whether to keep the attributes from a previous line
		//? after toggling the list either using inputRule or using the button
		keepAttributes: true
	},
	bulletList: {
		keepMarks: true,
		keepAttributes: true
	},
	bold: {
		HTMLAttributes: {
			class: 'text-inherit'
		}
	}
};
// //? https://tiptap.dev/docs/editor/extensions/custom-extensions/extend-existing#global-attributes
//? https://tiptap.dev/docs/editor/extensions/custom-extensions/extend-existing#commands
const CustomImage = Image.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			align: {
				default: null,
				// Customize the HTML parsing (for example, to load the initial content)
				parseHTML: (element) => element.getAttribute('data-align'),
				// … and customize the HTML rendering.
				renderHTML: (attributes) => {
					return {
						'data-align': attributes.align,
						class: twMerge(
							'h-auto max-w-full rounded-lg',
							attributes.align === 'center'
								? 'mx-auto'
								: attributes.align === 'right'
									? 'ms-auto'
									: ''
						)
					};
				}
			}
		};
	},
	addCommands() {
		return {
			...this.parent?.(),
			toggleImageAlign:
				// (attributes) =>


					(alignment: 'left' | 'center' | 'right') =>
					({ chain, commands }) => {
						// Doesn’t work:
						// return editor.chain() …

						// Does work:
						// return chain().insertContent('foo!').insertContent('bar!').run();
						return chain().addAttributes({ align: alignment }).run();
					}
			// paragraph:
			// 	() =>
			// 	({ commands }) => {
			// 		return commands.setNode('paragraph');
			// 	}
		};
	}
});

export const extensionsWithNoOpts: Extensions = [
	StarterKit.configure(defaultFlowbiteStarterkitOpts),
	TextStyle,
	// * @tiptap/extension-subscript
	Subscript,
	// * @tiptap/extension-superscript
	Superscript,
	// * @tiptap/extension-color
	Color,
	// * @tiptap/extension-underline
	Underline,
	// * @tiptap/extension-highlight
	Highlight.configure({ multicolor: true }),
	//* @tiptap/extension-table
	Table.configure({
		resizable: true
		// HTMLAttributes: {
		// 	class: 'table-auto'
		// }
	}),
	//* @tiptap/extension-table-row
	TableRow,
	//* @tiptap/extension-table-header
	TableHeader,
	//* @tiptap/extension-table-cell
	TableCell,
	// * @tiptap/extension-task-list
	TaskList.configure({
		HTMLAttributes: {
			class: 'list-disc list-inside'
		}
	}),
	//*  @tiptap/extension-task-item
	// TaskItem.configure({
	// 	nested: true,
	// 	// listItem (li): class='flex items-center gap-3'
	// 	// --> label: class="text-sm rtl:text-right font-medium text-gray-900 dark:text-gray-300 flex items-center"
	// 	// --> --> input: class="w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600"
	// 	HTMLAttributes: {
	// 		class: twMerge(
	// 			'flex items-center gap-3', // listItem (li)
	// 			'text-sm rtl:text-right font-medium text-gray-900 dark:text-gray-300 flex items-center', // label
	// 			'input:w-4 input:h-4 input:bg-gray-100 input:border-gray-300 input:dark:ring-offset-gray-800 input:focus:ring-2 input:dark:bg-gray-700 input:dark:border-gray-600 input:rounded input:text-primary-600 input:focus:ring-primary-500 input:dark:focus:ring-primary-600'
	// 		)
	// 	}
	// }),
	CustomTaskListItem.configure({
		nested: true,
		HTMLAttributes: { class: 'flex items-center gap-4' }
	}),
	// * @tiptap/extension-image
	CustomImage.configure({
		inline: false
		// HTMLAttributes: {
		// 	class: 'max-w-lg rounded-lg'
		// }
	})
];

const TextAlign = Extension.create({
	addGlobalAttributes() {
		return [
			{
				// Extend the following extensions
				types: ['heading', 'paragraph'],
				// … with those attributes
				attributes: {
					textAlign: {
						default: 'left',
						renderHTML: (attributes) => ({
							style: `text-align: ${attributes.textAlign}`
						}),
						parseHTML: (element) => element.style.textAlign || 'left'
					}
				}
			}
		];
	}
});

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
			...extensionsWithNoOpts
			// BubbleMenu.configure(bubbleMenuOpts)
		],
		// triggered on every change https://tiptap.dev/docs/guides/output-json-html
		onUpdate: ({ editor }) => {
			const json = editor.getJSON();
			// send the content to an API here
		},
		...editorOptions
	};
};
