import groq from 'groq';
import { sanityClient } from '../client';
import type { ImageAsset, ImageDimensions } from '@sanity/types';

type PosterByMember = {
	asset: ImageAsset;
	blurhash: string;
	dimensions: ImageDimensions;
	movies: Movie[];
};

type Movie = {
	title: string;
};

export async function getPostersByMember(memberId: string) {
	return sanityClient
		.fetch<PosterByMember[]>(
			groq`*[_type == "screening" && references($memberId)] | order(date desc) {
			"asset": poster.asset,
			"dimensions": poster.asset->metadata.dimensions,
			"blurhash": poster.asset->metadata.blurHash,
			movies[] {
				title
			},
		}`,
			{
				memberId
			}
		)
		.then((posters) => {
			return posters.map((poster) => {
				return {
					...poster,
					alt: 'Poster for ' + poster.movies.map((movie) => movie.title).join(' & ')
				};
			});
		});
}
