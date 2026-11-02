import { getSettings } from "#lib/sanity/api/getSettings.js";
import { getLogos } from "#lib/sanity/api/getLogos.js";
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
