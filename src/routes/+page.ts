import { getMovieOfTheWeek } from "$lib/sanity/api/getMovieOfTheWeek";
import { getNextScreening } from "$lib/sanity/api/getNextScreening";
import { getReviewExcerpts } from "$lib/sanity/api/getReviewExcerpts";
import type { PageLoad } from "./$types";
import type { TmdbMovieDetails } from "./api/movie/[tmdb_id]/+server";

export const load: PageLoad = async ({ fetch }) => {
	const reviews = getReviewExcerpts(3);
	const nextScreening = getNextScreening();
	const movieOfTheWeek = await getMovieOfTheWeek();

	let movieDetails: TmdbMovieDetails | undefined;
	if (movieOfTheWeek) {
		const response = await fetch(`/api/movie/${movieOfTheWeek.movie.tmdb_id}`);
		if (response.ok) {
			movieDetails = await response.json();
		}
	}

	return {
		reviews: await reviews,
		nextScreening: await nextScreening,
		movieOfTheWeek: movieOfTheWeek,
		movieOfTheWeekDetails: movieDetails ?? null,
	};
};
