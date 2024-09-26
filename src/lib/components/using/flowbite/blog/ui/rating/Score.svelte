<script lang="ts">
	import { ScoreRating } from 'flowbite-svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RatingScore, Review, ReviewCriteria } from '$lib/filtering/zach';
	type $$Props = HTMLAttributes<HTMLDivElement> & Review;
	let className: $$Props['class'] = undefined;
	export { className as class };
	export let overallRating: $$Props['overallRating'] = undefined;
	export let totalReviews: $$Props['totalReviews'] = undefined;
	export let criteria: $$Props['criteria'] = undefined;
	let numberOfCriteria = Object.keys(criteria[0]).length;
	overallRating = overallRating ?? 0;
	let ratings = Object.entries(criteria[0]).map(([key, rating]) => {
		overallRating = overallRating + rating;
		return { label: key.replaceAll('_', ' '), rating: rating };
	});
	overallRating = overallRating / numberOfCriteria;

	let overallRatingText: string =
		overallRating !== undefined && overallRating !== null && overallRating >= 4
			? 'Excellent'
			: overallRating >= 3
				? 'Mid'
				: overallRating >= 2
					? 'Fair'
					: overallRating <= 1
						? 'Poor'
						: 'No rating';
	$: console.log(ratings);
	// [
	// 	{ label: 'Staff', rating: 8.8 },
	// 	{ label: 'Comfort', rating: 8.9 },
	// 	{ label: 'Free WiFi', rating: 8.8 },
	// 	{ label: 'Facilities', rating: 5.4 }
	// ]
	let headerLabel = {
		desc1: overallRating.toPrecision(2),
		desc2: overallRatingText,
		desc3: totalReviews ? `${totalReviews} reviews` : '',
		link: {
			label: 'Read all reviews',
			url: '/'
		}
	};
</script>

<!-- 	desc2Class="ms-2 w-24 font-medium text-gray-900 dark:text-white"
	desc3pClass="text-sm text-gray-500 dark:text-gray-400"
	desc3spanClass="mx-2 w-1 h-1 bg-gray-900 rounded-full dark:bg-gray-500" -->
<ScoreRating
	{headerLabel}
	{ratings}
	desc1Class="bg-blue-100 w-8 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800"
	barColor="'bg-orange-600 h-2.5 rounded dark:bg-orange-500'"
/>
