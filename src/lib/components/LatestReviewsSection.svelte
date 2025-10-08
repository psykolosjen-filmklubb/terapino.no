<script lang="ts">
	import * as Carousel from "$lib/components/ui/carousel";
	import { Button } from "./ui/button";
	import ReviewExcerptCard from "./ReviewExcerptCard.svelte";
	import type { ImageAsset, Slug } from "@sanity/types";

	export type ReviewExcerpt = {
		review_title: string;
		slug: Slug;
		thumbnail: ImageAsset;
		excerpt: string;
		thumbnailBlurhash: string;
	};

	interface Props {
		reviews: ReviewExcerpt[];
	}

	let { reviews }: Props = $props();
</script>

<section class="flex w-full flex-col px-2 py-8 lg:px-6">
	<h2
		class="mb-8 scroll-m-20 text-center text-3xl font-semibold tracking-tight transition-colors lg:text-left lg:text-5xl lg:font-bold"
	>
		Siste filmanmeldelser
	</h2>

	<!-- Desktop grid -->
	<div class="hidden lg:grid lg:grid-cols-3 lg:gap-8">
		{#each reviews as review}
			<ReviewExcerptCard {...review} />
		{/each}
	</div>

	<!-- Mobile carousel -->
	<Carousel.Root class="lg:hidden">
		<Carousel.Content>
			{#each reviews as review}
				<Carousel.Item class="flex justify-center">
					<ReviewExcerptCard {...review} />
				</Carousel.Item>
			{/each}
		</Carousel.Content>

		<Carousel.Previous class="h-12 w-12 *:h-5 *:w-5 lg:h-16 lg:w-16 *:lg:h-6 *:lg:w-6" />
		<Carousel.Next class="h-12 w-12 *:h-5 *:w-5 lg:h-16 lg:w-16 *:lg:h-6 *:lg:w-6" />
	</Carousel.Root>

	<Button class="mt-4 mr-2 place-self-end lg:mr-8" href="/anmeldelser" variant="link">
		Se alle anmeldelser
	</Button>
</section>
