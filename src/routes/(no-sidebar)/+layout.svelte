<script>
	import Footer from '$lib/components/admin-dashboard/noSidebar/Footer.svelte';
	import Navbar from '$lib/components/admin-dashboard/sidebar/Navbar.svelte';

	import '../../app.pcss';
	import { headerNavBar, footerDivClass } from '$lib/components/admin-dashboard/noSidebar/layout';
</script>

<header class={headerNavBar}>
	<Navbar />
</header>

<div class={footerDivClass}>
	<slot />
	<Footer />
</div>
