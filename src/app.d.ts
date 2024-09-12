// See https://kit.svelte.dev/docs/types#app

import type { User } from '@auth/sveltekit';
import type { Identity } from '@cloudflare/pages-plugin-cloudflare-access';

// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
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

export {};
