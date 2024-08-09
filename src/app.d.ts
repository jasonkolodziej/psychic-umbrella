// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// * Cloudflare D1 Database
		//? https://developers.cloudflare.com/d1/examples/d1-and-sveltekit/
		interface Platform {
			env: {
				COUNTER: DurableObjectNamespace;
			  DB: D1Database;
			};
			context: {
			  waitUntil(promise: Promise<any>): void;
			};
			caches: CacheStorage & { default: Cache };
		  }
	}
}

export {};
