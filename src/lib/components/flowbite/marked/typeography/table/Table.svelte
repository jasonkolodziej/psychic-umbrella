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
	import type { ComponentProps, ComponentType } from 'svelte';
	import { twJoin, twMerge } from 'tailwind-merge';
	import { classNames } from '$lib/editable/util';
	export let token: Tokens.Table &
		Tokens.Generic &
		ComponentProps<Table> & {
			striped: boolean;
			hoverable: boolean;
			shadow: boolean;
			noBorder: boolean;
		};
	export let options: MarkdownOptions;
	export let renderers: Renderers;
	let thCell: string = 'px-6 py-3';
	let tdCell: string = 'px-6 py-4 whitespace-nowrap font-medium ';
	let thClass: string = 'text-xs uppercase';
	let striped = token.striped ?? true;
	let hoverable = token.hoverable ?? true;
	let shadow = token.shadow ?? false;
	let noBorder = token.noBorder ?? false;
	$: console.log('Table', token);
</script>

<Table bind:striped bind:hoverable>
	<TableHead>
		<!-- <tr> -->
		{#each token.header as item}
			<TableHeadCell scope="col" padding={twMerge(thCell, item.align ? `text-${item.align}` : '')}>
				<MarkdownTokens tokens={item.tokens} {options} {renderers} />
			</TableHeadCell>
		{/each}
		<!-- </tr> -->
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each token.rows as row}
			<TableBodyRow>
				{#each row as col}
					<TableBodyCell
						tdClass={twMerge(tdCell, 'font-normal', col.align ? `text-${col.align}` : '')}
					>
						<MarkdownTokens tokens={col.tokens} {options} {renderers} />
					</TableBodyCell>
				{/each}
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
