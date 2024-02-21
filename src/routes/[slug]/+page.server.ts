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
			`https://api.themoviedb.org/3/movie/${review.tmdb_id}?append_to_response=credits,release_dates&language=no`,
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
						release_dates: {
							results: {
								iso_3166_1: string;
								release_dates: { release_date: string; type: number }[];
							}[];
						};
					}>
			)
			.then((movieDetailsJson) => {
				const directors = movieDetailsJson.credits.crew
					.filter(({ job }) => job === 'Director')
					.map(({ name }) => name);

				const norwegian_release_dates = movieDetailsJson.release_dates.results.find(
					({ iso_3166_1 }) => iso_3166_1 === 'NO'
				)?.release_dates;
				const theatrical_releases = norwegian_release_dates?.filter(({ type }) => type === 3);
				const first_release = theatrical_releases?.sort(
					(a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
				)[0].release_date;

				return {
					title: movieDetailsJson.title,
					original_title: movieDetailsJson.original_title,
					poster_path: movieDetailsJson.poster_path,
					release_date: movieDetailsJson.release_date,
					imdb_id: movieDetailsJson.imdb_id,
					directors,
					release_date_no: first_release
				};
			});

		return {
			review,
			movieDetails
		};
	}

	error(404, 'Not Found');
}
