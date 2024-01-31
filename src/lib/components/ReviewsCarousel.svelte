<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { ReviewExcerpt } from '$lib/types';
	import { urlFor } from '$lib/utils/image';
	import * as Carousel from '$lib/components/ui/carousel';

	export let reviews: ReviewExcerpt[];
</script>

<div class="px-12">
	<Carousel.Root>
		<Carousel.Content>
			{#each reviews as review}
				<Carousel.Item class="lg:basis-1/3">
					<div class="max-w-lg">
						<Button
							variant="link"
							href="/{review.slug.current}"
							class="mb-2 h-auto scroll-m-20 flex-col items-baseline whitespace-normal p-0 text-xl font-bold tracking-tight lg:text-2xl"
						>
							<img src={urlFor(review.thumbnail).width(512).height(256).url()} alt="thumbnail" />
							{review.review_title}
						</Button>
						<small class="text-sm leading-none lg:font-light">{review.excerpt}</small>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
