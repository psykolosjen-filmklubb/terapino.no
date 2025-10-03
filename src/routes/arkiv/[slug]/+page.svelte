<script lang="ts">
	import MovieDetails from "./MovieDetails.svelte";

	import { run } from "svelte/legacy";

	import AuthorList from "$lib/components/AuthorList.svelte";
	import PosterImage from "$lib/components/PosterImage.svelte";
	import * as Card from "$lib/components/ui/card";
	import { dateFormatterLong } from "$lib/dateFormatters.js";
	import GalleryCarousel from "$lib/components/GalleryCarousel.svelte";
	import { Button } from "$lib/components/ui/button";

	let { data } = $props();

	let screening = $derived(data.screening);

	let isFuture = $state(false);
	run(() => {
		const today = new Date();
		const screeningDate = new Date(screening.date);

		today.setHours(0, 0, 0, 0);
		screeningDate.setHours(0, 0, 0, 0);

		isFuture = screeningDate >= today;
	});
</script>

<div class="flex flex-col items-center text-center lg:mt-4">
	<p class="text-l text-muted-foreground">Psykolosjen Filmklubb {isFuture ? "viser" : "viste"}</p>
	<h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
		{screening.movies.map((movie) => movie.title).join(" & ")}
	</h1>
	<p class="text-l text-muted-foreground">{dateFormatterLong.format(new Date(screening.date))}</p>
</div>

{#if screening.poster?.asset}
	<Card.Root class="w-full overflow-hidden p-0 lg:max-w-sm">
		<Card.Content class="p-0">
			<PosterImage
				blurhash={screening.poster.blurhash}
				aspectRatio={screening.poster.dimensions.aspectRatio}
				imageAsset={screening.poster.asset}
				class="rounded-t-lg {screening.poster.artists ? '' : 'rounded-b-lg'}"
			/>
		</Card.Content>
		{#if screening.poster.artists}
			<Card.Footer class="p-2">
				<AuthorList authors={screening.poster.artists} heading="Plakat av:" />
			</Card.Footer>
		{/if}
	</Card.Root>
{/if}

{#if isFuture && screening.tickets_url}
	<Button size="lg" class="my-4">
		<a
			href={screening.tickets_url}
			target="_blank"
			class="text-center text-lg font-semibold text-primary-foreground"
		>
			Kjøp billetter
		</a>
	</Button>
{/if}

{#each data.screening.movies as movie}
	{#if movie.details}
		<MovieDetails
			title={movie.title}
			originCountry={movie.details.origin_country}
			originalTitle={movie.details.original_title}
			directors={movie.details.directors}
			norwegianReleaseDate={movie.details.release_date_no}
			originalReleaseDate={movie.details.release_date}
			imdbId={movie.details.imdb_id}
			posterPath={movie.details.poster_path}
		></MovieDetails>
	{/if}
{/each}

{#if screening.promo_material}
	<div>
		<h1 class="mb-2 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">Promo</h1>
		<GalleryCarousel galleryID="promo-gallery" images={screening.promo_material} />
	</div>
{/if}

{#if screening.event_media}
	<div>
		<h1 class="mb-2 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
			Bilder fra visningen
		</h1>
		<GalleryCarousel galleryID="event-gallery" images={screening.event_media} />
	</div>
{/if}
