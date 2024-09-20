import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ isDataRequest, request }) => {
	return { blog: { title: 'Blog', posts: [] } };
};
