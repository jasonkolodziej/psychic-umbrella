// import { getCurrentUser } from '$lib/editable/api';
import { redirect, type Handle } from '@sveltejs/kit';
// import { handle as authenticationHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';
// import { dev } from '$app/environment';
// import { getPlatformProxy } from 'wrangler';

/*
  When developing, this hook will add proxy objects to the `platform` object which
  will emulate any bindings defined in `wrangler.toml`.
*/

// let platform: App.Platform;

// if (dev) {
// 	//? https://developers.cloudflare.com/workers/wrangler/api/#usage-1
// 	// const { env } = await getPlatformProxy();
// 	// const { getPlatformProxy } = await import('wrangler');
// 	platform = await getPlatformProxy();
// }
// export const platformProxyHandle = async ({ event, resolve }) => {
// 	if (platform) {
// 		event.platform = {
// 			...event.platform,
// 			...platform
// 		};
// 	}

// 	return resolve(event);
// };

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
export const handle: Handle = oldHandle; // sequence(authenticationHandle, authorizationHandle)
