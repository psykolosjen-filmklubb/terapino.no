<script lang="ts">
	import { run } from 'svelte/legacy';

	import { urlFor } from '$lib/sanity/image';
	import { blurhashToImageCssObject } from '@unpic/placeholder';
	import { tweened } from 'svelte/motion';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	import type { PosterImage } from '$lib/sanity/types';

	
	interface Props {
		class?: HTMLAttributes<HTMLImageElement>['class'];
		poster: PosterImage;
	}

	let { class: className = undefined, poster }: Props = $props();

	const css = blurhashToImageCssObject(poster.blurhash || '', 32, 64);

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
