<script lang="ts">
	import { Fullscreen } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import type { ImageAsset, ImageDimensions } from '@sanity/types';
	import { urlFor } from '$lib/sanity/image';
	import { fade } from 'svelte/transition';

	interface Props {
		imageAsset: ImageAsset;
		imageDimentions: ImageDimensions;
		alt: string;
		showFullscreenButton: boolean;
	}

	let { imageAsset, imageDimentions, alt, showFullscreenButton }: Props = $props();
</script>

<a
	href={urlFor(imageAsset).auto('format').url()}
	data-pswp-width={imageDimentions.width}
	data-pswp-height={imageDimentions.height}
	data-cropped="true"
	target="_blank"
	rel="noreferrer"
>
	<img
		src={urlFor(imageAsset).width(512).auto('format').url()}
		{alt}
		class="aspect-square w-full object-cover"
	/>
</a>
{#if showFullscreenButton}
	<span transition:fade={{ duration: 100 }}>
		<Button
			variant="outline"
			size="icon"
			class="pointer-events-none absolute bottom-2 right-2 size-8 rounded-full border-0 bg-opacity-50"
		>
			<Fullscreen class="size-4" />
			<span class="sr-only">Åpne fullskjerm</span>
		</Button>
	</span>
{/if}
