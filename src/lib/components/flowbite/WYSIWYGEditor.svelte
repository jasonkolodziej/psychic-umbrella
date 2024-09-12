<script lang="ts">
	import { Textarea, Toolbar, ToolbarGroup, ToolbarButton, Button, Span } from 'flowbite-svelte';
	import {
		PaperClipOutline,
		MapPinAltSolid,
		ImageOutline,
		CodeOutline,
		FaceGrinOutline,
		PaperPlaneOutline
	} from 'flowbite-svelte-icons';
	import type { Tokens } from 'marked';
	import { type SvelteComponent, type ComponentProps, onMount } from 'svelte';
	import { twJoin, twMerge } from 'tailwind-merge';
	import { setContext } from 'svelte';
	type $$Props = {
		value?: any;
		codeLang?: string;
		placeholder?: string;
		toolbarBtnIconClass?: string;
		iconButtonLabel?: string;
		toolbarButtons?: Array<Array<ComponentProps<ToolbarButton> & { icon: SvelteComponent }>>;
	};
	// type $$RestProps = Omit<$$Props, 'value'>;
	// type $$Slots = BlockquoteSlots & { default: {} };
	// TODO: make more dynamic
	export let iconButtonLabel: $$Props['iconButtonLabel'] = 'Publish post';
	export let value: $$Props['value'] = undefined;
	export let codeLang: $$Props['codeLang'] = undefined;
	export let placeholder: $$Props['placeholder'] = 'Write a comment';
	export let toolbarBtnIconClass: $$Props['toolbarBtnIconClass'] = 'h-6 w-6';
	export let toolbarButtons: $$Props['toolbarButtons'] = [
		[
			{ name: 'Attach file', icon: PaperClipOutline },
			{ name: 'Embed map', icon: MapPinAltSolid },
			{ name: 'Upload image', icon: ImageOutline }
		],
		[
			{ name: 'Format code', icon: CodeOutline },
			{ name: 'Add emoji', icon: FaceGrinOutline }
		]
	];
</script>

<form>
	<label for="editor" class="sr-only">{iconButtonLabel}</label>
	<Textarea id="editor" rows="8" class="mb-4" bind:placeholder bind:value>
		<Toolbar slot="header" embedded>
			{#each toolbarButtons as group, i}
				<ToolbarGroup>
					{#each group as { name, icon, customClass }, j}
						<ToolbarButton {name} class={customClass}>
							<svelte:component this={icon} class={twMerge(toolbarBtnIconClass, customClass)} />
						</ToolbarButton>
					{/each}
				</ToolbarGroup>
			{/each}
			<ToolbarButton name="send" slot="end">
				<PaperPlaneOutline class="h-6 w-6 rotate-45" />
			</ToolbarButton>
		</Toolbar>
	</Textarea>
	<Button>{iconButtonLabel}</Button>
</form>
