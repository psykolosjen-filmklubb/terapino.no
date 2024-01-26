import { getLogo } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export async function load() {
	const logo = getLogo();

	try {
		return {
			logo: await logo
		};
	} catch (e) {
		error(500, 'Internal Server Error');
	}
}
