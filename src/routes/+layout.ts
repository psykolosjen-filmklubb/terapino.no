import { getLogos, getSettings } from '$lib/sanity/api';
import { error } from '@sveltejs/kit';

export async function load() {
	const logos = getLogos();
	const settings = getSettings();

	try {
		return {
			logos: await logos,
			settings: await settings
		};
	} catch (e) {
		error(500, 'Internal Server Error');
	}
}
