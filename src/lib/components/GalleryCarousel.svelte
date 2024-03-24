<script lang="ts">
	import { onMount } from 'svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';
	import type { GalleryImage } from '$lib/sanity/types';
	import { urlFor } from '$lib/sanity/image';
	import * as Carousel from '$lib/components/ui/carousel';
	import type { CarouselAPI } from './ui/carousel/context';

	export let galleryID: string;
	export let images: GalleryImage[];

	let carouselApi: CarouselAPI;

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
	});
</script>

<div class="pswp-gallery" id={galleryID}>
	<Carousel.Root bind:api={carouselApi}>
		<Carousel.Content class="max-w-64">
			{#each images as image}
				<Carousel.Item class="flex justify-center">
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
							class="h-64 w-64 object-cover"
						/>
					</a>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
