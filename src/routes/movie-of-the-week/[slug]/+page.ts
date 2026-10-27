import { error } from "@sveltejs/kit";
import type { TmdbMovieDetails } from "../../api/movie/[tmdb_id]/+server.js";
import { getMovieOfTheWeekBySlug } from "$lib/sanity/api/getMovieOfTheWeekBySlug.js";

export async function load({ fetch, params }) {
	const movieOfTheWeek = await getMovieOfTheWeekBySlug(params.slug);

	if (movieOfTheWeek) {
		const tmdbId = movieOfTheWeek.movie.tmdb_id;
		const response = tmdbId ? await fetch(`/api/movie/${tmdbId}`) : null;
		const movieDetails: TmdbMovieDetails | null = response?.ok ? await response.json() : null;

		return {
			movieOfTheWeek,
			movieDetails,
		};
	}

	error(404, "Not Found");
}
