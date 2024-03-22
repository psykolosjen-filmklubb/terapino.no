import { getScreening } from '$lib/sanity/sanity';
import { error } from '@sveltejs/kit';
import type { TmdbMovieDetails } from '../../api/movie/[tmdb_id]/+server';

export async function load({ params, fetch }) {
	const screening = await getScreening(params.slug);

	if (screening) {
		if (!screening.tmdb_id) {
			return {
				screening,
				movieDetails: null
			};
		}

		const movieDetails: TmdbMovieDetails = await fetch(`/api/movie/${screening.tmdb_id}`).then(
			(res) => res.json()
		);

		return {
			screening,
			movieDetails
		};
	}

	error(404, 'Not Found');
}
