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
		DropdownDivider
	} from 'flowbite-svelte';
	import { SearchOutline, ChevronDownOutline } from 'flowbite-svelte-icons';
	import LegoButton from '$lib/components/LegoButton.svelte';
	import LegosButton from '$lib/components/flowbite/LegosButton.svelte';
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
		<div class="flex md:order-2">
			<LegosButton size="xs" color="yellow">Home</LegosButton>
		</div>
		<div class="flex md:order-2">
			<LegosButton size="xs" color="green">About</LegosButton>
		</div>
		<div class="flex md:order-2">
			<LegosButton size="xs" color="blue">Contact</LegosButton>
		</div>
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
		<NavUl>
			<NavLi href="/" active={true}>Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/docs/components/navbar">Navbar</NavLi>
			<NavLi href="/pricing">Pricing</NavLi>
			<NavLi class="cursor-pointer">
				Dropdown<ChevronDownOutline class="ms-2 inline h-6 w-6 text-primary-800 dark:text-white" />
			</NavLi>
			<Dropdown class="z-20 w-44">
				<DropdownItem href="/">Dashboard</DropdownItem>
				<DropdownItem href="/docs/components/navbar">Settings</DropdownItem>
				<DropdownItem href="/">Earnings</DropdownItem>
				<DropdownDivider />
				<DropdownItem href="/">Sign out</DropdownItem>
			</Dropdown>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</Navbar>
	<!-- <div style="height:300px;" class="overflow-scroll pb-16"> -->
	<div class="overflow-scroll pb-16">
		<Skeleton class="mb-8 mt-16" />
		<ImagePlaceholder class="my-8" />
		<TextPlaceholder class="my-8" />
	</div>
</div>
