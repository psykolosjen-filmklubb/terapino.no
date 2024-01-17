import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '$lib/sanity';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: string) {
	return builder.image(source);
}
