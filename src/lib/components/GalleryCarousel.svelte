<script lang="ts">
	import { onMount } from 'svelte';
	import 'photoswipe/style.css';
	import type { GalleryItem } from '$lib/sanity/types';
	import { urlFor } from '$lib/sanity/image';
	import * as Carousel from '$lib/components/ui/carousel';
	import type { CarouselAPI } from './ui/carousel/context';
	import { Fullscreen, Play } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { Button } from './ui/button';
	import { setUpLightboxWithYouTube } from './Gallery/setUpLightboxWithYouTube';

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
			carouselApi
		)
	);
</script>

<div class="pswp-gallery lg:max-w-sm" id={galleryID}>
	<Carousel.Root setApi={(emblaApi) => (carouselApi = emblaApi)}>
		<Carousel.Content>
			{#each images as image}
				<Carousel.Item class="relative content-center">
					{#if image._type === 'video'}
						<a
							data-pswp-type="youtube"
							data-youtube-url="https://www.youtube-nocookie.com/embed/{image.youtube_id}"
							href="https://youtu.be/{image.youtube_id}"
							target="_blank"
							class="relative"
						>
							<img
								src="https://i.ytimg.com/vi/{image.youtube_id}/maxresdefault.jpg"
								alt="Youtube video thumbnail"
								referrerpolicy="no-referrer"
								class="aspect-video w-full"
							/>
							<Button
								variant="outline"
								size="icon"
								class="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-0 bg-opacity-50"
							>
								<Play class="ml-1 size-8" />
								<span class="sr-only">Åpne video</span>
							</Button>
						</a>
					{:else}
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
					{/if}
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous class="left-2 border-0 bg-opacity-50 disabled:hidden lg:left-2" />
		<Carousel.Next class="right-2 border-0 bg-opacity-50 disabled:hidden lg:right-2" />
	</Carousel.Root>
</div>
