import { getSettings } from "$lib/sanity/api/getSettings";
import { getLogos } from "$lib/sanity/api/getLogos";
import { error } from "@sveltejs/kit";

export async function load() {
	const logos = getLogos();
	const settings = getSettings();

	try {
		return {
			logos: await logos,
			settings: await settings,
		};
	} catch (e) {
		error(500, "Internal Server Error");
	}
}
