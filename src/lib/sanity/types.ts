import type { ImageAsset, ImageDimensions } from '@sanity/types';

export type GalleryItem = GalleryImage | GalleryVideo;

type GalleryImage = {
	_type: 'image';
	asset: ImageAsset;
	alt: string;
	dimensions: ImageDimensions;
};

type GalleryVideo = {
	_type: 'video';
	youtube_id: string;
};
