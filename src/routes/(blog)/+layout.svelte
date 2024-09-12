<script>
	import '../../app.pcss';
	import Navbar from '$components/using/flowbite/blog/Navbar.svelte';
	let drawerHidden = false;
</script>

<header
	class="fixed top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800"
>
	<Navbar />
</header>
<div class="mx-auto max-w-screen-2xl pt-[70px]">
	<slot />
	<!-- <Footer /> -->
</div>
