import { json } from '@sveltejs/kit';
import type { RequestHandler } from "@sveltejs/kit";
import type { User } from '@auth/core/types';
import type { ArticleObject } from '$lib/types';


// export async function POST({ request, locals }) {
//   const currentUser = locals.user;
//   const { slug, title, content, teaser } = await request.json();
//   await updateArticle(slug, title, content, teaser, currentUser);
//   return json({ slug, status: 'ok' });
// }

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request, locals, platform }) {
  // const currentUser = locals.user;
  // const { title, content, teaser } = await request.json();
  const db: D1Database = platform.env.DB;
  const unfulfilled: ArticleObject = await request.json();
  const { slug, title, content, teaser } = unfulfilled;

  const query = `
  UPDATE articles
  SET title = ?, content = ?, teaser = ?, updated_at = datetime('now')
  WHERE slug = ?
  `;
  const updateStmt = await db
    .prepare(query)
    .bind(title, content, teaser, slug)
    .run<ArticleObject>();
  if (!updateStmt.success) {
    return json({ error: 'Could not update article' }, { status: 500 });
  }
  const newArticleQuery = 'SELECT slug, updated_at FROM articles WHERE slug = ?';
  const { results, success } = await db.prepare(newArticleQuery)
    .bind(slug).run<ArticleObject>();
  if (!success) {
    return json({ error: 'Could not retrieve article' }, { status: 500 });
  }
  return json({ slug, results });
}