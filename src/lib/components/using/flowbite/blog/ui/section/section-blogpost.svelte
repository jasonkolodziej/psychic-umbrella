<script lang="ts">
	// import Link from '$lib/carta/components/link/Link.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import { Section, BlogTemplate, Comment, CommentItem } from 'flowbite-svelte-blocks';
	import { Button, Textarea, Label, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { DotsHorizontalOutline } from 'flowbite-svelte-icons';
	import example from '$lib/data/blog-example.json';
	import type { BlogPost } from '$lib/filtering/blog';

	type $$Props = HTMLAttributes<HTMLParagraphElement> & {};

	let className: $$Props['class'] = undefined;

	export { className as class };
	// export let href: string;
</script>

<Section name="blog">
	<article
		class={cn(
			'format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full max-w-2xl',
			className
		)}
	>
		<slot />
	</article>
</Section>
