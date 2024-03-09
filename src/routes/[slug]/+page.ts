import { getReview } from '$lib/sanity';
import { error } from '@sveltejs/kit';
import type { TmdbMovieDetails } from '../api/movie/[tmdb_id]/+server.js';

export async function load({ fetch, params }) {
	const review = await getReview(params.slug);

	if (review) {
		if (!review.tmdb_id) {
			return {
				review,
				movieDetails: null
			};
		}

		const movieDetails: TmdbMovieDetails = await fetch(`/api/movie/${review.tmdb_id}`).then((res) =>
			res.json()
		);

		return {
			review,
			movieDetails
		};
	}

	error(404, 'Not Found');
}
