import groq from 'groq';
import { sanityClient } from '../client';
import type { GalleryImage, GalleryItem } from '../types';
import type { ImageAsset, ImageDimensions, Slug } from '@sanity/types';

type Screening = {
	movies: Movie[];
	date: string;
	slug: Slug;
	poster?: PosterImage;
	promo_material?: GalleryItem[];
	event_media?: GalleryImage[];
	tickets_url?: string;
};

type Movie = {
	title: string;
	release_year: number;
	directors: string;
	tmdb_id?: number;
};

type PosterImage = {
	asset: ImageAsset;
	blurhash: string;
	dimensions: ImageDimensions;
	artists?: Member[];
};

type Member = {
	name: string;
	image: ImageAsset;
};

export function getScreening(slug: string) {
	return sanityClient.fetch<Screening>(
		groq`*[_type == "screening" && slug.current == $slug][0]{
		movies[] {
			directors,
			title,
			release_year,
			tmdb_id
		},
		date,
		"poster": {
			"asset": poster.asset,
			"dimensions": poster.asset->metadata.dimensions,
			"blurhash": poster.asset->metadata.blurHash,
			"artists": poster_artists[]->,
		},
		promo_material[] {
			_type == "image" => {
				asset,
				alt,
				"dimensions": asset->metadata.dimensions,
				_type,
			},
			_type == "video" => {
				youtube_id,
				_type,
			}
		},
		event_media[] {
			asset,
			alt,
			"dimensions": asset->metadata.dimensions
		},
		tickets_url
	}`,
		{
			slug
		}
	);
}
