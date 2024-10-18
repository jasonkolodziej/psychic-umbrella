<script lang="ts">
	import { Video } from 'flowbite-svelte';
	import { twJoin } from 'tailwind-merge';
	export let src: string = '';

	// export let type: string = 'video/mp4';

	export let trackSrc: string = '';

	export let srclang: string = 'en';

	export let label: string = 'english_captions';
	export let controls: boolean = true;
	export let rounded: boolean = true;
	export let responsive: boolean = true;

	let vidClass: string = twJoin(
		'border border-gray-200 dark:border-gray-700',
		responsive ? 'h-auto w-full max-w-full' : '',
		rounded ? 'rounded-lg' : ''
	);
	// export let loop: boolean = false;
	// export let muted: boolean = false;
	// export let playsinline: boolean = false;
	// export let preload: 'auto' | 'metadata' | 'none' = 'auto';
	// export let width: number | string = '100%';
	// export let height: number | string = 'auto';
</script>

<Video bind:src bind:controls class={vidClass} bind:trackSrc />
