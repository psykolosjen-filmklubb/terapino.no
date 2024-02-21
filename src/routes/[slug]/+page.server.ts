import { TMDB_BEARER } from '$env/static/private';
import { getReview } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const review = await getReview(params.slug);

	if (review) {
		if (!review.tmdb_id) {
			return {
				review,
				movieDetails: null
			};
		}

		const movieDetails = await fetch(
			`https://api.themoviedb.org/3/movie/${review.tmdb_id}?append_to_response=credits&language=no`,
			{
				headers: {
					Authorization: `Bearer ${TMDB_BEARER}`
				}
			}
		)
			.then(
				(res) =>
					res.json() as Promise<{
						imdb_id: string;
						poster_path: string;
						release_date: string;
						title: string;
						original_title: string;
						credits: { crew: { job: string; name: string }[] };
					}>
			)
			.then((movieDetailsJson) => ({
				title: movieDetailsJson.title,
				original_title: movieDetailsJson.original_title,
				poster_path: movieDetailsJson.poster_path,
				release_date: movieDetailsJson.release_date,
				imdb_id: movieDetailsJson.imdb_id,
				directors: movieDetailsJson.credits.crew
					.filter(({ job }) => job === 'Director')
					.map(({ name }) => name)
			}));

		return {
			review,
			movieDetails
		};
	}

	error(404, 'Not Found');
}
