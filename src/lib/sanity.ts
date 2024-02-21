import { createClient } from '@sanity/client';
import groq from 'groq';
import type { Author, Logo, Review, ReviewExcerpt, Screening } from './types';

export const sanityClient = createClient({
	projectId: '4s9wdr84',
	dataset: 'production',
	apiVersion: '2024-01-16',
	useCdn: false
});

export function getAuthors() {
	return sanityClient.fetch<Author[]>(groq`*[_type == "author"]`);
}

export function getReviewExcerpts(limit?: number) {
	return sanityClient.fetch<ReviewExcerpt[]>(
		groq`*[_type == "review"] | order(_createdAt desc) [0..$limit]{
		review_title,
		slug,
		thumbnail,
		excerpt
	}`,
		{
			limit: limit ? limit - 1 : -1
		}
	);
}

export function getNextScreening() {
	return sanityClient.fetch<Screening>(
		groq`*[_type == "screening" && date > $today] | order(release_year desc)[0]{
		movie_title,
		release_year,
		date,
		poster,
		director
	}`,
		{
			today: new Date().toISOString().split('T')[0]
		}
	);
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
			authors[]->,
			tmdb_id,
	}`,
		{
			slug
		}
	);
}
