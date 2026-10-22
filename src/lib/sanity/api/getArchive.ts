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
	// The archive shows screenings once they have happened, in Norwegian time.
	const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Oslo" }).format(new Date());
	// Screenings reference their semester; the Studio's publish action keeps
	// that reference in line with the screening date. "fall" sorts before
	// "spring", so ascending season puts the later half-year first.
	return sanityClient.fetch<Semester[]>(
		groq`*[_type == "semester"] | order(semester_year desc, semester_season asc) {
		"name": semester_name,
		"startDate": string(semester_year) + select(semester_season == "spring" => "-01-01", "-07-01"),
		"color": color.hex,
		"screenings": *[_type == "screening" && references(^._id) && date <= $today] | order(date desc) {
			movies[] {
				title,
				"year": release_year,
				directors,
			},
			slug,
		}
	}[count(screenings) > 0]`,
		{ today },
		// Never show unpublished screenings or semesters.
		{ perspective: "published" },
	);
}
