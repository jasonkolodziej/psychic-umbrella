<script lang="ts">
	// import Link from '$lib/carta/components/link/Link.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/carta/utils';
	import { BlogBodyWrapper, BlogHead, Section } from 'flowbite-svelte-blocks';

	type $$Props = HTMLAttributes<HTMLParagraphElement> & {
		name:
			| 'advancedTable'
			| 'blog'
			| 'comment'
			| 'cta'
			| 'ctawithimg'
			| 'contact'
			| 'content'
			| 'contentwithimg'
			| 'crudcreatedrawer'
			| 'crudcreateform'
			| 'crudreadsection'
			| 'default'
			| 'faq'
			| 'feature'
			| 'forgotpassword'
			| 'headingwithctabutton'
			| 'heroDefault'
			| 'heroVisual'
			| 'login'
			| 'logos'
			| 'maintenance'
			| 'newsletter'
			| 'none'
			| 'page500'
			| 'page404'
			| 'portfolio'
			| 'pricing'
			| 'register'
			| 'reset'
			| 'schedule'
			| 'social'
			| 'tableheader'
			| 'team'
			| 'testimonial'
			| undefined;
		sectionClass?: string;
		classDiv?: string;
	};

	let className: $$Props['class'] = undefined;
	export let name: $$Props['name'] = undefined;
	export let sectionClass: $$Props['sectionClass'] =
		name === 'blog'
			? 'pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900'
			: name === 'comment'
				? 'not-format'
				: '';
	export let classDiv: $$Props['classDiv'] = name === 'comment' ? 'px-0' : '';

	export { className as class };
	// export let href: string;
</script>

<Section bind:name bind:sectionClass bind:classDiv>
	<slot />
</Section>
