import type { R2Bucket } from '@cloudflare/workers-types';
import type { PageServerLoad } from './$types';
import { json } from '@sveltejs/kit';
import { v6 as uuidV6 } from 'uuid';
import type { Author, BlogPost } from '$lib/filtering/blog';
// import { onRequestGet } from '$functions/blogs';
// import { mdReader } from '$lib/mdReader';
export const load: PageServerLoad = async ({ isDataRequest, request, platform, params, route }) => {
	const context = platform?.ctx;
	const bucket: R2Bucket = platform?.env.BLOGS_BUCKET;
	const bucketKey = route.id;
	// Retrieve the key "image.png"
	const object = await bucket.get('about');
	const newProfile = {
		id: uuidV6(),
		date: Intl.DateTimeFormat().format(Date.now()),
		isoDate: new Date().toISOString(),
		content: 'start here',
		title: 'Title',
		author: {
			name: 'Name',
			title: 'my title',
			profilePicture: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
			href: '/'
		} as Author
	} as BlogPost;
	if (object === null) {
		// ? return new Response('Object Not Found', { status: 404 });
		// const newProfileObject = await json(newProfile, { status: 201 });
		const newProfileObject = await bucket.put(bucketKey, JSON.stringify(newProfile));
		console.log('newProfileObject', newProfileObject?.etag);
		// object = await bucket.put(bucketKey, newProfileObject.body);
		return { profile: newProfile };
	}

	console.log(bucketKey, params, request, object.body, context);

	return { profile: newProfile };
};
