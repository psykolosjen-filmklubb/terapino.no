import groq from "groq";
import { sanityClient } from "../client";
import type { ImageAsset, PortableTextBlock, Slug } from "@sanity/types";
import { toMemberSummary, type SanityMemberSummary } from "$lib/sanity/memberSummary";
import type { MemberSummary } from "$lib/types/member";

type Review = {
	review_title: string;
	movie_title?: string;
	review: PortableTextBlock[];
	slug: Slug;
	thumbnail?: ImageAsset;
	excerpt?: string;
	authors?: MemberSummary[];
	tmdb_id?: number;
	thumbnailBlurhash?: string;
};

type SanityReview = Omit<Review, "authors"> & {
	authors?: SanityMemberSummary[];
};

export async function getReview(slug: string): Promise<Review | null> {
	const review = await sanityClient.fetch<SanityReview | null>(
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

	if (!review) return null;

	return {
		...review,
		authors: review.authors?.map(toMemberSummary),
	};
}
