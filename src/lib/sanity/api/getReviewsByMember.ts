import groq from "groq";
import { sanityClient } from "../client";
import type { Slug } from "@sanity/types";

export type Review = {
	review_title: string;
	movie_title?: string;
	slug: Slug;
};

export async function getReviewsByMember(id: string) {
	return sanityClient.fetch<Review[]>(
		groq`*[_type == "review" && references($id)] | order(date desc) {
			movie_title,
			review_title,
			slug,
		}`,
		{
			id,
		},
	);
}
