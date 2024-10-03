import { error, type RequestHandler } from '@sveltejs/kit';

// ? https://hartenfeller.dev/blog/sveltekit-image-upload-store
export const GET: RequestHandler = (async ({ params, setHeaders }) => {
	// if (!params.albumId) {
	if (!params.photo) {
		throw error(404, {
			message: 'Photo not found'
		});
	}

	// const albumId = parseInt(params.albumId);
	// console.log('albumId', albumId);
	// if (!albumId) {
	// 	throw error(404, {
	// 		message: 'Album not found'
	// 	});
	// }

	// TODO: greate getAlbumImage function
	//   const img = getAlbumImage(albumId, params.imageName);

	if (!img || !img.data) {
		throw error(404, 'Image not found');
	}

	// set response headers for image
	setHeaders({
		'Content-Type': img.mimeType,
		'Content-Length': img.size.toString(),
		'Last-Modified': new Date(img.lastModified).toUTCString(),
		'Cache-Control': 'public, max-age=600'
	});

	return new Response(img.data);
}) satisfies RequestHandler;
