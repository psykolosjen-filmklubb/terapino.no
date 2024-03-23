import { getArchive } from '$lib/sanity/api';

export async function load() {
	const archive = await getArchive();

	return {
		archive
	};
}
