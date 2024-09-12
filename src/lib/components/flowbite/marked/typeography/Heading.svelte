<script lang="ts">
	// import { generatePathSegment } from '$lib/utils/url';

	import type { Tokens } from 'marked';
	import {
		MarkdownTokens,
		urlUtils,
		type MarkdownOptions,
		type Renderers
	} from '@magidoc/plugin-svelte-marked';
	import { Heading, A as Link } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	import type { HeadingLevel } from '$components/blog/ui/card';
	import { twJoin } from 'tailwind-merge';

	export let token: Tokens.Heading & ComponentProps<Heading> & { level: number; size?: string };

	// export let token: Tokens.Heading
	export let options: MarkdownOptions;
	export const renderers: Renderers = undefined;
	let headingClass: string = 'text-gray-900 dark:text-white';
	let tag: HeadingLevel = ('h' + token.depth) as HeadingLevel;
	// let size: string = token.size || 'text-2xl font-bold';
	let id: string | undefined;
	let href: string | undefined;
	$: id = urlUtils.generatePathSegment(token.text, options.slugger);
	$: headingClass = id ? twJoin('group', 'relative', headingClass) : headingClass;
	$: href = '#' + id;
	// $: console.log('Heading id', id, 'class', headingClass);
</script>

<!-- <span class="absolute -top-[140px]" {id}> -->
<Heading bind:tag class={headingClass}>
	<!-- {token.text} -->
	<slot />
	<!-- <MarkdownTokens tokens={token.tokens} {renderers} {options} /> -->
	{#key id}
		<span class="absolute -top-[140px]" {id}></span>
		<Link
			class="text-primary-700 dark:text-primary-700 ms-2 opacity-0 transition-opacity group-hover:opacity-100"
			{href}
			aria-label="Link to this section: {token.text}"
		>
			#
		</Link>
	{/key}
</Heading>

<!-- </span> -->

<!-- <svelte:element this={`h${token.depth}`} {id}>
  <slot />
</svelte:element> -->
