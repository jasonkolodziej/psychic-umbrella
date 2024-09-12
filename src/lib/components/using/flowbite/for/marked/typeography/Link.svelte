<script lang="ts">
	import type { Token, Tokens } from 'marked';
	import {
		MarkdownTokens,
		urlUtils,
		type MarkdownOptions,
		type Renderers
	} from '@magidoc/plugin-svelte-marked';
	import { A, Video, type PweightType } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	const { isRelative, joinUrlPaths } = urlUtils;
	export let token: Tokens.Link &
		ComponentProps<A> &
		Tokens.Generic & {
			pretty: boolean;
			emphasis?: boolean;
			strong?: boolean;
			video?: boolean;
			videoBordered?: boolean;
		};

	export let options: MarkdownOptions;
	export let renderers: Renderers;
	token = {
		...token,
		emphasis: token.tokens.some((t: Token) => t.type === 'em'),
		strong: token.tokens.some((t: Token) => t.type === 'strong')
	};
	// TODO: Unrecognized Content-Security-Policy directive 'require-trusted-types-for'
	//? https://dev.to/askrodney/sveltekit-content-security-policy-csp-for-xss-protection-589k
	let video =
		token.href.includes('youtube.com') ||
		(token.tokens.length === 1 && token.tokens[0].type === 'link');
	let videoBordered =
		token.videoBordered === false ? '' : 'border border-gray-200 dark:border-gray-700';
	let videoTrackSrc = 'flowbite.mp4';
	let italic = token.emphasis ?? true;
	let weight: PweightType = token.strong ? 'bold' : 'normal';
	let inline = 'underline hover:no-underline';

	// $: console.log('Link', { token });
</script>

{#if video}
	<Video
		src={token.href}
		controls
		class={twMerge('h-auto w-full max-w-full rounded-lg', videoBordered)}
	/>
{:else}
	<A href={token.href}>
		<MarkdownTokens tokens={token.tokens} {renderers} {options} />
	</A>
{/if}

<!-- <a
  href={isRelative(token.href) 
    ? joinUrlPaths(options.baseUrl, token.href)
    : token.href}
  title={token.title}
>
  <slot />
</a> -->
