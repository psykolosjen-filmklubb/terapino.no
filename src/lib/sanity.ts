import { createClient } from '@sanity/client';
import groq from 'groq';

export const sanityClient = createClient({
	projectId: '1pfu395i',
	dataset: 'production',
	apiVersion: '2024-01-16',
	useCdn: false
});

export function getAuthors() {
	return sanityClient.fetch(groq`*[_type == "author"]`);
}

export function getReviews() {
	return sanityClient.fetch(groq`*[_type == "review"]`);
}

export async function getLogo() {
	const logo = await sanityClient.fetch(groq`*[_type == "image_assets" && name == "Logo"][0]`);
	return logo;
}
