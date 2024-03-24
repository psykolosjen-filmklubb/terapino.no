<script lang="ts">
	import AuthorList from '$lib/components/AuthorList.svelte';
	import PosterImage from '$lib/components/PosterImage.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Accordion from '$lib/components/ui/accordion';
	import { dateFormatterLong, dateFormatterShort } from '$lib/dateFormatters.js';
	import tmdbLogo from '$lib/images/tmdb-alt-long.svg';
	import ImdbButton from '$lib/components/ImdbButton.svelte';
	import LetterboxdButton from '$lib/components/LetterboxdButton.svelte';
	import GalleryCarousel from '$lib/components/GalleryCarousel.svelte';

	export let data;

	$: screening = data.screening;
</script>

<div class="mb-4 flex flex-col items-center text-center lg:mt-4">
	<p class="text-l text-muted-foreground">Psykolosjen Filmklubb viste</p>
	<h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
		{screening.movie_title}
	</h1>
	<p class="text-l text-muted-foreground">{dateFormatterLong.format(new Date(screening.date))}</p>
</div>

{#if screening.poster}
	<Card.Root>
		<Card.Content class="p-0">
			<PosterImage
				poster={screening.poster}
				posterBlurhash={screening.posterBlurhash}
				class="rounded-t-lg {screening.posterArtists ? '' : 'rounded-b-lg'}"
			/>
		</Card.Content>
		{#if screening.posterArtists}
			<Card.Footer class="p-2">
				<AuthorList authors={screening.posterArtists} heading="Plakat av:" />
			</Card.Footer>
		{/if}
	</Card.Root>
{/if}

{#if data.movieDetails}
	<Accordion.Root class="w-72">
		<Accordion.Item value="movie-details">
			<Accordion.Trigger>Mer info om {screening.movie_title}</Accordion.Trigger>
			<Accordion.Content>
				<div class="flex flex-col gap-2">
					<p class="font-light">
						Reggisør{data.movieDetails.directors.length > 1 ? 'er' : ''}:
						<span class="font-medium">{data.movieDetails.directors.join(', ')}</span>
					</p>
					<p class="font-light">
						Originaltittel: <span class="font-medium">{data.movieDetails.original_title}</span>
					</p>
					<p class="font-light">
						{data.movieDetails.release_date_no ? 'På kino i Norge' : 'Utgitt'}:
						<span class="font-medium">
							{dateFormatterShort.format(
								new Date(data.movieDetails.release_date_no ?? data.movieDetails.release_date)
							)}
						</span>
					</p>
					<img
						src="https://image.tmdb.org/t/p/w500{data.movieDetails.poster_path}"
						alt="Movie Poster"
						class="mx-auto mb-2 max-w-[60%]"
					/>
				</div>

				<small>Informasjon og poster hentet fra</small>
				<a href="https://www.themoviedb.org/">
					<img src={tmdbLogo} alt="The Movie Database Logo" class="inline h-4 w-24" />
				</a>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
{/if}

{#if data.movieDetails?.imdb_id}
	<div class="my-6 flex w-full max-w-96 justify-evenly">
		<ImdbButton imdbId={data.movieDetails.imdb_id} />
		<LetterboxdButton imdbId={data.movieDetails.imdb_id} />
	</div>
{/if}

{#if screening.promo_material}
	<h1 class="my-2 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">Promo</h1>
	<GalleryCarousel galleryID="promo-gallery" images={screening.promo_material} />
{/if}

{#if screening.event_media}
	<h1 class="my-2 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
		Bilder fra visningen
	</h1>
	<GalleryCarousel galleryID="event-gallery" images={screening.event_media} />
{/if}
