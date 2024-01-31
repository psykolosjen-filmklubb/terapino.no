<script lang="ts">
	import ReviewsCarousel from '$lib/components/ReviewsCarousel.svelte';
	import { Button } from '$lib/components/ui/button';

	export let data;
</script>

<section
	class="grid w-full place-items-center gap-8 px-2 pb-10 pt-12 lg:place-items-start lg:px-12 lg:py-20"
>
	<h1
		class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-left lg:text-7xl"
	>
		Velkommen
	</h1>
	<p class="px-4 text-center lg:px-0 lg:text-left">
		Her kan du se kommende visninger vi arrangerer og lese våre film-anmeldelser.
	</p>
</section>

{#if data.reviews}
	<section class="flex w-full flex-col bg-muted px-2 py-8 lg:px-6 lg:pt-20">
		<h2
			class="mb-8 scroll-m-20 text-center text-3xl font-semibold tracking-tight transition-colors lg:text-left lg:text-5xl lg:font-bold"
		>
			Siste filmanmeldelser
		</h2>
		<ReviewsCarousel reviews={data.reviews} />
		<Button class="mr-2 mt-4 place-self-end lg:mr-8" href="/anmeldelser" variant="link"
			>Se alle anmeldelser</Button
		>
	</section>
{/if}

<div class="m-20" />
