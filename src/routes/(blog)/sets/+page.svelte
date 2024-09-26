<script lang="ts">
	import Article from '$components/using/flowbite/blog/ui/article/article.svelte';
	import Post from '$components/using/flowbite/blog/ui/post/Post.svelte';
	import { SectionBlog } from '$components/using/flowbite/blog/ui/section';
	import type { ComponentProps } from 'svelte';
	import blog from '$lib/data/blog-example.json';
	import { ChevronRightOutline, VideoCameraSolid } from 'flowbite-svelte-icons';
	import Fuse from 'fuse.js';
	import {
		Popover,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch,
		A,
		Img
	} from 'flowbite-svelte';
	import type { PageData } from '../$types';
	import type { LegoSetOverview, LegoTheme } from '$lib/filtering/zach';

	/**
		** Pages can break out of the current layout hierarchy on a route-by-route basis. 
		** Suppose we have an /item/[id]/embed route inside the (app) group from the previous example:
		src/routes/
		├ (app)/
		│ ├ item/
		│ │ ├ [id]/
		│ │ │ ├ embed/
	** +│ │ │ │ └ +page.svelte
		│ │ │ └ +layout.svelte
		│ │ └ +layout.svelte
		│ └ +layout.svelte
		└ +layout.svelte
		Ordinarily, this would inherit the root layout, the (app) layout, 
		the item layout and the [id] layout. We can reset to one of those layouts by appending @ followed 
		by the segment name — or, for the root layout, the empty string. In this example, we can choose from the following options:

	** +page@[id].svelte - inherits from src/routes/(app)/item/[id]/+layout.svelte
	** +page@item.svelte - inherits from src/routes/(app)/item/+layout.svelte
	** +page@(app).svelte - inherits from src/routes/(app)/+layout.svelte
	** +page@.svelte - inherits from src/routes/+layout.svelte
    */
	let articles: Array<ComponentProps<Article>> = [
		{
			head: { when: '14 days ago', icon: VideoCameraSolid, iconLabel: 'Tutorial' },
			body: {
				title: 'Review of the new iPhone 13',
				bodyParagraph: "The new iPhone 13 is here, and it's amazing!"
			},
			author: {
				title: 'Jese Leos',
				imgSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
				imgDescription: 'Jese Leos avatar',
				moreInfoHref: '/',
				moreInfoLabel: 'Read more'
			}
		},
		{
			head: { when: '14 days ago', icon: VideoCameraSolid, iconLabel: 'Tutorial' },
			body: {
				title: 'Review of the new iPhone 13',
				bodyParagraph: "The new iPhone 13 is here, and it's amazing!"
			},
			author: {
				title: 'Jese Leos',
				imgSrc: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
				imgDescription: 'Jese Leos avatar',
				moreInfoHref: '/',
				moreInfoLabel: 'Read more'
			}
		}
	];
	export let data: PageData;
	let searchTerm = '';

	let items: Array<LegoSetOverview> = data.sets;
	let keysRedacted = data.redactKeys ?? ['set_url', 'set_img_url'];
	const keysOfLegoSets = Object.keys(items[0]);
	let filteredKeys = keysOfLegoSets.filter((key) =>
		keysRedacted.indexOf(key) !== -1 ? false : true
	);
	// console.debug('filteredKeys', filteredKeys);
	//? Create a new instance of Fuse
	const fuse = new Fuse(items, { keys: filteredKeys });
	//? Make keys for table headers human readable
	let headers = filteredKeys.map((key) => key.replaceAll('_', ' '));
	// console.debug('headers used', headers);

	// $: filteredItems = items.filter(
	// 	(item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	// );
	$: filteredItems =
		searchTerm === '' ? items : fuse.search(searchTerm).map((result) => result.item);
</script>

<main class="p-4">
	<SectionBlog title="Sets" lead="All the sets so far..." bind:articles />
	<TableSearch placeholder="Search by maker name" hoverable={true} bind:inputValue={searchTerm}>
		<TableHead>
			{#each headers as head}
				<TableHeadCell>{head}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each filteredItems as item, i}
				<TableBodyRow>
					{#each filteredKeys as key}
						{#if key === 'theme'}
							<TableBodyCell>{item[key]['name']}</TableBodyCell>
						{:else if key === 'name'}
							<TableBodyCell>
								<A href={item['set_url']}>{item[key]}</A>
								<Popover class="w-96 text-sm font-light" defaultClass="">
									<!-- class="grid grid-cols-1" -->
									<div class="grid grid-flow-col justify-items-center p-2 md:grid-flow-row">
										<!-- class="col-span-1 h-full rounded-e-lg" -->
										<Img src={item['set_img_url']} class="rounded-lg" alt={item[key]} />
									</div>
								</Popover>
							</TableBodyCell>
						{:else}
							<TableBodyCell>{item[key]}</TableBodyCell>
						{/if}
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</main>
