import { error } from '@sveltejs/kit';
import type { TmdbMovieDetails } from '../../api/movie/[tmdb_id]/+server';
import { getScreening } from '$lib/sanity/api/getScreening';

export async function load({ params, fetch }) {
	const screening = await getScreening(params.slug);

	if (screening) {
		const moviesWithDetails = await Promise.all(
			screening.movies.map(async (movie) => {
				if (movie.tmdb_id) {
					return {
						...movie,
						details: await fetch(`/api/movie/${movie.tmdb_id}`).then(
							(res) => res.json() as Promise<TmdbMovieDetails>
						)
					};
				}
				return { ...movie, details: null };
			})
		);

		return {
			screening: {
				...screening,
				movies: moviesWithDetails
			}
		};
	}

	error(404, 'Not Found');
}
