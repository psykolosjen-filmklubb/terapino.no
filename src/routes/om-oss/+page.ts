import { getOmOss } from '$lib/sanity/api';
import { error } from '@sveltejs/kit';

export async function load() {
	const content = getOmOss();

	try {
		return {
			content: await content
		};
	} catch (e) {
		error(500, 'Internal Server Error');
	}
}
