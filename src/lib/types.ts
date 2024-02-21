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
};

export type ReviewExcerpt = Pick<Review, 'review_title' | 'slug' | 'thumbnail' | 'excerpt'>;

export type Screening = {
	movie_title: string;
	release_year: number;
	director: string;
	date: string;
	poster?: ImageAsset;
};

export type Author = {
	name: string;
	image: ImageAsset;
};

export type Logo = {
	name: string;
	image: ImageAsset;
};
