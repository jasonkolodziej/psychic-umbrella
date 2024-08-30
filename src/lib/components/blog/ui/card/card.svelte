<script lang="ts">
	import Link from '$lib/carta/components/link/Link.svelte';
	import { cn } from '$lib/carta/utils';

	let className = '';
	export { className as class };
	export let href: string;
</script>

<Link
	{href}
	class={cn(
		'bg-card text-card-foreground block rounded-xl border bg-opacity-30 shadow hover:border-sky-300',
		className
	)}
	{...$$restProps}
	on:click
	on:focusin
	on:focusout
	on:mouseenter
	on:mouseleave
>
	<slot />
</Link>
