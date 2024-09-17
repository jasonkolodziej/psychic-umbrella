// import { getCurrentUser } from '$lib/editable/api';
import { redirect, type Handle } from '@sveltejs/kit';
// import { handle as authenticationHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';
// ? For cloudflare durable objects -- https://github.com/dario-piotrowicz/sveltekit-durable-object-local-usage-example/blob/5cf91ad3cbb8e5c3383ba1e73bd4176a3e554c54/sveltekit-app/src/hooks.server.ts
import { dev } from '$app/environment';
import { getPlatformProxy } from 'wrangler';
/*
  When developing, this hook will add proxy objects to the `platform` object which
  will emulate any bindings defined in `wrangler.toml`.
*/
let platform: App.Platform;
if (dev) {
	platform = await getPlatformProxy();
}

export const plateformHandle = async ({ event, resolve }) => {
	if (platform) {
		event.platform = {
			...event.platform,
			...platform
		};
	}

	return resolve(event);
};
// ? For cloudflare durable objects

const oldHandle = async ({ event, resolve }) => {
	// event.locals.user = await getCurrentUser(event.cookies.get('sessionid'));
	const response = await resolve(event);
	return response;
};

//* Auth using @auth/sveltekit
//? Refer: https://authjs.dev/reference/sveltekit#lazy-initialization
// export { handle } from "./auth";

//? using a sequence

// const authorizationHandle = async ({ event, resolve }) => {
// 	// Protect any routes under /authenticated
// 	if (event.url.pathname.startsWith('/authenticated')) {
// 		const session = await event.locals.auth();
// 		if (!session) {
// 			// Redirect to the signin page
// 			throw redirect(303, '/login');
// 		}
// 	}

// 	// If the request is still here, just proceed as normally
// 	return resolve(event);
// };

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(plateformHandle, oldHandle);
