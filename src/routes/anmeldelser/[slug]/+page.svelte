<script lang="ts">
	import { PortableText } from "@portabletext/svelte";
	import HeroImage from "$lib/components/HeroImage.svelte";
	import AuthorList from "$lib/components/AuthorList.svelte";
	import { dateFormatterShort } from "$lib/dateFormatters.js";
	import tmdbLogo from "$lib/images/tmdb-alt-long.svg";
	import ImdbButton from "$lib/components/ImdbButton.svelte";
	import LetterboxdButton from "$lib/components/LetterboxdButton.svelte";

	let { data } = $props();

	let releaseDate = $derived(
		data.movieDetails?.release_date_no ?? data.movieDetails?.release_date ?? null,
	);
</script>

{#if data.review.thumbnail}
	<HeroImage
		thumbnail={data.review.thumbnail}
		thumbnailLqip={data.review.thumbnailLqip}
		slug={data.review.slug.current}
	/>
{/if}

<header class="mt-8 px-6 pb-8">
	<h1
		class="w-fit scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
		style:--vt-tag="review-title-{data.review.slug.current}"
	>
		{data.review.review_title}
	</h1>
	<small>Film: {data.review.movie_title}</small>
</header>

<div class="mb-8 grid gap-12 px-6 lg:grid-cols-3 lg:gap-8">
	<div class="flex flex-col gap-6 lg:col-span-2 lg:gap-8">
		<article class="prose dark:prose-invert lg:prose-lg">
			<PortableText value={data.review.review} />
		</article>

		{#if data.review.authors}
			<div class="lg:max-w-80">
				<AuthorList authors={data.review.authors} heading="Anmeldt av:" />
			</div>
		{/if}
	</div>

	<div class="flex flex-col gap-8 lg:px-4">
		{#if data.movieDetails}
			<div>
				{#if data.movieDetails.poster_path}
					<img
						src="https://image.tmdb.org/t/p/w500{data.movieDetails.poster_path}"
						alt="Movie Poster"
						class="mb-2"
					/>
				{/if}
				<p class="text-lg font-light">
					Originaltittel: <span class="font-medium">{data.movieDetails.original_title}</span>
				</p>
				{#if releaseDate}
					<p class="text-lg font-light">
						{data.movieDetails.release_date_no ? "På kino i Norge" : "Utgitt"}:
						<span class="font-medium">
							{dateFormatterShort.format(new Date(releaseDate))}
						</span>
					</p>
				{/if}
				<p class="text-lg font-light">
					Regissør{data.movieDetails.directors.length > 1 ? "er" : ""}:
					<span class="font-medium">{data.movieDetails.directors.join(", ")}</span>
				</p>
				<div class="mt-4 flex justify-evenly">
					{#if data.movieDetails.imdb_id}
						<ImdbButton imdbId={data.movieDetails.imdb_id} />
						<LetterboxdButton imdbId={data.movieDetails.imdb_id} />
					{/if}
				</div>
			</div>
			<div>
				<small>Informasjon og plakat hentet fra</small>
				<a href="https://www.themoviedb.org/">
					<img src={tmdbLogo} alt="The Movie Database Logo" class="inline h-4 w-24" />
				</a>
			</div>
		{/if}
	</div>
</div>
