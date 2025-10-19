<script lang="ts">
	import { urlFor } from "$lib/sanity/image";
	import { blurhashToImageCssObject } from "@unpic/placeholder";
	import { tweened } from "svelte/motion";
	import type { ClassValue } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import type { ImageAsset } from "@sanity/types";

	interface PosterImageProps {
		class?: ClassValue;
		blurhash: string;
		aspectRatio: number;
		imageAsset: ImageAsset;
	}

	let { class: className, blurhash, aspectRatio, imageAsset }: PosterImageProps = $props();

	const css = blurhashToImageCssObject(blurhash);

	let img: HTMLImageElement;
	let imageLoaded = $state(true);
	const imageOpacity = tweened(1);

	$effect(() => {
		if (!img.complete) {
			imageOpacity.set(0, { duration: 0 });
			img.onload = () => {
				imageOpacity.set(1, { duration: 200 });
			};
		}
	});
</script>

<div
	class={`w-full ${imageLoaded ? "" : "animate-pulse"}`}
	style:background-image={css.backgroundImage}
	style:background-size={css.backgroundSize}
	style:aspect-ratio={aspectRatio}
>
	<img
		src={urlFor(imageAsset).width(768).fit("min").auto("format").url()}
		alt="Poster for next screening"
		class={cn("w-full", className)}
		style:opacity={$imageOpacity}
		bind:this={img}
	/>
</div>
