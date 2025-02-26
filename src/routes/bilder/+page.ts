import { getScreeningMedia } from '$lib/sanity/api/getScreeningMedia';
import { error } from '@sveltejs/kit';

export async function load() {
	try {
		return {
			screeningMedia: await getScreeningMedia()
		};
	} catch (e) {
		error(500, 'Internal Server Error');
	}
}
