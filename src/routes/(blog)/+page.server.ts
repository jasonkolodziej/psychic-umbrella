import type { PageServerLoad } from './$types';
// import { onRequestGet } from '$functions/blogs';
// import { mdReader } from '$lib/mdReader';
export const load: PageServerLoad = async ({ isDataRequest, request, platform }) => {
	const context = platform?.ctx;
	const blogsDo: DurableObjectNamespace = await platform?.env.BLOGS; //.get('handler');
	// const blogsStub = blogsDo.get(blogsId);
	// const doResp = await blogsStub.fetch('http://0.0.0.0');
	// const awaitedResponse = await blogsStub.fetch(request);
	console.log('blogsStub', blogsDo, context);
	// const data = mdReader(); //? this is a localized test
	// return {
	// 	// data
	// };

	return { blog: { title: 'Blog', posts: [] } };
};
