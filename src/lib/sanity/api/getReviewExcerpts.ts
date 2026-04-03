import groq from "groq";
import { sanityClient } from "../client";
import type { Slug, ImageAsset } from "@sanity/types";
import { toMemberSummary, type SanityMemberSummary } from "$lib/sanity/memberSummary";
import type { MemberSummary } from "$lib/types/member";

type ReviewExcerpt = {
	review_title: string;
	slug: Slug;
	thumbnail: ImageAsset;
	excerpt: string;
	thumbnailBlurhash: string;
	authors: MemberSummary[];
	date: string;
};

type SanityReviewExcerpt = Omit<ReviewExcerpt, "authors"> & {
	authors: SanityMemberSummary[];
};

export async function getReviewExcerpts(limit?: number): Promise<ReviewExcerpt[]> {
	const reviews = await sanityClient.fetch<SanityReviewExcerpt[]>(
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

	return reviews.map((review) => ({
		...review,
		authors: review.authors.map(toMemberSummary),
	}));
}
