// ? see: https://github.com/JustinyAhin/okupter-repos/blob/5e9403e30a49ce5e314f311cffb057d922d2c737/apps/sveltekit-file-upload/src/routes/%2Bpage.server.ts
import type { ImgType } from 'flowbite-svelte';

/**
 * ExtendedImgType - Extends ImgType with an onload event to support blob URLs
 */
export type ExtendedImgType = ImgType & { onload?: () => void };

// const blobToImage = (blob) => {
// 	return new Promise(resolve => {
// 	  const url = URL.createObjectURL(blob)
// 	  let img = new Image()
// 	  img.onload = () => {
// 		URL.revokeObjectURL(url)
// 		resolve(img)
// 	  }
// 	  img.src = url
// 	})
//   }

/**
 * uploadFile - Uploads a file to the server
 * @param file File to upload
 * @param routeId Optional route to upload file to
 * @returns Promise<Partial<UploadedFile>> - Promise containing the file and its object URL
 */
export const uploadFile = async (file: File, routeId?: string) => {
	console.log('uploadFile to:', routeId ?? '/photos');
	const fd = new FormData();
	fd.append('file', file);
	// ? URL.createObjectURL() creates a temporary URL for the image we can use as src for an img tag
	// ? This is useful for displaying the image before it is uploaded -- only works with Web Workers
	const fileObjectUrl = URL.createObjectURL(file);
	fd.append('fileObjectUrl', fileObjectUrl);
	// fd.set()
	//
	console.log('fileObjectUrl created:', fileObjectUrl);
	const blobFromObjectUrl = await getObjectFromUrl(fileObjectUrl);
	console.log('blobFromObjectUrl gathered:', blobFromObjectUrl);
	// const blobFromObjectUrl = await getObjectFromUrl(fileObjectUrl);
	// console.log('blobFromObjectUrl gathered:', blobFromObjectUrl);
	// return fetch('/photos', {
	// 	method: 'POST',
	// 	body: fd
	// });
	const response = await fetch(routeId ?? '/photos', {
		method: 'POST',
		body: fd
	});
	//? response data
	const responseData: Partial<UploadedFile> = await response.json();
	let returnResponse: Partial<UploadedFile>;
	// const responseData: UploadedFile & {status: number} = response.json();
	if (responseData.fileObjectUrl !== undefined) {
		returnResponse = {
			...responseData,
			arrayBuffer: await file.arrayBuffer(),
			revokeObjectUrl: () => URL.revokeObjectURL(responseData.fileObjectUrl!)
		} as Partial<UploadedFile>;
	} else {
		returnResponse = { ...responseData } as Partial<UploadedFile>;
	}
	console.log('uploadFile Response', returnResponse);
	return returnResponse;
	// return response.json();
};
/**
 * getObjectFromUrl - Fetches an object from an Object URL
 * @param url the URL to fetch the object from - e.g. 'blob:http://localhost:3000/1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p'
 * @returns Promise<Blob> - Promise containing the Blob object
 */
export const getObjectFromUrl = async (url: string) => await fetch(url).then((r) => r.blob());

/**
 * getFileFromFormData - Extracts file from FormData and is used in POST request handlers
 * @param request Request from client containing FormData
 * @returns Promise<Partial<UploadedFile>> - Promise containing the file and its object URL
 */
export const getFileFromFormData = async (request: Request): Promise<Partial<UploadedFile>> => {
	console.log('getFileFromFormData');
	const formData = await request.formData();
	const file = formData.get('file') as File;
	//TODO: may not need to revoke object URL
	const fileObjectUrl = formData.get('fileObjectUrl') as string;
	console.log('fileObjectUrl received:', fileObjectUrl);

	return {
		file,
		fileObjectUrl,
		revokeObjectUrl: () => URL.revokeObjectURL(fileObjectUrl)
	} as Partial<UploadedFile>;
};

// const onUploadFileChanged = (e) => {
// 	const pendingFiles: Array<File> = new Array(...e.detail);
// 	const promisedResponses = pendingFiles.map((file) => {
// 		const promisedResponse = uploadFile(file);
// 		return promisedResponse.then<UploadedFile>((val) => val.json());
// 	});
// 	filesToUpload.push(...promisedResponses);
// 	console.log(filesToUpload);
// 	showProgress = filesToUpload.length;
// };

export interface UploadedFile {
	readonly file: File;
	readonly fileObjectUrl: string;
	readonly invalid?: boolean;
	readonly id?: string;
	readonly arrayBuffer: Awaited<ArrayBuffer>;
	readonly revokeObjectUrl: () => void;
	readonly revokedObjectUrl: boolean;
	readonly errorSubject?: string;
	readonly errorBody?: string;
	status: 'edit' | 'uploading' | 'complete' | null;
}

// ? https://hartenfeller.dev/blog/sveltekit-image-upload-store
export type AlbumImage = {
	fileName: string;
	mimeType: string;
	lastModified: number;
	size: number;
	data: Blob;
};
