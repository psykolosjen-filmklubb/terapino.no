<script lang="ts">
	import { urlFor } from "$lib/sanity/image";
	import type { ImageAsset } from "@sanity/types";
	import type { ClassValue } from "svelte/elements";

	interface Props {
		thumbnail: ImageAsset;
		thumbnailLqip?: string;
		slug?: string;
		class?: ClassValue;
	}

	let { thumbnail, thumbnailLqip, slug, class: className }: Props = $props();
</script>

<!-- The inline LQIP background shows until the full image paints over it. -->
<img
	src={urlFor(thumbnail).width(512).height(256).fit("min").auto("format").url()}
	alt="Review thumbnail"
	class={["squircle-top aspect-2/1 w-full bg-cover bg-center object-cover", className]}
	style:background-image={thumbnailLqip ? `url("${thumbnailLqip}")` : undefined}
	style:--vt-tag="review-image-{slug}"
/>
