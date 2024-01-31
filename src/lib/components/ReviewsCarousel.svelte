<script lang="ts">
	import type { ReviewExcerpt } from '$lib/types';
	import * as Carousel from '$lib/components/ui/carousel';
	import ReviewExcerptCard from './ReviewExcerptCard.svelte';

	export let reviews: ReviewExcerpt[];
</script>

<div class="px-12">
	<Carousel.Root>
		<Carousel.Content>
			{#each reviews as review}
				<Carousel.Item class="lg:basis-1/3">
					<ReviewExcerptCard {review} />
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
