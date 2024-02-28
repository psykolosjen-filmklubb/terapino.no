<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { ReviewExcerpt } from '$lib/types';
	import ThumbnailImage from './ThumbnailImage.svelte';

	export let review: ReviewExcerpt;
</script>

<div class="max-w-lg">
	<Button
		variant="link"
		href="/{review.slug.current}"
		class="mb-2 h-auto scroll-m-20 flex-col items-baseline whitespace-normal p-0 text-xl font-bold tracking-tight lg:text-2xl"
	>
		<ThumbnailImage thumbnail={review.thumbnail} thumbnailBlurhash={review.thumbnailBlurhash} />
		{review.review_title}
	</Button>
	<small class="text-sm leading-none lg:font-light">{review.excerpt}</small>
</div>
