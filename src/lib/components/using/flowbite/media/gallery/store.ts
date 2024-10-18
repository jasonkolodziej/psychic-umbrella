import type { ExtendedImgType } from '$lib/media/fileUtils';
import { useReadable, useWritable } from '$lib/utils/templates';

export const writableGallery = () => useWritable<ExtendedImgType[]>('mediaGallery', []);

export const readableGallery = () => useReadable<ExtendedImgType[]>('mediaGallery', []);
