/* @unocss-include */
// import {
// 	IconAlignCenter,
// 	IconAlignLeft,
// 	IconAlignRight,
// 	IconFloatLeft,
// 	IconFloatRight,
// 	IconDelete
// } from '$components/icons';
import {
	AlignHorizontalCenter,
	AlignHorizontalLeft,
	AlignHorizontalRight,
	AlignBoxMiddleLeft,
	AlignBoxMiddleRight,
	TrashCan
} from 'carbon-icons-svelte';
import { getContext, setContext, type SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';
// import

interface ResizableMediaAction {
	tooltip: string;
	// icon: string;
	icon: typeof SvelteComponent;

	action?: (updateAttributes: (o: Record<string, any>) => any) => void;
	isActive?: (attrs: Record<string, any>) => boolean;
	delete?: (d: () => void) => void;
	attrsToUpdate: Record<string, any>;
}

export const resizableMediaActions: ResizableMediaAction[] = [
	{
		tooltip: 'Align left',
		action: (updateAttributes) =>
			updateAttributes({
				dataAlign: 'left',
				dataFloat: null
			}),
		attrsToUpdate: {
			dataAlign: 'left',
			dataFloat: null
		},
		// icon: IconAlignLeft,
		icon: AlignHorizontalLeft,
		isActive: (attrs) => attrs.dataAlign === 'left'
	},
	{
		tooltip: 'Align center',
		action: (updateAttributes) =>
			updateAttributes({
				dataAlign: 'center',
				dataFloat: null
			}),
		attrsToUpdate: {
			dataAlign: 'center',
			dataFloat: null
		},
		// icon: IconAlignCenter,
		icon: AlignHorizontalCenter,
		isActive: (attrs) => attrs.dataAlign === 'center'
	},
	{
		tooltip: 'Align right',
		action: (updateAttributes) =>
			updateAttributes({
				dataAlign: 'right',
				dataFloat: null
			}),
		attrsToUpdate: {
			dataAlign: 'right',
			dataFloat: null
		},
		// icon: IconAlignRight,
		icon: AlignHorizontalRight,
		isActive: (attrs) => attrs.dataAlign === 'right'
	},
	{
		tooltip: 'Float left',
		action: (updateAttributes) =>
			updateAttributes({
				dataAlign: null,
				dataFloat: 'left'
			}),
		attrsToUpdate: {
			dataAlign: null,
			dataFloat: 'left'
		},
		// icon: IconFloatLeft,
		icon: AlignBoxMiddleLeft,
		isActive: (attrs) => attrs.dataFloat === 'left'
	},
	{
		tooltip: 'Float right',
		action: (updateAttributes) =>
			updateAttributes({
				dataAlign: null,
				dataFloat: 'right'
			}),
		attrsToUpdate: {
			dataAlign: null,
			dataFloat: 'right'
		},
		// icon: IconFloatRight,
		icon: AlignBoxMiddleRight,
		isActive: (attrs) => attrs.dataFloat === 'right'
	},
	{
		tooltip: 'Delete',
		// icon: IconDelete,
		icon: TrashCan,
		delete: (deleteNode) => deleteNode()
	}
];

export type ResizableMediaStateContext = Record<string, boolean>;

// a unique identifier
// in order to not have to come up with a name we can use an empty object
const KEY = {};

// in our setter we can pass in anything we want. It doesn't need to have
// the same type as the actual context
export const setResizableMediaContext = (items: ResizableMediaAction[]) => {
	setContext<ResizableMediaStateContext>(KEY, {
		// contexts are not reactive, in order to keep data in sync
		// we can use stores inside a context
		currentSlide: writable(0),
		items
	});
};

// our getter simply wraps the `getContext` function and its type declaration
export const getResizableMediaContext = () => {
	const context = getContext<ResizableMediaStateContext>(KEY);
	if (context !== undefined) return context;

	// TypeScript thinks the function will always return a value of type `SliderContext`,
	// but it's not true in the case we forgot to call `setSliderContext` first.
	// In this case it would return `undefined`, which could lead to an unexpected behavior,
	// so instead we'll throw an error which will inform you about the issue.
	throw new Error('you forgot to set the Slider context before accessing it');
};
