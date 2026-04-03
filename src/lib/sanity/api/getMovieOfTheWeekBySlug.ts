import type { PortableTextBlock, Slug } from "@sanity/types";
import { sanityClient } from "../client";
import groq from "groq";
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

export async function getMovieOfTheWeekBySlug(slug: string): Promise<MovieOfTheWeek> {
	const movieOfTheWeek = await sanityClient.fetch<SanityMovieOfTheWeek>(
		groq`*[_type == "movieOfTheWeek" && slug.current == $slug][0] {
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
			slug: slug,
		},
	);

	return {
		...movieOfTheWeek,
		recommender: toMemberSummary(movieOfTheWeek.recommender),
	};
}
