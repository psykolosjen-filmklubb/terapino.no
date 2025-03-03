import groq from 'groq';
import { sanityClient } from '../client';
import type { GalleryImage, GalleryItem, Movie } from '../types';

type ScreeningMedia = {
	movies: Pick<Movie, 'title' | 'release_year'>[];
	date: string;
	promo_material?: GalleryItem[];
	event_media?: GalleryImage[];
};

export async function getScreeningMedia() {
	const result = await sanityClient.fetch<ScreeningMedia[]>(
		groq`*[_type == "screening"] | order(date desc) {
      movies[] {
        title,
      },
      date,
      promo_material[] {
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
      },
      event_media[] {
        asset,
        alt,
        "dimensions": asset->metadata.dimensions,
        _type,
      },
    }`
	);

	const screeningsWithMedia = result.filter(
		(screening) =>
			(screening.promo_material && screening.promo_material.length > 0) ||
			(screening.event_media && screening.event_media.length > 0)
	);

	return screeningsWithMedia.map((screening) => {
		const promo = screening.promo_material || [];
		const eventMedia = screening.event_media || [];

		return {
			title: screening.movies.map((movie) => movie.title).join(' / '),
			date: new Date(screening.date),
			media: [...promo, ...eventMedia]
		};
	});
}
