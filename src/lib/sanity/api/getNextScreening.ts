import type { Slug } from '@sanity/types';
import { sanityClient } from '../client';
import type { Movie, PosterImage } from '../types';
import groq from 'groq';

type NextScreening = {
	movies: Movie[];
	date: string;
	poster?: PosterImage;
	slug: Slug;
};

export function getNextScreening() {
	return sanityClient.fetch<NextScreening>(
		groq`*[_type == "screening" && date >= $today] | order(date asc)[0]{
		movies[] {
			directors,
    	title,
    	release_year
		},
		date,
		"poster": {
			"asset": poster.asset,
			"dimensions": poster.asset->metadata.dimensions,
			"blurhash": poster.asset->metadata.blurHash,
		},
		slug
	}`,
		{
			today: new Date().toISOString().split('T')[0]
		}
	);
}
