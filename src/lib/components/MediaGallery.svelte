<script lang="ts">
	import 'photoswipe/style.css';
	import { onMount } from 'svelte';
	import type { ImageAsset, ImageDimensions } from '@sanity/types';
	import GalleryItemImage from './Gallery/GalleryItemImage.svelte';
	import GalleryItemVideo from './Gallery/GalleryItemVideo.svelte';
	import { setUpLightboxWithYouTube } from './Gallery/setUpLightboxWithYouTube';

	type Image = {
		asset: ImageAsset;
		dimensions: ImageDimensions;
		_type: 'image';
		alt?: string;
	};

	type Video = {
		youtube_id: string;
		_type: 'video';
	};

	type Event = {
		title: string;
		date: Date;
		media: (Image | Video)[];
	};

	interface Props {
		events: Event[];
	}

	const galleryId = 'media_gallery';

	let { events }: Props = $props();

	onMount(() => setUpLightboxWithYouTube(galleryId));
</script>

<div class="pswp-gallery" id={galleryId}>
	{#each events as event}
		{#if event.title}
			<h2
				class="my-2 scroll-m-20 pb-2 text-xl font-semibold tracking-tight transition-colors lg:text-2xl"
			>
				{event.title}
			</h2>
		{/if}

		<div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
			{#each event.media as mediaItem}
				{#if mediaItem._type === 'image'}
					<GalleryItemImage
						imageAsset={mediaItem.asset}
						imageDimentions={mediaItem.dimensions}
						alt={mediaItem.alt ?? ''}
						showFullscreenButton={false}
					/>
				{:else if mediaItem._type === 'video'}
					<GalleryItemVideo youtubeId={mediaItem.youtube_id}></GalleryItemVideo>
				{/if}
			{/each}
		</div>
	{/each}
</div>
