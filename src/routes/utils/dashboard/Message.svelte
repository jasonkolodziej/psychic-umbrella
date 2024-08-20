<script>
	import { Button, Textarea, Toolbar, ToolbarButton } from 'flowbite-svelte';
	import { ImageSolid, MapPinAltSolid, PaperClipOutline } from 'flowbite-svelte-icons';
	import { setContext } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	const cardClassBase = '';
	const innerStyling = 'py-2 px-4 bg-white dark:bg-gray-800';
	const unwrappedStyling =
		'p-2.5 text-sm focus:ring-primary-500 border-gray-300 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50';
	// const colorStyle = twMerge(cardClassBase, 'dark:bg-primary-800');

	setContext('background', false);
</script>

<!-- TODO: Fix color -->
<form>
	<Textarea
		innerWrappedClass={twMerge(innerStyling, 'dark:bg-primary-800')}
		unWrappedClass={twMerge(unwrappedStyling, 'border-primary-200')}
		rows="8"
		placeholder="Write your message"
		required
	>
		<div slot="footer" class="flex items-center justify-between">
			<Button type="submit" size="xs">Post comment</Button>
			<Toolbar embedded class="text-gray-500 dark:text-gray-400" slot="foot">
				<ToolbarButton class="p-2 hover:text-gray-900 dark:hover:text-white">
					<PaperClipOutline size="md" />
					<span class="sr-only">Attach file</span>
				</ToolbarButton>
				<ToolbarButton class="p-2 hover:text-gray-900 dark:hover:text-white">
					<MapPinAltSolid size="md" />
					<span class="sr-only">Set location</span>
				</ToolbarButton>
				<ToolbarButton class="p-2 hover:text-gray-900 dark:hover:text-white">
					<ImageSolid size="md" />
					<span class="sr-only">Upload image</span>
				</ToolbarButton>
			</Toolbar>
		</div>
	</Textarea>
</form>
