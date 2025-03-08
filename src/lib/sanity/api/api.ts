import groq from 'groq';
import type { Member, OmOss, Review, PosterImage, Instillinger, PosterByMember } from '../types';
import { sanityClient } from '../client';
import type { Semester } from '$lib/components/Archive/SemesterState.svelte';

export async function getReview(slug: string) {
	return sanityClient.fetch<Review>(
		groq`*[_type == "review" && slug.current == $slug][0]{
			review_title,
			movie_title,
			review[],
			slug,
			thumbnail,
			"thumbnailBlurhash": thumbnail.asset->metadata.blurHash,
			authors[]->,
			tmdb_id,
	}`,
		{
			slug
		}
	);
}

export async function getArchive() {
	return sanityClient.fetch<Semester[]>(
		groq`*[_type == "semester"] | order(start_date desc) {
		"name": semester_name,
		"startDate": start_date,
		"color": color.hex,
		"screenings": screenings[]-> | order(date desc) {
			movies[] {
				title,
				"year": release_year,
				directors,
			},
			slug,
		}
	}`
	);
}

export async function getOmOss() {
	return sanityClient.fetch<OmOss>(
		groq`*[_type == "page_om_oss"] | order(_updatedAt desc) [0] {
			"header_image": {
				"asset": header_image.image,
				"blurhash": header_image.image.asset->metadata.blurHash,
				"alt": header_image.alt,
			},
			main_text
		}`
	);
}

export async function getRolesWithMembers() {
	const membersPromise = sanityClient.fetch<Member[]>(
		groq`*[_type == "member"] {
			name,
			image,
			memberships[] | order(from_date asc) {
				from_date,
				to_date
			},
			verv[] | order(from_date asc) {
				"role": role->name,
				from_date,
				to_date
			}
		}`
	);

	const rolesPromise = sanityClient.fetch<{ name: string }[]>(
		groq`*[_type == "role"] | order(sort_order asc) {
			name,
		}`
	);

	const activeMembers: Member[] = [];
	const previousMembers: Member[] = [];

	(await membersPromise).forEach((member) => {
		if (member.memberships.some((membership) => !membership.to_date)) {
			activeMembers.push(member);
		} else {
			previousMembers.push(member);
		}
	});

	const rolesWithMembers = (await rolesPromise).map((role) => {
		return {
			role: role.name,
			members: activeMembers.filter((member) =>
				member.verv?.some((verv) => verv.role === role.name && !verv.to_date)
			)
		};
	});

	rolesWithMembers.push({
		role: 'Uten roller',
		members: activeMembers.filter((member) => !member.verv?.some((verv) => !verv.to_date))
	});

	return rolesWithMembers.filter((role) => role.members.length > 0);
}

export async function getMember(name: string) {
	return sanityClient.fetch<Member>(
		groq`*[_type == "member" && name match $name][0]{
			_id,
			name,
			image,
			memberships[] | order(from_date asc) {
				from_date,
				to_date
			},
			verv[] | order(from_date asc) {
				"role": role->name,
				from_date,
				to_date
			}
		}`,
		{
			name
		}
	);
}

export async function getPostersByMember(id: string): Promise<PosterImage[]> {
	return sanityClient
		.fetch<PosterByMember[]>(
			groq`*[_type == "screening" && references($id)] | order(date desc) {
			"asset": poster.asset,
			"dimensions": poster.asset->metadata.dimensions,
			"blurhash": poster.asset->metadata.blurHash,
			movies[] {
				title
			},
		}`,
			{
				id
			}
		)
		.then((posters) => {
			return posters.map((poster) => {
				return {
					...poster,
					alt: 'Poster for ' + poster.movies.map((movie) => movie.title).join(' & ')
				};
			});
		});
}

export async function getReviewsByMember(id: string) {
	return sanityClient.fetch<Pick<Review, 'movie_title' | 'review_title' | 'slug'>[]>(
		groq`*[_type == "review" && references($id)] | order(date desc) {
			movie_title,
			review_title,
			slug,
		}`,
		{
			id
		}
	);
}

export async function getSettings() {
	return sanityClient.fetch<Instillinger>(
		groq`*[_type == "settings" && title == "Instillinger"][0] {
			recruiting
		}`
	);
}
