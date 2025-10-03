<script lang="ts">
	import * as Accordion from "$lib/components/ui/accordion";
	import { dateFormatterShort } from "$lib/dateFormatters.js";
	import tmdbLogo from "$lib/images/tmdb-alt-long.svg";
	import ImdbButton from "$lib/components/ImdbButton.svelte";
	import LetterboxdButton from "$lib/components/LetterboxdButton.svelte";
	import { formatCountryCode } from "$lib/countries.js";

	interface MovieDetailsProps {
		title: string;
		originCountry: string[];
		originalTitle: string;
		directors: string[];
		norwegianReleaseDate?: string;
		originalReleaseDate: string;
		imdbId: string;
		posterPath: string;
	}

	let {
		title,
		originCountry,
		originalTitle,
		directors,
		norwegianReleaseDate,
		originalReleaseDate,
		imdbId,
		posterPath,
	}: MovieDetailsProps = $props();
</script>

<Accordion.Root type="single" class="-mt-4 w-full lg:max-w-sm">
	<Accordion.Item value="movie-details">
		<Accordion.Trigger>
			Mer info om {title}
		</Accordion.Trigger>

		<Accordion.Content>
			<div class="flex flex-col gap-2">
				<p class="font-light">
					Regissør{directors.length > 1 ? "er" : ""}:
					<span class="font-medium">{directors.join(", ")}</span>
				</p>

				{#if originCountry.length}
					<div class="flex gap-2">
						<span class="font-light">Opprinnelsesland:</span>
						<ul>
							{#each originCountry as country}
								<li class="font-medium">{formatCountryCode(country, { withFlag: true })}</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if originalTitle !== title}
					<p class="font-light">
						Originaltittel: <span class="font-medium">{originalTitle}</span>
					</p>
				{/if}

				<p class="font-light">
					{norwegianReleaseDate ? "På kino i Norge" : "Utgitt"}:
					<span class="font-medium">
						{dateFormatterShort.format(new Date(norwegianReleaseDate ?? originalReleaseDate))}
					</span>
				</p>

				<img
					src="https://image.tmdb.org/t/p/w500{posterPath}"
					alt="Movie Poster"
					class="mx-auto mb-2 max-w-[60%]"
				/>
			</div>

			<div class="my-2 flex w-full max-w-96 justify-evenly">
				<ImdbButton {imdbId} />
				<LetterboxdButton {imdbId} />
			</div>

			<small>Informasjon og poster hentet fra</small>
			<a href="https://www.themoviedb.org/">
				<img src={tmdbLogo} alt="The Movie Database Logo" class="inline h-4 w-24" />
			</a>
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
