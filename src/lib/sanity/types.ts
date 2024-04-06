import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, ImageDimensions, Slug } from '@sanity/types';

export type Review = {
	review_title: string;
	movie_title: string;
	review: PortableTextBlock[];
	slug: Slug;
	thumbnail: ImageAsset;
	excerpt: string;
	authors?: Author[];
	tmdb_id?: number;
	thumbnailBlurhash: string;
};

export type ReviewExcerpt = Pick<
	Review,
	'review_title' | 'slug' | 'thumbnail' | 'thumbnailBlurhash' | 'excerpt'
>;

export type Screening = {
	movie_title: string;
	release_year: number;
	director: string;
	date: string;
	poster?: PosterImage;
	tmdb_id?: number;
	promo_material?: GalleryImage[];
	event_media?: GalleryImage[];
};

export type GalleryImage = {
	asset: ImageAsset;
	alt: string;
	dimensions: ImageDimensions;
};

export type PosterImage = {
	asset: ImageAsset;
	blurhash: string;
	dimensions: ImageDimensions;
	artists?: Author[];
};

export type Author = {
	name: string;
	image: ImageAsset;
};

export type Logo = {
	name: string;
	image: ImageAsset;
};
