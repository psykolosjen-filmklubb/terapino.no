import { getLogos } from '$lib/sanity/api';
import { error } from '@sveltejs/kit';

export async function load() {
	const logos = getLogos();

	try {
		return {
			logos: await logos
		};
	} catch (e) {
		error(500, 'Internal Server Error');
	}
}
