import { TMDB_BEARER } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const tmdbResponse = await fetch(
		`https://api.themoviedb.org/3/movie/${params.tmdb_id}?append_to_response=credits,release_dates`,
		{
			headers: {
				Authorization: `Bearer ${TMDB_BEARER}`
			}
		}
	);

	const movieDetailsJson: TmdbMovieResponse = await tmdbResponse.json();

	const directors = movieDetailsJson.credits.crew
		.filter(({ job }) => job === 'Director')
		.map(({ name, original_name }) => {
			if (original_name !== name) {
				return `${name} (${original_name})`;
			} else {
				return name;
			}
		});

	const norwegian_release_dates = movieDetailsJson.release_dates.results.find(
		({ iso_3166_1 }) => iso_3166_1 === 'NO'
	)?.release_dates;
	const theatrical_releases = norwegian_release_dates?.filter(({ type }) => type === 3);
	const first_release = theatrical_releases?.sort(
		(a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
	)[0]?.release_date;

	const response: TmdbMovieDetails = {
		title: movieDetailsJson.title,
		original_title: movieDetailsJson.original_title,
		poster_path: movieDetailsJson.poster_path,
		release_date: movieDetailsJson.release_date,
		imdb_id: movieDetailsJson.imdb_id,
		directors,
		release_date_no: first_release
	};

	return json(response);
}

export type TmdbMovieDetails = {
	title: string;
	original_title: string;
	poster_path: string;
	release_date: string;
	imdb_id: string;
	directors: string[];
	release_date_no?: string;
};

type TmdbMovieResponse = {
	imdb_id: string;
	poster_path: string;
	release_date: string;
	title: string;
	original_title: string;
	credits: { crew: { job: string; name: string; original_name: string }[] };
	release_dates: {
		results: {
			iso_3166_1: string;
			release_dates: { release_date: string; type: number }[];
		}[];
	};
};
