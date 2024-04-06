<script lang="ts">
	import { onMount } from 'svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';
	import type { GalleryImage } from '$lib/sanity/types';
	import { urlFor } from '$lib/sanity/image';
	import * as Carousel from '$lib/components/ui/carousel';
	import type { CarouselAPI } from './ui/carousel/context';
	import { Fullscreen } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { Button } from './ui/button';

	export let galleryID: string;
	export let images: GalleryImage[];

	let carouselApi: CarouselAPI;

	let isGalleryOpen = false;

	// Icon copied from lucide X icon to be able to use it with PhotoSwipe
	const closeSvgString =
		'<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 50 30" width="50" height="30"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--foreground))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></svg>';

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
			zoom: false,
			closeSVG: closeSvgString,

			gallery: '#' + galleryID,
			children: 'a',
			pswpModule: () => import('photoswipe')
		});
		lightbox.init();
		lightbox.on('contentActivate', (event) => {
			if (carouselApi) {
				carouselApi.scrollTo(event.content.index);
			}
		});
		lightbox.on('beforeOpen', () => {
			isGalleryOpen = true;
		});
		lightbox.on('destroy', () => {
			isGalleryOpen = false;
		});

		return () => {
			lightbox.destroy();
		};
	});
</script>

<div class="pswp-gallery lg:max-w-sm" id={galleryID}>
	<Carousel.Root bind:api={carouselApi}>
		<Carousel.Content>
			{#each images as image}
				<Carousel.Item class="relative">
					<a
						href={urlFor(image.asset).auto('format').url()}
						data-pswp-width={image.dimensions.width}
						data-pswp-height={image.dimensions.height}
						data-cropped="true"
						target="_blank"
						rel="noreferrer"
					>
						<img
							src={urlFor(image.asset).width(512).auto('format').url()}
							alt={image.alt}
							class="aspect-square w-full object-cover"
						/>
					</a>
					{#if !isGalleryOpen}
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
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous class="left-2 border-0 bg-opacity-50 disabled:hidden" />
		<Carousel.Next class="right-2 border-0 bg-opacity-50 disabled:hidden" />
	</Carousel.Root>
</div>
