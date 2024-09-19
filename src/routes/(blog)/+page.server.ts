import type { R2Bucket } from '@cloudflare/workers-types';
import type { PageServerLoad } from './$types';
import type { ArticleHead } from '$lib/filtering/blog';
import { json } from '@sveltejs/kit';
// import { onRequestGet } from '$functions/blogs';
// import { mdReader } from '$lib/mdReader';
export const load: PageServerLoad = async ({ isDataRequest, request, platform, params, route }) => {
	const context = platform?.ctx;
	const bucketKey = route.id;
	// Retrieve the key "image.png"
	const object = await platform?.env.BLOGS_BUCKET.get(bucketKey);
	// if (object === null) {
	// 	return new Response('Object Not Found', { status: 404 });
	// }
	// const blogsStub = blogsDo.get(blogsId);
	// const doResp = await blogsStub.fetch('http://0.0.0.0');
	// const awaitedResponse = await blogsStub.fetch(request);
	console.log('blogsStub', object, context);
	// const data = mdReader(); //? this is a localized test
	// return {
	// 	// data
	// };

	return { blog: { title: 'Blog', posts: [] } };
};
