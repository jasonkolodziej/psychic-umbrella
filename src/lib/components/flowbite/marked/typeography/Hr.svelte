<script lang="ts">
	import type { Tokens } from 'marked';
	import {
		MarkdownTokens,
		type Renderers,
		type MarkdownOptions
	} from '@magidoc/plugin-svelte-marked';

	// export const token: Tokens.Hr = undefined
	import { Hr } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	import type { HeadingLevel } from '$components/blog/ui/card';

	export let token: Tokens.Hr &
		Tokens.Generic &
		ComponentProps<Hr> & { with?: 'text' | 'icon' | 'trimmed' };
	export const options: MarkdownOptions = undefined;
	export const renderers: Renderers = undefined;

	let hrClass = token.with ?? 'trimmed';
	hrClass =
		hrClass === 'text'
			? 'my-8 w-64'
			: hrClass === 'icon'
				? 'my-8 w-64 h-1'
				: hrClass === 'trimmed'
					? 'w-48 h-1 mx-auto my-4 rounded md:my-20'
					: 'my-8'; // default
	$: console.log('Hr', { token });
</script>

<Hr bind:hrClass>
	<!-- {token.text} -->
</Hr>
<!-- <hr /> -->
