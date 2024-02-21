<script lang="ts">
	import ReviewsCarousel from '$lib/components/ReviewsCarousel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { urlFor } from '$lib/utils/image';

	export let data;

	let dateFormatter = Intl.DateTimeFormat('no', { weekday: 'long', month: 'long', day: 'numeric' });
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

<section
	class="flex w-full flex-col items-center bg-muted px-2 py-8 lg:flex-row lg:justify-evenly lg:px-6 lg:py-16"
>
	{#if data.nextScreening}
		<h2
			class="mb-8 scroll-m-20 text-center text-3xl font-semibold tracking-tight transition-colors lg:text-left lg:text-5xl lg:font-bold"
		>
			Neste visning:
		</h2>
		{#if data.nextScreening.poster}
			<img
				class="max-w-xs lg:max-w-sm"
				src={urlFor(data.nextScreening.poster).width(768).url()}
				alt="screening poster"
			/>
		{:else}
			<div>
				<p class="text-center text-xl text-muted-foreground">
					{dateFormatter.format(new Date(data.nextScreening.date))}:
				</p>
				<h3 class="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
					{data.nextScreening.movie_title} ({data.nextScreening.release_year})
				</h3>
				<p class="text-center text-xl">
					Av {data.nextScreening.director}
				</p>
				<small class="mt-4 text-center text-sm font-medium leading-none text-muted-foreground">
					Hold av datoen, mer informasjon kommer snart
				</small>
			</div>
		{/if}
	{:else}
		<div class="place-self-start">
			<p class="px-4 text-center text-muted-foreground">
				Ingen nye visninger planlagt for øyeblikket, men følg med for oppdateringer!
			</p>
			<p class="px-4 text-center text-muted-foreground">Vil du se hva vi har vist tidligere?</p>
			<Button href="/arkiv" variant="link" class="w-fit place-self-center font-medium"
				>Visningsarkiv</Button
			>
		</div>
	{/if}
</section>

{#if data.reviews}
	<section class="flex w-full flex-col px-2 py-8 lg:px-6 lg:pt-20">
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
