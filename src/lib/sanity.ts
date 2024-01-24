import { createClient } from '@sanity/client';
import groq from 'groq';
import type { Author, Logo, Review, ReviewExcerpt } from './types';

export const sanityClient = createClient({
	projectId: '1pfu395i',
	dataset: 'production',
	apiVersion: '2024-01-16',
	useCdn: false
});

export function getAuthors() {
	return sanityClient.fetch<Author[]>(groq`*[_type == "author"]`);
}

export function getReviewExcerpts() {
	return sanityClient.fetch<ReviewExcerpt[]>(groq`*[_type == "review"]{
		review_title,
		slug,
		thumbnail,
		excerpt
	}`);
}

export async function getLogo() {
	const logo = await sanityClient.fetch<Logo>(
		groq`*[_type == "image_assets" && name == "Logo"][0]`
	);
	return logo;
}

export async function getReview(slug: string) {
	return sanityClient.fetch<Review>(
		groq`*[_type == "review" && slug.current == $slug][0]{
			review_title,
			movie_title,
			review,
			slug,
			thumbnail,
			authors[]->
	}`,
		{
			slug
		}
	);
}
