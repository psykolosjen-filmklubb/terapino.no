<script lang="ts">
	import { onMount } from 'svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';
	import type { GalleryItem } from '$lib/sanity/types';
	import { urlFor } from '$lib/sanity/image';
	import * as Carousel from '$lib/components/ui/carousel';
	import type { CarouselAPI } from './ui/carousel/context';
	import { Fullscreen, Play } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { Button } from './ui/button';

	export let galleryID: string;
	export let images: GalleryItem[];

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

		lightbox.addFilter('itemData', (itemData) => {
			const youtubeUrl = itemData.element?.dataset.youtubeUrl;
			if (youtubeUrl) {
				itemData.youtubeUrl = youtubeUrl;
				console.log(itemData);
			}
			return itemData;
		});

		lightbox.on('contentLoad', (e) => {
			const { content } = e;
			if (content.type === 'youtube') {
				e.preventDefault();

				content.element = document.createElement('div');
				content.element.className = 'pswp__youtube-container';

				content.element.style.position = 'relative';
				content.element.style.width = '100%';
				content.element.style.height = '100%';
				content.element.style.pointerEvents = 'none';

				const iframe = document.createElement('iframe');
				iframe.src = content.data.youtubeUrl;
				iframe.setAttribute('allowfullscreen', '');
				iframe.setAttribute('frameborder', '0');
				iframe.setAttribute(
					'allow',
					'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				);
				iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

				iframe.style.width = '100%';
				iframe.style.aspectRatio = '1/1';
				iframe.style.pointerEvents = 'auto';
				iframe.style.position = 'absolute';
				iframe.style.top = '50%';
				iframe.style.left = '50%';
				iframe.style.transform = 'translate(-50%, -50%)';

				content.element.appendChild(iframe);
			}
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
								on:click
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
		<Carousel.Previous class="left-2 border-0 bg-opacity-50 disabled:hidden" />
		<Carousel.Next class="right-2 border-0 bg-opacity-50 disabled:hidden" />
	</Carousel.Root>
</div>
