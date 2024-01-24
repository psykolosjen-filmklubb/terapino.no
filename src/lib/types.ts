import type { ImageAsset, PortableTextBlock, Slug } from '@sanity/types';

export type Review = {
	review_title: string;
	movie_title: string;
	review: PortableTextBlock[];
	slug: Slug;
	thumbnail: ImageAsset;
	excerpt: string;
	authors?: Author[];
};

export type ReviewExcerpt = {
	review_title: string;
	slug: Slug;
	thumbnail: ImageAsset;
	excerpt: string;
};

export type Author = {
	name: string;
	image: ImageAsset;
};

export type Logo = {
	name: string;
	image: ImageAsset;
};
