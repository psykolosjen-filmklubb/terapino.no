import { getArchive } from '$lib/sanity';

export async function load() {
	const archive = await getArchive();

	return {
		archive
	};
}
