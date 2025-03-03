<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import type { ReviewExcerpt } from '$lib/sanity/api/getReviewExcerpts';
	import ReviewExcerptCard from './ReviewExcerptCard.svelte';

	interface Props {
		reviews: ReviewExcerpt[];
	}

	let { reviews }: Props = $props();
</script>

<Carousel.Root>
	<Carousel.Content>
		{#each reviews as review}
			<Carousel.Item class="lg:basis-1/3">
				<ReviewExcerptCard {review} />
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous class="h-12 w-12 *:h-5 *:w-5 lg:h-16 lg:w-16 *:lg:h-6 *:lg:w-6" />
	<Carousel.Next class="h-12 w-12 *:h-5 *:w-5 lg:h-16 lg:w-16 *:lg:h-6 *:lg:w-6" />
</Carousel.Root>
