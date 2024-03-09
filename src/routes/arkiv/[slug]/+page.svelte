<script lang="ts">
	import AuthorList from '$lib/components/AuthorList.svelte';
	import PosterImage from '$lib/components/PosterImage.svelte';
	import { Button } from '$lib/components/ui/button';
	import { siImdb, siLetterboxd } from 'simple-icons';

	export let data;

	let dateFormatter = Intl.DateTimeFormat('no', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});

	$: screening = data.screening;
</script>

<div class="grid lg:grid-cols-2">
	<div class="mb-4 flex flex-col items-center text-center lg:mt-10">
		<p class="text-l text-muted-foreground">Psykolosjen Filmklubb viste</p>
		<h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
			{data.screening.movie_title}
		</h1>
		<p class="text-l text-muted-foreground">{dateFormatter.format(new Date(screening.date))}</p>
	</div>

	{#if data.movieDetails}
		<div class="mb-4 flex justify-evenly">
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

	{#if screening.poster}
		<div class="lg:order-first lg:row-span-4">
			<PosterImage poster={screening.poster} posterBlurhash={screening.posterBlurhash} />
		</div>
	{/if}
	{#if screening.posterArtists}
		<div class="p-2 lg:col-start-2 lg:row-start-4 lg:mb-4">
			<AuthorList authors={screening.posterArtists} heading="Plakat av:" />
		</div>
	{/if}
</div>
