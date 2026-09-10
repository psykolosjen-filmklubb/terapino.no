import { getMember } from "$lib/sanity/api/getMember";
import { getPostersByMember } from "$lib/sanity/api/getPostersByMember";
import { getReviewsByMember } from "$lib/sanity/api/getReviewsByMember";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const name = decodeURIComponent(params.member.replace("-", " "));
	const member = await getMember(decodeURIComponent(name));

	if (!member) {
		error(404, "Not Found");
	}

	const posters = getPostersByMember(member._id);
	const reviews = getReviewsByMember(member._id);

	try {
		return {
			member,
			posters: await posters,
			reviews: await reviews,
		};
	} catch (e) {
		error(500, "Internal Server Error");
	}
}
