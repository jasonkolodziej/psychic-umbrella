import type { DateStr, Without, XOR } from '$lib/utils/templates';
import type { SvelteComponent } from 'svelte';
import type { Review } from './zach';
// import { v6 as uuidv6 } from 'uuid'; // * use

// * Testing
export type Picture = {
	imgDescription?: string;
	// (urlOrData: URL | Buffer | string, imgDescription?: string): Picture;
} & XOR<{ imgSrc: string }, { profilePicture: string }>;

/**
 * ? Author
 * * contains the general information of the author for
 * * the blog post, article, or comment
 */
export type Author = { name: string; title?: string; href?: string } & Picture;

/**
 * ? Commenter
 * * contains the general information of a commenter on a blog post
 */
export type Commenter = Exclude<Author, 'title' | 'href'>;

/**
 * ? Comment
 * * contains the information of a comment on a blog post
 */
export type Comment = {
	//* comment id, typeof uuidv6;
	id: string;
	// * commenter information
	commenter: Commenter;
	// * date of the comment
	date: string | DateStr;
	// * content of the comment
	content: string;
	// * replies to the comment
	replies?: Comment[];
};

/**
 * ? BlogArticleMetadata
 * * contains the metadata of the blog Object and the Article Object
 */
export type BlogArticleMetadata = {
	// * blog id, typeof uuidv6;
	id: string;
	// * blog title
	title: string;
	// * blog lead (header) or summary
	lead?: string | undefined;
	// * rating
	rating?: Review;
};

export type BlogPost = BlogArticleMetadata & {
	author: Author;
	date: string | DateStr;
	isoDate: string | DateStr;
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
	// * article review
	review?: Review;
};
export type ArticleHead = {
	// * friendly how long ago the article was published
	when: Intl.RelativeTimeFormat | string;
	// * icon of the article
	icon?: typeof SvelteComponent;
	// * icon label
	iconLabel?: string;
};

export type ArticleAuthor = Author & {
	moreInfoLabel?: string;
	moreInfoHref?: string;
};
export type ArticleBody = Without<{ id: string }, BlogArticleMetadata> & {
	titleHref?: string;
	// (blog: BlogPost, titleHref?: string): ArticleBody;
};

export const ToArticleAuthor = (author: Author): ArticleAuthor => {
	return {
		name: author.name,
		title: author.name,
		imgSrc: author.profilePicture ?? author.imgSrc,
		imgDescription: author.imgDescription ?? author.name // + author.title
	} satisfies ArticleAuthor;
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
