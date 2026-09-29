<script lang="ts">
	import { urlFor } from "$lib/sanity/image";
	import type { ClassValue } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import type { ImageAsset } from "@sanity/types";

	interface PosterImageProps {
		class?: ClassValue;
		aspectRatio: number;
		imageAsset: ImageAsset;
		lqip?: string;
		slug?: string;
		alt?: string;
	}

	let {
		class: className,
		aspectRatio,
		imageAsset,
		lqip,
		slug,
		alt = "Poster",
	}: PosterImageProps = $props();
</script>

<!-- The inline LQIP background shows until the full image paints over it. -->
<img
	src={urlFor(imageAsset).width(768).fit("min").auto("format").url()}
	{alt}
	class={cn("w-full bg-cover bg-center object-cover", className)}
	style:aspect-ratio={aspectRatio}
	style:background-image={lqip ? `url("${lqip}")` : undefined}
	style:--vt-tag="screening-image-{slug}"
/>
