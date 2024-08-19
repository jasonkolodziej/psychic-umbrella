import type { Identity } from '@cloudflare/pages-plugin-cloudflare-access';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, data, platform }) => {
	const user: Identity = platform?.env.user ?? locals.user;
	return {
		session: user ?? null
	};
};
