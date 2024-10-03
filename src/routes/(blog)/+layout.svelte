<script lang="ts">
	import '../../app.pcss';
	import Navbar from '$components/using/flowbite/blog/Navbar.svelte';
	let drawerHidden = false;
	import type { RouteType } from '$lib/utils/routeTypes';
	import { StarOutline } from 'flowbite-svelte-icons';
	// titles: ['Lego News', 'Lego Sets', 'Lego Reviews', 'Recommended Sets', 'About Me']
	let routes: RouteType[] = [
		{ name: 'Lego News', href: '/news' },
		{
			name: 'Legos',
			// href: '/legos',
			dropdown: [
				{ name: 'Sets', href: '/sets' },
				{ name: 'Reviews', href: '/reviews', icon: StarOutline },
				{ name: 'Recommended', href: '/sets' }
			]
		},
		// { name: 'Lego Reviews', href: '/reviews' },
		// { name: 'Recommended Sets', href: '/sets' },
		{ name: 'About Me', href: '/about' },
		{ name: 'Markdown', href: '/markdown' },
		{ name: 'Photos', href: '/photos' }
	];
</script>

<header
	class="fixed top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800"
>
	<Navbar bind:list={routes} />
</header>
<div class="mx-auto max-w-screen-2xl pt-[70px]">
	<slot />
	<!-- <Footer /> -->
</div>
