import { getArchive } from '$lib/sanity/sanity';

export async function load() {
	const archive = await getArchive();

	return {
		archive
	};
}
