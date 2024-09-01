export type Nullable<T> = T | null;

export interface Picture {
	Description: string;
	URL?: string;
	Data?: Buffer;
}

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

// * use
export interface Author {
	name: string;
	title?: string;
	profilePicture?: string;
	href?: string;
}

// * use
export interface BlogPost {
	id: string;
	title: string;
	lead?: string | undefined;
	author: Author;
	date?: string | undefined;
	isoDate?: string | undefined;
	content: string;
}
