import type { User } from '@auth/sveltekit';
import { BlogTemplate } from 'flowbite-svelte-blocks';

export type Distinct<T, DistinctName> = T & { __TYPE__: DistinctName };

export interface SqlMorph<T, Ts> extends Operations<T, Ts> {
	sql_statement: string;
	values?: T | Ts;
}

interface Operations<T, Ts> {
	create: (user: User, data: T) => T | Ts | Promise<T | Ts>;
	update: (user: User, data: T) => T | Ts | Promise<T | Ts>;
	delete?(user: User, k: keyof T, data?: T): T | Ts | Promise<T | Ts>;
	get?(user: User, k?: keyof T): T | Ts | Promise<T | Ts>;
	next?<D, DName>(user: User, slug: Distinct<D, DName>): T | Ts | Promise<T | Ts>;
}

export type PageId = Distinct<string, 'PageId'>;
export interface Pages {
	[page_id: PageId]: PageObject;
}
export interface PageObject {
	page_id: PageId;
	data: string;
	updated_at: Date;
}
export type CounterId = Distinct<string, 'CounterId'>;
export interface Counters {
	[counter_id: CounterId]: CounterObject;
}
export interface CounterObject {
	counter_id: CounterId;
	count: number;
}

export type AssetId = Distinct<string, 'AssetId'>;
export interface Assets {
	[asset_id: AssetId]: AssetObject;
}
export interface AssetObject {
	asset_id: AssetId;
	mime_type: string;
	updated_at?: Date;
	size: number;
	data: Blob;
}

export type ArticleId = Distinct<number, 'ArticleId'>;
export interface Articles {
	[article_id: ArticleId]: ArticleObject;
}
export interface ArticleObject {
	article_id: ArticleId;
	slug: Distinct<string, 'slug'>;
	title: string;
	teaser: string;
	content?: string;
	created_at: DateConstructor;
	published_at: Date;
	updated_at: Date;
}
