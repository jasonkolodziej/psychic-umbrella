<script lang="ts">
	import options from '$lib/utils/graphs/thinmultibars';
	import LastRange from '$lib/utils/widgets/LastRange.svelte';
	import More from '$lib/utils/widgets/More.svelte';
	import { Card, Chart, Input } from 'flowbite-svelte';
	import { CalendarMonthOutline } from 'flowbite-svelte-icons';
	import Change from '$lib/utils/dashboard/components/Change.svelte';
	import type { ApexOptions } from 'apexcharts';
	import { SvelteComponent, type ComponentProps } from 'svelte';

	export let title: string = 'Desktop PC';
	export let description: string = 'Sales by category';
	export let changedValue: ComponentProps<Change> = { value: 2.5, since: 'Since last month' };
	export let moreLink: ComponentProps<More> = { title: 'Sales Report', href: '#top' };
	export let chartOptions: ApexOptions = options;

	// export class DesktopPc extends SvelteComponent<{
	// 	title?: string;
	// 	description?: string;
	// 	changedValue?: ComponentProps<Change>;
	// 	moreLink?: ComponentProps<More>;
	// 	chartOptions?: ApexOptions;
	// }> {}
</script>

<Card size="xl" class="h-fit">
	<div
		class="items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700 sm:flex"
	>
		<div class="mb-4 w-full sm:mb-0">
			<h3 class="text-base font-normal text-gray-500 dark:text-gray-400">
				{description}
			</h3>
			<span class="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
				{title}
			</span>
			<Change value={changedValue?.value} since={changedValue?.since} size="sm" />
		</div>
		<div class="w-full max-w-lg">
			<div class="grid grid-cols-2 items-center gap-4">
				<Input placeholder="From" class="border">
					<CalendarMonthOutline slot="left" size="md" />
				</Input>
				<Input placeholder="To" class="border">
					<CalendarMonthOutline slot="left" size="md" />
				</Input>
			</div>
		</div>
	</div>
	<Chart options={chartOptions}></Chart>
	<div
		class="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6"
	>
		<LastRange />
		<More {...moreLink} />
	</div>
</Card>
