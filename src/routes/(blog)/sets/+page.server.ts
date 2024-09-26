import type { PageServerLoad } from './$types';
import { client, legoSetsList, legoSetsRead, legoThemesList } from '$lib/rebrickable/client';
import { env } from '$env/dynamic/private';
// import type { MaybePromise } from '$lib/utils/templates';
import type { LegoSetOverview, LegoTheme } from '$lib/filtering/zach';
import { json } from '@sveltejs/kit';
// import Fuse from 'fuse.js';
// import type { MaybePromise } from 'marked';
// import type { Config } from '@hey-api/client-fetch';

const gatherThemes = async (authKey?: string): Promise<LegoTheme[]> => {
	//Using interceptors
	if (authKey) {
		client.interceptors.request.use((request, options) => {
			request.headers.set('Authorization', `key ${authKey}`);
			return request;
		});
	}
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

const withPlatform = async (
	platform: Readonly<App.Platform> | undefined,
	route: { id: string }
	// cb: (authKey: string) => Promise<LegoSetOverview[]> | Promise<LegoTheme[]>
) => {
	const context = platform?.ctx;
	const bucket: R2Bucket = platform?.env.BLOGS_BUCKET;
	const bucketKey = route.id;
	// Retrieve the key "image.png"
	// Attempt to get the themes object from the bucket
	const themesObject = await bucket.get('/themes');
	let newThemesObject;
	if (themesObject === null) {
		const allThemes = await gatherThemes();
		//* Serialize the entire batch of messages to JSON
		const fileContent = new TextEncoder().encode(JSON.stringify(allThemes));
		//* Write the batch of messages to R2
		newThemesObject = await bucket.put(bucketKey, fileContent, {
			httpMetadata: {
				contentType: 'application/json'
			}
		});
		console.log('newProfileObject', newThemesObject);
		return allThemes;
	}
	console.debug('themesObject', themesObject);
	const responseJson = await themesObject.json<LegoTheme[]>();
	return responseJson;
	// return JSON.parse(themesObject.body, (item) => item as unknown as LegoTheme);
};

export const load: PageServerLoad = async ({ isDataRequest, request, platform, route }) => {
	//? First try to get the key from the platform
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
	let allThemes = await withPlatform(platform, route);
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
