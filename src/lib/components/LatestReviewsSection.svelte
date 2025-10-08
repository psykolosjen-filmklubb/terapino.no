<script lang="ts">
	import ReviewsCarousel, { type ReviewExcerpt } from "./ReviewsCarousel.svelte";
	import { Button } from "./ui/button";

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
	<ReviewsCarousel {reviews} />
	<Button class="mt-4 mr-2 place-self-end lg:mr-8" href="/anmeldelser" variant="link">
		Se alle anmeldelser
	</Button>
</section>
