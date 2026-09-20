import { TMDB_BEARER } from "$env/static/private";
import { json } from "@sveltejs/kit";
import * as v from "valibot";
import type { RequestHandler } from "./$types";

const CANONICAL_POSITIVE_SAFE_INTEGER = /^[1-9]\d*$/;

/** TMDB marks absent values inconsistently: null, "", or a missing key. */
const AbsentAsNull = v.pipe(
	v.nullish(v.string(), ""),
	v.transform((value) => value || null),
);

const ReleaseDateAsNull = v.pipe(
	AbsentAsNull,
	v.transform((value) => (value && !Number.isNaN(Date.parse(value)) ? value : null)),
);

/** A string we cannot do anything useful without, so its entry gets dropped. */
const RequiredText = v.pipe(v.string(), v.minLength(1));

/**
 * An array whose unparseable entries are dropped rather than failing the whole
 * response, so one odd crew member or release does not cost us the poster too.
 */
function tolerantArray<TEntry extends v.GenericSchema>(entry: TEntry) {
	return v.pipe(
		v.fallback(
			v.nullish(v.array(v.fallback(v.nullable(entry), null)), () => []),
			() => [],
		),
		v.transform((entries) => entries.filter((entry) => entry !== null)),
	);
}

const CrewMemberSchema = v.object({
	job: RequiredText,
	name: RequiredText,
	original_name: AbsentAsNull,
});

const CountryReleaseSchema = v.object({
	release_date: AbsentAsNull,
	type: v.nullish(v.number(), null),
});

const CountryReleasesSchema = v.object({
	iso_3166_1: RequiredText,
	release_dates: tolerantArray(CountryReleaseSchema),
});

const TmdbMovieResponseSchema = v.object({
	imdb_id: AbsentAsNull,
	poster_path: AbsentAsNull,
	release_date: ReleaseDateAsNull,
	origin_country: tolerantArray(RequiredText),
	original_title: v.string(),
	credits: v.fallback(
		v.nullish(v.object({ crew: tolerantArray(CrewMemberSchema) }), () => ({ crew: [] })),
		() => ({ crew: [] }),
	),
	release_dates: v.fallback(
		v.nullish(v.object({ results: tolerantArray(CountryReleasesSchema) }), () => ({ results: [] })),
		() => ({ results: [] }),
	),
});

export const GET: RequestHandler = async ({ params }) => {
	const tmdbId = params.tmdb_id;

	if (!isCanonicalPositiveSafeInteger(tmdbId)) {
		return json({ message: "Invalid movie ID" }, { status: 400 });
	}

	let tmdbResponse: Response;
	try {
		tmdbResponse = await fetch(
			`https://api.themoviedb.org/3/movie/${tmdbId}?append_to_response=credits,release_dates`,
			{
				headers: {
					Authorization: `Bearer ${TMDB_BEARER}`,
				},
			},
		);
	} catch {
		return upstreamError();
	}

	if (tmdbResponse.status === 404) {
		return json({ message: "Movie not found" }, { status: 404 });
	}

	if (!tmdbResponse.ok) {
		return upstreamError();
	}

	let movieDetailsJson: unknown;
	try {
		movieDetailsJson = await tmdbResponse.json();
	} catch {
		return upstreamError();
	}

	const movieDetails = v.safeParse(TmdbMovieResponseSchema, movieDetailsJson);
	if (!movieDetails.success) {
		return upstreamError();
	}

	const directors = movieDetails.output.credits.crew
		.filter(({ job }) => job === "Director")
		.map(({ name, original_name }) => {
			if (original_name && original_name !== name) {
				return `${name} (${original_name})`;
			} else {
				return name;
			}
		});

	const norwegian_release_dates = movieDetails.output.release_dates.results.find(
		({ iso_3166_1 }) => iso_3166_1 === "NO",
	)?.release_dates;
	// Keep only dates the client can actually format, so a junk value cannot
	// turn into an "Invalid Date" further down.
	const theatrical_releases = (norwegian_release_dates ?? []).flatMap(({ type, release_date }) =>
		type === 3 && release_date && !Number.isNaN(Date.parse(release_date)) ? [release_date] : [],
	);
	const first_release = theatrical_releases.sort((a, b) => Date.parse(a) - Date.parse(b))[0];

	const response: TmdbMovieDetails = {
		origin_country: [...new Set(movieDetails.output.origin_country)],
		original_title: movieDetails.output.original_title,
		poster_path: movieDetails.output.poster_path,
		release_date: movieDetails.output.release_date,
		imdb_id: movieDetails.output.imdb_id,
		directors,
		release_date_no: first_release,
	};

	return json(response);
};

function isCanonicalPositiveSafeInteger(value: string): boolean {
	if (!CANONICAL_POSITIVE_SAFE_INTEGER.test(value)) {
		return false;
	}

	return Number.isSafeInteger(Number(value));
}

function upstreamError() {
	return json({ message: "Movie service is unavailable" }, { status: 502 });
}

export type TmdbMovieDetails = {
	original_title: string;
	origin_country: string[];
	poster_path: string | null;
	release_date: string | null;
	imdb_id: string | null;
	directors: string[];
	release_date_no?: string;
};
