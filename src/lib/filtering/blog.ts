import type { XOR } from '$lib/utils/templates';
import type { SvelteComponent } from 'svelte';
// * use
export interface Commenter {
	name: Author['name'];
	profilePicture: Author['profilePicture'];
}

// * use
export interface Comment {
	id: string;
	commenter: Commenter;
	date: DateConstructor;
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
	// * blog id
	id: string;
	// * blog title
	title: string;
	// * blog lead (header) or summary
	lead?: string | undefined;
	// * blog article or the summarized card of the blog
	article: Array<Article>;
}
export interface BlogPost extends Blog {
	// * blog author
	author: Author;
	// * blog date
	date(): string | undefined;
	isoDate: typeof Date;
	// * blog content
	content: string;
	get asArticle(): Article;
}

// * use
export interface Article {
	// * article head (date aka.. when, icon, iconLabel)
	head?: ArticleHead;
	// * article body (title of blog, lead | summary of blog, titleHref | href to the blog)
	body?: ArticleBody;
	// * article author (title, `name` of the author, imgSrc | profilePicture, imgDescription | description of the author, moreInfoLabel, moreInfoHref)
	author?: ArticleAuthor;
}
export interface ArticleHead {
	// * friendly how long ago the article was published
	when: string;
	// * icon of the article
	icon?: typeof SvelteComponent;
	// * icon label
	iconLabel?: string;
}
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
export interface ArticleBody {
	title: BlogPost['title'];
	lead: BlogPost['lead'];
	titleHref?: string;
	// (blog: BlogPost, titleHref?: string): ArticleBody;
}
export const ToArticleBody = (blog: BlogPost, titleHref?: string): ArticleBody => {
	return { title: blog.title, lead: blog.lead, titleHref: titleHref ?? undefined } as ArticleBody;
};
