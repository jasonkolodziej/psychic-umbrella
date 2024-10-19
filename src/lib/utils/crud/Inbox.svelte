<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		Toolbar,
		ToolbarButton,
		ToolbarGroup,
		ButtonGroup,
		PaginationItem,
		Dropdown,
		DropdownItem,
		Pagination,
		DropdownDivider,
		DropdownHeader,
		Button
	} from 'flowbite-svelte';
	import {
		ArchiveSolid,
		TrashBinSolid,
		InfoCircleSolid,
		ExclamationCircleSolid,
		DotsVerticalOutline,
		ArrowLeftOutline,
		ArrowRightOutline,
		StarOutline,
		StarSolid,
		PlusOutline
	} from 'flowbite-svelte-icons';
	const previous = () => {
		alert('Previous btn clicked. Make a call to your server to fetch data.');
	};
	const next = () => {
		alert('Next btn clicked. Make a call to your server to fetch data.');
	};
	let helper = { start: 1, end: 10, total: 100 };
</script>

<Table hoverable={true}>
	<TableHead>
		<!-- <slot name="header"> -->
		<!-- <TableHeadCell> -->
		<Toolbar embedded class="!p-4">
			<ToolbarGroup>
				<Checkbox />
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarButton><TrashBinSolid color="gray" class="h-6 w-6" /></ToolbarButton>
				<ToolbarButton><ArchiveSolid color="gray" class="h-6 w-6" /></ToolbarButton>
				<ToolbarButton><ExclamationCircleSolid color="gray" class="h-6 w-6" /></ToolbarButton>
				<ToolbarButton><DotsVerticalOutline class="dots-menu dark:text-white" /></ToolbarButton>
			</ToolbarGroup>
			<ToolbarGroup>
				<!-- <ToolbarButton> -->
				<Button color="blue"><PlusOutline class="me-2 h-5 w-5" /> Compose</Button>
				<!-- </ToolbarButton> -->
			</ToolbarGroup>
		</Toolbar>
		<!-- </TableHeadCell> -->
		<TableHeadCell>
			<span class="sr-only">Star</span>
		</TableHeadCell>
		<TableHeadCell>
			<span class="sr-only">Sender</span>
		</TableHeadCell>

		<TableHeadCell>
			<span class="sr-only">Summary</span>
			<div class="text-sm text-gray-700 dark:text-gray-400">
				Showing <span class="font-semibold text-gray-900 dark:text-white">{helper.start}</span>
				to
				<span class="font-semibold text-gray-900 dark:text-white">{helper.end}</span>
				of
				<span class="font-semibold text-gray-900 dark:text-white">{helper.total}</span>
				Entries
			</div>
		</TableHeadCell>
		<TableHeadCell>
			<span class="sr-only">Date</span>
			<span class="sr-only">Actions</span>

			<!-- <Pagination table>
				<span slot="prev">Prev</span>
			</Pagination> -->
			<Pagination table>
				<!-- class="flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-600" -->
				<div slot="prev" class="flex items-center gap-2 text-white">
					<ArrowLeftOutline class="me-2 h-3.5 w-3.5" />
					Prev
				</div>
				<div slot="next" class="flex items-center gap-2 text-white">
					Next
					<ArrowRightOutline class="ms-2 h-6 w-6" />
				</div>
			</Pagination>
		</TableHeadCell>
		<!-- </slot> -->
	</TableHead>

	<TableBody tableBodyClass="divide-y">
		<TableBodyRow>
			<TableBodyCell class="!p-4">
				<Checkbox />
			</TableBodyCell>
			<TableBodyCell>
				<StarOutline size="lg" />
			</TableBodyCell>
			<TableBodyCell>Some Sender</TableBodyCell>
			<TableBodyCell>Summary</TableBodyCell>
			<TableBodyCell>Date</TableBodyCell>
		</TableBodyRow>
		<TableBodyRow>
			<TableBodyCell class="!p-4">
				<Checkbox />
			</TableBodyCell>
			<TableBodyCell>
				<StarOutline size="lg" />
			</TableBodyCell>
			<TableBodyCell>Some Sender</TableBodyCell>
			<TableBodyCell>Summary</TableBodyCell>
			<TableBodyCell>Date</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>

<Dropdown triggeredBy=".dots-menu">
	<DropdownItem>Dashboard</DropdownItem>
	<DropdownItem>Settings</DropdownItem>
	<DropdownItem>Earnings</DropdownItem>
	<DropdownItem slot="footer">Sign out</DropdownItem>
</Dropdown>
