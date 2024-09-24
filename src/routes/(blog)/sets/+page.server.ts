import type { PageServerLoad } from './$types';
import { client, legoSetsList, legoSetsRead } from '$lib/rebrickable/client';
import { env } from '$env/dynamic/private';
// import type { Config } from '@hey-api/client-fetch';

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
	//Using interceptors
	// rebrickableClient.interceptors.request.use((request, options) => {
	// 	request.headers.set('Authorization', `key ${testKey}`);
	// 	return request;
	// });

	let response = await legoSetsList();
	let { data } = response;
	// console.log('data', data);
	// response = await legoSetsRead({ path: { set_num: '76902-1' } });
	// data = response.data;
	// console.log('data', data);
	return { blog: { title: 'Blog', posts: [] }, sets: data.results };
};
