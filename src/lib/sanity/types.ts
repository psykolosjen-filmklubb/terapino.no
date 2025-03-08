import type { ImageAsset, ImageDimensions, Slug } from '@sanity/types';

export type NextScreening = {
	movies: Movie[];
	date: string;
	poster?: PosterImage;
	slug: Slug;
};

export type Movie = {
	title: string;
	release_year: number;
	directors: string;
	tmdb_id?: number;
};

export type GalleryItem = GalleryImage | GalleryVideo;

export type GalleryImage = {
	_type: 'image';
	asset: ImageAsset;
	alt: string;
	dimensions: ImageDimensions;
};

type GalleryVideo = {
	_type: 'video';
	youtube_id: string;
};

export type PosterImage = {
	asset: ImageAsset;
	blurhash: string;
	dimensions: ImageDimensions;
	artists?: Member[];
	alt?: string;
};

export type Member = {
	_id?: string;
	name: string;
	image: ImageAsset;
	memberships: Membership[];
	verv?: Verv[];
};

export type Membership = {
	from_date: string;
	to_date?: string;
};

export type Verv = {
	role: string;
	from_date: string;
	to_date?: string;
};
