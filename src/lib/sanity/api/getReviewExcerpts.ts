import groq from 'groq';
import { sanityClient } from '../client';
import type { Slug, ImageAsset } from '@sanity/types';

type ReviewExcerpt = {
	review_title: string;
	slug: Slug;
	thumbnail: ImageAsset;
	excerpt: string;
	thumbnailBlurhash: string;
};

export function getReviewExcerpts(limit?: number) {
	return sanityClient.fetch<ReviewExcerpt[]>(
		groq`*[_type == "review"] | order(_createdAt desc) [0..$limit]{
		review_title,
		slug,
		thumbnail,
		"thumbnailBlurhash": thumbnail.asset->metadata.blurHash,
		excerpt
	}`,
		{
			limit: limit ? limit - 1 : -1
		}
	);
}
