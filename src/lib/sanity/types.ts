import type { ImageAsset, PortableTextBlock, Slug } from '@sanity/types';

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
	poster?: ImageAsset;
	posterBlurhash?: string;
	posterArtists?: Author[];
	tmdb_id?: number;
	promo_material?: { asset: ImageAsset; alt: string }[];
};

export type Author = {
	name: string;
	image: ImageAsset;
};

export type Logo = {
	name: string;
	image: ImageAsset;
};
