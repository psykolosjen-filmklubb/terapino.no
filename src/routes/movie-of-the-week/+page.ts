import { getAllMoviesOfTheWeek } from "$lib/sanity/api/getAllMoviesOfTheWeek";
import { getMovieOfTheWeekPosterUrl } from "$lib/movieOfTheWeekPoster";
import { error } from "@sveltejs/kit";
import type { TmdbMovieDetails } from "../api/movie/[tmdb_id]/+server";

export async function load({ fetch }) {
	try {
		const moviesOfTheWeek = await getAllMoviesOfTheWeek();

		return {
			moviesOfTheWeek: await Promise.all(
				moviesOfTheWeek.map(async (movieOfTheWeek) => {
					// Only ask TMDB when there is no custom poster to win over it.
					const tmdbId = !movieOfTheWeek.movie.poster?.asset && movieOfTheWeek.movie.tmdb_id;
					const response = tmdbId ? await fetch(`/api/movie/${tmdbId}`) : null;
					const movieDetails: TmdbMovieDetails | null = response?.ok ? await response.json() : null;

					return {
						...movieOfTheWeek,
						posterUrl: getMovieOfTheWeekPosterUrl(
							movieOfTheWeek.movie.poster,
							movieDetails?.poster_path,
						),
					};
				}),
			),
		};
	} catch {
		error(500, "Internal Server Error");
	}
}
