import type { R2Bucket } from '@cloudflare/workers-types';
import type { PageServerLoad } from './$types';
// import { onRequestGet } from '$functions/blogs';
// import { mdReader } from '$lib/mdReader';
export const load: PageServerLoad = async ({ isDataRequest, request, platform }) => {
	const context = platform?.ctx;
	const blogsBucket: R2Bucket = await platform?.env.BLOGS_BUCKET.get('blogs'); //.get('handler');
	// const blogsStub = blogsDo.get(blogsId);
	// const doResp = await blogsStub.fetch('http://0.0.0.0');
	// const awaitedResponse = await blogsStub.fetch(request);
	console.log('blogsStub', blogsBucket, context);
	// const data = mdReader(); //? this is a localized test
	// return {
	// 	// data
	// };

	return { blog: { title: 'Blog', posts: [] } };
};
