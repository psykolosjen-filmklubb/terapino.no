import { getArchive } from '$lib/sanity/api/api';

export const ssr = false;

export async function load() {
	const archive = await getArchive();

	return {
		archive
	};
}
