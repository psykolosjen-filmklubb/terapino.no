import groq from 'groq';
import { sanityClient } from '../client';
import type { ImageAsset } from '@sanity/types';

type Member = {
	_id?: string;
	name: string;
	image: ImageAsset;
	memberships: Membership[];
	verv?: Verv[];
};

type Membership = {
	from_date: string;
	to_date?: string;
};

type Verv = {
	role: string;
	from_date: string;
	to_date?: string;
};

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
