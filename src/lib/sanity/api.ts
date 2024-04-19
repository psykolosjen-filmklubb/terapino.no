import groq from 'groq';
import type { Author, Logo, OmOss, Review, ReviewExcerpt, Screening } from './types';
import type { Semester } from '$lib/components/Archive/types';
import { sanityClient } from './client';

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
		"poster": {
			"asset": poster.asset,
			"dimensions": poster.asset->metadata.dimensions,
			"blurhash": poster.asset->metadata.blurHash,
		},
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
		"poster": {
			"asset": poster.asset,
			"dimensions": poster.asset->metadata.dimensions,
			"blurhash": poster.asset->metadata.blurHash,
			"artists": poster_artists[]->,
		},
		director,
		tmdb_id,
		promo_material[] {
			_type == "image" => {
				asset,
				alt,
				"dimensions": asset->metadata.dimensions,
				_type,
			},
			_type == "video" => {
				youtube_id,
				_type,
			}
		},
		event_media[] {
			asset,
			alt,
			"dimensions": asset->metadata.dimensions
		}
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
			review[],
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

export async function getOmOss() {
	return sanityClient.fetch<OmOss>(
		groq`*[_type == "page_om_oss"] | order(_updatedAt desc) [0] {
			"header_image": {
				"asset": header_image.image,
				"blurhash": header_image.image.asset->metadata.blurHash,
				"alt": header_image.alt,
			},
		}`
	);
}
