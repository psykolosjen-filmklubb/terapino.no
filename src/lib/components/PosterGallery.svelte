<script lang="ts">
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';
	import { onMount } from 'svelte';
	import { urlFor } from '$lib/sanity/image';
	import type { PosterImage } from '$lib/sanity/types';

	export let galleryID: string;
	export let posters: PosterImage[];

	// Icon copied from lucide X icon to be able to use it with PhotoSwipe
	const closeSvgString =
		'<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 50 30" width="50" height="30"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--pswp-icon-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></svg>';

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
			zoom: false,
			closeSVG: closeSvgString,

			gallery: '#' + galleryID,
			children: 'a',
			pswpModule: () => import('photoswipe')
		});
		lightbox.init();

		return () => {
			lightbox.destroy();
		};
	});
</script>

<div class="pswp-gallery grid grid-cols-2 gap-4 lg:grid-cols-3" id={galleryID}>
	{#each posters as poster}
		<a
			href={urlFor(poster.asset).auto('format').url()}
			data-pswp-width={poster.dimensions.width}
			data-pswp-height={poster.dimensions.height}
			target="_blank"
			rel="noreferrer"
			class="my-auto"
		>
			<img
				src={urlFor(poster.asset).width(512).auto('format').url()}
				alt={poster.alt ?? 'Movie poster'}
			/>
		</a>
	{/each}
</div>
