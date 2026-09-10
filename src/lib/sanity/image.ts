import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./client";
import type { Image } from "@sanity/types";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: Image) {
	return builder.image(source);
}
