import type { Without, XOR } from '$lib/utils/templates';
import type { SvelteComponent } from 'svelte';
import { v7 as uuidv7 } from 'uuid'; // * use
export interface Commenter {
	name: Author['name'];
	profilePicture: Author['profilePicture'];
}

// * use
export interface Comment {
	id: string | typeof uuidv7;
	commenter: Commenter;
	date: string | Date | DateConstructor;
	content: string;
	replies?: Comment[];
}
// * Testing

export type Picture = {
	imgDescription?: string;
	// (urlOrData: URL | Buffer | string, imgDescription?: string): Picture;
} & XOR<{ imgSrc: string }, { profilePicture: string }>;

// * use
// export interface Author {
// 	name: string;
// 	title?: string;
// 	profilePicture: Picture['profilePicture'] | Picture['imgSrc'];
// 	// profilePicture: ProfilePicture | ProfilePicture['profilePicture'];
// 	href?: string;
// }
//? use
// export type Author = Picture & {
// 	name: string;
// 	title?: string;
// 	href?: string;
// 	get profilePicture(): Picture['profilePicture'] | Picture['imgSrc'];
// };
// ? maybe
export type Author = Picture & { name: string; title?: string; href?: string };

// * use
// export interface Blog {
// 	// * blog id
// 	id: string | typeof uuidv7;
// 	// * blog title
// 	title: string;
// 	// * blog lead (header) or summary
// 	lead?: string | undefined;
// 	// * blog article or the summarized card of the blog
// 	article: Article;
// }

//? Maybe
export type BlogArticleIdentifier = {
	// * blog id
	id: string | typeof uuidv7;
	// * blog title
	title: string;
	// * blog lead (header) or summary
	lead?: string | undefined;
};
// export interface BlogPost extends Blog {
// 	// * blog author
// 	author: Author;
// 	// * blog date
// 	date: string | Date | DateConstructor;
// 	isoDate: string | Date | DateConstructor;
// 	// * blog content
// 	content: string;
// 	get asArticle(): Article;
// 	get comments(): Array<Comment> | undefined;
// }

export type BlogPost = BlogArticleIdentifier &
	Author & {
		date: string | Date | DateConstructor;
		isoDate: string | Date | DateConstructor;
		content: string;
		comments?: Array<Comment>;
		article?: Article;
	};

// * use
export type Article = {
	// * article head (date aka.. when, icon, iconLabel)
	head?: ArticleHead;
	// * article body (title of blog, lead | summary of blog, titleHref | href to the blog)
	body?: ArticleBody;
	// * article author (title, `name` of the author, imgSrc | profilePicture, imgDescription | description of the author, moreInfoLabel, moreInfoHref)
	author?: ArticleAuthor;
};
export type ArticleHead = {
	// * friendly how long ago the article was published
	when: Intl.RelativeTimeFormat | string;
	// * icon of the article
	icon?: typeof SvelteComponent;
	// * icon label
	iconLabel?: string;
};
// Use
// export interface ArticleAuthor {
// 	title: Author['name'];
// 	imgSrc: Author['profilePicture'];
// 	imgDescription?: string | Author['imgDescription'] | Picture['imgDescription'];
// 	moreInfoLabel?: string;
// 	moreInfoHref?: string;
// }

export type ArticleAuthor = Author & {
	moreInfoLabel?: string;
	moreInfoHref?: string;
};

export const ToArticleAuthor = (author: Author): ArticleAuthor => {
	return {
		name: author.name,
		title: author.name,
		imgSrc: author.profilePicture ?? author.imgSrc,
		imgDescription: author.imgDescription ?? author.name // + author.title
	} satisfies ArticleAuthor;
};
export type ArticleBody = Without<{ id: string }, BlogArticleIdentifier> & {
	titleHref?: string;
	// (blog: BlogPost, titleHref?: string): ArticleBody;
};
export const ToArticleHead = (blog: BlogPost): ArticleHead => {
	// const iso = new Date(blog.isoDate as string).getTime();
	// const now = Date.
	return {
		when: new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
			((Date.parse(blog.isoDate as string) - Date.now()) / 1000) * 86400,
			'days'
		)
	} as ArticleHead;
};

export const ToArticleBody = (blog: BlogPost, titleHref?: string): ArticleBody => {
	return { title: blog.title, lead: blog.lead, titleHref: titleHref ?? undefined } as ArticleBody;
};
