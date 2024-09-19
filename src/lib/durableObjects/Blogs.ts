// TODO: remove not using anymore
export interface Env {
	// Cloudflare
	BLOGS: DurableObjectNamespace;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let id = env.BLOGS.idFromName(new URL(request.url).pathname);

		let stub = env.BLOGS.get(id);

		let response = await stub.fetch(request);

		return response;
	}
} satisfies ExportedHandler<Env>;
