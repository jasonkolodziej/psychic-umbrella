<script lang="ts">
	import { classNames } from '$lib/editable/util';
	import { wrapInList } from 'prosemirror-schema-list';

	export let editorView;
	export let editorState;

	$: schema = editorState.schema;
	$: disabled = !wrapInList(schema.nodes.bullet_list)(editorView.state);

	function handleClick() {
		wrapInList(schema.nodes.bullet_list)(editorState, editorView.dispatch);
		editorView.focus();
	}
</script>

<button
	on:click={handleClick}
	{disabled}
	class={classNames('rounded-full p-2 hover:bg-gray-100 disabled:opacity-30 sm:mx-1')}
>
	<slot />
</button>
