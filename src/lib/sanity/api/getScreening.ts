import groq from "groq";
import { sanityClient } from "../client";
import type { GalleryItem } from "../types";
import type { ImageAsset, ImageDimensions, Slug } from "@sanity/types";
import { toMemberSummary, type SanityMemberSummary } from "$lib/sanity/memberSummary";
import type { MemberSummary } from "$lib/types/member";

type Screening = {
	movies: Movie[];
	date: string;
	slug: Slug;
	poster?: PosterImage;
	promo_material?: GalleryItem[];
	event_media?: GalleryItem[];
	tickets_url?: string;
};

type Movie = {
	title: string;
	release_year: number;
	directors: string;
	tmdb_id?: number;
};

type PosterImage = {
	asset: ImageAsset;
	blurhash: string;
	dimensions: ImageDimensions;
	artists?: MemberSummary[];
};

type SanityScreening = Omit<Screening, "poster"> & {
	poster?: Omit<PosterImage, "artists"> & {
		artists?: SanityMemberSummary[];
	};
};

export async function getScreening(slug: string): Promise<Screening> {
	const screening = await sanityClient.fetch<SanityScreening>(
		groq`*[_type == "screening" && slug.current == $slug][0]{
		movies[] {
			directors,
			title,
			release_year,
			tmdb_id
		},
		date,
		"poster": {
			"asset": poster.asset,
			"dimensions": poster.asset->metadata.dimensions,
			"blurhash": poster.asset->metadata.blurHash,
			"artists": poster_artists[]->,
		},
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
		tickets_url
	}`,
		{
			slug,
		},
	);

	return {
		...screening,
		poster: screening.poster
			? {
					...screening.poster,
					artists: screening.poster.artists?.map(toMemberSummary),
				}
			: undefined,
	};
}
