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
		Checkbox
	} from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	import { twJoin, twMerge } from 'tailwind-merge';
	export let token: Tokens.Table &
		Tokens.Generic &
		ComponentProps<Table> & {
			striped: boolean;
			hoverable: boolean;
			shadow: boolean;
			noBorder: boolean;
			checkboxes: boolean;
		};
	export let options: MarkdownOptions;
	export let renderers: Renderers;
	let thCell: string = 'px-6 py-3';
	let tdCell: string = 'px-6 py-4 whitespace-nowrap font-normal';
	let thClass: string = 'text-xs uppercase';

	let checkboxes = token.checkboxes ?? false;
	let striped = token.striped ?? true;
	let hoverable = token.hoverable ?? true;
	let shadow = token.shadow ?? false;
	let noBorder = token.noBorder ?? false;
	let checkedCells: Array<{ row: Tokens.TableCell[]; checked: boolean }> = [];
	let allChecked: boolean = false;

	// $: console.log('Table', token);
</script>

<Table bind:striped bind:hoverable>
	<TableHead theadClass={thClass}>
		{#if checkboxes}
			<TableHeadCell class="!p-4">
				<Checkbox
					bind:checked={allChecked}
					on:change={({ target: { checked } }) => {
						if (checked) {
							checkedCells = token.rows.map((row) => ({ row, checked: true }));
						} else {
							checkedCells = [];
						}
					}}
				/>
			</TableHeadCell>
		{/if}
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
				{#if checkboxes}
					<TableHeadCell class="!p-4">
						<Checkbox
							checked={allChecked}
							on:change={({ target: { checked } }) => {
								if (checkedCells.length === 0) {
									checkedCells.push({ row, checked });
								} else {
									checkedCells = checkedCells.map((cell) =>
										cell.row === row ? { ...cell, checked } : cell
									);
								}
								console.log('Checked Cells', checkedCells);
							}}
						/>
					</TableHeadCell>
				{/if}
				{#each row as col}
					<TableBodyCell tdClass={twJoin(tdCell, col.align ? `text-${col.align}` : '')}>
						<MarkdownTokens tokens={col.tokens} {options} {renderers} />
					</TableBodyCell>
				{/each}
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
