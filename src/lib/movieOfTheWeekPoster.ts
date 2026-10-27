import { urlFor } from "$lib/sanity/image";
import type { Image } from "@sanity/types";

/** An uploaded poster wins over TMDB's, so episodes and other non-TMDB picks can have one too. */
export function getMovieOfTheWeekPosterUrl(
	customPoster: Image | undefined,
	tmdbPosterPath: string | null | undefined,
): string | null {
	if (customPoster?.asset) {
		return urlFor(customPoster).width(500).fit("min").auto("format").url();
	}

	if (tmdbPosterPath) {
		return `https://image.tmdb.org/t/p/w500${tmdbPosterPath}`;
	}

	return null;
}
