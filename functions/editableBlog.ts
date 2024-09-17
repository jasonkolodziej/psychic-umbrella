import { DurableObjectNamespace, PagesFunction } from '@cloudflare/workers-types';
interface Env {
	// Cloudflare
	blog: DurableObjectNamespace;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
	const id = context.env.blog.newUniqueId();
	// const counter = context.env.COUNTER.idFromName("A");
	const stub = context.env.blog.get(id);

	// Pass the request down to the durable object
	return stub.fetch(context.request);
};
