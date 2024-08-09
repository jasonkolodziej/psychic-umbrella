import type { PageObject } from '$lib/types.js';
import { json } from '@sveltejs/kit';
// import { createOrUpdatePage } from '$lib/api';

// export async function POST({ request, locals }) {
//   const currentUser = locals.user;
//   const { pageId, page } = await request.json();
//   await createOrUpdatePage(pageId, page, currentUser);
//   return json({ pageId, status: 'ok' });
// }

export async function POST({ request, locals, platform }) {
  const db: D1Database = platform.env.DB;
  const unfulfilled: PageObject = await request.json();
  const { page_id, data } = unfulfilled;
	const pageExists = await db
  .prepare('SELECT page_id FROM pages WHERE page_id = ?')
  .bind(page_id).run();
	// .get(data.page_id);
  let bindable: unknown[];
  let query: string;
	if (pageExists.success) {
      query = 'UPDATE pages SET data = ?, updated_at = ? WHERE page_id = ? RETURNING page_id';
			// .get(JSON.stringify(data), new Date().toISOString(), data.page_id);
      bindable = [JSON.stringify(data), new Date().toISOString(), page_id];
			//.bind(JSON.stringify(data), new Date().toISOString(), data.page_id)
      // .run<PageObject>();
	} else {
		// return await db
			query = 'INSERT INTO pages (page_id, data, updated_at) values(?, ?, ?) RETURNING page_id';
			// .get(data.page_id, JSON.stringify(data), new Date().toISOString());
			// .bind(page_id, JSON.stringify(data), new Date().toISOString())
      bindable = [page_id, JSON.stringify(data), new Date().toISOString()];
      // .run<PageObject>();
	}
  const {success, results} = await db.prepare(query)
    .bind(...bindable).run<PageObject>();
    if (!success) {
      return json({ error: 'Could not save page' }, { status: 500 });
    }
  return json({ page_id, results });
}