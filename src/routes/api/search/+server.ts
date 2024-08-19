// import { search } from '$lib/editable/api';
// import { SHORTCUTS } from '$lib/editable/constants';
import { fail, json } from '@sveltejs/kit';

export async function GET({ url, locals, platform, request }) {
	const db: D1Database = platform.env.DB;
	const unfulfilled: PageObject = await request.json();
	const session = await locals.auth();
	if (!session?.user?.id) {
		return new Response(JSON.stringify(fail(401, { type: 'error', error: 'Unauthenticated' })), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}
	const { user } = session;
	const searchQuery: string = url.searchParams.get('q') || '';
	const query: string =
		user != null
			? `   SELECT title AS name, '/blog/' || slug AS url, COALESCE(published_at, updated_at, created_at) AS modified_at
      FROM articles
      WHERE title LIKE ? COLLATE NOCASE
      ORDER BY modified_at DESC;
    `
			: `
      SELECT title AS name, '/blog/' || slug AS url, COALESCE(published_at, updated_at, created_at) AS modified_at
      FROM articles
      WHERE title LIKE ? COLLATE NOCASE AND published_at IS NOT NULL
      ORDER BY modified_at DESC;
    `;

	const { results, success } = await db.prepare(query).all(); // .all(`%${q}%`);
	if (!success) {
		return new Response(JSON.stringify(fail(500, { type: 'error', error: 'Database error' })), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Also include predefined shortcuts in search
	//TODO: Fix this
	// SHORTCUTS.forEach((shortcut) => {
	// 	if (shortcut.name.toLowerCase().includes(searchQuery.toLowerCase())) {
	// 		results.push(shortcut);
	// 	}
	// });

	return json({ results });
	// return json(await search(searchQuery, user));
}
