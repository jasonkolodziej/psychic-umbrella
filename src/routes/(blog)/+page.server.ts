import type { PageServerLoad } from './$types';
import { mdReader } from '$lib/mdReader';
export const load: PageServerLoad = async ({ isDataRequest, request }) => {
	const data = mdReader();
	return {
		data
	};
};
