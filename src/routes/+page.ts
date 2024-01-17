import { getAuthors, getReviews } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const authors = await getAuthors();
	const reviews = await getReviews();

	if (authors && reviews) {
		return {
			authors,
			reviews
		};
	}

	error(500, 'Internal Server Error');
}
