<script lang="ts">
	import "photoswipe/style.css";
	import { onMount } from "svelte";
	import type { GalleryItem } from "$lib/sanity/types";
	import * as Carousel from "$lib/components/ui/carousel";
	import type { CarouselAPI } from "./ui/carousel/context";
	import { setUpLightboxWithYouTube } from "./Gallery/setUpLightboxWithYouTube";
	import GalleryItemVideo from "./Gallery/GalleryItemVideo.svelte";
	import GalleryItemImage from "./Gallery/GalleryItemImage.svelte";

	interface Props {
		galleryID: string;
		images: GalleryItem[];
	}

	let { galleryID, images }: Props = $props();

	let carouselApi = $state<CarouselAPI>();

	let isGalleryOpen = $state(false);

	onMount(() =>
		setUpLightboxWithYouTube(
			galleryID,
			() => (isGalleryOpen = true),
			() => (isGalleryOpen = false),
			carouselApi,
		),
	);
</script>

<div class="pswp-gallery lg:max-w-sm" id={galleryID}>
	<Carousel.Root setApi={(emblaApi) => (carouselApi = emblaApi)}>
		<Carousel.Content>
			{#each images as image}
				<Carousel.Item class="relative content-center">
					{#if image._type === "video"}
						<GalleryItemVideo youtubeId={image.youtube_id}></GalleryItemVideo>
					{:else}
						<GalleryItemImage
							imageAsset={image.asset}
							imageDimentions={image.dimensions}
							alt={image.alt}
							showFullscreenButton={!isGalleryOpen}
						/>
					{/if}
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous class="bg-opacity-50 left-2 border-0 disabled:hidden lg:left-2" />
		<Carousel.Next class="bg-opacity-50 right-2 border-0 disabled:hidden lg:right-2" />
	</Carousel.Root>
</div>
