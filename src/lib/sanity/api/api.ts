import groq from 'groq';
import type { Review, Instillinger } from '../types';
import { sanityClient } from '../client';

export async function getReviewsByMember(id: string) {
	return sanityClient.fetch<Pick<Review, 'movie_title' | 'review_title' | 'slug'>[]>(
		groq`*[_type == "review" && references($id)] | order(date desc) {
			movie_title,
			review_title,
			slug,
		}`,
		{
			id
		}
	);
}

export async function getSettings() {
	return sanityClient.fetch<Instillinger>(
		groq`*[_type == "settings" && title == "Instillinger"][0] {
			recruiting
		}`
	);
}
