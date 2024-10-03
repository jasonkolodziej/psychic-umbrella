import { getFileFromFormData } from '$lib/media/fileUtils';
import type { Actions } from '@sveltejs/kit';

//? https://hartenfeller.dev/blog/sveltekit-image-upload-store
export const actions: Actions = {
	uploadMedia: async ({ request, route, isDataRequest, isSubRequest, params, locals }) => {
		console.log(
			`Actions.${request.method}(${route.id}) dataReq?:${isDataRequest} subreq?:${isSubRequest}`,
			params
		);
		// const data = await request.formData();
		const data = await getFileFromFormData(request);

		// const albumIdStr = data.get('albumId')?.toString();
		// const albumId = albumIdStr ? parseInt(albumIdStr) : null;

		// if (!albumId) {
		// 	throw error(400, 'AlbumId missing');
		// }

		// const albumImage = data.get('albumImage')?.valueOf() as File;
		const albumImage = data.file as File;

		console.log(
			albumImage?.name, // filename
			albumImage?.type, // mime type
			albumImage?.size, // file size in bytes
			albumImage?.lastModified // last modified date
			// albumImage?.arrayBuffer() // ArrayBuffer with the file contents
		);

		// TODO: save image to database function
		// mergeAlbumImage(albumId, albumImage);
	}
};
