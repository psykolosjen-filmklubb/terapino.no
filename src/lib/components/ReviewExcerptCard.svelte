<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { routes } from "$lib/routes";
	import type { ReviewExcerpt } from "./LatestReviewsSection.svelte";
	import ThumbnailImage from "./ThumbnailImage.svelte";
	import * as Card from "$lib/components/ui/card";

	let { review_title, slug, thumbnail, excerpt, thumbnailBlurhash }: ReviewExcerpt = $props();
</script>

<Card.Root class="squircle max-w-lg gap-4 p-0">
	<Card.Header class="gap-0 p-0">
		<Button
			variant="ghost"
			href="/{routes.anmeldelser.route}/{slug.current}"
			class="h-auto flex-col items-baseline p-0"
		>
			<ThumbnailImage {thumbnail} {thumbnailBlurhash} slug={slug.current} class="rounded-t-2xl" />
		</Button>
	</Card.Header>

	<Card.Content class="mb-4">
		<Button
			variant="link"
			href="/{routes.anmeldelser.route}/{slug.current}"
			class="mb-2 h-auto scroll-m-20 flex-col items-baseline p-0 text-xl font-bold tracking-tight whitespace-normal lg:text-2xl"
		>
			<span class="review-title" style:--vt-tag="review-title-{slug.current}">{review_title}</span>
		</Button>
		<div>
			<small class="text-sm leading-none lg:font-light">{excerpt}</small>
		</div>
	</Card.Content>
</Card.Root>
