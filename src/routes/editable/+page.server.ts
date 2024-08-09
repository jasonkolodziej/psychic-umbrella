import {
	// getArticles,
	getPage
} from '$lib/editable/api';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";

// export async function load({ locals }) {
// 	const currentUser = locals.user;
// 	// const articles = await getArticles();
// 	const page = await getPage('home');

// 	return {
// 		currentUser,
// 		// articles: articles.slice(0, 3),
// 		page
// 	};
// }

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth()
   
	if (!session?.user?.userId) {
	  return fail(401, { type: "error", error: "Unauthenticated" })
	}
   
	// 	// const articles = await getArticles();
	const page = await getPage('home');
	return {
	  session.user,
		page
	}
  }