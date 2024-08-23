<script lang="ts">
	import Notifications from '$lib/utils/dashboard/components/NotificationList.svelte';
	import AppsMenu from '$lib/utils/widgets/AppsMenu.svelte';
	import UserMenu from '$lib/utils/widgets/UserMenu.svelte';
	import {
		DarkMode,
		Dropdown,
		DropdownItem,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Navbar,
		Search
	} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	// import '../../app.pcss';
	import Users from '$lib/data/users.json';
	import type { RouteType } from '$lib/utils/routeTypes';
	// titles: ['Lego News', 'Lego Sets', 'Lego Reviews', 'Recommended Sets', 'About Me']
	const routes: RouteType[] = [
		{ name: 'Lego News', href: '/news' },
		{ name: 'Lego Sets', href: '/sets' },
		{ name: 'Lego Reviews', href: '/reviews' },
		{ name: 'Recommended Sets', href: '/sets' },
		{ name: 'About Me', href: '/about' }
	];

	export let companyOrgName = 'Beyond Bricks';
	export let fluid = true;
	export let drawerHidden = false;
	export let list: RouteType[] = [];

	// TODO: add dynamic routing
	$: list = routes;
</script>

<Navbar {fluid} class="text-black" color="default" let:NavContainer>
	<NavContainer class="mb-px mt-px px-1" {fluid}>
		<NavHamburger
			onClick={() => (drawerHidden = !drawerHidden)}
			class="m-0 me-3 md:block lg:hidden"
		/>
		<NavBrand href="/" class={list ? 'w-40' : 'lg:w-60'}>
			<img src="/images/noun-lego-brick.svg" class="me-2.5 h-6 sm:h-8" alt="Logos" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
				{companyOrgName}
			</span>
		</NavBrand>
		<div class="hidden lg:block lg:ps-3">
			{#if list}
				<NavUl class="ml-2" activeUrl="/" activeClass="text-primary-600 dark:text-primary-500">
					{#each list as { name, href, dropdown }, i}
						{#if dropdown}
							<NavLi class="cursor-pointer">
								Dropdown
								<ChevronDownOutline class="ms-0 inline" />
							</NavLi>
							<Dropdown class="z-20 w-44">
								<DropdownItem href="#top">Item 1</DropdownItem>
								<DropdownItem href="#top">Item 2</DropdownItem>
								<DropdownItem href="#top">Item 3</DropdownItem>
							</Dropdown>
						{/if}
						<NavLi {href}>{name}</NavLi>
					{/each}
					<!-- <NavLi href="/">Home</NavLi>
					<NavLi href="#top">Messages</NavLi>
					<NavLi href="#top">Profile</NavLi>
					<NavLi href="#top">Settings</NavLi>
					<NavLi class="cursor-pointer">
						Dropdown
						<ChevronDownOutline class="ms-0 inline" />
					</NavLi>
					<Dropdown class="z-20 w-44">
						<DropdownItem href="#top">Item 1</DropdownItem>
						<DropdownItem href="#top">Item 2</DropdownItem>
						<DropdownItem href="#top">Item 3</DropdownItem>
					</Dropdown> -->
				</NavUl>
			{:else}
				<form>
					<Search size="md" class="mt-1 w-96 border focus:outline-none" />
				</form>
			{/if}
		</div>
		<div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
			<Notifications />
			<AppsMenu />
			<DarkMode />
			<UserMenu {...Users[4]} />
		</div>
	</NavContainer>
</Navbar>
