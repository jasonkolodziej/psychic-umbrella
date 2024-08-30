<script lang="ts">
	// import Link from '$lib/carta/components/link/Link.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import { BlogBodyWrapper, BlogHead, Section } from 'flowbite-svelte-blocks';

	type $$Props = HTMLAttributes<HTMLParagraphElement> & {
		title: string;
		description: string;
	};

	let className: $$Props['class'] = undefined;
	export let title: $$Props['title'] = '';
	export let description: $$Props['description'] = '';

	export { className as class };
	// export let href: string;
</script>

<Section name="blog">
	<BlogHead>
		<svelte:fragment slot="h2">{title}</svelte:fragment>
		<svelte:fragment slot="paragraph">
			<p class="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
				{description}
			</p>
		</svelte:fragment>
	</BlogHead>
	<BlogBodyWrapper>
		<slot />
	</BlogBodyWrapper>
</Section>
