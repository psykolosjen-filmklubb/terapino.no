import { createClient } from '@sanity/client';

const client = createClient({
	projectId: '1pfu395i',
	dataset: 'production',
	apiVersion: '2024-01-16',
	useCdn: false
});

export async function getAuthors() {
	return client.fetch('*[_type == "author"]');
}

export async function getReviews() {
	return client.fetch('*[_type == "review"]');
}
