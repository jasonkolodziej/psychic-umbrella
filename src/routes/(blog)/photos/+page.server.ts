import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ImgType } from 'flowbite-svelte';

export const load: PageServerLoad = async ({
	request,
	params,
	locals,
	route,
	parent,
	isDataRequest,
	isSubRequest
}) => {
	console.log(
		`PageServerLoad.${request.method}(${route.id}) dataReq?:${isDataRequest} subreq?:${isSubRequest}`,
		params
	);
	// const parentData = await parent();
	const images = [
		{ alt: 'erbology', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg' },
		{ alt: 'shoes', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg' },
		{ alt: 'small bag', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg' },
		{ alt: 'plants', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg' },
		{ alt: 'watch', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg' },
		{ alt: 'shoe', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg' },
		{ alt: 'cream', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg' },
		{ alt: 'small bag', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg' },
		{ alt: 'lamp', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg' },
		{ alt: 'toiletbag', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg' },
		{
			alt: 'playstation',
			src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg'
		},
		{ alt: 'bag', src: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg' }
	];
	return {
		// ...parentData,
		title: 'Photos',
		items: images as Array<ImgType>
	};
};

// ? see: https://github.com/JustinyAhin/okupter-repos/blob/5e9403e30a49ce5e314f311cffb057d922d2c737/apps/sveltekit-file-upload/src/routes/%2Bpage.server.ts
// export const actions = {
// 	default: async ({ request }) => {
// 	  const formData = Object.fromEntries(await request.formData());

// 	  if (
// 		!(formData.fileToUpload as File).name ||
// 		(formData.fileToUpload as File).name === 'undefined'
// 	  ) {
// 		return fail(400, {
// 		  error: true,
// 		  message: 'You must provide a file to upload'
// 		});
// 	  }

// 	  const { fileToUpload } = formData as { fileToUpload: File };

// 	  // Write the file to the static folder
// 	  writeFileSync(`static/${fileToUpload.name}`, Buffer.from(await fileToUpload.arrayBuffer()));

// 	  return {
// 		success: true
// 	  };
// 	}
//   };
