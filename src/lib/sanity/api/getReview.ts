import groq from "groq";
import { sanityClient } from "../client";
import type { ImageAsset, PortableTextBlock, Slug } from "@sanity/types";

type Review = {
	review_title: string;
	movie_title?: string;
	review: PortableTextBlock[];
	slug: Slug;
	thumbnail?: ImageAsset;
	excerpt?: string;
	authors?: Member[];
	tmdb_id?: number;
	thumbnailBlurhash?: string;
};

type Member = {
	_id?: string;
	name: string;
	image: ImageAsset;
};

export async function getReview(slug: string) {
	return sanityClient.fetch<Review>(
		groq`*[_type == "review" && slug.current == $slug][0]{
			review_title,
			movie_title,
			review[],
			slug,
			thumbnail,
			"thumbnailBlurhash": thumbnail.asset->metadata.blurHash,
			authors[]->,
			tmdb_id,
	}`,
		{
			slug,
		},
	);
}
