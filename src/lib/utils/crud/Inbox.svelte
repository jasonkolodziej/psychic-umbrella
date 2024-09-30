<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		ButtonGroup,
		PaginationItem,
		Button
	} from 'flowbite-svelte';
	import {
		ArchiveSolid,
		TrashBinSolid,
		InfoCircleSolid,
		ExclamationCircleSolid,
		ArrowLeftOutline,
		ArrowRightOutline
	} from 'flowbite-svelte-icons';
	const previous = () => {
		alert('Previous btn clicked. Make a call to your server to fetch data.');
	};
	const next = () => {
		alert('Next btn clicked. Make a call to your server to fetch data.');
	};
</script>

<Table hoverable={true}>
	<TableHead>
		<TableHeadCell class="!p-4">
			<Checkbox />
		</TableHeadCell>
		<TableHeadCell class="!p-4">
			<!-- <div class="flex flex-wrap items-center gap-2"> -->

			<Button class="!p-4"><TrashBinSolid color="gray" class="h-6 w-6" /></Button>
			<!-- <Button class="!p-4"><ArchiveSolid color="gray" class="h-6 w-6" /></Button>
			<Button class="!p-4"><ExclamationCircleSolid color="gray" class="h-6 w-6" /></Button> -->
			<!-- </div> -->
		</TableHeadCell>
		<TableHeadCell class="!p-4">
			<div
				class="inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"
			/>
		</TableHeadCell>
		<TableHeadCell class="!p-4" />
		<!-- <TableHeadCell>
			<PaginationItem table class="flex items-center" on:click={previous}>
				<ArrowLeftOutline class="me-2 h-3.5 w-3.5" />
				Previous
			</PaginationItem>
		</TableHeadCell> -->
		<!-- <TableHeadCell>Color</TableHeadCell>
      <TableHeadCell>Category</TableHeadCell>
      <TableHeadCell>Price</TableHeadCell> -->
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		<TableBodyRow>
			<TableBodyCell class="!p-4">
				<Checkbox />
			</TableBodyCell>
			<TableBodyCell>Some Sender</TableBodyCell>
			<TableBodyCell>Summary</TableBodyCell>
			<TableBodyCell>Date</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>
