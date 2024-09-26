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
		return { label: key.replaceAll('_', ' '), rating };
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

<ScoreRating {headerLabel} bind:ratings />
