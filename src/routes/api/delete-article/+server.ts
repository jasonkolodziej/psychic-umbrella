import type { ArticleObject } from '$lib/types';
import { json } from '@sveltejs/kit';
// import { deleteArticle } from '$lib/api';

// export async function POST({ request, locals }) {
//   const user = locals.user;
//   const { slug } = await request.json();
//   const result = await deleteArticle(slug, user);
//   return json(result);
// }

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request, locals, platform }) {
  // const currentUser = locals.user;
  // const { title, content, teaser } = await request.json();
  const db: D1Database = platform.env.DB;
  const query = 'DELETE FROM articles WHERE slug = ?';
  const unfulfilled: ArticleObject = await request.json();
  const { slug } = unfulfilled;
  const deleteStmt = await db
    .prepare(query)
    .bind(slug)
    .run();
  if (!deleteStmt.success) {
    return json({ error: 'Could not delete article' }, { status: 500 });
  }
  return json({ slug });
}