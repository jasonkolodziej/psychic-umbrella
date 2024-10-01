<script lang="ts">
	import type { ImgType } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import { Gallery, Img } from 'flowbite-svelte';

	export let items: ImgType[] = [];
	export let singleItem: ImgType = { src: '', alt: '' };
	export let single: boolean = false;
	export let singleAlignment: 'left' | 'right' | 'center' = 'center';
	export let imgClass: string = 'h-auto max-w-full rounded-lg';
	export let galleryType: 'default' | 'masonry' | 'featured' | 'quad' = 'default';

	let defaultClass = 'gap-4 grid-cols-2 md:grid-cols-3';
	// With a masonry grid
	let masonryGridClass = 'gap-4 grid-cols-2 md:grid-cols-4';
	// With a featured image
	let featuredClass = 'gap-4';
	let featuredImageClass = 'h-auto max-w-full rounded-lg';
	let featuredOtherImgsClass = 'grid-cols-5';
	// Quad gallery
	let quadClass = 'gap-2 grid-cols-2';

	let classChange =
		galleryType === 'masonry'
			? masonryGridClass
			: galleryType === 'featured'
				? featuredClass
				: galleryType === 'quad'
					? quadClass
					: defaultClass;
	let alignmentForSingle =
		singleAlignment === 'right' ? 'ms-auto' : singleAlignment === 'center' ? 'mx-auto' : '';

	$: divClass = twMerge('grid', $$props.class ?? classChange);

	function init(node: HTMLElement) {
		if (getComputedStyle(node).gap === 'normal') node.style.gap = 'inherit';
	}
</script>

{#if single}
	<Img src={singleItem.src} alt={singleItem.alt} bind:alignment={alignmentForSingle} />
{:else}
	<div {...$$restProps} class={divClass} use:init>
		{#if galleryType === 'featured'}
			<div>
				<img
					src={items[0].src}
					alt={items[0].alt}
					class={twMerge(imgClass, $$props.classImg ?? featuredImageClass)}
				/>
			</div>
			<Gallery items={items.slice(1)} class={featuredOtherImgsClass} />
		{:else}
			{#each items as item}
				<slot {item}>
					<div>
						<img src={item.src} alt={item.alt} class={twMerge(imgClass, $$props.classImg)} />
					</div>
				</slot>
			{:else}
				<slot item={items[0]} />
			{/each}
		{/if}
	</div>
{/if}

<!--
  @component
  [Go to docs](https://flowbite-svelte.com/)
  ## Props
  @prop export let items: ImgType[] = [];
  @prop export let imgClass: string = 'h-auto max-w-full rounded-lg';
  -->
