import type { ImageAsset, ImageDimensions, Slug } from "@sanity/types";
import { sanityClient } from "../client";
import groq from "groq";

type NextScreening = {
	movies: Movie[];
	date: string;
	poster?: PosterImage;
	slug: Slug;
};

type Movie = {
	title: string;
	release_year: number;
	directors: string;
};

type PosterImage = {
	asset: ImageAsset;
	blurhash: string;
	dimensions: ImageDimensions;
};

export function getNextScreening() {
	return sanityClient.fetch<NextScreening>(
		groq`*[_type == "screening" && date >= $today] | order(date asc)[0]{
		movies[] {
			directors,
    	title,
    	release_year
		},
		date,
		"poster": {
			"asset": poster.asset,
			"dimensions": poster.asset->metadata.dimensions,
			"blurhash": poster.asset->metadata.blurHash,
		},
		slug
	}`,
		{
			today: new Date().toISOString().split("T")[0],
		},
	);
}
