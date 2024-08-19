// import { SvelteKitAuth } from '@auth/sveltekit';
// import { SvelteKitAuth, type DefaultSession } from '@auth/sveltekit';

// declare module '@auth/sveltekit' {
// 	interface Session {
// 		user: {
// 			userId: string;
// 			/**
// 			 * By default, TypeScript merges new interface properties and overwrites existing ones.
// 			 * In this case, the default session user properties will be overwritten,
// 			 * with the new ones defined above. To keep the default session user properties,
// 			 * you need to add them back into the newly declared interface.
// 			 */
// 		} & DefaultSession['user'];
// 	}
// }

// export const { handle } = SvelteKitAuth({
// 	callbacks: {
// 		session: async ({ session, token }) => {
// 			if (token) {
// 				session.user.userId = token.sub;
// 			}
// 			// `session.user.userId` is now a valid property, and will be type-checked
// 			// in places like `useSession().data.user` or `auth().user`
// 			return session;
// 		}
// 	}
// });
// import GitHub from '@auth/sveltekit/providers/github';
// import { env } from '$env/dynamic/private';

// export const { handle, signIn, signOut } = SvelteKitAuth(async ({ event }) => {
// 	const authOptions = {
// 		providers: [
// 			// GitHub({
// 			// 	clientId: event.platform.env.AUTH_GITHUB_ID,
// 			// 	clientSecret: event.platform.env.AUTH_GITHUB_SECRET
// 			// })
// 		],
// 		// secret: event.platform.env.AUTH_SECRET,
// 		// secret: env.AUTH_SECRET,
// 		trustHost: true,
// 		pages: {
// 			signIn: '/login',
// 			signOut: '/logout'
// 		}
// 	};
// 	return authOptions;
// });
