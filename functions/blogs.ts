import type { DurableObjectNamespace, PagesFunction } from '@cloudflare/workers-types';
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
	const id = context.env.BLOGS.idFromName('A');
	const stub = context.env.BLOGS.get(id);

	// Pass the request down to the durable object
	return stub.fetch(context.request);
};
