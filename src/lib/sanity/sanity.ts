import { createClient } from '@sanity/client';
import groq from 'groq';
import type { Author, Logo, Review, ReviewExcerpt, Screening } from './types';
import type { Semester } from '$lib/components/Archive/types';

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
		"thumbnailBlurhash": thumbnail.asset->metadata.blurHash,
		excerpt
	}`,
		{
			limit: limit ? limit - 1 : -1
		}
	);
}

export function getNextScreening() {
	return sanityClient.fetch<Screening>(
		groq`*[_type == "screening" && date >= $today] | order(date asc)[0]{
		movie_title,
		release_year,
		date,
		poster,
		"posterBlurhash": poster.asset->metadata.blurHash,
		director
	}`,
		{
			today: new Date().toISOString().split('T')[0]
		}
	);
}

export function getScreening(slug: string) {
	return sanityClient.fetch<Screening>(
		groq`*[_type == "screening" && slug.current == $slug][0]{
		movie_title,
		release_year,
		date,
		poster,
		"posterBlurhash": poster.asset->metadata.blurHash,
		"posterArtists": poster_artists[]->,
		director,
		tmdb_id
	}`,
		{
			slug
		}
	);
}

export async function getLogos() {
	const black = await sanityClient.fetch<Logo>(
		groq`*[_type == "image_assets" && name == "logo-svart"][0]`
	);
	const white = await sanityClient.fetch<Logo>(
		groq`*[_type == "image_assets" && name == "logo-hvit"][0]`
	);
	return { black, white };
}

export async function getReview(slug: string) {
	return sanityClient.fetch<Review>(
		groq`*[_type == "review" && slug.current == $slug][0]{
			review_title,
			movie_title,
			review,
			slug,
			thumbnail,
			"thumbnailBlurhash": thumbnail.asset->metadata.blurHash,
			authors[]->,
			tmdb_id,
	}`,
		{
			slug
		}
	);
}

export async function getArchive() {
	return sanityClient.fetch<Semester[]>(
		groq`*[_type == "semester"] | order(start_date desc) {
		"name": semester_name,
		"startDate": start_date,
		"color": color.hex,
		"movies": screenings[]-> | order(date desc) {
			"title": movie_title,
			"year": release_year,
			director,
			slug,
		}
	}`
	);
}
