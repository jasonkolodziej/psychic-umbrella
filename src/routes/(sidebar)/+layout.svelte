<script>
	import '../../app.css';
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
	let drawerHidden = false;
</script>

<header
	class="fixed top-0 z-40 mx-auto w-full flex-none border-b border-primary-200 bg-white dark:border-primary-600 dark:bg-primary-800"
>
	<Navbar bind:drawerHidden />
</header>

<!-- TODO: debug darkmode -->
<div class="overflow-hidden lg:flex">
	<Sidebar bind:drawerHidden />
	<div class="relative h-full w-full overflow-y-auto pt-[70px] lg:ml-64">
		<slot />
	</div>
</div>
