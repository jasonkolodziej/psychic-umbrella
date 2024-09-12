<script lang="ts">
	import type { Tokens } from 'marked';
	import {
		MarkdownTokens,
		type MarkdownOptions,
		type Renderers
	} from '@magidoc/plugin-svelte-marked';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		TableSearch
	} from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	export let token: Tokens.Table &
		Tokens.Generic &
		ComponentProps<Table> & {
			striped: boolean;
			hoverable: boolean;
		};
	export let options: MarkdownOptions;
	export let renderers: Renderers;

	let striped = token.striped ?? true;
	let hoverable = token.hoverable ?? true;
</script>

<Table bind:striped bind:hoverable>
	<TableHead>
		<!-- <tr> -->
		{#each token.header as item}
			<TableHeadCell scope="col">
				<MarkdownTokens tokens={item.tokens} {options} {renderers} />
			</TableHeadCell>
		{/each}
		<!-- </tr> -->
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each token.rows as row}
			<TableBodyRow>
				{#each row as col}
					<TableBodyCell>
						<MarkdownTokens tokens={col.tokens} {options} {renderers} />
					</TableBodyCell>
				{/each}
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
