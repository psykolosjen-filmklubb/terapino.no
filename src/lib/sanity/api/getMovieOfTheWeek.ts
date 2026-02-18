import type { ImageAsset, PortableTextBlock, Slug } from "@sanity/types";
import { sanityClient } from "../client";
import groq from "groq";
import { getISOWeekNumber } from "$lib/getCurrentWeek";

type Member = {
	name: string;
	image: ImageAsset;
};
type MovieOfTheWeek = {
	movie: Movie;
	weekNumber: number;
	recommender: Member;
	slug: Slug;
	text?: PortableTextBlock[];
};

type Movie = {
	title: string;
	release_year: number;
	directors: string;
	tmdb_id: number;
};

export function getMovieOfTheWeek() {
	return sanityClient.fetch<MovieOfTheWeek>(
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
}
