import { createClient } from '@sanity/client';

export const sanityClient = createClient({
	projectId: '1pfu395i',
	dataset: 'production',
	apiVersion: '2024-01-16',
	useCdn: false
});

export async function getAuthors() {
	return sanityClient.fetch('*[_type == "author"]');
}

export async function getReviews() {
	return sanityClient.fetch('*[_type == "review"]');
}

export async function getLogo() {
	const logo = await sanityClient.fetch('*[_type == "image_assets" && name == "Logo"]');
	return logo[0];
}
