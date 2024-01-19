import { getReview } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const review = await getReview(params.slug);

	if (review) {
		return {
			review
		};
	}

	error(404, 'Not Found');
}
