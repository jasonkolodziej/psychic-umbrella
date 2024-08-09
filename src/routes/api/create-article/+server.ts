import { json } from '@sveltejs/kit';
import type { RequestHandler } from "@sveltejs/kit";

import type { User } from '@auth/core/types';
import type { ArticleObject } from '$lib/types';
import slugify from 'slugify';
import { nanoid } from 'nanoid';
// import { getPlatformProxy } from "wrangler";
// const { env } = await getPlatformProxy();
/** @type {import('@sveltejs/kit').RequestHandler} */
// export async function GET({ request, platform }) {
//   let result = await platform.env.DB.prepare(
//     "SELECT * FROM users LIMIT 5"
//   ).run();
//   return new Response(JSON.stringify(result));
// }
// import { createArticle } from '$lib/editable/api';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request, locals, platform }) {
  // const currentUser = locals.user;
  // const { title, content, teaser } = await request.json();
  const db: D1Database = platform.env.DB;
  const unfulfilled: ArticleObject = await request.json();
  const { title, content, teaser } = unfulfilled;
  let slug = slugify(title, {
    lower: true,
    strict: true
  });

  	// If slug is already used, we add a unique postfix
    const articleExists = await db
      .prepare('SELECT * FROM articles WHERE slug = ?')
      .bind(slug).run();
    if (articleExists.success) {
      slug = slug + '-' + nanoid();
    }
		const start = await db.prepare(
			`
			INSERT INTO articles (slug, title, content, teaser, published_at)
			VALUES(?, ?, ?, ?, DATETIME('now'))
		  `
		).bind(slug, title, content, teaser).run();
    if (!start.success) {
      return json({ error: 'Could not create article' }, { status: 500 });
    }
		const newArticleQuery = 'SELECT slug, created_at FROM articles WHERE slug = ?';
		const {results, success } = await db.prepare(newArticleQuery)
    .bind(slug).run<ArticleObject>();
    if (!success) {
      return json({ error: 'Could not retrieve article' }, { status: 500 });
    }
  return json({ slug, results });
}

