<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import type { ImageAsset } from '@sanity/types';
	import { blurhashToImageCssObject } from '@unpic/placeholder';
	import { tweened } from 'svelte/motion';

	export let thumbnailBlurhash: string;
	export let thumbnail: ImageAsset;

	const css = blurhashToImageCssObject(thumbnailBlurhash, 64, 32);

	let imageLoaded = false;
	const imageOpacity = tweened(0, { duration: 300 });
	$: imageOpacity.set(imageLoaded ? 1 : 0);

	function setImageLoaded(img: HTMLImageElement) {
		if (img.complete) {
			imageLoaded = true;
		} else {
			img.onload = () => {
				imageLoaded = true;
			};
		}
	}
</script>

<div
	class={`aspect-2/1 w-full ${imageLoaded ? '' : 'animate-pulse'}`}
	style:background-image={css.backgroundImage}
	style:background-size={css.backgroundSize}
>
	<img
		src={urlFor(thumbnail).width(2048).height(1024).fit('min').auto('format').url()}
		alt="Hero"
		class="w-full"
		style:opacity={$imageOpacity}
		use:setImageLoaded
	/>
</div>
