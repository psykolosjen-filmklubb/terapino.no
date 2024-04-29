import { getMember, getPostersByMember } from '$lib/sanity/api.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const name = decodeURIComponent(params.member.replace('-', ' '));
	const member = await getMember(decodeURIComponent(name));
	const posters = member._id ? await getPostersByMember(member._id) : [];

	try {
		return {
			member,
			posters
		};
	} catch (e) {
		error(500, 'Internal Server Error');
	}
}
