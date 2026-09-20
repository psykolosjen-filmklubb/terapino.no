import { error } from "@sveltejs/kit";
import type { TmdbMovieDetails } from "../../api/movie/[tmdb_id]/+server.js";
import { getReview } from "$lib/sanity/api/getReview.js";

export async function load({ fetch, params }) {
	const review = await getReview(params.slug);

	if (review) {
		if (!review.tmdb_id) {
			return {
				review,
				movieDetails: null,
			};
		}

		const response = await fetch(`/api/movie/${review.tmdb_id}`);
		const movieDetails: TmdbMovieDetails | null = response.ok ? await response.json() : null;

		return {
			review,
			movieDetails,
		};
	}

	error(404, "Not Found");
}
