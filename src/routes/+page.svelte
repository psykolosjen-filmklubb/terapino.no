<script lang="ts">
	import ReviewsCarousel from '$lib/components/ReviewsCarousel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { urlFor } from '$lib/utils/image';

	export let data;
</script>

<section
	class="grid w-full place-items-center gap-8 bg-muted px-2 pb-10 pt-16 lg:grid-cols-3 lg:px-28 lg:py-20"
>
	<div class="flex w-full flex-col gap-4 lg:col-span-2">
		<h1
			class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-left lg:text-7xl"
		>
			Psykolosjen Filmklubb
		</h1>
		<p class="px-4 text-center lg:px-0 lg:text-left">
			Velkommen! Her kan du se kommende visninger vi arrangerer og lese våre film-anmeldelser.
		</p>
	</div>

	<div class="max-w-56 lg:max-w-80 lg:place-self-end">
		<img src={urlFor(data.logo.image).width(512).height(512).url()} alt="Logo" />
	</div>
</section>

{#if data.reviews}
	<section class="flex w-full flex-col px-2 pt-8 lg:px-6 lg:pt-20">
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
