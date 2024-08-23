// import type { PageLoad } from '../../../(sidebar)/dashboard/$types';
import * as dashboard from '../../../../lib/shallow/(sidebar)/dashboard/+page';
// import type { PageLoad } from './$types';
import type { PageLoadEvent, PageLoad } from '../../../(sidebar)/dashboard/$types';

/** @type {import('../../../(sidebar)/dashboard/$types').PageLoad} */
// import type { PageLoad } from '../(sidebar)/$types';

export const load: PageLoad = (request: PageLoadEvent) => {
	return dashboard.load(request);
};
