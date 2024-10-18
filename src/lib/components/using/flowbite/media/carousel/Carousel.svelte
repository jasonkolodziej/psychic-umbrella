<script lang="ts">
	import { Carousel } from 'flowbite-svelte';
	// import images from './imageData/images.json';
	import type { HTMLAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	export let images: HTMLAttributes<HTMLImageElement>[] = [];
	export let imageCaptionClass: string = 'bg-gray-300 text-center dark:bg-gray-700 dark:text-white';
	let index = 0;
	let image: { alt: any };
</script>

<div class="max-w-4xl space-y-4">
	<Carousel {images} let:Indicators let:Controls on:change={({ detail }) => (image = detail)}>
		<Controls />
		<Indicators />
	</Carousel>

	<div class={twMerge('my-2 h-10 rounded p-2', imageCaptionClass)}>
		{image?.alt}
	</div>
</div>
