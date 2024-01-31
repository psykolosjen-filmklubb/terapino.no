<script lang="ts">
	import ReviewsCarousel from '$lib/components/ReviewsCarousel.svelte';
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
	<section class="w-full px-2 lg:px-6">
		<h2
			class="my-8 scroll-m-20 text-center text-3xl font-semibold tracking-tight transition-colors lg:mt-20 lg:text-left lg:text-5xl lg:font-bold"
		>
			Siste filmanmeldelser
		</h2>
		<ReviewsCarousel reviews={data.reviews} />
	</section>
{/if}

<div class="m-20" />
