import groq from "groq";
import { sanityClient } from "../client";
import type { Slug } from "@sanity/types";

type Semester = {
	name: string;
	startDate: string;
	color: string;
	screenings: Screening[];
};

type Screening = {
	movies: Movie[];
	slug: Slug;
};

type Movie = {
	title: string;
	year: number;
	directors: string;
};

export async function getArchive() {
	return sanityClient.fetch<Semester[]>(
		groq`*[_type == "semester"] | order(start_date desc) {
		"name": semester_name,
		"startDate": start_date,
		"color": color.hex,
		"screenings": screenings[]-> | order(date desc) {
			movies[] {
				title,
				"year": release_year,
				directors,
			},
			slug,
		}
	}`,
	);
}
