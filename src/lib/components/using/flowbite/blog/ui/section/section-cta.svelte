<script lang="ts">
	import { Cta } from 'flowbite-svelte-blocks';
	import Section from './section.svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';

	type $$Props = {
		class?: string;
		heading?: string;
		headingColor?: string;
		details?: string;
		detailsColor?: string;
		linkLabel?: string;
		linkHref?: string;
		linkColor?: string;
	};
	export let heading: $$Props['heading'] = 'Get started with Flowbite';
	export let headingColor: $$Props['headingColor'] = undefined;
	export let details: $$Props['details'] =
		'Flowbite helps you connect with friends and communities of people who share your interests. Connecting with your friends and family as well as discovering new ones is easy with features like Groups.';
	export let detailsColor: $$Props['detailsColor'] = 'gray';
	let detailsClass = `mb-6 font-light text-${detailsColor}-500 md:text-lg dark:text-${detailsColor}-400`;
	export let linkLabel: $$Props['linkLabel'] = 'Get started';
	export let linkHref: $$Props['linkHref'] = '/';
	export let linkColor: $$Props['linkColor'] = 'primary';
	let linkClass = `inline-flex items-center rounded-lg bg-${linkColor}-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-${linkColor}-800 focus:ring-4 focus:ring-${linkColor}-300 dark:focus:ring-${linkColor}-900`;
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<Section name="ctawithimg">
	<Cta ctatype="image">
		<svelte:fragment slot="img">
			<img
				class="w-full dark:hidden"
				src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
				alt="dashboard"
			/>
			<img
				class="hidden w-full dark:block"
				src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
				alt="dashboard"
			/>
		</svelte:fragment>
		<svelte:fragment slot="h2">
			<div class={headingColor ? `text-${headingColor}-600` : ''}>
				{heading}
			</div>
		</svelte:fragment>
		<p class={detailsClass}>
			{details}
		</p>
		<a href={linkHref} class={linkClass}>
			{linkLabel}
			<ArrowRightOutline size="md" class="-mr-1 ml-2" />
		</a>
	</Cta>
</Section>
