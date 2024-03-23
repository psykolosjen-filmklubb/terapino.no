<script lang="ts">
	import { onMount } from 'svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';
	import type { PromoImage } from '$lib/sanity/types';
	import { urlFor } from '$lib/sanity/image';
	import * as Carousel from '$lib/components/ui/carousel';
	import type { CarouselAPI } from './ui/carousel/context';

	export let galleryID: string;
	export let images: PromoImage[];

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
	<Carousel.Root bind:api={carouselApi} class="max-w-64">
		<Carousel.Content>
			{#each images as image}
				<Carousel.Item>
					<div class="flex justify-center">
						<a
							href={urlFor(image.asset).auto('format').url()}
							data-pswp-width={image.dimensions.width}
							data-pswp-height={image.dimensions.height}
							target="_blank"
							rel="noreferrer"
						>
							<img src={urlFor(image.asset).width(200).auto('format').url()} alt={image.alt} />
						</a>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
