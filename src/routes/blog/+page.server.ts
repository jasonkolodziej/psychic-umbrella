import { getArticles } from '$lib/editable/api';

export async function load({ locals }) {
	const currentUser = locals.user;
	const articles = await getArticles(currentUser);

	return {
		currentUser,
		articles
	};
}
