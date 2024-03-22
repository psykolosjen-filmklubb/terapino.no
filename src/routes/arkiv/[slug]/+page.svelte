<script lang="ts">
	import AuthorList from '$lib/components/AuthorList.svelte';
	import PosterImage from '$lib/components/PosterImage.svelte';
	import { Button } from '$lib/components/ui/button';
	import { siImdb, siLetterboxd } from 'simple-icons';
	import * as Card from '$lib/components/ui/card';

	export let data;

	let dateFormatter = Intl.DateTimeFormat('no', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});

	$: screening = data.screening;
</script>

<div class="grid">
	<div class="mb-4 flex flex-col items-center text-center lg:mt-10">
		<p class="text-l text-muted-foreground">Psykolosjen Filmklubb viste</p>
		<h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
			{data.screening.movie_title}
		</h1>
		<p class="text-l text-muted-foreground">{dateFormatter.format(new Date(screening.date))}</p>
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

	{#if data.movieDetails?.imdb_id}
		<div class="mt-4 flex justify-evenly">
			<Button
				href="https://www.imdb.com/title/{data.movieDetails.imdb_id}"
				class="bg-[#f5c518] hover:bg-[#f5c518d0]"
			>
				<svg class="h-6 w-6 fill-primary">
					{@html siImdb.svg}
				</svg>
			</Button>
			<Button
				href="https://letterboxd.com/imdb/{data.movieDetails.imdb_id}"
				class="bg-[#2C343F] hover:bg-[#2C343Fd0]"
			>
				<svg class="h-6 w-6 fill-primary-foreground">
					{@html siLetterboxd.svg}
				</svg>
			</Button>
		</div>
	{/if}
</div>
