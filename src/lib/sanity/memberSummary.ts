import type { Image } from "@sanity/types";
import type { MemberSummary } from "$lib/types/member";
import { urlFor } from "./image";

export type SanityMemberSummary = {
	_id?: string;
	name: string;
	image: Image;
};

export function toMemberSummary(member: SanityMemberSummary): MemberSummary {
	return {
		_id: member._id,
		name: member.name,
		avatarUrl: urlFor(member.image).width(128).height(128).url(),
	};
}
