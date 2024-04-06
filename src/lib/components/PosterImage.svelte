<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import { blurhashToImageCssObject } from '@unpic/placeholder';
	import { tweened } from 'svelte/motion';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import type { PosterImage } from '$lib/sanity/types';

	let className: HTMLAttributes<HTMLImageElement>['class'] = undefined;
	export { className as class };
	export let poster: PosterImage;

	const css = blurhashToImageCssObject(poster.blurhash || '', 32, 64);

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
	class={`w-full ${imageLoaded ? '' : 'animate-pulse'}`}
	style:background-image={css.backgroundImage}
	style:background-size={css.backgroundSize}
	style:aspect-ratio={poster.dimensions.aspectRatio}
>
	<img
		src={urlFor(poster.asset).width(768).fit('min').auto('format').url()}
		alt="Poster for next screening"
		class={cn('w-full', className)}
		style:opacity={$imageOpacity}
		use:setImageLoaded
	/>
</div>
