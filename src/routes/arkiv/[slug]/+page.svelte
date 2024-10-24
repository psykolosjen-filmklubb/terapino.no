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
	import { Button } from '$lib/components/ui/button';

	export let data;

	$: screening = data.screening;

	let isFuture = false;
	$: {
		const today = new Date();
		const screeningDate = new Date(screening.date);

		today.setHours(0, 0, 0, 0);
		screeningDate.setHours(0, 0, 0, 0);

		isFuture = screeningDate >= today;
	}
</script>

<div class="flex flex-col items-center text-center lg:mt-4">
	<p class="text-l text-muted-foreground">Psykolosjen Filmklubb {isFuture ? 'viser' : 'viste'}</p>
	<h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
		{screening.movie_title}
	</h1>
	<p class="text-l text-muted-foreground">{dateFormatterLong.format(new Date(screening.date))}</p>
</div>

{#if screening.poster?.asset}
	<Card.Root class="w-full overflow-hidden lg:max-w-sm">
		<Card.Content class="p-0">
			<PosterImage
				poster={screening.poster}
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

{#if data.movieDetails}
	<Accordion.Root class="-mt-4 w-72">
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
	<div class="flex w-full max-w-96 justify-evenly">
		<ImdbButton imdbId={data.movieDetails.imdb_id} />
		<LetterboxdButton imdbId={data.movieDetails.imdb_id} />
	</div>
{/if}

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
