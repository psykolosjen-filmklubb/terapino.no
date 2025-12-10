import { error } from "@sveltejs/kit";
import type { TmdbMovieDetails } from "../../api/movie/[tmdb_id]/+server.js";
import { getMovieOfTheWeekBySlug } from "$lib/sanity/api/getMovieOfTheWeekBySlug.js";

export async function load({ fetch, params }) {
	const movieOfTheWeek = await getMovieOfTheWeekBySlug(params.slug);

	if (movieOfTheWeek) {
		const movieDetails: TmdbMovieDetails = await fetch(
			`/api/movie/${movieOfTheWeek.movie.tmdb_id}`,
		).then((res) => res.json());

		return {
			movieOfTheWeek,
			movieDetails,
		};
	}

	error(404, "Not Found");
}
