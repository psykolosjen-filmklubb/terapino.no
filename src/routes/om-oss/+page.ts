import { getOmOss, getStyret } from '$lib/sanity/api';
import { error } from '@sveltejs/kit';

export async function load() {
	const content = getOmOss();
	const styret = getStyret();

	try {
		return {
			content: await content,
			styret: await styret
		};
	} catch (e) {
		error(500, 'Internal Server Error');
	}
}
