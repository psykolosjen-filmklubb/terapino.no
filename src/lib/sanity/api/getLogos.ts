import groq from "groq";
import { sanityClient } from "../client";
import type { ImageAsset } from "@sanity/types";

type Logo = {
	name: string;
	image: ImageAsset;
};

export async function getLogos() {
	const black = await sanityClient.fetch<Logo>(
		groq`*[_type == "image_assets" && name == "logo-svart"][0]`,
	);
	const white = await sanityClient.fetch<Logo>(
		groq`*[_type == "image_assets" && name == "logo-hvit"][0]`,
	);
	return { black, white };
}
