import {
	type KeyboardShortcutCommand,
	mergeAttributes,
	Node,
	wrappingInputRule
} from '@tiptap/core';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';

export interface TaskItemOptions {
	/**
	 * A callback function that is called when the checkbox is clicked while the editor is in readonly mode.
	 * @param node The prosemirror node of the task item
	 * @param checked The new checked state
	 * @returns boolean
	 */
	onReadOnlyChecked?: (node: ProseMirrorNode, checked: boolean) => boolean;

	/**
	 * Controls whether the task items can be nested or not.
	 * @default false
	 * @example true
	 */
	nested: boolean;

	/**
	 * HTML attributes to add to the task item element.
	 * @default {}
	 * @example { class: 'foo' }
	 */
	HTMLAttributes: Record<string, any>;
	labelClass: string;
	inputClass: string;

	/**
	 * The node type for taskList nodes
	 * @default 'taskList'
	 * @example 'myCustomTaskList'
	 */
	taskListTypeName: string;
}

/**
 * Matches a task item to a - [ ] on input.
 */
export const inputRegex = /^\s*(\[([( |x])?\])\s$/;

/**
 * This extension allows you to create task items.
 * @see https://www.tiptap.dev/api/nodes/task-item
 */
export const TaskItem = Node.create<TaskItemOptions>({
	name: 'taskItem',

	addOptions() {
		return {
			nested: false,
			HTMLAttributes: {
				class: 'flex items-center gap-3'
			},
			labelClass:
				'text-sm rtl:text-right font-medium text-gray-900 dark:text-gray-300 flex items-center',
			inputClass:
				'w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600',
			taskListTypeName: 'taskList'
		};
	},

	content() {
		return this.options.nested ? 'paragraph block*' : 'paragraph+';
	},

	defining: true,

	addAttributes() {
		return {
			checked: {
				default: false,
				keepOnSplit: false,
				parseHTML: (element) => {
					const dataChecked = element.getAttribute('data-checked');

					return dataChecked === '' || dataChecked === 'true';
				},
				renderHTML: (attributes) => ({
					'data-checked': attributes.checked
				})
			},
			labelAttrs: {
				default:
					'text-sm rtl:text-right font-medium text-gray-900 dark:text-gray-300 flex items-center',
				// keepOnSplit: false,
				parseHTML: (element) => {
					// console.log('element', element);
					const classData = element.getElementsByTagName('label')[0].getAttribute('class');

					return (
						classData ??
						'text-sm rtl:text-right font-medium text-gray-900 dark:text-gray-300 flex items-center'
					);
				},
				renderHTML: (attributes) => ({
					class: attributes.labelAttrs.default
				})
			},
			inputAttrs: {
				default:
					'w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600',
				// keepOnSplit: false,
				parseHTML: (element) => {
					const classData = element.getElementsByTagName('input')[0].getAttribute('class');

					return (
						classData ??
						'w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600'
					);
				},
				renderHTML: (attributes) => {
					console.log('attributes', attributes);
					return {
						class: attributes.inputAttrs.default
					};
				}
			}
		};
	},

	parseHTML() {
		return [
			{
				tag: `li[data-type="${this.name}"]`,
				priority: 51
			}
		];
	},

	renderHTML({ node, HTMLAttributes }) {
		console.log('node', node);
		return [
			'li',
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
				'data-type': this.name
			}),
			[
				'label',
				[
					'input',
					{
						type: 'checkbox',
						checked: node.attrs.checked ? 'checked' : null
					}
				]
				// ['span']
			],
			['div', 0]
		];
	},

	addKeyboardShortcuts() {
		const shortcuts: {
			[key: string]: KeyboardShortcutCommand;
		} = {
			Enter: () => this.editor.commands.splitListItem(this.name),
			'Shift-Tab': () => this.editor.commands.liftListItem(this.name)
		};

		if (!this.options.nested) {
			return shortcuts;
		}

		return {
			...shortcuts,
			Tab: () => this.editor.commands.sinkListItem(this.name)
		};
	},

	addNodeView() {
		return ({ node, HTMLAttributes, getPos, editor }) => {
			const listItem = document.createElement('li');
			const checkboxWrapper = document.createElement('label');
			// const checkboxStyler = document.createElement('span');
			const checkbox = document.createElement('input');
			const content = document.createElement('div');

			checkboxWrapper.contentEditable = 'false';
			checkbox.type = 'checkbox';
			checkbox.addEventListener('mousedown', (event) => event.preventDefault());
			checkbox.addEventListener('change', (event) => {
				// if the editor isn’t editable and we don't have a handler for
				// readonly checks we have to undo the latest change
				if (!editor.isEditable && !this.options.onReadOnlyChecked) {
					checkbox.checked = !checkbox.checked;

					return;
				}

				const { checked } = event.target as any;

				if (editor.isEditable && typeof getPos === 'function') {
					editor
						.chain()
						.focus(undefined, { scrollIntoView: false })
						.command(({ tr }) => {
							const position = getPos();

							if (typeof position !== 'number') {
								return false;
							}
							const currentNode = tr.doc.nodeAt(position);

							tr.setNodeMarkup(position, undefined, {
								...currentNode?.attrs,
								checked
							});

							return true;
						})
						.run();
				}
				if (!editor.isEditable && this.options.onReadOnlyChecked) {
					// Reset state if onReadOnlyChecked returns false
					if (!this.options.onReadOnlyChecked(node, checked)) {
						checkbox.checked = !checkbox.checked;
					}
				}
			});

			checkbox.setAttribute('class', this.options.inputClass);
			checkboxWrapper.setAttribute('class', this.options.labelClass);

			listItem.dataset.checked = node.attrs.checked;
			if (node.attrs.checked) {
				checkbox.setAttribute('checked', 'checked');
			}

			checkboxWrapper.appendChild(checkbox); //* , checkboxStyler);
			listItem.appendChild(checkboxWrapper);
			listItem.appendChild(content);

			Object.entries(HTMLAttributes).forEach(([key, value]) => {
				listItem.setAttribute(key, value);
			});

			listItem.setAttribute('class', 'flex items-center gap-3');

			return {
				dom: listItem,
				contentDOM: content,
				update: (updatedNode) => {
					if (updatedNode.type !== this.type) {
						return false;
					}

					listItem.dataset.checked = updatedNode.attrs.checked;
					if (updatedNode.attrs.checked) {
						checkbox.setAttribute('checked', 'checked');
					} else {
						checkbox.removeAttribute('checked');
					}

					return true;
				}
			};
		};
	},

	addInputRules() {
		return [
			wrappingInputRule({
				find: inputRegex,
				type: this.type,
				getAttributes: (match) => ({
					checked: match[match.length - 1] === 'x'
				})
			})
		];
	}
});
