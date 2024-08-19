<script lang="ts">
	import '../app.css';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		ImagePlaceholder,
		Skeleton,
		TextPlaceholder,
		Input,
		Button,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Avatar,
		DropdownHeader
	} from 'flowbite-svelte';
	import { SearchOutline, ChevronDownOutline } from 'flowbite-svelte-icons';
	import LegoButton from '$lib/components/LegoButton.svelte';
	import LegosButton from '$lib/components/flowbite/LegosButton.svelte';
	import WebsiteHeader from '$lib/components/editable/WebsiteHeader.svelte';
	import PrimaryButton from '$lib/components/editable/PrimaryButton.svelte';
	import LoginMenu from '$lib/components/editable/LoginMenu.svelte';
	import { fetchJSON } from '$lib/editable/util';
	export let data: LayoutData;
	let title,
		faqs,
		introStep1,
		introStep2,
		introStep3,
		introStep4,
		bioTitle,
		bioPicture,
		bio,
		testimonials,
		showUserMenu: any;
	let currentUser: any;
	function initOrReset() {
		$currentUser = data.currentUser;
		title = data.page?.title || 'Untitled Website';
		faqs = data.page?.faqs;

		// Make a deep copy
		testimonials = JSON.parse(JSON.stringify(data.page?.testimonials));

		introStep1 = JSON.parse(
			JSON.stringify(
				data.page?.introStep1 || {
					label: 'THE PROBLEM',
					title: 'The problem statement',
					description: 'Describe the problem you are solving in a short sentence.'
				}
			)
		);
		introStep2 = JSON.parse(
			JSON.stringify(
				data.page?.introStep2 || {
					label: 'THE DREAM',
					title: 'This is how it should be.',
					description: 'Describe why it should be like that.'
				}
			)
		);
		introStep3 = JSON.parse(
			JSON.stringify(
				data.page?.introStep3 || {
					label: 'THE REALITY',
					title: 'A statement why it is not that easy.',
					description: 'Describe the reality a bit more.'
				}
			)
		);
		introStep4 = JSON.parse(
			JSON.stringify(
				data.page?.introStep4 || {
					label: 'THE PROMISE',
					title: 'Still the solution is worth it.',
					description: 'And why this is, should be described here.'
				}
			)
		);
		bioPicture = data.page?.bioPicture || '/images/person-placeholder.jpg';
		bioTitle = data.page?.bioTitle || "Hi, I'm Michael — I want your website to be editable.";
		bio = data.page?.bio;
		$isEditing = false;
	}

	// --------------------------------------------------------------------------
	// Page logic
	// --------------------------------------------------------------------------

	function toggleEdit() {
		$isEditing = true;
		showUserMenu = false;
	}

	async function savePage() {
		try {
			// Only persist the start page when logged in as an admin
			if ($currentUser) {
				await fetchJSON('POST', '/api/save-page', {
					pageId: 'editable',
					page: {
						title,
						faqs,
						testimonials,
						introStep1,
						introStep2,
						introStep3,
						introStep4,
						bioPicture,
						bioTitle,
						bio
					}
				});
			}
			$isEditing = false;
		} catch (err) {
			console.error(err);
			alert('There was an error. Please try again.');
		}
	}
</script>

<!-- <slot></slot> -->

<div class="relative px-8">
	<Navbar class="fixed start-0 top-0 z-20 w-full border-b px-2 py-2.5 sm:px-4">
		<NavBrand href="/">
			<!-- <img src="/images/noun-lego-brick.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
			<img src="/images/noun-lego-brick.svg" class="me-3 h-6 sm:h-9" alt="Lego Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>Flowbite</span
			>
		</NavBrand>
		<!-- <div class="flex md:order-2">
			<LegosButton size="xs" color="yellow">Home</LegosButton>
		</div>
		<div class="flex md:order-2">
			<LegosButton size="xs" color="green">About</LegosButton>
		</div>
		<div class="flex md:order-2">
			<LegosButton size="xs" color="blue">Contact</LegosButton>
		</div> -->
		<div class="flex md:order-2">
			<Button
				color="none"
				data-collapse-toggle="mobile-menu-3"
				aria-controls="mobile-menu-3"
				aria-expanded="false"
				class="me-1 rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700 md:hidden"
			>
				<SearchOutline class="h-5 w-5" />
			</Button>
			<div class="relative hidden md:block">
				<div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
					<SearchOutline class="h-4 w-4" />
				</div>
				<Input id="search-navbar" class="ps-10" placeholder="Search..." />
			</div>
			<NavHamburger />
		</div>
		<div class="flex items-center md:order-2">
			<Avatar id="avatar-menu" src="/images/profile-picture-3.webp" />
			<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm">Bonnie Green</span>
				<span class="block truncate text-sm font-medium">name@flowbite.com</span>
			</DropdownHeader>
			<DropdownItem>Dashboard</DropdownItem>
			<DropdownItem>Settings</DropdownItem>
			<DropdownItem>Earnings</DropdownItem>
			<DropdownDivider />
			<DropdownItem>Sign out</DropdownItem>
		</Dropdown>
		<NavUl>
			<NavLi href="/" active={true}>Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/blog">Blog</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</Navbar>
	<!-- <div style="height:300px;" class="overflow-scroll pb-16"> -->
	<!-- <div class="overflow-scroll pb-16">
		<Skeleton class="mb-8 mt-16" />
		<ImagePlaceholder class="my-8" />
		<TextPlaceholder class="my-8" />
	</div> -->
	<WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
		<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
		<LoginMenu />
	</WebsiteHeader>
	<!-- <slot></slot> -->
</div>
