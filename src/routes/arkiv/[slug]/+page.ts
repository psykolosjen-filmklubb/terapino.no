import { getScreening } from '$lib/sanity/api/api';
import { error } from '@sveltejs/kit';
import type { TmdbMovieDetails } from '../../api/movie/[tmdb_id]/+server';

export async function load({ params, fetch }) {
	const screening = await getScreening(params.slug);

	const movieDetailsPromises: Promise<TmdbMovieDetails>[] = [];

	if (screening) {
		screening.movies.forEach(async (movie) => {
			if (movie.tmdb_id) {
				const movieDetailsPromise = fetch(`/api/movie/${movie.tmdb_id}`).then((res) => res.json());
				movieDetailsPromises.push(movieDetailsPromise);
			}
		});

		return {
			screening,
			movieDetails: await Promise.all(movieDetailsPromises)
		};
	}

	error(404, 'Not Found');
}
