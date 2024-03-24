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

	export let galleryID: string;
	export let images: GalleryImage[];

	let carouselApi: CarouselAPI;

	let isGalleryOpen = false;

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
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

<div class="pswp-gallery" id={galleryID}>
	<Carousel.Root bind:api={carouselApi}>
		<Carousel.Content class="max-w-64">
			{#each images as image}
				<Carousel.Item class="relative flex justify-center">
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
							class="size-64 object-cover"
						/>
					</a>
					{#if !isGalleryOpen}
						<span transition:fade={{ duration: 100 }}>
							<Fullscreen class="pointer-events-none absolute bottom-2 right-2 opacity-50" />
						</span>
					{/if}
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
