import groq from "groq";
import { sanityClient } from "../client";
import type { ImageAsset, ImageDimensions } from "@sanity/types";

type PosterByMember = {
	asset: ImageAsset;
	dimensions: ImageDimensions;
	movies: Movie[];
};

type Movie = {
	title: string;
};

export async function getPostersByMember(memberId: string) {
	return sanityClient
		.fetch<PosterByMember[]>(
			groq`*[_type == "screening" && references($memberId)] | order(date desc) {
			"asset": poster.asset,
			"dimensions": poster.asset->metadata.dimensions,
			movies[] {
				title
			},
		}`,
			{
				memberId,
			},
		)
		.then((posters) => {
			return posters.map((poster) => {
				return {
					...poster,
					alt: "Poster for " + poster.movies.map((movie) => movie.title).join(" & "),
				};
			});
		});
}
