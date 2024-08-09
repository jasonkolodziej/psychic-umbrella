<script lang="ts">
	import { classNames } from '$lib/editable/util';
	import { toggleMark } from 'prosemirror-commands';
	import { createLink } from '$lib/editable/editor/prosemirrorCommands';

	export let editorView;
	export let editorState;

	$: schema = editorState.schema;
	$: disabled = !createLink(editorState, null, editorView);

	function handleClick() {
		let url = prompt('Enter link URL', 'https://example.com');
		if (url) {
			toggleMark(schema.marks.link, { href: url })(editorState, editorView.dispatch);
			editorView.focus();
		}
	}
</script>

<button
	on:click={handleClick}
	{disabled}
	class={classNames('rounded-full p-2 hover:bg-gray-100 disabled:opacity-30 sm:mx-1')}
>
	<slot />
</button>
