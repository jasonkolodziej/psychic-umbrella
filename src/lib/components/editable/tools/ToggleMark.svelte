<script lang="ts">
	import { toggleMark } from 'prosemirror-commands';
	import { markActive } from '$lib/editable/editor/prosemirrorUtil';
	import { classNames } from '$lib/editable/util';

	export let editorView;
	export let editorState;
	export let type;

	$: schema = editorState.schema;
	$: markType = schema.marks[type];

	$: command = toggleMark(markType);
	$: disabled = !markType || !command(editorState, null);
	$: active = markActive(markType)(editorState);

	function handleClick() {
		command(editorState, editorView.dispatch, editorView);
		editorView.focus();
	}
</script>

<button
	on:click={handleClick}
	{disabled}
	class={classNames(
		active ? 'bg-gray-900 text-white' : 'hover:bg-gray-100',
		'rounded-full p-2 disabled:opacity-30 sm:mx-1'
	)}
>
	<slot />
</button>
