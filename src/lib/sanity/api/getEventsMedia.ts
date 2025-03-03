import groq from 'groq';
import { sanityClient } from '../client';
import type { GalleryItem } from '../types';

type EventMedia = {
	name: string;
	date: string;
	end_date?: string;
	event_media?: GalleryItem[];
};

export async function getEventsMedia() {
	const result = await sanityClient.fetch<EventMedia[]>(
		groq`*[_type == "event"] | order(date desc) {
			name,
			date,
			end_date,
			event_media[] {
				_type == "image" => {
					asset,
					alt,
					"dimensions": asset->metadata.dimensions,
					_type,
				},
				_type == "video" => {
					youtube_id,
					_type,
				}
			}
		}`
	);

	const eventsWithMedia = result.filter(
		(event) => event.event_media && event.event_media.length > 0
	);

	return eventsWithMedia.map(({ name, date, end_date, event_media }) => {
		return {
			title: name,
			date: new Date(date),
			end_date: end_date ? new Date(end_date) : undefined,
			media: event_media ?? []
		};
	});
}
