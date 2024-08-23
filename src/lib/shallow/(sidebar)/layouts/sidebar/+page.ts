import * as dashboard from '../../dashboard/+page';

/** @type {import('../../dashboard/$types').PageLoad} */
import type { PageLoad, PageLoadEvent } from '../../dashboard/$types';
export const load: PageLoad = (request: PageLoadEvent) => {
	return dashboard.load(request);
};
