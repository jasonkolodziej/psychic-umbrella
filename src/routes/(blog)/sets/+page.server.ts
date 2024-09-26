import type { PageServerLoad } from './$types';
import { client, legoSetsList, legoSetsRead, legoThemesList } from '$lib/rebrickable/client';
import { env } from '$env/dynamic/private';
// import type { MaybePromise } from '$lib/utils/templates';
import type { LegoSetOverview, LegoTheme } from '$lib/filtering/zach';
// import Fuse from 'fuse.js';
// import type { MaybePromise } from 'marked';
// import type { Config } from '@hey-api/client-fetch';

const gatherThemes = async (authKey: string): Promise<LegoTheme[]> => {
	//Using interceptors
	client.interceptors.request.use((request, options) => {
		request.headers.set('Authorization', `key ${authKey}`);
		return request;
	});
	const allThemes = new Array<LegoTheme>();
	let {
		data: { next, results }
	} = await legoThemesList();
	if (results) {
		allThemes.push(...results);
	}
	while (next) {
		const nextUrl = new URL(next);
		const nextPage = nextUrl.searchParams.get('page');
		// console.log('gathering next page number', nextPage);
		({
			data: { next, results }
		} = await legoThemesList({ query: { page: nextPage as unknown as number } }));
		// console.log('results', results);
		if (results) {
			allThemes.push(...results);
		}
		next = next ?? false;
	}
	return new Promise((resolve) => resolve(allThemes));
};

export const load: PageServerLoad = async ({ isDataRequest, request, platform }) => {
	const testKey = platform?.env.REBRICKABLE_API_KEY || env.REBRICKABLE_API_KEY;
	// console.log('testKey', testKey);
	// configure internal service client
	client.setConfig({
		// set default base url for requests
		//   baseUrl: 'https://petstore3.swagger.io/api/v3',
		baseUrl: 'https://rebrickable.com',
		// set default headers for requests
		headers: {
			Authorization: `key ${testKey}`
		}
	});
	const allThemes = await gatherThemes(testKey);
	console.log('allThemes', allThemes);
	let response = await legoSetsList();
	let {
		data: { results }
	} = response;
	results.forEach((set: LegoSetOverview) => {
		const filtered = allThemes.filter((theme) => theme.id === set.theme_id);
		// console.log('theme', filtered);
		set.theme = filtered[0];
	});
	//? other methods to get data
	// response = await legoSetsRead({ path: { set_num: '76902-1' } });
	// data = response.data;
	// console.log('data', data);
	return {
		blog: { title: 'Blog', posts: [] },
		redactKeys: ['set_url', 'set_img_url', 'theme_id'],
		sets: results,
		themes: allThemes
	};
};
