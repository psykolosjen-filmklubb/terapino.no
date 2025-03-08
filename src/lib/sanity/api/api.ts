import groq from 'groq';
import type { Review, PosterImage, Instillinger, PosterByMember } from '../types';
import { sanityClient } from '../client';

export async function getPostersByMember(id: string): Promise<PosterImage[]> {
	return sanityClient
		.fetch<PosterByMember[]>(
			groq`*[_type == "screening" && references($id)] | order(date desc) {
			"asset": poster.asset,
			"dimensions": poster.asset->metadata.dimensions,
			"blurhash": poster.asset->metadata.blurHash,
			movies[] {
				title
			},
		}`,
			{
				id
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

export async function getReviewsByMember(id: string) {
	return sanityClient.fetch<Pick<Review, 'movie_title' | 'review_title' | 'slug'>[]>(
		groq`*[_type == "review" && references($id)] | order(date desc) {
			movie_title,
			review_title,
			slug,
		}`,
		{
			id
		}
	);
}

export async function getSettings() {
	return sanityClient.fetch<Instillinger>(
		groq`*[_type == "settings" && title == "Instillinger"][0] {
			recruiting
		}`
	);
}
