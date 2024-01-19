import { getLogo, getReviews } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const reviews = await getReviews();
	const logo = await getLogo();

	if (reviews && logo) {
		return {
			reviews,
			logo
		};
	}

	error(500, 'Internal Server Error');
}
