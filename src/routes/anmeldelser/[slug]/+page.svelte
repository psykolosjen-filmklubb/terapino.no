<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { PortableText } from '@portabletext/svelte';
	import { siImdb, siLetterboxd } from 'simple-icons';
	import HeroImage from '$lib/components/HeroImage.svelte';
	import AuthorList from '$lib/components/AuthorList.svelte';

	export let data;

	let dateFormatter = Intl.DateTimeFormat('no', {
		day: 'numeric',
		month: '2-digit',
		year: 'numeric'
	});
</script>

<HeroImage thumbnailBlurhash={data.review.thumbnailBlurhash} thumbnail={data.review.thumbnail} />

<header class="mt-8 px-6 pb-8">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		{data.review.review_title}
	</h1>
	<small>Film: {data.review.movie_title}</small>
</header>

<div class="mb-8 grid gap-12 px-6 lg:grid-cols-3 lg:gap-8">
	<div class="flex flex-col gap-6 lg:col-span-2 lg:gap-8">
		<div>
			<PortableText value={data.review.review} />
		</div>

		{#if data.review.authors}
			<div class="lg:max-w-80">
				<AuthorList authors={data.review.authors} heading="Skrevet av:" />
			</div>
		{/if}
	</div>

	<div class="flex flex-col gap-8 lg:px-4">
		{#if data.movieDetails}
			<div>
				<img
					src="https://image.tmdb.org/t/p/w500{data.movieDetails.poster_path}"
					alt="Movie Poster"
					class="mb-2"
				/>
				<p class="text-lg font-light">
					Originaltittel: <span class="font-medium">{data.movieDetails.original_title}</span>
				</p>
				<p class="text-lg font-light">
					På kino i Norge: <span class="font-medium">
						{dateFormatter.format(
							new Date(data.movieDetails.release_date_no ?? data.movieDetails.release_date)
						)}
					</span>
				</p>
				<p class="text-lg font-light">
					Reggisør{data.movieDetails.directors.length > 1 ? 'er' : ''}:
					<span class="font-medium">{data.movieDetails.directors.join(', ')}</span>
				</p>
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
			</div>
		{/if}
	</div>
</div>
