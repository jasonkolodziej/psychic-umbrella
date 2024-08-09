<script lang="ts">
	import PlainText from './PlainText.svelte';
	import RichText from './RichText.svelte';

	export let intro;
</script>

<div class="my-12">
	<div class="relative mb-20 mt-20 bg-white py-8">
		<div class="text-center text-sm font-bold sm:text-base">
			<PlainText bind:content={intro.label} />
		</div>
		<div class="pt-2 text-center text-2xl font-bold md:text-5xl">
			<PlainText bind:content={intro.title} />
		</div>
		<div class="mx-auto max-w-md pt-2 text-center text-lg md:pt-4 md:text-2xl">
			<RichText bind:content={intro.description} />
		</div>
	</div>
</div>
