<script lang="ts">
	import PosterImage from "$lib/components/PosterImage.svelte";
	import { Button } from "$lib/components/ui/button";
	import { dateFormatterLongNoYear } from "$lib/dateFormatters.js";
	import type { NextScreening } from "$lib/sanity/api/getNextScreening";

	type Props = {
		nextScreening: NextScreening | null;
	};

	let { nextScreening }: Props = $props();
</script>

<section
	class="flex w-full flex-col items-center px-2 py-8 lg:flex-row lg:justify-evenly lg:px-6 lg:py-16"
>
	<div>
		{#if nextScreening}
			<h2
				class="my-8 scroll-m-20 text-center text-3xl font-semibold tracking-tight transition-colors lg:text-left lg:text-5xl lg:font-bold"
			>
				Neste visning:
			</h2>
		{:else}
			<div class="my-8 flex flex-col">
				<p class="px-4 text-center text-muted-foreground">
					Ingen nye visninger planlagt for øyeblikket, men følg med for oppdateringer!
				</p>
				<p class="px-4 text-center text-muted-foreground">Vil du se hva vi har vist tidligere?</p>
				<Button href="/arkiv" variant="link" class="w-fit place-self-center font-medium">
					Visningsarkiv
				</Button>
			</div>
		{/if}
	</div>

	{#if nextScreening && nextScreening.poster?.asset}
		<div class="max-w-96">
			<a href="arkiv/{nextScreening.slug.current}">
				<PosterImage
					blurhash={nextScreening.poster.blurhash}
					aspectRatio={nextScreening.poster.dimensions.aspectRatio}
					imageAsset={nextScreening.poster.asset}
					slug={nextScreening.slug.current}
				/>
			</a>
		</div>
	{:else if nextScreening}
		<div>
			<a href="arkiv/{nextScreening.slug.current}">
				<p class="text-center text-xl text-muted-foreground">
					{dateFormatterLongNoYear.format(new Date(nextScreening.date))}:
				</p>
				{#each nextScreening.movies as movie, i}
					<h3 class="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
						{movie.title} ({movie.release_year})
					</h3>
					<p class="text-center text-xl">
						Av {movie.directors}
					</p>
					{#if i < nextScreening.movies.length - 1}
						<p class="text-center text-xl">&</p>
					{/if}
				{/each}
			</a>
		</div>
	{/if}
</section>
