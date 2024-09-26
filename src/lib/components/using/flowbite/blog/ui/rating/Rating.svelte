<script lang="ts">
	import { P, Rating } from 'flowbite-svelte';
	export let id: string = undefined;
	export let total: number = 5;
	export let rating: number = 3.4;
	let ratingText: string = `${rating} out of ${total}`;
</script>

<Rating bind:id bind:total bind:rating>
	<P slot="text" class="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">{ratingText}</P>
</Rating>
