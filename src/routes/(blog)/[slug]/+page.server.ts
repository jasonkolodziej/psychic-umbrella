import type { PageServerLoad } from './$types';
import { onRequestGet } from '$functions/blogs';

export const load: PageServerLoad = async ({ isDataRequest, request, platform, context }) => {
	const onGet = onRequestGet(context);
	return { blog: { title: 'Blog', posts: [] } };
};

//? example for Durable Object - https://github.com/dario-piotrowicz/sveltekit-durable-object-local-usage-example/blob/main/do-worker/src/index.ts
// export const load: PageServerLoad = async ({ isDataRequest, request, platform }) => {
// 	const blogs = platform!.env.BLOGS;

// 	const blogId = blogs.idFromName('my-do-name');
// 	const blogsObj = blogs.get(blogId);
// 	const blogResp = await blogsObj.fetch('http://0.0.0.0');
// 	const doRespText = await blogResp.text();

// 	return {
// 		text: doRespText
// 	};
// };
