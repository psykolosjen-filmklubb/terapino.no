<script lang="ts">
	import { urlFor } from "$lib/sanity/image";
	import type { ImageAsset } from "@sanity/types";
	import { blurhashToImageCssObject } from "@unpic/placeholder";

	interface Props {
		thumbnailBlurhash: string;
		thumbnail: ImageAsset;
		slug?: string;
	}

	let { thumbnailBlurhash, thumbnail, slug }: Props = $props();

	let css = $derived(blurhashToImageCssObject(thumbnailBlurhash, 64, 32));
	let thumbnailSrc = $derived(
		urlFor(thumbnail).width(512).height(256).fit("min").auto("format").url(),
	);
	let highResolutionSrc = $derived(
		urlFor(thumbnail).width(2048).height(1024).fit("min").auto("format").url(),
	);
	let highResolutionLoaded = $state(false);

	function trackHighResolutionLoad(source: string) {
		return (image: HTMLImageElement) => {
			highResolutionLoaded = false;

			if (image.currentSrc === source && image.complete) {
				highResolutionLoaded = true;
				return;
			}

			image.onload = () => {
				highResolutionLoaded = true;
			};

			return () => {
				image.onload = null;
			};
		};
	}
</script>

<div
	class="relative aspect-2/1 w-full"
	style:background-image={css.backgroundImage}
	style:background-size={css.backgroundSize}
>
	<img src={thumbnailSrc} alt="Hero" class="w-full" style:--vt-tag="review-image-{slug}" />
	<img
		src={highResolutionSrc}
		alt=""
		aria-hidden="true"
		class="absolute inset-0 size-full transition-opacity duration-300"
		class:opacity-0={!highResolutionLoaded}
		class:opacity-100={highResolutionLoaded}
		{@attach trackHighResolutionLoad(highResolutionSrc)}
	/>
</div>
