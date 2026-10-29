import { getAllMoviesOfTheWeek } from "$lib/sanity/api/getAllMoviesOfTheWeek";
import { error } from "@sveltejs/kit";

export async function load() {
	const moviesOfTheWeek = getAllMoviesOfTheWeek();

	try {
		return {
			moviesOfTheWeek: await moviesOfTheWeek,
		};
	} catch (e) {
		error(500, "Internal Server Error");
	}
}
