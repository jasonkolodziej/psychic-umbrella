import type { R2Bucket } from '@cloudflare/workers-types';
import type { PageServerLoad } from './$types';
import type { ArticleHead, Blogs } from '$lib/filtering/blog';
import { json } from '@sveltejs/kit';
// import { onRequestGet } from '$functions/blogs';
// import { mdReader } from '$lib/mdReader';
export const load: PageServerLoad = async ({ isDataRequest, request, platform }) => {
	const context = platform?.ctx;
	const blogsBucket: R2Bucket = await platform?.env.BLOGS_BUCKET.get('blogs'); //.get('handler');
	if (!blogsBucket) {
		// const blogsProto = new Blogs();
		const articleHead = {
			when: new Date().toISOString()
		} as ArticleHead;
		const newBucket = await platform?.env.BLOGS_BUCKET.put('blogs', JSON.stringify(articleHead), {
			metadata: { 'Content-Type': 'application/json' }
		});
		const blogs = await platform?.env.BLOGS_BUCKET.get('blogs');
		const blogsBody = await blogs?.body;
		console.log(JSON.parse(blogsBody ?? ''));
		console.log('newBucket', blogs, newBucket, blogsBody);
		// throw new Error('Blogs bucket not found');
	}
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
