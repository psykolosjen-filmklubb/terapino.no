import type { ImageAsset, PortableTextBlock, Slug } from "@sanity/types";
import { sanityClient } from "../client";
import groq from "groq";

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

export function getMovieOfTheWeekBySlug(slug: string) {
	return sanityClient.fetch<MovieOfTheWeek>(
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
}
