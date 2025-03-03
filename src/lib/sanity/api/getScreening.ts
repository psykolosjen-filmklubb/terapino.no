import groq from 'groq';
import { sanityClient } from '../client';
import type { GalleryImage, GalleryItem, Movie, PosterImage } from '../types';
import type { Slug } from '@sanity/types';

type Screening = {
	movies: Movie[];
	date: string;
	slug: Slug;
	poster?: PosterImage;
	promo_material?: GalleryItem[];
	event_media?: GalleryImage[];
	tickets_url?: string;
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
