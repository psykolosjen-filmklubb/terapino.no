import { getArchive } from '$lib/sanity/api/getArchive';

export const ssr = false;

export async function load() {
	const archive = await getArchive();

	return {
		archive
	};
}
