<script lang="ts">
	import {
		// Section,
		PricingBodyHead,
		PricingCard,
		PricingItemWrapper,
		PricingHead,
		PricingItem
	} from 'flowbite-svelte-blocks';
	import Section from './section.svelte';
	import { Button, Img, ImagePlaceholder } from 'flowbite-svelte';
	import type { IPriceCard } from '$components/using/flowbite/blog/ui/card';
	// import type { SvelteComponent } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import type { HTMLAttributes } from 'svelte/elements';
	// import type { PricingItemSlots } from 'flowbite-svelte-blocks/PricingItem.svelte';
	type SomePriceCard = IPriceCard & {
		onClick?: () => void;
		buttonLabel?: string;
	};
	type PriceCards = Array<SomePriceCard>;
	type $$Props = {
		class?: string;
		heading?: string;
		details?: string;
		priceCardsClass?: string;
		priceCards?: PriceCards;
		pcTitleClass?: string;
		pcDescriptionClass?: string;
		pcBodyPriceClass?: string;
		pcPriceClass?: string;
		pcPricePeriodClass?: string;
		pcFeaturesClass?: string;
		pcButtonColor?:
			| 'red'
			| 'yellow'
			| 'green'
			| 'purple'
			| 'blue'
			| 'light'
			| 'dark'
			| 'primary'
			| 'none'
			| 'alternative'
			| undefined;
	};
	let className: $$Props['class'] = undefined;
	export let heading: $$Props['heading'] = 'Designed for business teams like yours';
	export let details: $$Props['details'] =
		'Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.';
	export let priceCards: $$Props['priceCards'] = [
		{
			title: 'Starter',
			description: 'Best option for personal use & for your next project.',
			price: '$29',
			pricePeriod: 'month',
			image: { src: '/images/noun-lego-brick.svg', alt: 'placeholder' },
			features: [
				'Individual configuration',
				'No setup, or hidden fees',
				'Team size: 1 developer',
				'Premium support: 6 months',
				'Free updates: 6 months'
			],
			buttonLabel: 'Get started'
		}
	];
	export let priceCardsClass: $$Props['priceCardsClass'] =
		'space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-10';
	// Inidividual price card classes
	// Body of the price card
	export let pcTitleClass: $$Props['pcTitleClass'] = undefined; // 'mb-4 text-2xl font-semibold'
	export let pcDescriptionClass: $$Props['pcDescriptionClass'] = undefined; // 'font-light text-gray-500 sm:text-lg dark:text-gray-400'
	export let pcBodyPriceClass: $$Props['pcBodyPriceClass'] = undefined; // 'flex justify-center items-baseline my-8'
	// Price of the price card
	export let pcPriceClass: $$Props['pcPriceClass'] = 'mr-2 text-5xl font-extrabold';
	export let pcPricePeriodClass: $$Props['pcPricePeriodClass'] = 'text-gray-500 dark:text-gray-400';
	// Features of the price card
	export let pcFeaturesClass: $$Props['pcFeaturesClass'] = 'text-green-500 dark:text-green-400';
	// Button of the price card
	export let pcButtonColor: $$Props['pcButtonColor'] = 'primary';
	export { className as class };
</script>

<Section name="pricing">
	<PricingHead>
		<svelte:fragment slot="h2">{heading}</svelte:fragment>
		<svelte:fragment slot="paragraph">{details}</svelte:fragment>
	</PricingHead>
	<div class={priceCardsClass}>
		{#each priceCards as { title, description, price, features, pricePeriod, buttonColor, buttonLabel, onClick, image }, i}
			<PricingCard>
				{#if image}
					<Img src={image.src} alt={image.alt} />
				{/if}
				<!-- <ImagePlaceholder imgOnly /> -->
				<PricingBodyHead
					h3Class={twMerge('mb-4 text-2xl font-semibold', pcTitleClass ?? '')}
					pClass={twMerge(
						'font-light text-gray-500 sm:text-lg dark:text-gray-400',
						pcDescriptionClass ?? ''
					)}
					priceClass={twMerge('flex justify-center items-baseline my-8', pcBodyPriceClass ?? '')}
				>
					<svelte:fragment slot="h3">{title}</svelte:fragment>
					<svelte:fragment slot="paragraph">{description}</svelte:fragment>
					<svelte:fragment slot="price">
						<span class={pcPriceClass}>{price}</span>
						{#if pricePeriod}
							<span class={pcPricePeriodClass}>/{pricePeriod}</span>
						{/if}
					</svelte:fragment>
				</PricingBodyHead>
				<PricingItemWrapper>
					{#each features as feature, i}
						<PricingItem class={pcFeaturesClass}>
							<span>{feature}</span>
						</PricingItem>
					{/each}

					<!-- <PricingItem class="text-green-500 dark:text-green-400">
						<span>No setup, or hidden fees</span>
					</PricingItem>
					<PricingItem class="text-green-500 dark:text-green-400">
						<span>Team size: <span class="font-semibold">1 developer</span></span>
					</PricingItem>
					<PricingItem class="text-green-500 dark:text-green-400">
						<span>Premium support: <span class="font-semibold">6 months</span></span>
					</PricingItem>
					<PricingItem class="text-green-500 dark:text-green-400">
						<span>Free updates: <span class="font-semibold">6 months</span></span>
					</PricingItem> -->

					<svelte:fragment slot="btn">
						<Button bind:color={pcButtonColor}>{buttonLabel}</Button>
					</svelte:fragment>
				</PricingItemWrapper>
			</PricingCard>
		{/each}
	</div>
</Section>
