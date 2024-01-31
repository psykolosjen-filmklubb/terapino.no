import { getReviewExcerpts } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const reviews = getReviewExcerpts();

	try {
		return {
			reviews: await reviews
		};
	} catch (e) {
		error(500, 'Internal Server Error');
	}
}
