<script lang="ts">
	import { urlFor } from '$lib/utils/image';
	import type { ImageAsset } from '@sanity/types';
	import { blurhashToImageCssObject } from '@unpic/placeholder';
	import { tweened } from 'svelte/motion';

	export let posterBlurhash: string | undefined;
	export let poster: ImageAsset;

	const css = blurhashToImageCssObject(posterBlurhash || '', 32, 64);

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
	class={`aspect-2/3 w-80 lg:w-96 ${imageLoaded ? '' : 'animate-pulse'}`}
	style:background-image={css.backgroundImage}
	style:background-size={css.backgroundSize}
	style:display={imageLoaded ? 'contents' : 'block'}
>
	<img
		src={urlFor(poster).width(768).fit('min').auto('format').url()}
		alt="Poster for next screening"
		class="w-80 lg:w-96"
		style:opacity={$imageOpacity}
		use:setImageLoaded
	/>
</div>
