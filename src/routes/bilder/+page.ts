import { getEventsMedia } from '$lib/sanity/api/getEventsMedia';
import { getScreeningMedia } from '$lib/sanity/api/getScreeningMedia';
import { error } from '@sveltejs/kit';

export async function load() {
	try {
		const [screeningMedia, eventMedia] = await Promise.all([getScreeningMedia(), getEventsMedia()]);

		return {
			mediaEvents: mergeAndSortEventsByDate(screeningMedia, eventMedia)
		};
	} catch (e) {
		error(500, 'Internal Server Error');
	}
}

function mergeAndSortEventsByDate<T extends { date: Date }>(...mediaEvents: T[][]) {
	return mediaEvents.flat().sort((a, b) => {
		return b.date!.getTime() - a.date!.getTime();
	});
}
