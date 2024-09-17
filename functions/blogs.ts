import {
	DurableObjectNamespace,
	PagesFunction,
	ExecutionContext,
	DurableObjectState
} from '@cloudflare/workers-types';
// import { DurableObject } from 'cloudflare:workers';
interface Env {
	// Cloudflare
	BLOGS: DurableObjectNamespace;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
	console.log('onRequestPost', context);
	const id = context.env.BLOGS.newUniqueId();
	// const counter = context.env.COUNTER.idFromName("A");
	const stub = context.env.BLOGS.get(id);

	// Pass the request down to the durable object
	return stub.fetch(context.request);
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
	console.log('onRequestGet', context);
	// const id = context.env.BLOGS.newUniqueId();
	const blog = context.env.BLOGS.idFromName('A');
	const stub = context.env.BLOGS.get(blog);

	// Pass the request down to the durable object
	return stub.fetch(context.request);
};

// export class Blogs extends DurableObject {
// 	constructor(ctx: ExecutionContext, env: Env) {
// 		this.ctx = ctx;
// 	}

// 	async fetch(request) {
// 		let url = new URL(request.url);

// 		// retrieve data
// 		let value = (await this.ctx.storage.get('value')) || 0;

// 		// increment counter and get a new value
// 		value += 1;

// 		// store data
// 		await this.ctx.storage.put('value', value);

// 		return new Response(value);
// 	}
// }
