import { getMember, getPostersByMember, getReviewsByMember } from '$lib/sanity/api.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const name = decodeURIComponent(params.member.replace('-', ' '));
	const member = await getMember(decodeURIComponent(name));
	const posters = member._id ? getPostersByMember(member._id) : [];
	const reviews = member._id ? getReviewsByMember(member._id) : [];

	try {
		return {
			member,
			posters: await posters,
			reviews: await reviews
		};
	} catch (e) {
		error(500, 'Internal Server Error');
	}
}
