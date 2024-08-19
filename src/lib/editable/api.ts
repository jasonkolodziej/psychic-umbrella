import slugify from 'slugify';
import { SHORTCUTS } from './constants';
//* for just sqllite3
// import Database from 'better-sqlite3';
// import { DB_PATH, ADMIN_PASSWORD } from '$env/static/private';
import { nanoid } from '$lib/editable/util';
import { Blob } from 'node:buffer';
import type { RequestHandler } from '@sveltejs/kit';
import type {
	Articles,
	ArticleObject,
	SqlMorph,
	Distinct,
	Pages,
	PageObject,
	CounterObject,
	Counters,
	AssetObject,
	Assets
} from '$lib/blogs';
import type { User } from '@auth/core/types';
import { getPlatformProxy } from 'wrangler';
const { env } = await getPlatformProxy();

//* for just sqllite3
// const db = new Database(DB_PATH, {
// 	// verbose: console.log
// });
// db.pragma('journal_mode = WAL');
// db.pragma('case_sensitive_like = true');

const db: D1Database = env.DB;

export const ArticlesTable: SqlMorph<ArticleObject, Articles> = {
	sql_statement: 'SELECT slug, created_at FROM articles WHERE slug = ?',
	/**
	 * Creates a new article
	 */
	async create(user: User, data: ArticleObject): Promise<Articles> {
		if (!user) throw new Error('Not authorized');

		let slug = slugify(data.title, {
			lower: true,
			strict: true
		});

		// If slug is already used, we add a unique postfix
		const articleExists = db.prepare('SELECT * FROM articles WHERE slug = ?').bind(slug);
		if (articleExists) {
			slug = slug + '-' + nanoid();
		}

		db.prepare(
			`
			INSERT INTO articles (slug, title, content, teaser, published_at)
			VALUES(?, ?, ?, ?, DATETIME('now'))
		  `
		).bind(slug, title, content, teaser);

		const newArticleQuery = 'SELECT slug, created_at FROM articles WHERE slug = ?';
		const newArticle = db.prepare(newArticleQuery).bind(slug);
		return newArticle;
	},
	/**
	 * We automatically extract a teaser text from the document's content.
	 */
	async update(user: User, data: ArticleObject): Promise<Articles> {
		if (!user) throw new Error('Not authorized');

		const query = `
		UPDATE articles
		SET title = ?, content = ?, teaser = ?, updated_at = datetime('now')
		WHERE slug = ?
	  `;
		const updateStmt = db.prepare(query);
		updateStmt.bind(data.title, data.content, data.teaser, data.slug);

		const updatedArticleQuery = 'SELECT slug, updated_at FROM articles WHERE slug = ?';
		const updatedArticle = db.prepare(updatedArticleQuery).bind(data.slug);

		const result = await updatedArticle.run();
		return result;
	},
	/**
	 * Remove the entire article
	 */
	delete(user: User, k: keyof ArticleObject, data?: ArticleObject): Articles {
		if (!user) throw new Error('Not authorized');

		const query = 'DELETE FROM articles WHERE slug = ?';
		const result = db.prepare(query).bind(data!.slug);

		return result.changes > 0;
	},
	/**
	 * List all available articles (newest first)
	 */
	async get(user: User, k?: keyof ArticleObject): Promise<Articles> {
		let articles;
		let stmnt;

		if (user) {
			// When logged in, show both drafts and published articles
			stmnt = db.prepare(
				'SELECT *, COALESCE(published_at, updated_at, created_at) AS modified_at FROM articles ORDER BY modified_at DESC'
			);
		} else {
			stmnt = db.prepare(
				'SELECT * FROM articles WHERE published_at IS NOT NULL ORDER BY published_at DESC'
			);
		}

		articles = stmnt.all();
		return articles;
	},
	/**
	 * Given a slug, determine article to "read next"
	 */
	async next<D = string, DName = 'slug'>(user: User, slug: Distinct<D, DName>): Promise<Articles> {
		const query = `
			WITH previous_published AS (
			  SELECT
				title,
				teaser,
				slug,
				published_at
			  FROM articles
			  WHERE
				published_at < (SELECT published_at FROM articles WHERE slug = ?)
			  ORDER BY published_at DESC
			  LIMIT 1
			),
			latest_article AS (
			  SELECT
				title,
				teaser,
				slug,
				published_at
			  FROM articles
			  WHERE slug <> ?
			  ORDER BY published_at DESC
			  LIMIT 1
			)
			SELECT title, teaser, slug, published_at
			FROM (
			  SELECT * FROM previous_published
			  UNION
			  SELECT * FROM latest_article
			)
			ORDER BY published_at ASC
			LIMIT 1;
		  `;

		const result = db.prepare(query).bind(slug, slug);
		return result;
	}
};

/**
 * Retrieve article based on a given slug
 */
export async function getArticleBySlug(slug) {
	const query = 'SELECT * FROM articles WHERE slug = ?';
	const article = db.prepare(query).bind(slug);
	return article;
}

/*
  This can be replaced with any user-based authentication system
*/
export async function authenticate(password, sessionTimeout) {
	const expires = __getDateTimeMinutesAfter(sessionTimeout);
	if (password === ADMIN_PASSWORD) {
		const sessionId = nanoid();

		// Now is a good time to remove expired sessions
		db.prepare('DELETE FROM sessions WHERE expires < ?').run(new Date().toISOString());

		// Create a new session
		db.prepare('INSERT INTO sessions (session_id, expires) values(?, ?) returning session_id').run(
			sessionId,
			expires
		);

		return { sessionId };
	} else {
		throw 'Authentication failed.';
	}
}

/*
  Log out of the admin session ...
*/
export async function destroySession(sessionId: string) {
	db.prepare('DELETE FROM sessions WHERE session_id = ?').bind(sessionId); //.run(sessionId);
	return true;
}

/**
 * Search within all searchable items (including articles and website sections)
 */
export async function search(q: string, currentUser: User) {
	let query;
	if (currentUser) {
		query = `
      SELECT title AS name, '/blog/' || slug AS url, COALESCE(published_at, updated_at, created_at) AS modified_at
      FROM articles
      WHERE title LIKE ? COLLATE NOCASE
      ORDER BY modified_at DESC;
    `;
	} else {
		query = `
      SELECT title AS name, '/blog/' || slug AS url, COALESCE(published_at, updated_at, created_at) AS modified_at
      FROM articles
      WHERE title LIKE ? COLLATE NOCASE AND published_at IS NOT NULL
      ORDER BY modified_at DESC;
    `;
	}

	const results = db.prepare(query).all(); // .all(`%${q}%`);

	// Also include predefined shortcuts in search
	// SHORTCUTS.forEach((shortcut) => {
	// 	if (shortcut.name.toLowerCase().includes(q.toLowerCase())) {
	// 		results.push(shortcut);
	// 	}
	// });

	return results;
}

/**
 * In this minimal setup there is only one user, the website admin.
 * If you want to support multiple users/authors you want to return the current user record here.
 */
/**
 * In this minimal setup there is only one user, the website admin.
 * If you want to support multiple users/authors you want to return the current user record here.
 */
export async function getCurrentUser(session_id: string) {
	const stmt = db.prepare(
		'SELECT session_id, expires FROM sessions WHERE session_id = ? AND expires > ?'
	);
	const session = stmt.bind(session_id, new Date().toISOString()); // .get(session_id, new Date().toISOString());

	if (session) {
		return { name: 'Admin' };
	} else {
		return null;
	}
}

export const PagesTable: SqlMorph<PageObject, Pages> = {
	sql_statement: 'SELECT data FROM pages WHERE page_id = ?',
	/**
	 * Update the page
	 */
	update: createOrUpdatePage,
	create: createOrUpdatePage,
	/**
	 * E.g. getPage("home") gets all dynamic data for the home page
	 */
	async get(user: User, k: keyof PageObject): Promise<Pages> {
		const page = db.prepare('SELECT data FROM pages WHERE page_id = ?').get(k);
		if (page?.data) {
			return JSON.parse(page.data);
		} else {
			return Promise.reject('Page not found');
		}
	}
};
/**
 * Update the page
 */
// async function createOrUpdatePage(page_id, page, currentUser) {
async function createOrUpdatePage(user: User, data: PageObject): Promise<Pages> {
	if (!user) throw new Error('Not authorized');
	const pageExists = db
		.prepare('SELECT page_id FROM pages WHERE page_id = ?')
		// .get(data.page_id);
		.bind(data.page_id)
		.run();
	if (pageExists) {
		return (
			db
				.prepare('UPDATE pages SET data = ?, updated_at = ? WHERE page_id = ? RETURNING page_id')
				// .get(JSON.stringify(data), new Date().toISOString(), data.page_id);
				.bind(JSON.stringify(data), new Date().toISOString(), data.page_id)
				.run()
		);
	} else {
		return (
			db
				.prepare('INSERT INTO pages (page_id, data, updated_at) values(?, ?, ?) RETURNING page_id')
				// .get(data.page_id, JSON.stringify(data), new Date().toISOString());
				.bind(data.page_id, JSON.stringify(data), new Date().toISOString())
				.run()
		);
	}
}

export const CounterTable: SqlMorph<CounterObject, Counters> = {
	sql_statement: 'SELECT data FROM pages WHERE page_id = ?',
	/**
	 * Update the page
	 */
	update: createOrUpdateCounter,
	create: createOrUpdateCounter
};
/**
 * We can count all kinds of things with this.
 */
// export async function createOrUpdateCounter(counter_id) {
export async function createOrUpdateCounter(user: User, data: CounterObject): Promise<Counters> {
	return db.transaction(() => {
		// Remove recipients associated with the friend if there are any entries
		const counter_exists = db
			.prepare('SELECT counter_id FROM counters WHERE counter_id = ?')
			// .get(data.counter_id);
			.bind(data.counter_id)
			.run();
		if (counter_exists) {
			return (
				db
					.prepare('UPDATE counters SET count = count + 1 WHERE counter_id = ? RETURNING count')
					// .get(data.counter_id);
					.bind(data.counter_id)
					.run()
			);
		} else {
			return (
				db
					.prepare('INSERT INTO counters (counter_id, count) values(?, 1) RETURNING count')
					//.get(data.counter_id);
					.bind(data.counter_id)
					.run()
			);
		}
	})();
}

// export const AssetTable: SqlMorph<AssetObject, Assets> = {
// 	sql_statement: 'SELECT data FROM pages WHERE page_id = ?',
// 	/**
//  * Update the page
//  */
// 	update: storeAsset,
// 	create: storeAsset,
// };

// asset_id is a string and has the form path
export async function storeAsset(asset_id: string, file: File) {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const sql = `
  INSERT into assets (asset_id, mime_type, updated_at, size, data) VALUES (?, ?, ?, ?, ?)
  ON CONFLICT (asset_id) DO
  UPDATE
     SET mime_type = excluded.mime_type,
         updated_at = excluded.updated_at,
         size = excluded.size,
         data = excluded.data
  WHERE asset_id = excluded.asset_id
  `;
	const stmnt = db.prepare(sql);
	// stmnt.run(asset_id, file.type, new Date().toISOString(), file.size, buffer);
	stmnt.bind(asset_id, file.type, new Date().toISOString(), file.size, buffer).run();
}

export function getAsset(asset_id: string) {
	const sql = `
  SELECT
    asset_id,
    mime_type,
    updated_at,
    size,
    data
  FROM assets
  WHERE asset_id = ?
  `;

	const stmnt = db.prepare(sql);
	const row = stmnt.get(asset_id);
	return {
		filename: row.asset_id.split('/').slice(-1),
		mimeType: row.mime_type,
		lastModified: row.updated_at,
		size: row.size,
		data: new Blob([row.data], { type: row.mime_type })
	};
}

/**
 * Helpers
 */
function __getDateTimeMinutesAfter(minutes: number) {
	return new Date(new Date().getTime() + minutes * 60000).toISOString();
}
