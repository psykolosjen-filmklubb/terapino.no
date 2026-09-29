<script lang="ts">
	import { urlFor } from "$lib/sanity/image";
	import type { ImageAsset } from "@sanity/types";

	interface Props {
		thumbnail: ImageAsset;
		thumbnailLqip?: string;
		slug?: string;
	}

	let { thumbnail, thumbnailLqip, slug }: Props = $props();

	// Layered behind the full image: the card-sized thumbnail (usually already cached from the
	// review card, so it paints during the view transition), then the inline LQIP.
	let backgroundImage = $derived(
		[urlFor(thumbnail).width(512).height(256).fit("min").auto("format").url(), thumbnailLqip]
			.filter(Boolean)
			.map((source) => `url("${source}")`)
			.join(", "),
	);
</script>

<img
	src={urlFor(thumbnail).width(2048).height(1024).fit("min").auto("format").url()}
	alt="Hero"
	class="aspect-2/1 w-full bg-cover bg-center object-cover"
	style:background-image={backgroundImage}
	style:--vt-tag="review-image-{slug}"
/>
