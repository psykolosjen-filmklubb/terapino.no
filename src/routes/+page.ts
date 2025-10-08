import { getNextScreening } from "$lib/sanity/api/getNextScreening";
import { getReviewExcerpts } from "$lib/sanity/api/getReviewExcerpts";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	const reviews = getReviewExcerpts(3);
	const nextScreening = getNextScreening();

	return {
		reviews: await reviews,
		nextScreening: await nextScreening,
	};
};
