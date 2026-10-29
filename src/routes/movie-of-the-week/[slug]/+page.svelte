<script lang="ts">
	import AuthorList from "$lib/components/AuthorList.svelte";
	import tmdbLogo from "$lib/images/tmdb-alt-long.svg";
	import ImdbButton from "$lib/components/ImdbButton.svelte";
	import LetterboxdButton from "$lib/components/LetterboxdButton.svelte";
	import { getMovieOfTheWeekPosterUrl } from "$lib/movieOfTheWeekPoster";
	import { PortableText } from "@portabletext/svelte";

	let { data } = $props();

	let posterUrl = $derived(
		getMovieOfTheWeekPosterUrl(data.movieOfTheWeek.movie.poster, data.movieDetails?.poster_path),
	);
	let usesTmdbPoster = $derived(!data.movieOfTheWeek.movie.poster?.asset && !!posterUrl);
	// TMDB keeps directors as a list; manual entries are a single comma-separated string.
	// TMDB sometimes lists no director, so fall back to the manual entry then too.
	let directors = $derived(
		data.movieDetails?.directors.length
			? data.movieDetails.directors
			: (data.movieOfTheWeek.movie.directors
					?.split(",")
					.map((director) => director.trim())
					.filter(Boolean) ?? []),
	);
</script>

<header class="mt-8 px-6 pb-8">
	<h1
		class="w-fit scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
		style:--vt-tag="MOTW-title-{data.movieOfTheWeek.slug.current}"
	>
		{data.movieOfTheWeek.movie.title}
	</h1>
</header>

<div class="mb-8 grid gap-12 px-6 lg:grid-cols-3 lg:gap-8">
	<div class="flex flex-col gap-6 lg:col-span-2 lg:gap-8">
		<article class="prose dark:prose-invert lg:prose-lg">
			<PortableText value={data.movieOfTheWeek.text} />
		</article>

		{#if data.movieOfTheWeek.recommender}
			<div class="lg:max-w-80">
				<AuthorList authors={[data.movieOfTheWeek.recommender]} heading="Anmeldt av:" />
			</div>
		{/if}
	</div>

	<div class="flex flex-col gap-8 lg:px-4">
		{#if data.movieDetails}
			<div>
				{#if posterUrl}
					<img
						src={posterUrl}
						alt="Movie Poster"
						class="mb-2"
						style:--vt-tag="MOTW-poster-{data.movieOfTheWeek.slug.current}"
					/>
				{/if}
				<p class="text-lg font-light">
					Originaltittel: <span class="font-medium">{data.movieDetails.original_title}</span>
				</p>
				{#if directors.length > 0}
					<p class="text-lg font-light">
						Regissør{directors.length > 1 ? "er" : ""}:
						<span class="font-medium">{directors.join(", ")}</span>
					</p>
				{/if}
				{#if data.movieOfTheWeek.movie.release_year}
					<p class="text-lg font-light">
						År:
						<span class="font-medium">
							{data.movieOfTheWeek.movie.release_year}
						</span>
					</p>
				{/if}
				{#if data.movieDetails?.imdb_id}
					<div class="mt-4 flex justify-evenly">
						<ImdbButton imdbId={data.movieDetails.imdb_id} />
						<LetterboxdButton imdbId={data.movieDetails.imdb_id} />
					</div>
				{/if}
			</div>
			<div>
				<small>Informasjon{usesTmdbPoster ? " og plakat" : ""} hentet fra</small>
				<a href="https://www.themoviedb.org/">
					<img src={tmdbLogo} alt="The Movie Database Logo" class="inline h-4 w-24" />
				</a>
			</div>
		{/if}
	</div>
</div>
