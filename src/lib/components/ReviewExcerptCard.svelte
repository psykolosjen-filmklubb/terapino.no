<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { routes } from "$lib/routes";
	import ThumbnailImage from "./ThumbnailImage.svelte";
	import type { ReviewExcerpt } from "./ReviewsCarousel.svelte";

	let { review_title, slug, thumbnail, excerpt, thumbnailBlurhash }: ReviewExcerpt = $props();
</script>

<div class="max-w-lg">
	<Button
		variant="link"
		href="/{routes.anmeldelser.route}/{slug.current}"
		class="mb-2 h-auto scroll-m-20 flex-col items-baseline p-0 text-xl font-bold tracking-tight whitespace-normal lg:text-2xl"
	>
		<ThumbnailImage {thumbnail} {thumbnailBlurhash} />
		{review_title}
	</Button>
	<small class="text-sm leading-none lg:font-light">{excerpt}</small>
</div>
