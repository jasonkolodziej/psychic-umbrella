<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import { Gallery, Img } from 'flowbite-svelte';
	import type { ExtendedImgType } from '$lib/media/fileUtils';
	import { onMount } from 'svelte';
	import { myStore, myMediaStore } from './store';

	export let items: ExtendedImgType[] = [];
	export let singleItem: ExtendedImgType = { src: '', alt: '', onload: () => {} };
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

	let asSubscriber = items.length === 0 ? true : false;

	$myStore = 0; // short form of `myStore.set(0)`
	// we can't assign a string to the store
	// $myStore = 'value'

	// const myOtherValue = $myOtherStore;
	// $myOtherStore = 'some value';

	// onMount(async () => {
	// 	await items.fetchData();
	// 	console.log($myMediaStore);
	// });

	// we can't set a value on our custom store,
	// since it doesn't include the `set` function
	// $myCustomUserStore = undefined

	// onMount(() => {
	// 	// myMediaStore.push(...items);
	// 	// console.log('myMediaStore:', myMediaStore);
	// 	items = asSubscriber ? $myMediaStore : items;
	// });

	$: divClass = twMerge('grid', $$props.class ?? classChange);

	function init(node: HTMLElement) {
		if (getComputedStyle(node).gap === 'normal') node.style.gap = 'inherit';
	}
	// $: latestItems = asSubscriber ? $myMediaStore : items;
	$: console.log(`Gallery items(${items.length}):`, items);
</script>

{#if single}
	<Img
		src={singleItem.src}
		alt={singleItem.alt}
		on:load={() => singleItem.onload && singleItem.onload()}
		bind:alignment={alignmentForSingle}
	/>
{:else}
	<div {...$$restProps} class={divClass} use:init>
		{#if galleryType === 'featured'}
			<div>
				<img
					src={items[0].src}
					alt={items[0].alt}
					on:load={() => items[0].onload && items[0].onload()}
					class={twMerge(imgClass, $$props.classImg ?? featuredImageClass)}
				/>
			</div>
			<Gallery items={items.slice(1)} class={featuredOtherImgsClass} />
		{:else}
			<!-- ? if not a subscriber -->
			{#each items as item}
				<slot {item}>
					<div>
						<img
							src={item.src}
							alt={item.alt}
							on:load={() => item.onload && item.onload()}
							class={twMerge(imgClass, $$props.classImg)}
						/>
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
  @prop export let galleryType: 'default' | 'masonry' | 'featured' | 'quad' = 'default';
  ### Gallery Types
  - `default`: Default grid
  - `masonry`: Masonry grid
  - `featured`: Featured image with other images
  - `quad`: Quad gallery

  @prop export let single: boolean = false;
  ### Single image
  Declares a single image to be displayed

  @prop export let singleItem: ImgType = { src: '', alt: '' };
  ### Single image data
  Single image data

  @prop export let singleAlignment: 'left' | 'right' | 'center' = 'center';
  ### Single image alignment
  Alignment of the single image
  - `left`: Aligns the image to the left
  - `right`: Aligns the image to the right
  - `center`: Aligns the image to the center
  -->
