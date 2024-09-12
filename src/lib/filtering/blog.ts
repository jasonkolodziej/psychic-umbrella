import type { SvelteComponent } from 'svelte';

// https://refine.dev/blog/typescript-mapped-types/#typescript-type-mapper-utility-vs-ts-mapped-type-the-difference
export type Nullable<T> = T | null;
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
export type Distinct<TypeSource, DistinctName> = TypeSource & { __TYPE__: DistinctName };
export type FilterOut<Source, Keys> = {
	[Property in keyof Source as Exclude<Property, Keys>]: Source[Property];
};
export type FilterIn<Source, Keys> = {
	[Property in keyof Source as Extract<Property, Keys>]: Source[Property];
};
export interface Discussion {
	// Author of the discussion
	Author: string;
	// Comments
	Comment: Array<string> | string;
	// Replies to the comment / discussion
	Replies?: Array<Discussion>;
}

export interface PostData<T> {
	// Author of the post
	Author: string;
	// Author Title
	AuthorTitle?: string;
	// Title of the post
	Title: string;
	// Summary of the post
	Summary: string;
	// Content of the post
	Content?: Array<string> | string | Buffer;
	// Related
	RelatedContent?: T | Array<T>;
	// Discussion of the post
	Discussion?: Discussion;
}

export class Post<T> implements PostData<T> {
	Title: string;
	Author: string;
	AuthorTitle?: string | undefined;
	Summary: string;
	Content?: string | Buffer | string[] | undefined;
	RelatedContent?: T | T[] | undefined;
	// TODO: add author and title and summary
	// Initial timestamp of the post entry
	CreatedAt: Date;
	// Latest timestamp when data was altered on the post
	UpdatedAt: Date;
	// Data of the post
	Discussion?: Discussion;

	constructor(Author: string, Title?: string, Summary?: string) {
		this.Author = Author;
		this.Title = Title ?? '';
		this.Summary = Summary ?? '';
		this.CreatedAt = new Date();
		this.UpdatedAt = new Date();
	}
}

// * use
export type Commenter = {
	name: string;
	profilePicture: string;
};

// * use
export interface Comment {
	id: string;
	commenter: Commenter;
	date: string;
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
export type Author = Picture & {
	name: string;
	title?: string;
	href?: string;
	get profilePicture(): Picture['profilePicture'] | Picture['imgSrc'];
};

// * use
export interface Blog {
	id: string;
	title: string;
	lead?: string | undefined;
	articles?: Array<IArticle>;
}
export interface IArticle {
	head?: ArticleHead;
	body?: ArticleBody;
	author?: ArticleAuthor;
}
export interface BlogPost extends Blog {
	author: Author;
	date?: string | undefined;
	isoDate?: string | undefined;
	content: string;
}

export interface ArticleBody {
	title: BlogPost['title'];
	lead: BlogPost['lead'];
	titleHref?: string;
	// (blog: BlogPost, titleHref?: string): ArticleBody;
}
export const ToArticleBody = (blog: BlogPost, titleHref?: string): ArticleBody => {
	return { title: blog.title, lead: blog.lead, titleHref: titleHref ?? undefined } as ArticleBody;
};

export interface ArticleAuthor {
	title: Author['name'];
	imgSrc: Author['profilePicture'];
	imgDescription?: string | Author['imgDescription'] | Picture['imgDescription'];
	moreInfoLabel?: string;
	moreInfoHref?: string;
}
export const ToArticleAuthor = (author: Author): ArticleAuthor => {
	return {
		title: author.name,
		imgSrc: author.profilePicture,
		imgDescription: author.imgDescription ?? author.name + author.title
	} satisfies ArticleAuthor;
};
export interface ArticleHead {
	when: string;
	icon?: typeof SvelteComponent;
	iconLabel?: string;
}
