import { getArchive } from "#lib/sanity/api/getArchive.js";

export const ssr = false;

export async function load() {
	const archive = await getArchive();

	return {
		archive,
	};
}
