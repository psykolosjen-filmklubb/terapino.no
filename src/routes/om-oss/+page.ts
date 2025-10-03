import { getOmOss } from "$lib/sanity/api/getOmOss";
import { getRolesWithMembers } from "$lib/sanity/api/getRolesWithMembers";
import { error } from "@sveltejs/kit";

export async function load() {
	const content = getOmOss();
	const rolesWithMembers = getRolesWithMembers();

	try {
		return {
			content: await content,
			rolesWithMembers: await rolesWithMembers,
		};
	} catch (e) {
		error(500, "Internal Server Error");
	}
}
