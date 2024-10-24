import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, ImageDimensions, Slug } from '@sanity/types';

export type Review = {
	review_title: string;
	movie_title: string;
	review: PortableTextBlock[];
	slug: Slug;
	thumbnail: ImageAsset;
	excerpt: string;
	authors?: Member[];
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
	promo_material?: GalleryItem[];
	event_media?: GalleryImage[];
	slug: Slug;
	tickets_url?: string;
};

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

export type Logo = {
	name: string;
	image: ImageAsset;
};

export type OmOss = {
	header_image: {
		asset: ImageAsset;
		blurhash: string;
		alt: string;
	};
	main_text: PortableTextBlock[];
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

export type Instillinger = {
	recruiting: {
		recruiting_active: boolean;
		recruiting_form: string;
	};
};
