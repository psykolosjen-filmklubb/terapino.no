<script lang="ts">
	import { run } from 'svelte/legacy';

	import { urlFor } from '$lib/sanity/image';
	import type { ImageAsset } from '@sanity/types';
	import { blurhashToImageCssObject } from '@unpic/placeholder';
	import { tweened } from 'svelte/motion';

	interface Props {
		thumbnailBlurhash: string;
		thumbnail: ImageAsset;
	}

	let { thumbnailBlurhash, thumbnail }: Props = $props();

	const css = blurhashToImageCssObject(thumbnailBlurhash, 64, 32);

	let imageLoaded = $state(false);
	const imageOpacity = tweened(0, { duration: 300 });
	run(() => {
		imageOpacity.set(imageLoaded ? 1 : 0);
	});

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
		src={urlFor(thumbnail).width(512).height(256).fit('min').auto('format').url()}
		alt="Review thumbnail"
		style:opacity={$imageOpacity}
		use:setImageLoaded
	/>
</div>
