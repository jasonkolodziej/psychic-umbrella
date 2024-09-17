// See https://kit.svelte.dev/docs/types#app

import type { User } from '@auth/sveltekit';
import type { Identity } from '@cloudflare/pages-plugin-cloudflare-access';

// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			//? https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/
			// env: {
			// 	BLOGS: DurableObjectNamespace;
			// };
			// context: {
			// 	waitUntil(promise: Promise<any>): void;
			// };
			// caches: CacheStorage & { default: Cache };
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
		}
		// interface Error {}
		interface Locals {
			user: User | Identity;
		}
		// interface PageData {}
		// interface PageState {}
	}
}
// declare module '*.md' {
// 	const content: string;
// 	export default content;
// }
export {};
