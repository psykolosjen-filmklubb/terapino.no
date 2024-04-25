import { getMember } from '$lib/sanity/api.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const name = decodeURIComponent(params.member.replace('-', ' '));
	const member = await getMember(decodeURIComponent(name));

	try {
		return {
			member
		};
	} catch (e) {
		error(500, 'Internal Server Error');
	}
}
