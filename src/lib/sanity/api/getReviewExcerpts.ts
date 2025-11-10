import groq from "groq";
import { sanityClient } from "../client";
import type { Slug, ImageAsset } from "@sanity/types";

type ReviewExcerpt = {
	review_title: string;
	slug: Slug;
	thumbnail: ImageAsset;
	excerpt: string;
	thumbnailBlurhash: string;
	authors: Member[];
	date: string;
};

export type Member = {
	_id?: string;
	name: string;
	image: ImageAsset;
};

export function getReviewExcerpts(limit?: number) {
	return sanityClient.fetch<ReviewExcerpt[]>(
		groq`*[_type == "review"] | order(_createdAt desc) [0..$limit]{
		review_title,
		"date": publishing_date,
		slug,
		thumbnail,
		"thumbnailBlurhash": thumbnail.asset->metadata.blurHash,
		excerpt,
		authors[]->,
	}`,
		{
			limit: limit ? limit - 1 : -1,
		},
	);
}
