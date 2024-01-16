import { getAuthors } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const data = await getAuthors();

	if (data) {
		return {
			authors: data
		};
	}

	error(500, 'Internal Server Error');
}
