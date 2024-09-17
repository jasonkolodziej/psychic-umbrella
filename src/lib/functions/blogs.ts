import type {
	DurableObjectNamespace,
	PagesFunction,
	ExecutionContext,
	DurableObjectState
} from '@cloudflare/workers-types';
// import { DurableObject } from 'cloudflare:workers';
export interface Env {
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

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let id = env.BLOGS.idFromName(new URL(request.url).pathname);

		let stub = env.BLOGS.get(id);

		let response = await stub.fetch(request);

		return response;
	}
} satisfies ExportedHandler<Env>;
