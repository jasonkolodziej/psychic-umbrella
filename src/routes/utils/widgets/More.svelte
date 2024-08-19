<script lang="ts">
	import { ChevronRightOutline } from 'flowbite-svelte-icons';
	import { twMerge } from 'tailwind-merge';

	export let title: string = '';
	export let href: string = '#';

	export let flat: boolean = false;

	$: aClass = twMerge(
		'inline-flex items-center text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-500',
		flat ? '' : 'rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-primary-700 uppercase'
	);
</script>

<div class="flex-shrink-0">
	<a {href} class={aClass}>
		{title}
		<ChevronRightOutline size="md" />
	</a>
</div>
