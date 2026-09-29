import groq from "groq";
import { sanityClient } from "../client";
import type { ImageAsset, PortableTextBlock } from "@sanity/types";

export type OmOss = {
	header_image: {
		asset: ImageAsset;
		lqip?: string;
		alt: string;
	};
	main_text: PortableTextBlock[];
};

export async function getOmOss() {
	return sanityClient.fetch<OmOss>(
		groq`*[_type == "page_om_oss"] | order(_updatedAt desc) [0] {
			"header_image": {
				"asset": header_image.image,
				"lqip": header_image.image.asset->metadata.lqip,
				"alt": header_image.alt,
			},
			main_text
		}`,
	);
}
