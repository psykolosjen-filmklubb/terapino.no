import { getLogo, getReviewExcerpts } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const reviews = getReviewExcerpts();
	const logo = getLogo();

	try {
		return {
			reviews: await reviews,
			logo: await logo
		};
	} catch (e) {
		error(500, 'Internal Server Error');
	}
}
