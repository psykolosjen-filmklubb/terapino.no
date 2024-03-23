import { getReviewExcerpts, getNextScreening } from '$lib/sanity/api';
import { error } from '@sveltejs/kit';

export async function load() {
	const reviews = getReviewExcerpts(5);
	const nextScreening = getNextScreening();

	try {
		return {
			reviews: await reviews,
			nextScreening: await nextScreening
		};
	} catch (e) {
		error(500, 'Internal Server Error');
	}
}
