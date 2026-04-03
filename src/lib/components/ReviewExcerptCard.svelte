<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import MemberAvatar from "$lib/components/MemberAvatar.svelte";
	import { routes } from "$lib/routes";
	import type { ReviewExcerpt } from "./LatestReviewsSection.svelte";
	import ThumbnailImage from "./ThumbnailImage.svelte";
	import * as Card from "$lib/components/ui/card";
	import { dateFormatterShort } from "$lib/dateFormatters";

	let { review_title, slug, thumbnail, excerpt, thumbnailBlurhash, authors, date }: ReviewExcerpt =
		$props();
</script>

<Card.Root
	class="squircle max-w-lg gap-4 p-0"
	style="view-transition-name: review-image-{slug.current}"
>
	<Card.Header class="gap-0 p-0">
		<Button
			variant="ghost"
			href="/{routes.anmeldelser.route}/{slug.current}"
			class="h-auto flex-col items-baseline p-0"
		>
			<ThumbnailImage {thumbnail} {thumbnailBlurhash} class="rounded-t-2xl" />
		</Button>
	</Card.Header>

	<Card.Content class="mb-4">
		<Button
			variant="link"
			href="/{routes.anmeldelser.route}/{slug.current}"
			class="mb-2 h-auto scroll-m-20 flex-col items-baseline p-0 text-xl font-bold tracking-tight whitespace-normal lg:text-2xl"
		>
			<span class="review-title" style:--vt-tag="review-title-{slug.current}">
				{review_title}
			</span>
		</Button>
		<div>
			<small class="text-sm leading-none lg:font-light">{excerpt}</small>
		</div>
	</Card.Content>

	<Card.Footer class="mt-auto mb-3.5 flex items-center justify-between">
		<span class="flex items-center gap-1.5">
			<MemberAvatar member={authors[0]} avatarClass="size-13" />
			{authors[0].name}
		</span>
		<span>
			{dateFormatterShort.format(new Date(date))}
		</span>
	</Card.Footer>
</Card.Root>
