import { getCurrentUser } from '$lib/editable/api';

export async function handle({ event, resolve }) {
	event.locals.user = await getCurrentUser(event.cookies.get('sessionid'));
	const response = await resolve(event);
	return response;
}
