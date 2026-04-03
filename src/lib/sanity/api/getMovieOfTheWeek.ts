import type { PortableTextBlock, Slug } from "@sanity/types";
import { sanityClient } from "../client";
import groq from "groq";
import { getISOWeekNumber } from "$lib/getCurrentWeek";
import { toMemberSummary, type SanityMemberSummary } from "$lib/sanity/memberSummary";
import type { MemberSummary } from "$lib/types/member";

type MovieOfTheWeek = {
	movie: Movie;
	weekNumber: number;
	recommender: MemberSummary;
	slug: Slug;
	text?: PortableTextBlock[];
};

type Movie = {
	title: string;
	release_year: number;
	directors: string;
	tmdb_id: number;
};

type SanityMovieOfTheWeek = Omit<MovieOfTheWeek, "recommender"> & {
	recommender: SanityMemberSummary;
};

export async function getMovieOfTheWeek(): Promise<MovieOfTheWeek> {
	const movieOfTheWeek = await sanityClient.fetch<SanityMovieOfTheWeek>(
		groq`*[_type == "movieOfTheWeek" && (year < $currentYear || (year == $currentYear && weekNumber <= $currentWeek))] | order(year desc, weekNumber desc)[0] {
	              movie {
	                title,
	                release_year,
	                directors,
                tmdb_id
              },
              weekNumber,
              recommender->{
                image,
                name
              },
              slug,
              text,
            }`,
		{
			currentYear: new Date().getFullYear(),
			currentWeek: getISOWeekNumber(),
		},
	);

	return {
		...movieOfTheWeek,
		recommender: toMemberSummary(movieOfTheWeek.recommender),
	};
}
