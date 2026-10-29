import type { Image, ImageAsset, PortableTextBlock, Slug } from "@sanity/types";
import { sanityClient } from "../client";
import groq from "groq";
import { getISOWeekNumber } from "$lib/getCurrentWeek";
import { toMemberSummary, type SanityMemberSummary } from "$lib/sanity/memberSummary";
import type { MemberSummary } from "$lib/types/member";

export type MovieOfTheWeek = {
	movie: Movie;
	weekNumber: number;
	recommender: MemberSummary;
	slug: Slug;
	text?: PortableTextBlock[];
};

type Movie = {
	title: string;
	release_year?: number;
	directors?: string;
	tmdb_id?: number;
	poster: ImageAsset;
};

type SanityMovieOfTheWeek = Omit<MovieOfTheWeek, "recommender"> & {
	recommender: SanityMemberSummary;
};

export async function getAllMoviesOfTheWeek(): Promise<MovieOfTheWeek[]> {
	const moviesOfTheWeek = await sanityClient.fetch<SanityMovieOfTheWeek[]>(
		groq`*[_type == "movieOfTheWeek"] | order(year desc, weekNumber desc) {
	              movie {
	                title,
	                release_year,
	                directors,
                tmdb_id,
                poster
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
	return moviesOfTheWeek.map((movieOfTheWeek) => {
		return {
			...movieOfTheWeek,
			recommender: toMemberSummary(movieOfTheWeek.recommender),
		};
	});
}
