import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '$lib/sanity/sanity';
import type { Image } from '@sanity/types';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: Image) {
	return builder.image(source);
}
