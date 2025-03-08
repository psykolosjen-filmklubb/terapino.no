import groq from 'groq';
import { sanityClient } from '../client';
import type { ImageAsset } from '@sanity/types';

type Member = {
	_id: string;
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
