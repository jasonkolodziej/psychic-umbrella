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
	<!-- <TableHead> -->
	<!-- <slot name="header"> -->
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
			<Button color="blue">Post comment</Button>
			<!-- </ToolbarButton> -->
		</ToolbarGroup>
	</Toolbar>
	<!-- </slot> -->
	<!-- </TableHead> -->

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

<Dropdown triggeredBy=".dots-menu">
	<DropdownItem>Dashboard</DropdownItem>
	<DropdownItem>Settings</DropdownItem>
	<DropdownItem>Earnings</DropdownItem>
	<DropdownItem slot="footer">Sign out</DropdownItem>
</Dropdown>
