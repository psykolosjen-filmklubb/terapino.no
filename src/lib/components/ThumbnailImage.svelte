<script lang="ts">
	import { run } from "svelte/legacy";

	import { urlFor } from "$lib/sanity/image";
	import type { ImageAsset } from "@sanity/types";
	import { blurhashToImageCssObject } from "@unpic/placeholder";
	import { tweened } from "svelte/motion";
	import type { ClassValue } from "svelte/elements";

	interface Props {
		thumbnailBlurhash: string;
		thumbnail: ImageAsset;
		slug?: string;
		class?: ClassValue;
	}

	let { thumbnailBlurhash, thumbnail, slug, class: className }: Props = $props();

	let css = $derived(blurhashToImageCssObject(thumbnailBlurhash, 64, 32));

	let imageLoaded = $state(false);
	const imageOpacity = tweened(0, { duration: 300 });
	run(() => {
		imageOpacity.set(imageLoaded ? 1 : 0);
	});

	function trackImageLoad(source: ImageAsset) {
		return (image: HTMLImageElement) => {
			imageLoaded = false;

			if (image.complete) {
				imageLoaded = true;
				return;
			}

			image.onload = () => {
				imageLoaded = true;
			};

			return () => {
				image.onload = null;
			};
		};
	}
</script>

<div
	class={`aspect-2/1 w-full ${imageLoaded ? "" : "animate-pulse"} ${className}`}
	style:background-image={css.backgroundImage}
	style:background-size={css.backgroundSize}
>
	<img
		src={urlFor(thumbnail).width(512).height(256).fit("min").auto("format").url()}
		alt="Review thumbnail"
		class={["squircle-top", className]}
		style:opacity={$imageOpacity}
		style:--vt-tag="review-image-{slug}"
		{@attach trackImageLoad(thumbnail)}
	/>
</div>
