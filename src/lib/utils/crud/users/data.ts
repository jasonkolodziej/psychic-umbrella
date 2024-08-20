// declare module '@auth/sveltekit' {
// 	/**
// 	 * The shape of the user object returned in the OAuth providers' `profile` callback,
// 	 * or the second parameter of the `session` callback, when using a database.
// 	 */
// 	// TODO: Add the missing properties
// 	export interface User {
// 		id: string | number;
// 		name: string;
// 		avatar: string;
// 		email: string;
// 		biography: string;
// 		position: string;
// 		country: string;
// 		status: string;
// 	}
// 	/**
// 	 * The shape of the account object returned in the OAuth providers' `account` callback,
// 	 * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
// 	 */
// 	// interface Account {}

// 	/**
// 	 * Returned by `useSession`, `auth`, contains information about the active session.
// 	 */
// 	// interface Session {}
// }
// import type { User } from '@auth/sveltekit';

// export interface User extends AuthUser {
// 	id: string | number;
// 	name: string;
// 	avatar: string;
// 	email: string;
// 	biography: string;
// 	position: string;
// 	country: string;
// 	status: string;
// }
export interface User {
	id: number;
	name: string;
	avatar: string;
	email: string;
	biography: string;
	position: string;
	country: string;
	status: string;
}
// export default {};
