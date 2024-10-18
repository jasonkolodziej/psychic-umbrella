<script lang="ts">
	import { HeroHeader, FeatureDefault, FeatureItem } from 'flowbite-svelte-blocks';
	import { Section } from '$components/using/flowbite/blog/ui/section';
	import {
		ChartPieSolid,
		LandmarkSolid,
		BriefcaseSolid,
		DollarOutline,
		RocketSolid,
		CogOutline
	} from 'flowbite-svelte-icons';
	import type { SvelteComponent } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	type FeatureItems = Array<{ icon: typeof SvelteComponent; h3: string; paragraph: string }>;
	type $$Props = HTMLAttributes<HTMLParagraphElement> & {
		//? HeaderHero props
		headerHeroClass?: string;
		headerHeaderH2Class?: string;
		headerHeroPClass?: string;
		headerHeroTitle?: string;
		headerHeroSubtitle?: string;
		headerHeroParagraph?: string;
		// feature items
		featureDivClass?: string;
		featureItemDivClass?: string;
		featureItemH3Class?: string;
		featureItemPClass?: string;
		featureItems?: FeatureItems;
	};
	let className: $$Props['class'] = undefined;
	//? HeaderHero props
	export let headerHeroClass: $$Props['headerHeroClass'] = undefined; // 'max-w-screen-md mb-8 lg:mb-16';
	export let headerHeaderH2Class: $$Props['headerHeaderH2Class'] = undefined; // 'mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white';
	export let headerHeroPClass: $$Props['headerHeroPClass'] = undefined; // 'text-gray-500 sm:text-xl dark:text-gray-400';
	export let headerHeroTitle: $$Props['headerHeroTitle'] = 'Featured';
	export let headerHeroSubtitle: $$Props['headerHeroSubtitle'] = 'Our latest blog posts';
	export let headerHeroParagraph: $$Props['headerHeroParagraph'] =
		'Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.';
	// feature items
	export let featureDivClass: $$Props['featureDivClass'] =
		'space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0';
	export let featureItemDivClass: $$Props['featureItemDivClass'] =
		'flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900';
	export let featureItemH3Class: $$Props['featureItemH3Class'] =
		'mb-2 text-xl font-bold dark:text-white';
	export let featureItemPClass: $$Props['featureItemPClass'] = 'text-gray-500 dark:text-gray-400';
	export let featureItems: $$Props['featureItems'] = undefined;
	featureItems = [
		{
			icon: RocketSolid,
			h3: 'How to build a successful startup',
			paragraph: 'Learn how to build a successful startup from scratch'
		},
		{
			icon: BriefcaseSolid,
			h3: 'How to build a successful startup',
			paragraph: 'Learn how to build a successful startup from scratch'
		}
	];
	export { className as class };
</script>

<Section name="feature">
	<HeroHeader
		bind:pClass={headerHeroPClass}
		bind:h1Class={headerHeroClass}
		bind:h2Class={headerHeaderH2Class}
	>
		<svelte:fragment slot="h1">{headerHeroTitle}</svelte:fragment>
		<svelte:fragment slot="h2">{headerHeroSubtitle}</svelte:fragment>
		<svelte:fragment slot="paragraph">{headerHeroParagraph}</svelte:fragment>
	</HeroHeader>

	<FeatureDefault bind:divClass={featureDivClass}>
		{#if featureItems}
			{#each featureItems as item}
				<FeatureItem
					bind:divClass={featureItemDivClass}
					bind:h3Class={featureItemH3Class}
					bind:pClass={featureItemPClass}
				>
					<svelte:fragment slot="icon">
						<svelte:component this={item.icon} />
					</svelte:fragment>
					<svelte:fragment slot="h3">{item.h3}</svelte:fragment>
					<svelte:fragment slot="paragraph">{item.paragraph}</svelte:fragment>
				</FeatureItem>
			{/each}
		{/if}
	</FeatureDefault>
</Section>
