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
import type { SvelteComponent } from 'svelte';
// import

interface ResizableMediaAction {
	tooltip: string;
	// icon: string;
	icon: typeof SvelteComponent;

	action?: (updateAttributes: (o: Record<string, any>) => any) => void;
	isActive?: (attrs: Record<string, any>) => boolean;
	delete?: (d: () => void) => void;
	attrsToUpdate?: Record<string, any>;
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
